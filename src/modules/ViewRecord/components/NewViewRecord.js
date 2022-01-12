/* eslint-disable camelcase */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Alert } from 'modules/SharedComponents/Toolbox/Alert';
import { InlineLoader } from 'modules/SharedComponents/Toolbox/Loaders';
import { PublicationCitation } from 'modules/SharedComponents/PublicationCitation';
import { SocialShare } from 'modules/SharedComponents/SocialShare';
import { StandardPage } from 'modules/SharedComponents/Toolbox/StandardPage';

import AdditionalInformation from './AdditionalInformation';
import AvailableVersions from './AvailableVersions';
import Files from './Files';
import GrantInformation from './GrantInformation';
import Links from './Links';
import NtroDetails from './NtroDetails';
import PublicationDetails from './PublicationDetails';
import RelatedPublications from './RelatedPublications';

import { userIsAdmin, userIsAuthor } from 'hooks';
import { general, AUTH_URL_LOGIN } from 'config';
import locale from 'locale/pages';
import globalLocale from 'locale/global';
import * as actions from 'actions';
import clsx from 'clsx';
// import Badge from '@material-ui/core/Badge';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { makeStyles } from '@material-ui/core/styles';
import AdminViewRecordDrawer from './AdminRecordDrawer';
import { Button } from '@material-ui/core';

export function redirectUserToLogin() {
    window.location.assign(`${AUTH_URL_LOGIN}?url=${window.btoa(window.location.href)}`);
}
const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
    },
    contentShift: {
        [theme.breakpoints.up('sm')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: drawerWidth,
        },
    },
    alignVerticalAxisCentre: {
        display: 'flex',
        alignItems: 'center',
    },
    cursor: {
        cursor: 'pointer',
    },
}));

export const NewViewRecord = ({
    account,
    author,
    hideCulturalSensitivityStatement,
    isDeleted,
    loadingRecordToView,
    recordToViewError,
    recordToView,
}) => {
    const dispatch = useDispatch();
    const { pid } = useParams();
    const isAdmin = userIsAdmin();
    const isAuthor = userIsAuthor();

    const txt = locale.pages.viewRecord;
    const isNtro = recordToView && !!general.NTRO_SUBTYPES.includes(recordToView.rek_subtype);

    const handleSetHideCulturalSensitivityStatement = React.useCallback(
        () => dispatch(actions.setHideCulturalSensitivityStatement()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleMobileDrawerToggle = () => {
        console.log('handleMobileDrawerToggle');
        setMobileOpen(!mobileOpen);
    };
    const handleDesktopDrawerToggle = () => {
        console.log('handleDesktopDrawerToggle', open);
        setOpen(!open);
    };
    const handleDrawerToggle = () => {
        console.log('handleDrawerToggle');
        if (window.matchMedia('(max-width:599.96px)').matches) {
            console.log('matchMedia');
            handleMobileDrawerToggle();
        } else {
            console.log('not matchMedia');
            handleDesktopDrawerToggle();
        }
    };
    // const recordTitle = () => {
    // const titleText = ReactHtmlParser(recordToView.rek_title);
    /*    if (isAdmin && !isDeleted) {
            // eslint-disable-next-line camelcase
            const TitleIcon = () => {
                // eslint-disable-next-line camelcase
                return recordToView?.fez_internal_notes?.ain_detail ? (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <Badge
                        onClick={handleDrawerToggle}
                        color="error"
                        overlap="circle"
                        badgeContent="&hellip;"
                        variant="standard"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <DescriptionOutlinedIcon fontSize="inherit" />
                    </Badge>
                ) : (
                    <DescriptionOutlinedIcon
                        fontSize="inherit"
                        onClick={handleDrawerToggle}
                        className={classes.cursor}
                    />
                );
            };
            return (
                <>
                    {titleText}
                    <TitleIcon />
                </>
            );
        } else {
            return titleText;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    */

    React.useEffect(() => {
        !!pid && dispatch(actions.loadRecordToView(pid));

        return () => dispatch(actions.clearRecordToView());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid]);

    const formattedDocTypeString = (type, lookup) => {
        if (!!!type && !!!lookup) return '-';
        return `${type ?? ''}${type && lookup ? ' - ' : ''}${lookup ?? ''}`;
    };

    const drawerDescriptor = {
        sections: [
            [
                {
                    type: 'header',
                    value: txt.drawer.sectionTitles.notes,
                },
                {
                    type: 'content',
                    scrollable: true,
                    value: ReactHtmlParser(recordToView?.fez_internal_notes?.ain_detail),
                },
            ],
            {
                type: 'divider',
            },
            [
                {
                    type: 'header',
                    value: txt.drawer.sectionTitles.authorAffiliations,
                },
                {
                    type: 'content',
                    value: recordToView?.fez_record_search_key_author_affiliation_name?.length > 0 ? 'Yes' : 'No',
                },
            ],
            {
                type: 'divider',
            },
            [
                {
                    type: 'header',
                    value: txt.drawer.sectionTitles.wosId,
                },
                {
                    type: 'content',
                    value: recordToView?.fez_record_search_key_isi_loc?.rek_isi_loc,
                    clipboard: true,
                },
                {
                    type: 'header',
                    value: txt.drawer.sectionTitles.wosDocType,
                },
                {
                    type: 'content',
                    value: formattedDocTypeString(
                        recordToView?.rek_work_doc_type,
                        recordToView?.rek_wok_doc_type_lookup,
                    ),
                },
            ],
            {
                type: 'divider',
            },
            {
                type: 'header',
                value: txt.drawer.sectionTitles.scopusId,
            },
            [
                {
                    type: 'content',
                    value: recordToView?.fez_record_search_key_scopus_id?.rek_scopus_id,
                    clipboard: true,
                },
                {
                    type: 'header',
                    value: txt.drawer.sectionTitles.scopusDocType,
                },
                {
                    type: 'content',
                    value: formattedDocTypeString(
                        recordToView?.rek_scopus_doc_type,
                        recordToView?.rek_scopus_doc_type_lookup,
                    ),
                },
            ],
            {
                type: 'divider',
            },
            [
                {
                    type: 'header',
                    value: txt.drawer.sectionTitles.pubmedId,
                },
                {
                    type: 'content',
                    value: recordToView?.fez_record_search_key_pubmed_id?.rek_pubmed_id,
                    clipboard: true,
                },
                {
                    type: 'header',
                    value: txt.drawer.sectionTitles.pubmedCentralId,
                },
                {
                    type: 'content',
                    value: recordToView?.fez_record_search_key_pubmed_central_id?.rek_pubmed_central_id,
                    clipboard: true,
                },
                {
                    type: 'header',
                    value: txt.drawer.sectionTitles.pubmedDocType,
                },
                {
                    type: 'content',
                    value: formattedDocTypeString(
                        recordToView?.rek_pubmed_doc_type,
                        recordToView?.rek_pubmed_doc_type_lookup,
                    ),
                },
            ],
        ],
    };

    if (loadingRecordToView) {
        return <InlineLoader message={txt.loadingMessage} />;
    } else if (recordToViewError && recordToViewError.status === 404) {
        return (
            <StandardPage className="viewRecord" title={locale.pages.viewRecord.notFound.title}>
                <Grid container style={{ marginTop: -24 }}>
                    <Grid item xs={12}>
                        {locale.pages.viewRecord.notFound.message}
                    </Grid>
                </Grid>
                {recordToViewError && (
                    <Typography variant={'caption'} style={{ opacity: 0.5 }}>
                        {`(${recordToViewError.status} - ${recordToViewError.message})`}
                    </Typography>
                )}
            </StandardPage>
        );
    } else if (recordToViewError && recordToViewError.status === 403) {
        return (
            <StandardPage>
                <Alert {...globalLocale.global.loginAlert} action={redirectUserToLogin} />
            </StandardPage>
        );
    } else if (!recordToView || !recordToView.rek_pid) {
        return <div className="empty" />;
    }

    return (
        <div
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
        >
            <StandardPage
                className="viewRecord"
                title={ReactHtmlParser(recordToView.rek_title)}
                style={{ display: 'flex' }}
            >
                {!isDeleted && !!recordToView && (
                    <AdminViewRecordDrawer
                        content={drawerDescriptor}
                        handleDrawerToggle={handleDrawerToggle}
                        open={open}
                        mobileOpen={mobileOpen}
                    />
                )}
                <Grid container style={{ marginTop: -24 }}>
                    <Grid item xs={12}>
                        <PublicationCitation
                            publication={recordToView}
                            hideTitle
                            hideContentIndicators
                            showAdminActions={isAdmin}
                            isPublicationDeleted={isDeleted}
                            citationStyle={'header'}
                        />
                    </Grid>
                    {!isDeleted && !!recordToView && (
                        <Grid item xs={12}>
                            <Grid container spacing={2} style={{ marginBottom: 4 }}>
                                {isAdmin && !isDeleted && (
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            startIcon={<DescriptionOutlinedIcon />}
                                            color="default"
                                            onClick={handleDrawerToggle}
                                        >
                                            {`View ${
                                                recordToView?.fez_internal_notes?.ain_detail ? 'Notes \u0026' : ''
                                            } Record Data`}
                                        </Button>
                                    </Grid>
                                )}
                                <Grid item xs className={classes.alignVerticalAxisCentre}>
                                    {isAdmin && recordToView.rek_status !== general.PUBLISHED && (
                                        <Chip label={recordToView.rek_status_lookup} variant="outlined" />
                                    )}
                                </Grid>
                                <Grid item className={classes.alignVerticalAxisCentre}>
                                    <SocialShare
                                        publication={recordToView}
                                        services={[
                                            'facebook',
                                            'twitter',
                                            'linkedin',
                                            'researchgate',
                                            'mendeley',
                                            'email',
                                            'print',
                                        ]}
                                        spaceBetween={4}
                                        round
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                {isDeleted && (
                    <Grid item xs={12} style={{ marginBottom: 24 }}>
                        <Alert {...txt.deletedAlert} />
                    </Grid>
                )}
                <Grid container spacing={3}>
                    {!isDeleted && (
                        <React.Fragment>
                            <Files
                                author={author}
                                account={account}
                                publication={recordToView}
                                hideCulturalSensitivityStatement={hideCulturalSensitivityStatement}
                                setHideCulturalSensitivityStatement={handleSetHideCulturalSensitivityStatement}
                                isAdmin={!!isAdmin}
                                isAuthor={!!isAuthor}
                            />
                            <Links publication={recordToView} />
                            <RelatedPublications publication={recordToView} />
                            <AdditionalInformation publication={recordToView} account={account} isNtro={isNtro} />
                            {isNtro && <NtroDetails publication={recordToView} account={account} />}
                            <GrantInformation publication={recordToView} />
                        </React.Fragment>
                    )}
                    <PublicationDetails publication={recordToView} />
                    {!isDeleted && <AvailableVersions publication={recordToView} />}
                </Grid>
            </StandardPage>
        </div>
    );
};

NewViewRecord.propTypes = {
    account: PropTypes.object,
    author: PropTypes.object,
    hideCulturalSensitivityStatement: PropTypes.bool,
    isDeleted: PropTypes.bool,
    loadingRecordToView: PropTypes.bool,
    recordToView: PropTypes.object,
    recordToViewError: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default React.memo(
    NewViewRecord,
    (prevProps, nextProps) => prevProps.loadingRecordToView === nextProps.loadingRecordToView,
);
