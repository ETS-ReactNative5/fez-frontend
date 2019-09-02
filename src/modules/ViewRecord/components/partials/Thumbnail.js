import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExternalLink from 'modules/SharedComponents/ExternalLink/components/ExternalLink';
import BrokenImage from '@material-ui/icons/BrokenImage';
import Lock from '@material-ui/icons/Lock';
import { withStyles } from '@material-ui/core/styles';
import locale from 'locale/pages';
import Img from 'react-image';
import CircularProgress from '@material-ui/core/CircularProgress';

export const styles = () => ({
    image: {
        width: '100%',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    brokenImage: {
        opacity: 0.5,
    },
    lockIcon: {
        opacity: 0.5,
    },
});

export class Thumbnail extends Component {
    static propTypes = {
        mediaUrl: PropTypes.string,
        webMediaUrl: PropTypes.string,
        previewMediaUrl: PropTypes.string,
        thumbnailMediaUrl: PropTypes.string,
        thumbnailFileName: PropTypes.string,
        securityStatus: PropTypes.bool,
        fileName: PropTypes.string,
        mimeType: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            thumbnailError: false,
        };
    }

    showPreview = (fileName, mediaUrl, previewMediaUrl, mimeType, webMediaUrl, securityStatus) => e => {
        e.preventDefault();
        this.props.onClick(fileName, mediaUrl, previewMediaUrl, mimeType, webMediaUrl, securityStatus);
    };

    render() {
        const txt = locale.pages.viewRecord;
        const {
            mediaUrl,
            thumbnailMediaUrl,
            thumbnailFileName,
            previewMediaUrl,
            webMediaUrl,
            fileName,
            mimeType,
            securityStatus,
        } = this.props;
        if (
            (fileName && mimeType.indexOf('pdf') >= 0) ||
            (mimeType.indexOf('octet-stream') >= 0 && mediaUrl.indexOf('flv') >= 0)
        ) {
            return (
                <ExternalLink href={mediaUrl} title={fileName} openInNewIcon={false}>
                    <Img
                        crossorigin="anonymous"
                        src={thumbnailMediaUrl}
                        alt={thumbnailFileName}
                        loader={<CircularProgress size={15} thickness={1} />}
                        unloader={<BrokenImage color={'secondary'} />}
                        className={this.props.classes.image}
                    />
                </ExternalLink>
            );
        }
        return (
            <a
                onClick={this.showPreview(fileName, mediaUrl, previewMediaUrl, mimeType, webMediaUrl, securityStatus)}
                onKeyPress={this.showPreview(
                    fileName,
                    mediaUrl,
                    previewMediaUrl,
                    mimeType,
                    webMediaUrl,
                    securityStatus,
                )}
                title={mediaUrl && txt.thumbnailTitle.replace('[image]', mediaUrl)}
            >
                {this.props.securityStatus ? (
                    <Img
                        src={thumbnailMediaUrl}
                        alt={thumbnailFileName}
                        loader={<CircularProgress size={15} thickness={1} />}
                        unloader={<BrokenImage color={'secondary'} />}
                        className={this.props.classes.image}
                    />
                ) : (
                    <Lock color={'secondary'} className={this.props.classes.lockIcon} />
                )}
            </a>
        );
    }
}

export default withStyles(styles)(Thumbnail);
