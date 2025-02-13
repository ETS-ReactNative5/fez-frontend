import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useSelector } from 'react-redux';
import { getFormSyncErrors, getFormAsyncErrors, reduxForm, getFormValues } from 'redux-form/immutable';
import debounce from 'debounce-promise';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';

import { ScrollToSection } from 'modules/SharedComponents/Toolbox/ScrollToSection';
import ColumnData from './ColumnData';
import NameData from './NameData';
import LeastAuthorData from './LeastAuthorData';
import UsernameIdData from './UsernameIdData';
import ResearcherIdentifierData from './ResearcherIdentifierData';
import NotesData from './NotesData';

import { ConfirmationBox } from 'modules/SharedComponents/Toolbox/ConfirmDialogBox';
import { useConfirmationState } from 'hooks';
import { default as locale } from 'locale/components';
import { FORM_NAME, DEBOUNCE_VALUE } from './manageAuthorConfig';
import { checkForExisting } from '../helpers';

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.secondary.light,
        padding: theme.spacing(2),
    },
}));

export const FullAuthorDetails = ({
    disabled,
    data: rowData,
    mode,
    onEditingApproved,
    onEditingCanceled,
    submitting,
}) => {
    const classes = useStyles();
    const [isOpen, showConfirmation, hideConfirmation] = useConfirmationState();
    const formValues = useSelector(state => getFormValues(FORM_NAME)(state));
    const formErrors = useSelector(state => getFormSyncErrors(FORM_NAME)(state));
    const asyncFormErrors = useSelector(state => getFormAsyncErrors(FORM_NAME)(state));

    const disableSubmit =
        (!!formErrors && !(formErrors instanceof Immutable.Map) && Object.keys(formErrors).length > 0) ||
        (!!asyncFormErrors &&
            asyncFormErrors instanceof Immutable.Map &&
            Object.keys(asyncFormErrors.toJS()).length > 0);

    const {
        form: { deleteConfirmationLocale, editButton, cancelButton, addButton },
    } = locale.components.manageAuthors;

    const handleSave = () => onEditingApproved(mode, formValues.toJS(), rowData);
    const handleDelete = () => onEditingApproved(mode, rowData, rowData);
    const handleCancel = () => onEditingCanceled(mode, rowData);
    const handleKeyPress = e => e.key === 'Escape' && onEditingCanceled(mode, rowData);

    const handleCancelDelete = () => {
        handleCancel();
        hideConfirmation();
    };

    React.useEffect(() => {
        if (mode === 'delete') {
            showConfirmation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    return (
        <React.Fragment>
            {(mode === 'update' || mode === 'add') && (
                <TableRow onKeyDown={handleKeyPress} id="author-edit-row" data-testid="author-edit-row">
                    <TableCell colSpan={4}>
                        <ScrollToSection scrollToSection>
                            <form>
                                <div className={classes.background}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <NameData />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <UsernameIdData />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ResearcherIdentifierData />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <NotesData />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid
                                                container
                                                direction="row-reverse"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <Grid item>
                                                    <Button
                                                        id={`authors-${mode}-this-author-save`}
                                                        data-testid={`authors-${mode}-this-author-save`}
                                                        disabled={disableSubmit || submitting || disabled}
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleSave}
                                                    >
                                                        {mode === 'update' ? editButton : addButton}
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        id={`authors-${mode}-this-author-cancel`}
                                                        data-testid={`authors-${mode}-this-author-cancel`}
                                                        disabled={disabled}
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={handleCancel}
                                                    >
                                                        {cancelButton}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </form>
                        </ScrollToSection>
                    </TableCell>
                </TableRow>
            )}
            {mode === 'delete' && (
                <TableRow
                    onKeyDown={handleKeyPress}
                    id="author-delete-row"
                    data-testid="author-delete-row"
                    className={classes.background}
                >
                    <ConfirmationBox
                        confirmationBoxId="authors-delete-this-author-confirmation"
                        onAction={handleDelete}
                        onClose={handleCancelDelete}
                        isOpen={isOpen}
                        locale={deleteConfirmationLocale}
                    />
                    <TableCell>
                        <Checkbox disabled size="small" />
                    </TableCell>
                    <TableCell>
                        <ColumnData data={rowData.aut_id} columnDataId={`aut-id-${rowData.tableData.id}`} />
                    </TableCell>
                    <TableCell colSpan={3}>
                        <LeastAuthorData rowData={rowData} />
                    </TableCell>
                </TableRow>
            )}
        </React.Fragment>
    );
};

FullAuthorDetails.propTypes = {
    data: PropTypes.object,
    disabled: PropTypes.bool,
    mode: PropTypes.string,
    onEditingApproved: PropTypes.func,
    onEditingCanceled: PropTypes.func,
    submitting: PropTypes.bool,
};

const FullAuthorDetailsReduxForm = reduxForm({
    form: FORM_NAME,
    asyncValidate: debounce(checkForExisting, DEBOUNCE_VALUE),
    asyncChangeFields: ['aut_org_username', 'aut_org_staff_id', 'aut_student_username', 'aut_org_student_id'],
})(FullAuthorDetails);

export default React.memo(FullAuthorDetailsReduxForm);
