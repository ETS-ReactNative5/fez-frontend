import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {propTypes} from 'redux-form/immutable';
import {Field} from 'redux-form/immutable';

import {Alert} from 'modules/SharedComponents/Toolbox/Alert';
import {NavigationDialogBox} from 'modules/SharedComponents/Toolbox/NavigationPrompt';
import {ConfirmDialogBox} from 'modules/SharedComponents/Toolbox/ConfirmDialogBox';
import {TextField} from 'modules/SharedComponents/Toolbox/TextField';
import {PartialDateField} from 'modules/SharedComponents/Toolbox/PartialDate';
import {StandardPage} from 'modules/SharedComponents/Toolbox/StandardPage';
import {StandardCard} from 'modules/SharedComponents/Toolbox/StandardCard';
import {FilteredFieldOfResearchListField} from 'modules/SharedComponents/LookupFields';
import {ContributorsEditorField} from 'modules/SharedComponents/ContributorsEditor';
import {ListEditorField} from 'modules/SharedComponents/Toolbox/ListEditor';
import {FileUploadField} from 'modules/SharedComponents/Toolbox/FileUploader';
import {AccessSelectorField} from 'modules/SharedComponents/Toolbox/AccessSelectorField';
import {LicenseSelectorField} from 'modules/SharedComponents/Toolbox/LicenseSelectorField';
import {GeoCoordinatesField} from 'modules/SharedComponents/Toolbox/GeoCoordinatesField';
import {DatePickerField} from 'modules/SharedComponents/Toolbox/DatePickerField';
import {AuthorIdField} from 'modules/SharedComponents/LookupFields';
import {RelatedDatasetAndPublicationListField} from 'modules/SharedComponents/LookupFields';
import {default as Divider} from 'modules/SharedComponents/Toolbox/Divider';

import {validation} from 'config';
import componentLocale from 'locale/components';
import {default as formLocale} from 'locale/publicationForm';
import {locale} from 'locale';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DepositAgreementField from './DepositAgreementField';

export default class AddDataCollection extends Component {
    static propTypes = {
        ...propTypes, // all redux-form props
        author: PropTypes.object,
        disableSubmit: PropTypes.bool,
        actions: PropTypes.object,
        isSessionValid: PropTypes.bool
    };

    cancelSubmit = () => {
        window.location.assign(formLocale.thesisSubmission.cancelLink);
    }

    afterSubmit = () => {
        window.location.assign(formLocale.thesisSubmission.afterSubmitLink);
    }

    render() {
        const txt = formLocale.addDataset;
        const txtFoR = componentLocale.components.fieldOfResearchForm;

        if (this.props.submitSucceeded) {
            return (
                <StandardPage title={formLocale.pageTitle}>
                    <Grid container>
                        <Grid item xs/>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                children={formLocale.dataset.afterSubmit}
                                onClick={this.afterSubmit}/>
                        </Grid>
                    </Grid>
                </StandardPage>
            );
        }
        // customise error for data collection submission
        const alertProps = validation.getErrorAlertProps({
            ...this.props,
            alertLocale: {
                validationAlert: {...formLocale.validationAlert},
                progressAlert: {...formLocale.progressAlert},
                successAlert: {...formLocale.successAlert},
                errorAlert: {...formLocale.errorAlert}
            }});

        const saveConfirmationLocale = {...locale.pages.addRecord.successWorkflowConfirmation};
        saveConfirmationLocale.confirmationMessage = (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    {this.props.newRecordFileUploadingOrIssueError && <Alert {...saveConfirmationLocale.fileFailConfirmationAlert} />}
                    {saveConfirmationLocale.recordSuccessConfirmationMessage}
                </Grid>
            </Grid>
        );
        return (
            <StandardPage title={formLocale.pageTitle}>
                <form>
                    <NavigationDialogBox
                        when={this.props.dirty && !this.props.submitSucceeded}
                        txt={formLocale.cancelWorkflowConfirmation}/>
                    <ConfirmDialogBox
                        onRef={ref => (this.confirmationBox = ref)}
                        onAction={this._navigateToMyResearch}
                        onCancelAction={this._restartWorkflow}
                        locale={saveConfirmationLocale}
                    />
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.agreement.title}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={DepositAgreementField}
                                            depositAgreement={txt.information.agreement.text}
                                            name="rek_copyright"
                                            required
                                            validate={[validation.required]}
                                        />
                                    </Grid>
                                </Grid>
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.dataset.title}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={12}>
                                        <Field
                                            component={TextField}
                                            disabled={this.props.submitting}
                                            name="rek_title"
                                            required
                                            fullWidth
                                            multiline
                                            rows={1}
                                            {...txt.information.dataset.fieldLabels.datasetTitle}
                                            validate={[validation.required]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Field
                                            component={TextField}
                                            disabled={this.props.submitting}
                                            name="rek_description"
                                            required
                                            fullWidth
                                            multiline
                                            rows={1}
                                            {...txt.information.dataset.fieldLabels.description}
                                            validate={[validation.required]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={TextField}
                                            disabled={this.props.submitting}
                                            name="contact.contactName"
                                            required
                                            fullWidth
                                            {...txt.information.dataset.fieldLabels.contactName}
                                            validate={[validation.required]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={AuthorIdField}
                                            disabled={this.props.submitting}
                                            name="contact.contactNameId"
                                            fullWidth
                                            {...txt.information.dataset.fieldLabels.contactId}
                                            validate={[validation.required]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Field
                                            component={TextField}
                                            disabled={this.props.submitting}
                                            name="contact.contactEmail"
                                            required
                                            fullWidth
                                            {...txt.information.dataset.fieldLabels.contactEmail}
                                            validate={[validation.required]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Field
                                            component={TextField}
                                            disabled={this.props.submitting}
                                            name="fez_record_search_key_doi.rek_doi"
                                            required
                                            type="text"
                                            fullWidth
                                            {...txt.information.dataset.fieldLabels.doi}
                                            validate={[validation.required, validation.doi]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={TextField}
                                            disabled={this.props.submitting}
                                            name="fez_record_search_key_publisher.rek_publisher"
                                            type="text"
                                            fullWidth
                                            {...txt.information.dataset.fieldLabels.publisher}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={PartialDateField}
                                            disabled={this.props.submitting}
                                            name="rek_date"
                                            allowPartial
                                            required
                                            validate={[validation.required]}
                                            floatingTitle={txt.information.dataset.fieldLabels.date.title}
                                            floatingTitleRequired
                                        />
                                    </Grid>
                                </Grid>
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.dataset.fieldLabels.fieldOfResearchCodes.title} help={txtFoR.help}>
                                <Typography>{txtFoR.text}</Typography>
                                <Field
                                    component={FilteredFieldOfResearchListField}
                                    name="fieldOfResearch"
                                    required
                                    validate={[validation.forRequired]}
                                    hideReorder
                                    distinctOnly
                                    disabled={this.props.submitting}
                                    locale={txtFoR.field}/>
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.creator.title}>
                                <Field
                                    component={ContributorsEditorField}
                                    name="authors"
                                    showRoleInput
                                    locale={txt.information.creator.field}
                                    required
                                    disabled={this.props.submitting}
                                    validate={[validation.requiredList]}
                                />
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.accessAndLicensing.title} help={txt.information.accessAndLicensing.help}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Field
                                            component={AccessSelectorField}
                                            name="fez_record_search_key_access_conditions.rek_access_conditions"
                                            required
                                            validate={[validation.required]}
                                            disabled={this.props.submitting}
                                            {...txt.information.accessAndLicensing.fieldLabels.accessConditions}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Field
                                            component={LicenseSelectorField}
                                            name="fez_record_search_key_license.rek_license"
                                            required
                                            validate={[validation.required]}
                                            disabled={this.props.submitting}
                                            {...txt.information.accessAndLicensing.fieldLabels.licensingAndTermsOfAccess}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Field
                                            component={TextField}
                                            disabled={this.props.submitting}
                                            name="fez_record_search_key_rights.rek_rights"
                                            type="text"
                                            fullWidth
                                            {...txt.information.accessAndLicensing.fieldLabels.copyrightNotice}
                                        />
                                    </Grid>
                                </Grid>
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.project.title}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            disabled={this.props.submitting}
                                            name="fez_record_search_key_project_name.rek_project_name"
                                            required
                                            type="text"
                                            fullWidth
                                            multiline
                                            rows={1}
                                            {...txt.information.project.fieldLabels.projectName}
                                            validate={[validation.required]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            disabled={this.props.submitting}
                                            name="fez_record_search_key_project_description.rek_project_description"
                                            required
                                            type="text"
                                            fullWidth
                                            multiline
                                            rows={1}
                                            {...txt.information.project.fieldLabels.projectDescription}
                                            validate={[validation.required]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={ListEditorField}
                                            name="fez_record_search_key_grant_id"
                                            maxCount={10}
                                            searchKey={{value: 'rek_grant_id', order: 'rek_grant_id_order'}}
                                            locale={locale.components.grantIdForm.field}
                                            disabled={this.props.submitting}/>
                                    </Grid>
                                </Grid>
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.optionalDatasetDetails.title}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={ListEditorField}
                                            name="fez_record_search_key_type_of_data"
                                            maxCount={10}
                                            searchKey={{value: 'rek_type_of_data', order: 'rek_type_of_data_order'}}
                                            locale={locale.components.typeOfDataForm.field}
                                            disabled={this.props.submitting}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={ListEditorField}
                                            name="fez_record_search_key_software_required"
                                            maxCount={10}
                                            searchKey={{value: 'rek_software_required', order: 'rek_software_required_order'}}
                                            locale={locale.components.softwareRequiredForm.field}
                                            disabled={this.props.submitting}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={ListEditorField}
                                            name="fez_record_search_key_keyword"
                                            maxCount={10}
                                            searchKey={{value: 'rek_keyword', order: 'rek_keyword_order'}}
                                            locale={locale.components.keywordsForm.field}
                                            disabled={this.props.submitting}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{padding: '0px 20px'}}>
                                        <Typography variant="caption">{txt.information.optionalDatasetDetails.fieldLabels.collectionStart.label}</Typography>
                                        <Field
                                            component={DatePickerField}
                                            autoOk
                                            name="fez_record_search_key_start_date.rek_start_date"
                                            disabled={this.props.submitting}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{padding: '0px 20px'}}>
                                        <Typography variant="caption">{txt.information.optionalDatasetDetails.fieldLabels.collectionEnd.label}</Typography>
                                        <Field
                                            component={DatePickerField}
                                            autoOk
                                            name="fez_record_search_key_end_date.rek_end_date"
                                            disabled={this.props.submitting}/>
                                    </Grid>
                                </Grid>
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.optionalDatasetDetails.fieldLabels.geographicCoordinates.label}>
                                <Typography variant="caption" gutterBottom>{txt.information.optionalDatasetDetails.fieldLabels.geographicCoordinates.description}</Typography>
                                <Field
                                    component={GeoCoordinatesField}
                                    name="geographicArea"/>
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.optionalDatasetDetails.fieldLabels.relatedDatasets.label}>
                                <Field
                                    component={RelatedDatasetAndPublicationListField}
                                    name="fez_record_search_key_has_related_datasets"
                                    searchKey={{value: 'rek_has_related_datasets', order: 'rek_has_related_datasets_order', lookup: 'rek_has_related_datasets_lookup'}}
                                    disabled={this.props.submitting}
                                    height={50}
                                    validate={[validation.required]}/>
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={txt.information.additionalNotes.title}>
                                <Grid container spacing={16}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="fez_record_search_key_additional_notes.rek_additional_notes"
                                            type="text"
                                            disabled={this.props.submitting}
                                            fullWidth
                                            multiline
                                            {...txt.information.additionalNotes.fieldLabels.notes}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="rek_link"
                                            type="text"
                                            disabled={this.props.submitting}
                                            fullWidth
                                            {...txt.information.additionalNotes.fieldLabels.links}
                                            validate={[validation.url]}
                                        />
                                    </Grid>
                                </Grid>
                            </StandardCard>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={formLocale.thesisSubmission.fileUpload.title} help={formLocale.thesisSubmission.fileUpload.help}>
                                <Field
                                    name="files"
                                    component={FileUploadField}
                                    disabled={this.props.submitting}
                                    validate={[validation.fileUploadRequired]}/>
                            </StandardCard>
                        </Grid>

                        {
                            alertProps &&
                            <Grid item xs={12}>
                                <Alert {...alertProps} />
                            </Grid>
                        }
                    </Grid>
                    <Grid container spacing={16}>
                        <Grid item xs={false} sm />
                        <Grid item xs={12} sm="auto">
                            <Button
                                variant="contained"
                                fullWidth
                                children={formLocale.addDataset.cancel}
                                disabled={this.props.submitting}
                                onClick={this.cancelSubmit}/>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                children={formLocale.addDataset.submit}
                                onClick={this.props.handleSubmit}
                                disabled={this.props.submitting || this.props.disableSubmit}/>
                        </Grid>
                    </Grid>
                </form>
            </StandardPage>
        );
    }
}
