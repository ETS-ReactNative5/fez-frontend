import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form/immutable';

import {TextField} from 'modules/SharedComponents/Toolbox/TextField';
import {StandardCard} from 'modules/SharedComponents/Toolbox/StandardCard';
import {PartialDateField} from 'modules/SharedComponents/Toolbox/PartialDate';
import {ListEditorField} from 'modules/SharedComponents/Toolbox/ListEditor';

import {ContributorsEditorField} from 'modules/SharedComponents/ContributorsEditor';
import {SeriesField} from 'modules/SharedComponents/LookupFields';

import {validation} from 'config';
import {locale} from 'locale';
import {default as formLocale} from 'locale/publicationForm';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class ResearchReportForm extends Component {
    static propTypes = {
        submitting: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    getNumbersOnly = (value) => {
        return value.replace(/[^\d]/g, '');
    };

    render() {
        const txt = formLocale.researchReport;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <StandardCard title={txt.information.title} help={txt.information.help}>
                        <Grid container spacing={16}>
                            <Grid iteam xs={12}>
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
                                    {...txt.information.fieldLabels.documentTitle}
                                    validate={[validation.required]}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={TextField}
                                    disabled={this.props.submitting}
                                    name="fez_record_search_key_place_of_publication.rek_place_of_publication"
                                    type="text"
                                    fullWidth
                                    {...txt.information.fieldLabels.publicationPlace}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={TextField}
                                    disabled={this.props.submitting}
                                    name="fez_record_search_key_publisher.rek_publisher"
                                    type="text"
                                    fullWidth
                                    {...txt.information.fieldLabels.publisher}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={TextField}
                                    name="fez_record_search_key_total_pages.rek_total_pages"
                                    type="text"
                                    disabled={this.props.submitting}
                                    fullWidth
                                    required
                                    {...txt.information.fieldLabels.totalPages}
                                    normalize={this.getNumbersOnly}
                                    validate={[validation.required]}
                                />
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
                            <Grid iteam xs={12}>
                                <Field
                                    component={SeriesField}
                                    name="fez_record_search_key_series.rek_series"
                                    disabled={this.props.submitting}
                                    {...txt.information.fieldLabels.series}
                                />
                            </Grid>
                        </Grid>
                    </StandardCard>
                </Grid>
                <Grid item xs={12}>
                    <StandardCard title={txt.authors.title} help={txt.authors.help}>
                        <Typography>{txt.authors.description}</Typography>
                        <Field
                            component={ContributorsEditorField}
                            name="authors"
                            locale={txt.authors.field}
                            showContributorAssignment
                            className="requiredField"
                            validate={[validation.authorRequired]}
                            disabled={this.props.submitting} />
                    </StandardCard>
                </Grid>
                <Grid item xs={12}>
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
                            disabled={this.props.submitting}
                        />
                    </StandardCard>
                </Grid>
                <Grid item xs={12}>
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
                            disabled={this.props.submitting}
                        />
                    </StandardCard>
                </Grid>
                <Grid item xs={12}>
                    <StandardCard title={txt.other.title} help={txt.other.help}>
                        <Grid container spacing={16}>
                            <Grid iteam xs={12}>
                                <Field
                                    component={TextField}
                                    name="rek_description"
                                    type="text"
                                    disabled={this.props.submitting}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    {...txt.other.fieldLabels.abstract}
                                />
                            </Grid>
                            <Grid iteam xs={12}>
                                <Field
                                    component={TextField}
                                    name="comments"
                                    type="text"
                                    disabled={this.props.submitting}
                                    fullWidth
                                    multiline
                                    {...txt.other.fieldLabels.notes}
                                />
                            </Grid>
                            <Grid iteam xs={12}>
                                <Field
                                    component={TextField}
                                    name="rek_link"
                                    type="text"
                                    disabled={this.props.submitting}
                                    fullWidth
                                    {...txt.other.fieldLabels.url}
                                    validate={[validation.url]}
                                />
                            </Grid>
                        </Grid>
                    </StandardCard>
                </Grid>
            </Grid>
        );
    }
}
