import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import locale from 'locale/viewRecord';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

export default class MediaPreview extends PureComponent {
    static propTypes = {
        mediaUrl: PropTypes.string.isRequired,
        previewMediaUrl: PropTypes.string.isRequired,
        mimeType: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired
    };

    openFileInNewWindow = () => {
        window.open(this.props.mediaUrl);
    };

    MediaPreviewButtons = ({openInNewWindow, close}) => {
        return (
            <div style={{padding: 8}}>
                <Grid container spacing={16} justify="flex-end" direction="row">
                    <Grid item xs={12} sm="auto">
                        <Button variant="contained" onClick={this.openFileInNewWindow} color="primary" fullWidth>
                            {openInNewWindow}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                        <Button variant="contained" onClick={this.props.onClose} fullWidth>
                            {close}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    };

    render()  {
        const {mediaUrl, previewMediaUrl, mimeType} = this.props;
        const {videoTitle, imageTitle, browserNotSupportVideoTagMsg} = locale.viewRecord.sections.files.preview;
        const isVideo = mimeType.indexOf('video') >= 0;
        const isImage = mimeType.indexOf('image') >= 0;
        const title = isVideo ? videoTitle : imageTitle;
        return (
            <React.Fragment>
                <Grid container spacing={0} direction={'row'} style={{marginTop: 32}}>
                    <Grid item xs>
                        <Typography variant={'h5'} component={'h2'}>{title}</Typography>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item>
                            <this.MediaPreviewButtons {...locale.viewRecord.sections.files.preview}/>
                        </Grid>
                    </Hidden>
                </Grid>
                {
                    isVideo &&
                    <video controls>
                        <source src={previewMediaUrl} type={mimeType} />
                        {browserNotSupportVideoTagMsg}
                    </video>
                }
                {
                    isImage &&
                        <div style={{padding: 16, margin: 16}}>
                            <Grid container spacing={32}>
                                <Grid xs />
                                <Grid xs={'auto'}>
                                    <img id="previewImage" src={previewMediaUrl} alt={mediaUrl} style={{border: '5px solid black', maxWidth: '100%'}} />
                                </Grid>
                                <Grid xs />
                            </Grid>
                        </div>
                }
                <Hidden smUp>
                    <this.MediaPreviewButtons {...locale.viewRecord.sections.files.preview}/>
                </Hidden>
            </React.Fragment>
        );
    }
}
