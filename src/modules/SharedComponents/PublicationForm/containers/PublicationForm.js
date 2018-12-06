import {connect} from 'react-redux';
import {reduxForm, getFormValues, getFormSyncErrors, stopSubmit, SubmissionError, reset, formValueSelector} from 'redux-form/immutable';
import Immutable from 'immutable';
import PublicationForm from '../components/PublicationForm';
import {createNewRecord} from 'actions';
import {general, publicationTypes} from 'config';
import {locale} from 'locale';
import {confirmDiscardFormChanges} from 'modules/SharedComponents/ConfirmDiscardFormChanges';

import * as recordForms from '../components/Forms';

const FORM_NAME = 'PublicationForm';

const onSubmit = (values, dispatch, state) => {
    // Get the list of redux-form registered fields for the current form
    const formFields = state.registeredFields.toJS();

    // Delete the currentAuthor if there is no author field in the form (potentially editors only like conference proceedings) and its not a thesis (specific field name)
    const cleanValues = values.toJS();
    if((!formFields.authors && !formFields['currentAuthor.0.nameAsPublished'])) {
        delete cleanValues.currentAuthor;
    }

    // set default values for a new unapproved record
    return dispatch(createNewRecord({...cleanValues}))
        .then(() => {
            // once this promise is resolved form is submitted successfully and will call parent container
            // reported bug to redux-form:
            // reset form after success action was dispatched:
            // componentWillUnmount cleans up form, but then onSubmit success sets it back to active
            setTimeout(()=>{
                dispatch(reset(FORM_NAME));
            }, 100);
        })
        .catch(error => {
            throw new SubmissionError({_error: error.message});
        });
};

const validate = (values) => {
    // add only multi field validations
    // single field validations should be implemented using validate prop: <Field validate={[validation.required]} />
    // reset global errors, eg form submit failure
    stopSubmit(FORM_NAME, null);
    const data = values.toJS();
    const errors = {};

    switch(data.rek_display_type) {
        case general.PUBLICATION_TYPE_BOOK:
        case general.PUBLICATION_TYPE_AUDIO_DOCUMENT:
        case general.PUBLICATION_TYPE_VIDEO_DOCUMENT:
            // either author or editor should be selected and linked to a user
            if (
                (!data.authors && !data.editors) ||
                (data.authors && data.editors && data.editors.length === 0 && data.authors.length === 0) ||
                (data.authors && data.authors.filter(item => (item.selected)).length === 0 &&
                    (!data.editors || (data.editors && data.editors.filter(item => (item.selected)).length === 0)))
            ) {
                errors.authors = locale.validationErrors.authorRequired;
                errors.editors = locale.validationErrors.editorRequired;
            }
            break;
        default:
            break;
    }
    return errors;
};

let PublicationFormContainer = reduxForm({
    form: FORM_NAME,
    validate,
    onSubmit
})(confirmDiscardFormChanges(PublicationForm, FORM_NAME));

const selector = formValueSelector(FORM_NAME);

const mapStateToProps = (state) => {
    const formErrors = getFormSyncErrors(FORM_NAME)(state) || Immutable.Map({});
    const displayType = selector(state, 'rek_display_type');
    const publicationSubtype = selector(state, 'rek_subtype');
    const selectedPublicationType = !!displayType && publicationTypes({...recordForms}).filter(type =>
        type.id === displayType
    );
    const hasSubtypes = !!selectedPublicationType && !!selectedPublicationType[0].subtypeVocabId || false;
    const subtypeVocabId = hasSubtypes && !!selectedPublicationType && selectedPublicationType[0].subtypeVocabId || null;
    const formComponent = selectedPublicationType && selectedPublicationType[0].formComponent;
    return {
        formValues: getFormValues(FORM_NAME)(state) || Immutable.Map({}),
        formErrors: formErrors,
        disableSubmit: formErrors && !(formErrors instanceof Immutable.Map),
        selectedPublicationType: selectedPublicationType,
        hasSubtypes: hasSubtypes,
        subtypeVocabId: subtypeVocabId,
        formComponent: (!hasSubtypes && formComponent) || (hasSubtypes && !!publicationSubtype && formComponent) || null
    };
};

PublicationFormContainer = connect(mapStateToProps)(PublicationFormContainer);

export default PublicationFormContainer;
