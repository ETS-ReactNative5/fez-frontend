import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Field } from 'redux-form/immutable';
import ReactHtmlParser from 'react-html-parser';
import queryString from 'query-string';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { Alert } from 'modules/SharedComponents/Toolbox/Alert';
import { ConfirmDialogBox } from 'modules/SharedComponents/Toolbox/ConfirmDialogBox';
import { ConfirmDiscardFormChanges } from 'modules/SharedComponents/ConfirmDiscardFormChanges';
import { StandardPage } from 'modules/SharedComponents/Toolbox/StandardPage';
import { StandardCard } from 'modules/SharedComponents/Toolbox/StandardCard';
import * as recordForms from 'modules/SharedComponents/PublicationForm/components/Forms';

import FormViewToggler from './FormViewToggler';
import TabContainer from './TabContainer';
import LockedAlert from './LockedAlert';
import { FORM_NAME } from '../constants';
import { onSubmit } from '../submitHandler';

import { useRecordContext, useTabbedContext } from 'context';
import pageLocale from 'locale/pages';
import { pathConfig, publicationTypes, validation } from 'config';
import { PUBLISHED, RECORD_TYPE_RECORD, RETRACTED, UNPUBLISHED } from 'config/general';
import { adminInterfaceConfig } from 'config/admin';
import { useIsUserSuperAdmin } from 'hooks';
import { translateFormErrorsToText } from '../../../config/validation';

const AdminTab = withStyles({
    root: {
        minWidth: 84,
    },
})(Tab);

export const getQueryStringValue = (location, varName, initialValue) => {
    const queryStringObject = queryString.parse(
        location && ((location.hash && location.hash.replace('?', '&').replace('#', '?')) || location.search),
        { ignoreQueryPrefix: true },
    );
    return (queryStringObject && queryStringObject[varName]) || initialValue;
};

export const navigateToSearchResult = (createMode, authorDetails, history, location) => {
    if (createMode) {
        history.push(pathConfig.admin.add);
    }
    const navigatedFrom = getQueryStringValue(location, 'navigatedFrom', null);
    if (
        authorDetails &&
        (authorDetails.is_administrator === 1 || authorDetails.is_super_administrator === 1) &&
        !!navigatedFrom
    ) {
        history.push(decodeURIComponent(navigatedFrom));
    } else {
        history.push(pathConfig.records.mine);
    }
};

const getActiveTabs = tabs => Object.keys(tabs).filter(tab => tabs[tab].activated);

export const AdminInterface = ({
    authorDetails,
    classes,
    createMode,
    isDeleted,
    isJobCreated,
    destroy,
    dirty,
    disableSubmit,
    formErrors,
    handleSubmit,
    history,
    location,
    locked,
    submitSucceeded,
    submitting,
    tabs,
    unlockRecord,
    error,
}) => {
    const { record } = useRecordContext();
    const { tabbed, toggleTabbed } = useTabbedContext();
    const isSuperAdmin = useIsUserSuperAdmin();
    const objectType = ((record || {}).rek_object_type_lookup || '').toLowerCase();
    const defaultTab = objectType === RECORD_TYPE_RECORD ? 'bibliographic' : 'security';
    const [currentTabValue, setCurrentTabValue] = React.useState(getQueryStringValue(location, 'tab', defaultTab));

    const activeTabNames = React.useRef(getActiveTabs(tabs));
    const successConfirmationRef = React.useRef();
    const alertProps = React.useRef(null);
    const txt = React.useRef(pageLocale.pages.edit);

    const errorMessage = error && typeof error === 'object' ? ' ' : null;
    alertProps.current = validation.getErrorAlertProps({
        submitting,
        submitSucceeded,
        formErrors,
        alertLocale: txt.current.alerts,
        // prioritise form errors
        error: translateFormErrorsToText(formErrors) ? null : errorMessage,
    });

    React.useEffect(() => {
        activeTabNames.current = getActiveTabs(tabs);
    }, [tabs]);

    React.useEffect(() => {
        return () => {
            destroy(FORM_NAME);
        };
    }, [destroy]);

    React.useEffect(() => {
        Cookies.set('adminFormTabbed', tabbed ? 'tabbed' : 'fullform');
    }, [tabbed]);

    React.useEffect(() => {
        if (!submitting && submitSucceeded && successConfirmationRef.current) {
            successConfirmationRef.current.showConfirmation();
        }
    }, [submitting, submitSucceeded]);

    const handleTabChange = (event, value) => setCurrentTabValue(value);

    const keyHandler = React.useCallback(
        event => {
            if (!!event && event.ctrlKey && event.key !== 'Control') {
                ((event.key === 'ArrowUp' && !tabbed) || (event.key === 'ArrowDown' && tabbed)) && toggleTabbed();
                const activeTabIndex = activeTabNames.current.indexOf(currentTabValue);
                if (event.key === 'ArrowLeft' && activeTabIndex > 0) {
                    setCurrentTabValue(activeTabNames.current[activeTabIndex - 1]);
                }
                if (event.key === 'ArrowRight' && activeTabIndex < activeTabNames.current.length - 1) {
                    setCurrentTabValue(activeTabNames.current[activeTabIndex + 1]);
                }
            }
        },
        [tabbed, toggleTabbed, currentTabValue],
    );

    React.useEffect(() => {
        window.addEventListener('keydown', keyHandler);
        return () => window.removeEventListener('keydown', keyHandler);
    });

    const handleCancel = event => {
        event.preventDefault();
        const pushToHistory = () => history.push(pathConfig.records.view(record.rek_pid));
        if (!!record.rek_pid) {
            /* istanbul ignore next */
            record.rek_editing_user === authorDetails.username
                ? unlockRecord(record.rek_pid, pushToHistory)
                : pushToHistory();
        } else {
            // Else this is a new record, so just go to the homepage
            history.push(pathConfig.index);
        }
    };

    const setSuccessConfirmationRef = React.useCallback(node => {
        successConfirmationRef.current = node; // TODO: Add check that this worked
    }, []);

    if (!record) {
        return <div className="empty" />;
    }

    const selectedPublicationType =
        (record.rek_display_type && (publicationTypes({ ...recordForms })[record.rek_display_type] || {}).name) ||
        'record';

    if (objectType === RECORD_TYPE_RECORD && !adminInterfaceConfig[record.rek_display_type]) {
        return (
            <StandardPage>
                <Grid container>
                    <Grid item xs={12}>
                        <Alert
                            message={txt.current.notSupportedMessage.replace('[pubType]', selectedPublicationType)}
                            type="info"
                        />
                    </Grid>
                </Grid>
            </StandardPage>
        );
    }

    const navigateToViewRecord = pid => {
        if (!!pid && validation.isValidPid(pid)) {
            history.push(pathConfig.records.view(pid));
        }
    };

    const renderTabContainer = tab => (
        <TabContainer key={tab} value={tab} currentTab={currentTabValue} tabbed={tabbed}>
            <StandardCard
                standardCardId={`${txt.current.sections[tab].title.toLowerCase().replace(/ /g, '-')}-section`}
                title={txt.current.sections[tab].title}
                primaryHeader
                squareTop
                smallTitle
            >
                <Field
                    component={tabs[tab].component}
                    disabled={submitting || (locked && record.rek_editing_user !== authorDetails.username)}
                    name={`${tab}Section`}
                />
            </StandardCard>
        </TabContainer>
    );

    const saveConfirmationLocale = createMode
        ? txt.current.successAddWorkflowConfirmation
        : (!isJobCreated && txt.current.successWorkflowConfirmation) || txt.current.successJobCreatedConfirmation;

    const pageTitlePrefix = !isDeleted ? 'Edit' : 'Undelete';

    const submitButtonTxt = !isDeleted ? 'Save' : 'Undelete';

    const setPublicationStatusAndSubmit = status =>
        handleSubmit((values, dispatch, props) =>
            onSubmit(values.setIn(['publication', 'rek_status'], status), dispatch, props),
        );

    const renderButtonBar = (placement = '') => (
        <React.Fragment>
            <Grid item xs={12} sm={2}>
                <Button
                    id={`admin-work-cancel${placement}`}
                    style={{ whiteSpace: 'nowrap' }}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    children="Cancel"
                    onClick={handleCancel}
                />
            </Grid>
            {!!isSuperAdmin && record.rek_status !== RETRACTED && (
                <Grid item xs={12} sm={3}>
                    <Button
                        id={`admin-work-retract${placement}`}
                        data-testid={`retract-admin${placement}`}
                        disabled={!!submitting || !!disableSubmit}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        children="Retract"
                        onClick={setPublicationStatusAndSubmit(RETRACTED)}
                    />
                </Grid>
            )}
            {!!record.rek_pid && objectType === RECORD_TYPE_RECORD && record.rek_status !== PUBLISHED && !isDeleted && (
                <Grid item xs={12} sm={3}>
                    <Button
                        id={`admin-work-publish${placement}`}
                        data-testid={`publish-admin${placement}`}
                        disabled={
                            !!submitting ||
                            !!disableSubmit ||
                            (locked && record.rek_editing_user !== authorDetails.username)
                        }
                        variant="contained"
                        color="secondary"
                        fullWidth
                        children="Publish"
                        onClick={setPublicationStatusAndSubmit(PUBLISHED)}
                    />
                </Grid>
            )}
            {!!record.rek_pid && objectType === RECORD_TYPE_RECORD && record.rek_status === PUBLISHED && !isDeleted && (
                <Grid item xs={12} sm={3}>
                    <Button
                        id={`admin-work-unpublish${placement}`}
                        data-testid={`unpublish-admin${placement}`}
                        disabled={
                            !!submitting ||
                            !!disableSubmit ||
                            (locked && record.rek_editing_user !== authorDetails.username)
                        }
                        variant="contained"
                        color="secondary"
                        fullWidth
                        children="Unpublish"
                        onClick={setPublicationStatusAndSubmit(UNPUBLISHED)}
                    />
                </Grid>
            )}
            <Grid item xs={12} sm>
                <Button
                    id={`admin-work-submit${placement}`}
                    data-testid={`submit-admin${placement}`}
                    style={{ whiteSpace: 'nowrap' }}
                    disabled={
                        !!submitting ||
                        !!disableSubmit ||
                        (locked && record.rek_editing_user !== authorDetails.username)
                    }
                    variant="contained"
                    color="primary"
                    fullWidth
                    children={submitButtonTxt}
                    onClick={handleSubmit}
                />
            </Grid>
        </React.Fragment>
    );

    const renderSaveStatusAlert = (
        <React.Fragment>
            {alertProps.current && (
                <Grid item xs={12}>
                    <div style={{ height: 16 }} />
                    <Alert {...alertProps.current} />
                </Grid>
            )}
        </React.Fragment>
    );

    return (
        <StandardPage>
            <form>
                <Grid container spacing={0} direction="row" alignItems="center" style={{ marginTop: -24 }}>
                    <ConfirmDialogBox
                        onRef={setSuccessConfirmationRef}
                        onAction={() => navigateToSearchResult(createMode, authorDetails, history, location)}
                        locale={saveConfirmationLocale}
                        onCancelAction={() => navigateToViewRecord(record.rek_pid)}
                    />
                    <Grid item xs style={{ marginBottom: 12 }}>
                        <Typography variant="h2" color="primary" style={{ fontSize: 18, fontWeight: 400 }}>
                            {!createMode
                                ? ReactHtmlParser(
                                      `${pageTitlePrefix} ${record.rek_display_type_lookup} - ${record.rek_title}: ${record.rek_pid}`,
                                  )
                                : `Add a new ${selectedPublicationType}`}
                        </Typography>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item xs="auto">
                            <FormViewToggler />
                        </Grid>
                    </Hidden>
                    {record.rek_status === RETRACTED && (
                        <Grid
                            container
                            alignContent="center"
                            justifyContent="center"
                            alignItems="center"
                            style={{ marginBottom: 12 }}
                        >
                            <Grid item xs={12}>
                                <Alert message={txt.current.retractedMessage} type="warning" />
                            </Grid>
                        </Grid>
                    )}
                    {/* Admin lock alert */}
                    {!!locked && <LockedAlert />}
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} style={{ marginBottom: 8, marginTop: 4 }}>
                                {renderButtonBar('-top')}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Hidden xsDown>
                        <Grid container spacing={0} direction="row">
                            {tabbed && (
                                <Grid item xs={12}>
                                    <Tabs
                                        value={currentTabValue}
                                        classes={{
                                            indicator: classes.tabIndicator,
                                        }}
                                        onChange={handleTabChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                    >
                                        {activeTabNames.current.map(tab => (
                                            <AdminTab
                                                key={tab}
                                                value={tab}
                                                data-testid={`${tab}-tab`}
                                                label={
                                                    !!tabs[tab].numberOfErrors ? (
                                                        <Badge
                                                            className={classes.padding}
                                                            color="error"
                                                            badgeContent={tabs[tab].numberOfErrors}
                                                        >
                                                            {txt.current.sections[tab].title}
                                                        </Badge>
                                                    ) : (
                                                        txt.current.sections[tab].title
                                                    )
                                                }
                                            />
                                        ))}
                                    </Tabs>
                                </Grid>
                            )}
                        </Grid>
                    </Hidden>
                </Grid>
                <ConfirmDiscardFormChanges dirty={dirty} submitSucceeded={submitSucceeded}>
                    <Grid container spacing={0}>
                        {!tabbed ? activeTabNames.current.map(renderTabContainer) : renderTabContainer(currentTabValue)}
                    </Grid>
                    <Grid container spacing={1}>
                        {renderSaveStatusAlert}
                        <Grid item xs={12}>
                            <Grid container spacing={1} style={{ marginTop: 8 }}>
                                {renderButtonBar()}
                            </Grid>
                        </Grid>
                    </Grid>
                </ConfirmDiscardFormChanges>
            </form>
        </StandardPage>
    );
};

AdminInterface.propTypes = {
    authorDetails: PropTypes.object,
    classes: PropTypes.object,
    createMode: PropTypes.bool,
    isDeleted: PropTypes.bool,
    isJobCreated: PropTypes.bool,
    destroy: PropTypes.func,
    dirty: PropTypes.bool,
    disableSubmit: PropTypes.bool,
    formErrors: PropTypes.object,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    locked: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    submitting: PropTypes.bool,
    tabs: PropTypes.object,
    unlockRecord: PropTypes.func,
    error: PropTypes.object,
};

export default React.memo(AdminInterface);
