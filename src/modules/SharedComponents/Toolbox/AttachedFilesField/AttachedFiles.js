import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import viewRecordLocale from 'locale/viewRecord';
import { StandardCard } from 'modules/SharedComponents/Toolbox/StandardCard';
import { Alert } from 'modules/SharedComponents/Toolbox/Alert';
import { makeStyles } from '@material-ui/styles';
import { useRecordContext } from 'context';
import { useIsAdmin, useIsAuthor } from 'hooks';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import VolumeUp from '@material-ui/icons/VolumeUp';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import Image from '@material-ui/icons/Image';
import Videocam from '@material-ui/icons/Videocam';
import { openAccessConfig, viewRecordsConfig, routes } from 'config';
import { isFileValid } from 'config/validation';
import MediaPreview from 'modules/ViewRecord/components/MediaPreview';
import FileName from 'modules/ViewRecord/components/partials/FileName';
import Thumbnail from 'modules/ViewRecord/components/partials/Thumbnail';
import OpenAccessIcon from 'modules/SharedComponents/Partials/OpenAccessIcon';
import FileUploadEmbargoDate from '../FileUploader/components/FileUploadEmbargoDate';

const useStyles = makeStyles(
    theme => ({
        header: {
            borderBottom: `1px solid ${theme.palette.secondary.light}`,
        },
        dataWrapper: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        fileIcon: {
            opacity: 0.5,
        },
        thumbIconCentered: {
            textAlign: 'center',
        },
    }),
    { withTheme: true },
);

const initialPreviewState = {
    fileName: null,
    mediaUrl: null,
    previewMediaUrl: null,
    mimeType: null,
    webMediaUrl: null,
};

export const usePreview = initialPreviewState => {
    const [preview, setPreview] = useState(initialPreviewState);

    const showPreview = (...args) => {
        setPreview({ ...args });
    };

    const hidePreview = () => {
        setPreview(initialPreviewState);
    };

    return [preview, showPreview, hidePreview];
};

const getUrl = (pid, fileName) => fileName && routes.pathConfig.file.url(pid, fileName);

const formatBytes = bytes => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const decimals = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const index = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, index)).toFixed(decimals)) + ' ' + sizes[index];
};

const getSecurityAccess = () => {
    // const { isAdmin, isAuthor } = this.props;
    return true; // !!(dataStream.dsi_security_policy > 1 || isAdmin || isAuthor);
};

const getFileOpenAccessStatus = (publication, dataStream) => {
    const embargoDate = dataStream.dsi_embargo_date;
    const openAccessStatusId =
        (!!publication.fez_record_search_key_oa_status && publication.fez_record_search_key_oa_status.rek_oa_status) ||
        null;
    if (openAccessConfig.openAccessFiles.indexOf(openAccessStatusId) < 0) {
        return { isOpenAccess: false, embargoDate: null, openAccessStatusId: openAccessStatusId };
    } else if (embargoDate && moment(embargoDate).isAfter(moment(), 'day')) {
        return {
            isOpenAccess: false,
            embargoDate: moment(embargoDate).format('Do MMMM YYYY'),
            openAccessStatusId: openAccessStatusId,
            securityStatus: getSecurityAccess(),
        };
    }
    return { isOpenAccess: true, embargoDate: null, openAccessStatusId: openAccessStatusId };
};

const FileIcon = ({
    pid,
    mimeType,
    fileName,
    thumbnailFileName,
    previewFileName,
    allowDownload,
    webFileName,
    securityStatus,
    showPreview,
}) => {
    const classes = useStyles();
    if (allowDownload && thumbnailFileName) {
        const thumbnailProps = {
            mimeType,
            mediaUrl: getUrl(pid, fileName || fileName),
            webMediaUrl: webFileName ? getUrl(pid, webFileName) : null,
            previewMediaUrl: getUrl(pid, previewFileName || fileName),
            thumbnailMediaUrl: getUrl(pid, thumbnailFileName),
            fileName: fileName,
            thumbnailFileName,
            onClick: showPreview,
            securityStatus: securityStatus,
        };
        return <Thumbnail {...thumbnailProps} />;
    } else if (mimeType.indexOf('audio') >= 0) {
        return <VolumeUp className={classes.fileIcon} color="secondary" />;
    } else if (mimeType.indexOf('pdf') >= 0) {
        return <PictureAsPdf className={classes.fileIcon} color="secondary" />;
    } else if (mimeType.indexOf('image') >= 0) {
        return <Image className={classes.fileIcon} color="secondary" />;
    } else if (mimeType.indexOf('video') >= 0) {
        return <Videocam className={classes.fileIcon} color="secondary" />;
    } else {
        return <InsertDriveFile className={classes.fileIcon} color="secondary" />;
    }
};

const checkArrayForObjectValue = value => {
    const datastream = this.props.publication.fez_datastream_info;
    let resolvedFilename = null;
    for (let i = 0; i < datastream.length; i++) {
        if (datastream[i].dsi_dsid === value) {
            resolvedFilename = datastream[i].dsi_dsid;
        }
    }
    return resolvedFilename;
};

const untranscodedItem = filename => {
    let file = null;
    if (filename.indexOf('_xt') >= 0) {
        file = filename
            .replace('_xt', '')
            .split('.')
            .slice(0, -1)
            .join('.');
    } else {
        file = filename
            .split('.')
            .slice(0, -1)
            .join('.');
    }
    return file;
};

const checkForThumbnail = filename => {
    const file = untranscodedItem(filename);
    return (
        checkArrayForObjectValue(`thumbnail_${file}_compressed_t.jpg`) ||
        checkArrayForObjectValue(`thumbnail_${file}_t.jpg`) ||
        checkArrayForObjectValue(`thumbnail_${file}.jpg`) ||
        checkArrayForObjectValue(`${file}_t.jpg`) ||
        null
    );
};

const checkForPreview = filename => {
    const file = untranscodedItem(filename);
    return (
        checkArrayForObjectValue(`preview_${file}_compressed_t.jpg`) ||
        checkArrayForObjectValue(`preview_${file}_t.jpg`) ||
        checkArrayForObjectValue(`preview_${file}.jpg`) ||
        checkArrayForObjectValue(`${file}_t.jpg`) ||
        checkArrayForObjectValue(`preview_${file}_compressed_t.mp4`) ||
        checkArrayForObjectValue(`preview_${file}_t.mp4`) ||
        checkArrayForObjectValue(`${file}_t.mp4`) ||
        checkArrayForObjectValue(`preview_${file}_compressed_t.mp3`) ||
        checkArrayForObjectValue(`preview_${file}_t.mp3`) ||
        checkArrayForObjectValue(`${file}_t.mp3`) ||
        null
    );
};

const checkForWeb = filename => {
    const file = untranscodedItem(filename);
    return (
        checkArrayForObjectValue(`web_${file}_compressed_t.jpg`) ||
        checkArrayForObjectValue(`web_${file}_t.jpg`) ||
        checkArrayForObjectValue(`web_${file}.jpg`) ||
        checkArrayForObjectValue(`web_${file}_compressed_t.mp4`) ||
        checkArrayForObjectValue(`web_${file}_t.mp4`) ||
        checkArrayForObjectValue(`web_${file}_compressed_t.mp3`) ||
        checkArrayForObjectValue(`web_${file}_t.mp3`) ||
        null
    );
};

const getFileData = (publication, dataStreams, isAdmin, isAuthor) => {
    return !!dataStreams && dataStreams.length > 0
        ? dataStreams.filter(isFileValid(viewRecordsConfig, isAdmin)).map(dataStream => {
            const pid = dataStream.dsi_pid;
            const fileName = dataStream.dsi_dsid;
            const mimeType = dataStream.dsi_mimetype ? dataStream.dsi_mimetype : '';

            const thumbnailFileName = checkForThumbnail(fileName);
            const previewFileName = checkForPreview(fileName);
            const webFileName = checkForWeb(fileName);

            const openAccessStatus = getFileOpenAccessStatus(publication, dataStream);
            const securityAccess = getSecurityAccess(dataStream);

            return {
                pid,
                fileName,
                description: dataStream.dsi_label,
                mimeType,
                thumbnailFileName,
                calculatedSize: formatBytes(dataStream.dsi_size),
                allowDownload: openAccessStatus.isOpenAccess || !openAccessStatus.embargoDate,
                iconProps: {
                    pid,
                    mimeType,
                    fileName,
                    thumbnailFileName,
                    previewFileName,
                    allowDownload: openAccessStatus.isOpenAccess || isAuthor || isAdmin,
                    webFileName,
                    securityAccess,
                },
                openAccessStatus,
                previewMediaUrl: previewFileName ? getUrl(pid, previewFileName) : getUrl(pid, fileName),
                webMediaUrl: webFileName ? getUrl(pid, webFileName) : null,
                mediaUrl: getUrl(pid, fileName),
                securityStatus: getSecurityAccess(dataStream),
                embargoDate: dataStream.dsi_embargo_date,
            };
        })
        : [];
};

export const AttachedFiles = ({
    dataStreams,
    hideCulturalSensitivityStatement,
    setHideCulturalSensitivityStatement,
    disabled,
    deleteHint,
    onDelete,
    onDateChange,
    locale,
    canEdit,
}) => {
    const classes = useStyles();
    const [preview, showPreview, hidePreview] = usePreview(initialPreviewState);
    const { record } = useRecordContext();
    const isAdmin = useIsAdmin();
    const isAuthor = useIsAuthor();

    const isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const fileData = getFileData(record, dataStreams, isAdmin, isAuthor);
    if (fileData.length === 0) return null;
    let hasVideo = false;
    fileData.map(item => {
        if (item.mimeType.indexOf('video') > -1) {
            hasVideo = true;
        }
    });
    const onFileDelete = index => () => onDelete(index);
    const onEmbargoDateChange = index => value => onDateChange(value, index);

    return (
        <Grid item xs={12}>
            <StandardCard title={locale.title}>
                {!!record.fez_record_search_key_advisory_statement && !hideCulturalSensitivityStatement && (
                    <Alert
                        allowDismiss
                        type="info"
                        message={
                            record.fez_record_search_key_advisory_statement.rek_advisory_statement ||
                            locale.culturalSensitivityStatement
                        }
                        dismissAction={setHideCulturalSensitivityStatement}
                    />
                )}
                {isFireFox && hasVideo && <Alert allowDismiss {...viewRecordLocale.viewRecord.fireFoxAlert} />}
                <div style={{ padding: 8 }}>
                    <Grid container direction="row" alignItems="center" spacing={16} className={classes.header}>
                        <Grid item xs={1}>
                            &nbsp;
                        </Grid>
                        <Grid item sm={3}>
                            <Typography variant="caption" gutterBottom>
                                {locale.fileName}
                            </Typography>
                        </Grid>
                        <Hidden xsDown>
                            <Grid item sm={3}>
                                <Typography variant="caption" gutterBottom>
                                    {locale.description}
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item md={2}>
                                <Typography variant="caption" gutterBottom>
                                    {locale.size}
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Hidden xsDown>
                            <Grid item sm />
                        </Hidden>
                        {isAdmin && canEdit && (
                            <React.Fragment>
                                <Grid item xs={2}>
                                    <Typography variant="caption" gutterBottom>
                                        {locale.embargoDateLabel || 'Embargo date'}
                                    </Typography>
                                </Grid>
                                <Grid item xs />
                            </React.Fragment>
                        )}
                    </Grid>
                </div>
                {fileData.map((item, index) => (
                    <div style={{ padding: 8 }} key={index}>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            key={`file-${index}`}
                            spacing={16}
                            wrap={'nowrap'}
                            className={classes.header}
                        >
                            <Grid item xs={1} className={classes.thumbIconCentered}>
                                <FileIcon {...item.iconProps} showPreview={showPreview} />
                            </Grid>
                            <Grid item sm={3} className={classes.dataWrapper}>
                                <FileName {...item} onFileSelect={showPreview} />
                            </Grid>
                            <Hidden xsDown>
                                <Grid item sm={3} className={classes.dataWrapper}>
                                    <Typography variant="body2" noWrap>
                                        {item.description}
                                    </Typography>
                                </Grid>
                            </Hidden>
                            <Hidden smDown>
                                <Grid item sm={2} className={classes.dataWrapper}>
                                    <Typography variant="body2" noWrap>
                                        {item.calculatedSize}
                                    </Typography>
                                </Grid>
                            </Hidden>
                            <Hidden xsDown>
                                <Grid item sm style={{ textAlign: 'right' }}>
                                    <OpenAccessIcon {...item.openAccessStatus} securityStatus={item.securityStatus} />
                                </Grid>
                            </Hidden>
                            {isAdmin && canEdit && (
                                <React.Fragment>
                                    <Grid item xs={2}>
                                        {!!item.openAccessStatus.embargoDate && (
                                            <FileUploadEmbargoDate
                                                value={new Date(item.embargoDate)}
                                                onChange={onEmbargoDateChange(index)}
                                                disabled={disabled}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs style={{ textAlign: 'right' }}>
                                        <Tooltip title={deleteHint}>
                                            <IconButton onClick={onFileDelete(index)} disabled={disabled}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </React.Fragment>
                            )}
                        </Grid>
                    </div>
                ))}
                {preview.mediaUrl && preview.mimeType && <MediaPreview {...preview} onClose={hidePreview} />}
            </StandardCard>
        </Grid>
    );
};

AttachedFiles.propTypes = {
    dataStreams: PropTypes.array.isRequired,
    hideCulturalSensitivityStatement: PropTypes.bool,
    setHideCulturalSensitivityStatement: PropTypes.func,
    disabled: PropTypes.bool,
    deleteHint: PropTypes.string,
    onDelete: PropTypes.func,
    onDateChange: PropTypes.func,
    locale: PropTypes.object,
    canEdit: PropTypes.bool,
};

AttachedFiles.defaultProps = {
    deleteHint: 'Remove this file',
    canEdit: false,
};
const Files = props => <AttachedFiles {...props} />;
export default Files;
