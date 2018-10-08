import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {StandardCard} from 'modules/SharedComponents/Toolbox/StandardCard';
import {locale} from 'locale';
const moment = require('moment');
const dompurify = require('dompurify');
import ReactHtmlParser from 'react-html-parser';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    newsItem: {
        color: theme.palette.primary.main,
        '& .day': {
            fontSize: '1.7rem',
            fontWeight: theme.typography.fontWeightMedium
        },
        '& .month': {
            textTransform: 'uppercase',
            ontWeight: theme.typography.fontWeightMedium,
            fontSize: '1.1rem'
        },
        '& .year': {
            fontSize: '0.9rem',
            ontWeight: theme.typography.fontWeightMedium
        }
    }
});

export class NewsFeed extends PureComponent {
    static propTypes = {
        newsFeedList: PropTypes.array,
        loadingNewsFeedList: PropTypes.bool,
        showNewsCount: PropTypes.number,
        actions: PropTypes.object,
        classes: PropTypes.object
    };

    static defaultProps = {
        newsFeedList: [],
        loadingNewsFeedList: true,
        showNewsCount: 3
    };

    componentDidMount() {
        if (this.props.actions && this.props.actions.loadNewsFeed) {
            this.props.actions.loadNewsFeed();
        }
    }

    render() {
        const {classes} = this.props;
        const txt = locale.components.newsFeed;

        if (this.props.loadingNewsFeedList || this.props.newsFeedList.length === 0) {
            return null;
        }

        const allowedHtmlConfig = { ALLOWED_TAGS: ['p', 'strong', 'i', 'u', 's', 'strike', 'sup', 'sub', 'em', 'br', 'b', 'sup', 'sub'], ALLOWED_ATTR: [] };
        const subNewsFeed = this.props.newsFeedList
            .slice(0,
                this.props.newsFeedList.length > this.props.showNewsCount
                    ? this.props.showNewsCount
                    : this.props.newsFeedList.length
            );

        return (
            <StandardCard title={txt.title} darkHeader>
                {
                    !this.props.loadingNewsFeedList && subNewsFeed.map((newsItem, index) => (
                        <div style={{padding: '8px 0px'}} key={index}>
                            <Grid key={`newsItem-${index}`} container spacing={16} className={classes.newsItem}>
                                <Grid item xs={'auto'}>
                                    <Grid container direction="column" alignItems="center" justify="center" alignContent="center" spacing={0}>
                                        <Grid item className="day">{moment(newsItem.nws_updated_date).format('D')}</Grid>
                                        <Grid item className="month">{moment(newsItem.nws_updated_date).format('MMM')}</Grid>
                                        <Grid item className="year">{moment(newsItem.nws_updated_date).format('YYYY')}</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs>
                                    <Typography>
                                        <b>{newsItem.nws_title}</b> {ReactHtmlParser(dompurify.sanitize(newsItem.nws_message, allowedHtmlConfig))}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    ))
                }
            </StandardCard>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NewsFeed);
