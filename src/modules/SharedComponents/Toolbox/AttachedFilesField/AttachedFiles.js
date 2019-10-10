import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import globalLocale from 'locale/global';

import viewRecordLocale from 'locale/viewRecord';
import { StandardCard } from 'modules/SharedComponents/Toolbox/StandardCard';
import { Alert } from 'modules/SharedComponents/Toolbox/Alert';
import { makeStyles } from '@material-ui/styles';
import { useRecordContext } from 'context';
import { userIsAdmin, userIsAuthor } from 'hooks';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import { openAccessConfig, viewRecordsConfig, routes } from 'config';
import { isFileValid } from 'config/validation';
import MediaPreview from 'modules/ViewRecord/components/MediaPreview';
import FileName from 'modules/ViewRecord/components/partials/FileName';
import OpenAccessIcon from 'modules/SharedComponents/Partials/OpenAccessIcon';
import FileUploadEmbargoDate from '../FileUploader/components/FileUploadEmbargoDate';
import { TextField } from 'modules/SharedComponents/Toolbox/TextField';

import { FileIcon } from './FileIcon';

export const useStyles = makeStyles(
    /* istanbul ignore next */
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

const usePreview = initialPreviewState => {
    const [preview, setPreview] = useState(initialPreviewState);

    const showPreview = args => {
        setPreview({ ...args });
    };

    const hidePreview = () => {
        setPreview(initialPreviewState);
    };

    return [preview, showPreview, hidePreview];
};

export const getUrl = (pid, fileName) => fileName && routes.pathConfig.file.url(pid, fileName);

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

const checkArrayForObjectValue = (value, dataStreams) => {
    let resolvedFilename = null;
    for (let i = 0; i < dataStreams.length; i++) {
        if (dataStreams[i].dsi_dsid === value) {
            resolvedFilename = dataStreams[i].dsi_dsid;
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

const checkForThumbnail = (filename, dataStreams) => {
    const file = untranscodedItem(filename);
    return (
        checkArrayForObjectValue(`thumbnail_${file}_compressed_t.jpg`, dataStreams) ||
        checkArrayForObjectValue(`thumbnail_${file}_t.jpg`, dataStreams) ||
        checkArrayForObjectValue(`thumbnail_${file}.jpg`, dataStreams) ||
        checkArrayForObjectValue(`${file}_t.jpg`, dataStreams) ||
        null
    );
};

const checkForPreview = (filename, dataStreams) => {
    const file = untranscodedItem(filename);
    return (
        checkArrayForObjectValue(`preview_${file}_compressed_t.jpg`, dataStreams) ||
        checkArrayForObjectValue(`preview_${file}_t.jpg`, dataStreams) ||
        checkArrayForObjectValue(`preview_${file}.jpg`, dataStreams) ||
        checkArrayForObjectValue(`${file}_t.jpg`, dataStreams) ||
        checkArrayForObjectValue(`preview_${file}_compressed_t.mp4`, dataStreams) ||
        checkArrayForObjectValue(`preview_${file}_t.mp4`, dataStreams) ||
        checkArrayForObjectValue(`${file}_t.mp4`, dataStreams) ||
        checkArrayForObjectValue(`preview_${file}_compressed_t.mp3`, dataStreams) ||
        checkArrayForObjectValue(`preview_${file}_t.mp3`, dataStreams) ||
        checkArrayForObjectValue(`${file}_t.mp3`, dataStreams) ||
        null
    );
};

const checkForWeb = (filename, dataStreams) => {
    const file = untranscodedItem(filename);
    return (
        checkArrayForObjectValue(`web_${file}_compressed_t.jpg`, dataStreams) ||
        checkArrayForObjectValue(`web_${file}_t.jpg`, dataStreams) ||
        checkArrayForObjectValue(`web_${file}.jpg`, dataStreams) ||
        checkArrayForObjectValue(`web_${file}_compressed_t.mp4`, dataStreams) ||
        checkArrayForObjectValue(`web_${file}_t.mp4`, dataStreams) ||
        checkArrayForObjectValue(`web_${file}_compressed_t.mp3`, dataStreams) ||
        checkArrayForObjectValue(`web_${file}_t.mp3`, dataStreams) ||
        null
    );
};

const getFileData = (publication, dataStreams, isAdmin, isAuthor) => {
    return !!dataStreams && dataStreams.length > 0
        ? dataStreams.filter(isFileValid(viewRecordsConfig, isAdmin)).map(dataStream => {
            const pid = dataStream.dsi_pid;
            const fileName = dataStream.dsi_dsid;
            const mimeType = dataStream.dsi_mimetype ? dataStream.dsi_mimetype : '';

            const thumbnailFileName = checkForThumbnail(fileName, dataStreams);
            const previewFileName = checkForPreview(fileName, dataStreams);
            const webFileName = checkForWeb(fileName, dataStreams);

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
    onDescriptionChange,
    locale,
    canEdit,
}) => {
    const classes = useStyles();
    const [preview, showPreview, hidePreview] = usePreview(initialPreviewState);
    const { record } = useRecordContext();
    const isAdmin = userIsAdmin();
    const isAuthor = userIsAuthor();

    const isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const fileData = getFileData(record, dataStreams, isAdmin, isAuthor);
    if (fileData.length === 0) return null;
    const hasVideo = fileData.some(item => item.mimeType.indexOf('video') > -1);

    const onFileDelete = index => () => onDelete(index);
    const onEmbargoDateChange = index => value =>
        onDateChange('dsi_embargo_date', moment(value).format(globalLocale.global.embargoDateFormat), index);
    const onFileDescriptionChange = index => event => onDescriptionChange('dsi_label', event.target.value, index);

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
                                    {isAdmin && canEdit ? (
                                        <TextField
                                            fullWidth
                                            onChange={onFileDescriptionChange(index)}
                                            name="fileDescription"
                                            defaultValue={item.description}
                                        />
                                    ) : (
                                        <Typography variant="body2" noWrap>
                                            {item.description}
                                        </Typography>
                                    )}
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
    onDescriptionChange: PropTypes.func,
    locale: PropTypes.object,
    canEdit: PropTypes.bool,
};

AttachedFiles.defaultProps = {
    deleteHint: 'Remove this file',
    canEdit: false,
};

export default AttachedFiles;
