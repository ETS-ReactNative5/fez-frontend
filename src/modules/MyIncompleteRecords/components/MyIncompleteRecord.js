import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, propTypes } from 'redux-form/immutable';

import { ConfirmationBox } from 'modules/SharedComponents/Toolbox/ConfirmDialogBox';
import { ConfirmDiscardFormChanges } from 'modules/SharedComponents/ConfirmDiscardFormChanges';
import { useConfirmationState } from 'hooks';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import { TextField } from 'modules/SharedComponents/Toolbox/TextField';
import { StandardPage } from 'modules/SharedComponents/Toolbox/StandardPage';
import { NavigationDialogBox } from 'modules/SharedComponents/Toolbox/NavigationPrompt';
import { StandardCard } from 'modules/SharedComponents/Toolbox/StandardCard';
import { Alert } from 'modules/SharedComponents/Toolbox/Alert';
import { FileUploadField } from 'modules/SharedComponents/Toolbox/FileUploader';
import { PublicationCitation } from 'modules/SharedComponents/PublicationCitation';
import { ContributorsEditorField } from 'modules/SharedComponents/ContributorsEditor';
import { NtroFields } from 'modules/SharedComponents/Toolbox/NtroFields';

import { validation, pathConfig } from 'config';
import { default as pagesLocale } from '../locale';
import { default as formsLocale } from 'locale/forms';
import { default as viewRecordLocale } from 'locale/viewRecord';
import { default as alertLocale } from 'locale/publicationForm';

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
    theme => ({
        GridType: {
            paddingBottom: 12,
            borderBottom: `1px solid ${theme.palette.secondary.light}`,
        },
        GridSubType: {
            marginTop: 12,
            paddingBottom: 12,
            borderBottom: `1px solid ${theme.palette.secondary.light}`,
        },
    }),
    { withTheme: true },
);

export const MyIncompleteRecord = props => {
    const {
        submitSucceeded,
        dirty,
        submitting,
        handleSubmit,
        disableSubmit,
        recordToFix,
        isNtro,
        ntroFieldProps,
        isAuthorLinked,
        hasAnyFiles,
        publicationToFixFileUploadingError,
        disableDeleteAllGrants,
        history,
    } = props;
    const classes = useStyles();

    const [isOpen, showConfirmation, hideConfirmation] = useConfirmationState();

    const txt = pagesLocale;

    /* istanbul ignore next */
    useEffect(() => {
        if (submitSucceeded) showConfirmation();
    }, [showConfirmation, submitSucceeded]);

    // if author is not linked to this record, abandon form
    if (!isAuthorLinked) {
        history.go(-1);
        return <div id="author-not-linked" />;
    }

    const txtFixForm = formsLocale.forms.fixPublicationForm;
    const authors = txt.fields.authors;

    const alertProps = validation.getErrorAlertProps({
        ...props,
        alertLocale: {
            ...alertLocale,
            progressAlert: txt.progressAlert,
            successAlert: txt.successAlert,
        },
    });

    // set confirmation message depending on file upload status
    const saveConfirmationLocale = { ...txt.successWorkflowConfirmation };
    saveConfirmationLocale.confirmationMessage = (
        <React.Fragment>
            {publicationToFixFileUploadingError && <Alert {...saveConfirmationLocale.fileFailConfirmationAlert} />}
            {saveConfirmationLocale.confirmationMessage}
        </React.Fragment>
    );

    const _navigateToMyIncomplete = () => {
        history.push(pathConfig.records.incomplete);
    };

    const _navigateToDashboard = () => {
        history.push(pathConfig.dashboard);
    };

    const _cancelFix = () => {
        history.push(pathConfig.records.incomplete);
    };

    const _handleDefaultSubmit = event => {
        !!event && event.preventDefault();
    };

    return (
        <StandardPage title={txt.title} help={txt.help}>
            <PublicationCitation publication={recordToFix} hideContentIndicators citationStyle={'list'} />
            <ConfirmDiscardFormChanges dirty={dirty} submitSucceeded={submitSucceeded}>
                <form onSubmit={_handleDefaultSubmit}>
                    <NavigationDialogBox when={dirty && !submitSucceeded} txt={txtFixForm.cancelWorkflowConfirmation} />
                    <ConfirmationBox
                        confirmationBoxId="submit-succeeded"
                        onAction={_navigateToDashboard}
                        onClose={hideConfirmation}
                        onCancelAction={_navigateToMyIncomplete}
                        isOpen={isOpen}
                        locale={saveConfirmationLocale}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Alert title={txt.prompt.title} message={txt.prompt.message} type={txt.prompt.type} />
                        </Grid>
                        <Grid item xs={12}>
                            <StandardCard title={viewRecordLocale.viewRecord.sections.publicationDetails}>
                                <Grid container className={classes.GridType}>
                                    {!!recordToFix && !!recordToFix.rek_display_type_lookup && (
                                        <Grid container alignItems="flex-start">
                                            <Grid item xs={12} sm={3}>
                                                <Typography>
                                                    {
                                                        viewRecordLocale.viewRecord.headings.default.publicationDetails
                                                            .rek_display_type
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Typography>{recordToFix.rek_display_type_lookup}</Typography>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid container className={classes.GridSubType}>
                                    {!!recordToFix && !!recordToFix.rek_subtype && (
                                        <Grid container alignItems="flex-start">
                                            <Grid item xs={12} sm={3}>
                                                <Typography>
                                                    {
                                                        viewRecordLocale.viewRecord.headings.default.publicationDetails
                                                            .rek_subtype
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Typography>{recordToFix.rek_subtype}</Typography>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </StandardCard>
                        </Grid>
                        {isNtro && (
                            <NtroFields
                                submitting={submitting}
                                hideIsmn
                                hideIsrc
                                hideVolume
                                hideIssue
                                hideStartPage
                                hideEndPage
                                hideOriginalFormat
                                hideSeries
                                disableDeleteAllGrants={disableDeleteAllGrants}
                                {...ntroFieldProps}
                            />
                        )}
                        <Grid item xs={12}>
                            <StandardCard title={authors.title} help={authors.help}>
                                <Typography>{authors.description}</Typography>
                                <Field
                                    component={ContributorsEditorField}
                                    contributorEditorId="rek-author"
                                    editMode
                                    canEdit
                                    hideDelete
                                    hideReorder
                                    isNtro
                                    locale={txt.fields.authors.field}
                                    name="authorsAffiliation"
                                    required
                                    showContributorAssignment
                                />
                            </StandardCard>
                        </Grid>

                        <Grid item xs={12}>
                            <StandardCard title={txt.fields.notes.title}>
                                <Field
                                    component={TextField}
                                    disabled={submitting}
                                    fullWidth
                                    label={txt.fields.notes.label}
                                    multiline
                                    name="comments"
                                    placeholder={txt.fields.notes.placeholder}
                                    rows={5}
                                    style={{ marginTop: -24 }}
                                    textFieldId="comments"
                                    type="text"
                                />
                            </StandardCard>
                        </Grid>
                        {!hasAnyFiles && (
                            <Grid item xs={12}>
                                <StandardCard title={txt.fields.fileUpload.title}>
                                    <Field
                                        name="files"
                                        component={FileUploadField}
                                        disabled={submitting}
                                        requireOpenAccessStatus
                                        validate={[validation.fileUploadRequired, validation.validFileUpload]}
                                        isNtro
                                        {...txt.fields.fileUpload}
                                    />
                                </StandardCard>
                            </Grid>
                        )}
                        {alertProps && (
                            <Grid item xs={12}>
                                <Alert pushToTop {...alertProps} />
                            </Grid>
                        )}
                    </Grid>
                    <Grid container spacing={3}>
                        <Hidden smDown>
                            <Grid item xs />
                        </Hidden>
                        <Grid item xs={12} md="auto">
                            <Button
                                id="cancel-fix-work"
                                variant="contained"
                                fullWidth
                                children={txt.cancelButtonLabel}
                                disabled={submitting}
                                onClick={_cancelFix}
                            />
                        </Grid>
                        <Grid item xs={12} md="auto">
                            <Button
                                id="update-my-work"
                                variant="contained"
                                color="primary"
                                fullWidth
                                children={txt.submitButtonLabel}
                                onClick={handleSubmit}
                                disabled={submitting || disableSubmit}
                            />
                        </Grid>
                    </Grid>
                </form>
            </ConfirmDiscardFormChanges>
        </StandardPage>
    );
};

MyIncompleteRecord.propTypes = {
    ...propTypes,
    submitSucceeded: PropTypes.bool,
    dirty: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,

    disableSubmit: PropTypes.bool,

    recordToFix: PropTypes.object,
    isNtro: PropTypes.bool,
    ntroFieldProps: PropTypes.object,
    isAuthorLinked: PropTypes.bool,
    hasAnyFiles: PropTypes.bool,

    publicationToFixFileUploadingError: PropTypes.bool,
    disableDeleteAllGrants: PropTypes.bool,
};

export default React.memo(MyIncompleteRecord);
