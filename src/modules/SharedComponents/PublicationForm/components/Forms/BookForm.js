import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form/immutable';

import {TextField} from 'modules/SharedComponents/Toolbox/TextField';
import {StandardCard} from 'modules/SharedComponents/Toolbox/StandardCard';
import {PartialDateField} from 'modules/SharedComponents/Toolbox/PartialDate';
import {ListEditorField} from 'modules/SharedComponents/Toolbox/ListEditor';

import {ContributorsEditorField} from 'modules/SharedComponents/ContributorsEditor';
import {PublicationSubtypeField} from 'modules/SharedComponents/PublicationSubtype';
import {validation} from 'config';
import {locale} from 'locale';
import {default as formLocale} from 'locale/publicationForm';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class BookForm extends Component {
    static propTypes = {
        submitting: PropTypes.bool,
        subtypeVocabId: PropTypes.number,
        formValues: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        const txt = formLocale.book;
        const editors = this.props.formValues && this.props.formValues.get('editors');
        const editorSelected = !!editors && editors.filter((editor) => editor.selected).length > 0;
        const authors = this.props.formValues && this.props.formValues.get('authors');
        const authorSelected = !!authors && authors.filter((author) => author.selected).length > 0;
        return (
            <React.Fragment>
                <StandardCard title={txt.information.title} help={txt.information.help}>
                    <Grid container spacing={16} >
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                autoFocus
                                disabled={this.props.submitting}
                                name="rek_title"
                                required
                                type="text"
                                fullWidth
                                multiline
                                rows={1}
                                label={txt.information.fieldLabels.bookTitle}
                                validate={[validation.required]} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                disabled={this.props.submitting}
                                name="fez_record_search_key_place_of_publication.rek_place_of_publication"
                                type="text"
                                required
                                fullWidth
                                label={txt.information.fieldLabels.publicationPlace}
                                validate={[validation.required]} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                disabled={this.props.submitting}
                                name="fez_record_search_key_publisher.rek_publisher"
                                type="text"
                                required
                                fullWidth
                                label={txt.information.fieldLabels.publisher}
                                validate={[validation.required]} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={PublicationSubtypeField}
                                fullWidth
                                name="rek_subtype"
                                disabled={this.props.submitting}
                                vocabId={this.props.subtypeVocabId}
                                className="requiredField"
                                locale={{label: txt.information.fieldLabels.subtype, loading: locale.global.loading}}
                                validate={[validation.required]} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={PartialDateField}
                                disabled={this.props.submitting}
                                name="rek_date"
                                allowPartial
                                className="requiredHintField"
                                validate={[validation.required]}
                                floatingTitle={txt.information.fieldLabels.date.title}
                                floatingTitleRequired
                            />
                        </Grid>
                    </Grid>
                </StandardCard>

                <StandardCard title={txt.authors.title} help={txt.authors.help}>
                    <Field
                        component={ContributorsEditorField}
                        name="authors"
                        locale={txt.authors.field}
                        showContributorAssignment={!editorSelected}
                        required
                        disabled={this.props.submitting} />
                </StandardCard>

                <StandardCard title={txt.editors.title} help={txt.editors.help}>
                    <Field
                        component={ContributorsEditorField}
                        showContributorAssignment={!authorSelected}
                        name="editors"
                        locale={txt.editors.field}
                        disabled={this.props.submitting} />
                </StandardCard>

                <StandardCard title={locale.components.isbnForm.title} help={locale.components.isbnForm.title.help}>
                    <Typography>{locale.components.isbnForm.text}</Typography>
                    <Field
                        component={ListEditorField}
                        remindToAdd
                        name="fez_record_search_key_isbn"
                        isValid={validation.isValidIsbn}
                        maxCount={5}
                        searchKey={{value: 'rek_isbn', order: 'rek_isbn_order'}}
                        locale={locale.components.isbnForm.field}
                        disabled={this.props.submitting} />
                </StandardCard>

                <StandardCard title={locale.components.issnForm.title} help={locale.components.issnForm.title.help}>
                    <Typography>{locale.components.issnForm.text}</Typography>
                    <Field
                        component={ListEditorField}
                        remindToAdd
                        isValid={validation.isValidIssn}
                        name="fez_record_search_key_issn"
                        maxCount={5}
                        locale={locale.components.issnForm.field}
                        searchKey={{value: 'rek_issn', order: 'rek_issn_order'}}
                        disabled={this.props.submitting} />
                </StandardCard>

                <StandardCard title={txt.optional.title} help={txt.optional.help}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="comments"
                                type="text"
                                disabled={this.props.submitting}
                                fullWidth
                                multiline
                                label={txt.optional.fieldLabels.notes}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                name="rek_link"
                                type="text"
                                disabled={this.props.submitting}
                                fullWidth
                                label={txt.optional.fieldLabels.url}
                                validate={[validation.url]}
                            />
                        </Grid>
                    </Grid>
                </StandardCard>

            </React.Fragment>
        );
    }
}
