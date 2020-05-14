import React, { Component } from 'react';
import PropTypes from 'prop-types';
import locale from 'locale/viewRecord';
import { StandardCard } from 'modules/SharedComponents/Toolbox/StandardCard';
import { Alert } from 'modules/SharedComponents/Toolbox/Alert';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import VolumeUp from '@material-ui/icons/VolumeUp';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import Image from '@material-ui/icons/Image';
import Videocam from '@material-ui/icons/Videocam';
import { openAccessConfig, routes, viewRecordsConfig } from 'config';
import MediaPreview from './MediaPreview';
import FileName from './partials/FileName';
import OpenAccessIcon from 'modules/SharedComponents/Partials/OpenAccessIcon';
import Thumbnail from './partials/Thumbnail';
import { isAdded, isDerivative } from 'helpers/datastreams';
import { stripHtml } from 'helpers/general';

const styles = theme => ({
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
});

export class FilesClass extends Component {
    static propTypes = {
        publication: PropTypes.object.isRequired,
        hideCulturalSensitivityStatement: PropTypes.bool,
        setHideCulturalSensitivityStatement: PropTypes.func,
        classes: PropTypes.object,
        isAdmin: PropTypes.bool,
        isAuthor: PropTypes.bool,
        author: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            preview: {
                fileName: null,
                mediaUrl: null,
                webMediaUrl: null,
                previewMediaUrl: null,
                mimeType: null,
                checksums: {},
            },
        };
    }

    renderFileIcon = (
        pid,
        mimeType,
        fileName,
        thumbnailFileName,
        previewFileName,
        webFileName,
        securityStatus,
        checksums,
    ) => {
        if (thumbnailFileName) {
            const thumbnailProps = {
                mimeType,
                mediaUrl: this.getUrl(pid, fileName, checksums && checksums.media),
                webMediaUrl: webFileName ? this.getUrl(pid, webFileName, checksums && checksums.web) : null,
                previewMediaUrl: previewFileName
                    ? this.getUrl(pid, previewFileName, checksums && checksums.preview)
                    : null,
                thumbnailMediaUrl:
                    thumbnailFileName && this.getUrl(pid, thumbnailFileName, checksums && checksums.thumbnail),
                fileName: fileName,
                thumbnailFileName,
                onClick: this.showPreview,
                securityStatus: securityStatus,
            };
            return <Thumbnail {...thumbnailProps} />;
        } else if (mimeType.indexOf('audio') >= 0) {
            return <VolumeUp className={this.props.classes.fileIcon} color={'secondary'} />;
        } else if (mimeType.indexOf('pdf') >= 0) {
            return <PictureAsPdf className={this.props.classes.fileIcon} color={'secondary'} />;
        } else if (mimeType.indexOf('image') >= 0) {
            return <Image className={this.props.classes.fileIcon} color={'secondary'} />;
        } else if (mimeType.indexOf('video') >= 0) {
            return <Videocam className={this.props.classes.fileIcon} color={'secondary'} />;
        } else {
            return <InsertDriveFile className={this.props.classes.fileIcon} color={'secondary'} />;
        }
    };

    hidePreview = () => {
        this.setState({
            preview: {
                fileName: null,
                mediaUrl: null,
                webMediaUrl: null,
                previewMediaUrl: null,
                mimeType: null,
                securityStatus: null,
            },
        });
    };

    showPreview = (fileName, mediaUrl, previewMediaUrl, mimeType, webMediaUrl, securityStatus, checksums = {}) => {
        if (securityStatus) {
            this.setState({
                preview: {
                    fileName,
                    mediaUrl,
                    webMediaUrl,
                    previewMediaUrl,
                    mimeType,
                    securityStatus,
                    checksums,
                },
            });
        }
    };

    formatBytes = bytes => {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const decimals = 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const index = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, index)).toFixed(decimals)) + ' ' + sizes[index];
    };

    getFileOpenAccessStatus = (publication, dataStream) => {
        const embargoDate = dataStream.dsi_embargo_date;
        const openAccessStatusId =
            (!!publication.fez_record_search_key_oa_status &&
                publication.fez_record_search_key_oa_status.rek_oa_status) ||
            null;
        if (openAccessConfig.openAccessFiles.indexOf(openAccessStatusId) < 0) {
            return { isOpenAccess: false, embargoDate: null, openAccessStatusId: openAccessStatusId };
        } else if (embargoDate && moment(embargoDate).isAfter(moment(), 'day')) {
            return {
                isOpenAccess: false,
                embargoDate: moment(embargoDate).format('Do MMMM YYYY'),
                openAccessStatusId: openAccessStatusId,
                securityStatus: this.getSecurityAccess(dataStream),
            };
        }
        return { isOpenAccess: true, embargoDate: null, openAccessStatusId: openAccessStatusId };
    };

    getSecurityAccess = dataStream => {
        const { isAdmin, isAuthor, author } = this.props;
        return !!(
            isAdmin ||
            isAuthor ||
            (dataStream && dataStream.dsi_security_policy && dataStream.dsi_security_policy === 5) ||
            /* istanbul ignore next */
            (author && author.pol_id && dataStream.dsi_security_policy >= author.pol_id)
        );
    };

    getUrl = (pid, fileName, checksum = '') => {
        return pid && fileName && routes.pathConfig.file.url(pid, fileName, checksum);
    };

    searchByKey = (list, key, value) => {
        return list && list.filter(item => item[key] === value)[0];
    };

    isFileValid = dataStream => {
        return this.getSecurityAccess(dataStream) && !isDerivative(dataStream) && isAdded(dataStream);
    };

    getMatchingFilename = names => {
        const datastreamFileNames = this.props.publication.fez_datastream_info.map(item => item.dsi_dsid);
        const findMatch = (nameMatch, name) => nameMatch || (datastreamFileNames.includes(name) && name);
        return names.reduce(findMatch, false) || null;
    };

    untranscodedItem = filename => {
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

    checkForThumbnail = filename => {
        const file = this.untranscodedItem(filename);
        const names = [
            `thumbnail_${file}_compressed_t.jpg`,
            `thumbnail_${file}_t.jpg`,
            `thumbnail_${file}.jpg`,
            `${file}_t.jpg`,
        ];
        return this.getMatchingFilename(names);
    };

    checkForPreview = filename => {
        const file = this.untranscodedItem(filename);
        const names = [
            `preview_${file}_compressed_t.jpg`,
            `preview_${file}_t.jpg`,
            `preview_${file}.jpg`,
            `${file}_t.jpg`,
            `preview_${file}_compressed_t.mp4`,
            `preview_${file}_t.mp4`,
            `${file}_t.mp4`,
            `preview_${file}_compressed_t.mp3`,
            `preview_${file}_t.mp3`,
            `${file}_t.mp3`,
        ];
        return this.getMatchingFilename(names);
    };

    checkForWeb = filename => {
        const file = this.untranscodedItem(filename);
        const names = [
            `web_${file}_compressed_t.jpg`,
            `web_${file}_t.jpg`,
            `web_${file}.jpg`,
            `web_${file}_compressed_t.mp4`,
            `web_${file}_t.mp4`,
            `web_${file}_compressed_t.mp3`,
            `web_${file}_t.mp3`,
        ];
        return this.getMatchingFilename(names);
    };

    getChecksums = (dataStream, thumbnailFileName, previewFileName, webFileName, dataStreams) => {
        const checksums = {
            media: dataStream.dsi_checksum,
            thumbnail: undefined,
            preview: undefined,
            web: undefined,
        };

        dataStreams.forEach(dataStream => {
            switch (dataStream.dsi_dsid) {
                case thumbnailFileName:
                    checksums.thumbnail = dataStream.dsi_checksum;
                    break;
                case previewFileName:
                    checksums.preview = dataStream.dsi_checksum;
                    break;
                case webFileName:
                    checksums.web = dataStream.dsi_checksum;
                    break;
                default:
            }
        });

        return checksums;
    };

    getFileData = publication => {
        const dataStreams = publication.fez_datastream_info;
        return this.isViewableByUser(publication, dataStreams)
            ? dataStreams.filter(this.isFileValid).map(dataStream => {
                const pid = publication.rek_pid;
                const fileName = dataStream.dsi_dsid;
                const mimeType = dataStream.dsi_mimetype ? dataStream.dsi_mimetype : '';
                const thumbnailFileName = this.checkForThumbnail(fileName);
                const previewFileName = this.checkForPreview(fileName);
                const webFileName = this.checkForWeb(fileName);
                const openAccessStatus = this.getFileOpenAccessStatus(publication, dataStream);
                const securityAccess = this.getSecurityAccess(dataStream);
                const checksums = this.getChecksums(
                    dataStream,
                    thumbnailFileName,
                    previewFileName,
                    webFileName,
                    dataStreams,
                );

                return {
                    pid: pid,
                    fileName: fileName,
                    description: dataStream.dsi_label,
                    mimeType: mimeType,
                    calculatedSize: this.formatBytes(dataStream.dsi_size),
                    allowDownload: !openAccessStatus.embargoDate,
                    icon: this.renderFileIcon(
                        pid,
                        mimeType,
                        fileName,
                        thumbnailFileName,
                        previewFileName,
                        webFileName,
                        securityAccess,
                        checksums,
                    ),
                    openAccessStatus: openAccessStatus,
                    previewMediaUrl: this.getUrl(
                        pid,
                        previewFileName ? previewFileName : fileName,
                        checksums && checksums.preview,
                    ),
                    webMediaUrl: webFileName ? this.getUrl(pid, webFileName, checksums.web) : null,
                    mediaUrl: this.getUrl(pid, fileName, checksums.media),
                    securityStatus: this.getSecurityAccess(dataStream),
                    checksums: checksums,
                };
            })
            : [];
    };

    isViewableByUser = (publication, dataStreams) => {
        const { files } = viewRecordsConfig;
        // check if the publication is a member of the blacklist collections, TODO: remove after security epic is done
        const containBlacklistCollections = publication.fez_record_search_key_ismemberof.some(collection =>
            files.blacklist.collections.includes(collection.rek_ismemberof),
        );
        return !!dataStreams && dataStreams.length > 0 && (!containBlacklistCollections || !!this.props.isAdmin);
    };

    render() {
        const { publication } = this.props;
        const fileData = this.getFileData(publication);
        if (fileData.length === 0) return null;
        return (
            <Grid item xs={12}>
                <StandardCard title={locale.viewRecord.sections.files.title}>
                    {!!publication.fez_record_search_key_advisory_statement &&
                        !this.props.hideCulturalSensitivityStatement && (
                        <Alert
                            allowDismiss
                            type={'info'}
                            message={stripHtml(
                                publication.fez_record_search_key_advisory_statement.rek_advisory_statement,
                            )}
                            dismissAction={this.props.setHideCulturalSensitivityStatement}
                        />
                    )}
                    <div style={{ padding: 8 }}>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={16}
                            className={this.props.classes.header}
                        >
                            <Grid item xs={1}>
                                &nbsp;
                            </Grid>
                            <Grid item sm={4}>
                                <Typography variant="caption" gutterBottom>
                                    {locale.viewRecord.sections.files.fileName}
                                </Typography>
                            </Grid>
                            <Hidden xsDown>
                                <Grid item sm={4}>
                                    <Typography variant="caption" gutterBottom>
                                        {locale.viewRecord.sections.files.description}
                                    </Typography>
                                </Grid>
                            </Hidden>
                            <Hidden smDown>
                                <Grid item md={2}>
                                    <Typography variant="caption" gutterBottom>
                                        {locale.viewRecord.sections.files.size}
                                    </Typography>
                                </Grid>
                            </Hidden>
                            <Hidden xsDown>
                                <Grid item sm />
                            </Hidden>
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
                                className={this.props.classes.header}
                            >
                                <Grid item xs={1} className={this.props.classes.thumbIconCentered}>
                                    {item.icon}
                                </Grid>
                                <Grid item sm={4} className={this.props.classes.dataWrapper}>
                                    <FileName {...item} onFileSelect={this.showPreview} />
                                </Grid>
                                <Hidden xsDown>
                                    <Grid item sm={4} className={this.props.classes.dataWrapper}>
                                        <Typography variant="body2" noWrap>
                                            {item.description}
                                        </Typography>
                                    </Grid>
                                </Hidden>
                                <Hidden smDown>
                                    <Grid item sm={2} className={this.props.classes.dataWrapper}>
                                        <Typography variant="body2" noWrap>
                                            {item.calculatedSize}
                                        </Typography>
                                    </Grid>
                                </Hidden>
                                <Hidden xsDown>
                                    <Grid item sm style={{ textAlign: 'right' }}>
                                        <OpenAccessIcon
                                            {...item.openAccessStatus}
                                            securityStatus={item.securityStatus}
                                        />
                                    </Grid>
                                </Hidden>
                            </Grid>
                        </div>
                    ))}
                    {this.state.preview.mediaUrl && this.state.preview.mimeType && (
                        <MediaPreview
                            fileName={this.getUrl(
                                publication.rek_pid,
                                this.state.preview.fileName,
                                this.state.preview.checksums && this.state.preview.checksums.media,
                            )}
                            mediaUrl={this.state.preview.mediaUrl}
                            webMediaUrl={this.state.preview.webMediaUrl}
                            previewMediaUrl={this.state.preview.previewMediaUrl}
                            mimeType={this.state.preview.mimeType}
                            onClose={this.hidePreview}
                        />
                    )}
                </StandardCard>
            </Grid>
        );
    }
}

const StyledFilesClass = withStyles(styles, { withTheme: true })(FilesClass);
const Files = props => <StyledFilesClass {...props} />;
export default Files;
