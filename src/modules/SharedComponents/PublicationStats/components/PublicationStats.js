import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {locale} from 'locale';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    header: {
        padding: '18px 24px 12px 24px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '& p': {
            [theme.breakpoints.up('sm')]: {
                fontSize: '1.1rem',
                fontWeight: theme.typography.fontWeightRegular
            }
        },
        borderRadius: '4px 4px 0px 0px'
    },
    data: {
        padding: '24px',
    },
    expandMargin: {
        [theme.breakpoints.up('sm')]: {
            margin: -16
        },
        [theme.breakpoints.down('xs')]: {
            margin: '-16px -8px'
        }
    }
});

export class PublicationStats extends Component {
    static propTypes = {
        publicationsStats: PropTypes.object,
        classes: PropTypes.object
    }
    render() {
        const {classes} = this.props;
        const txt = locale.components.publicationStats;
        const pubStats = this.props.publicationsStats;
        if (!pubStats) return (<span className="publicationsStats empty"/>);
        return (
            <React.Fragment>
                {/* Header */}
                <div className={classes.expandMargin}>
                    <Grid container spacing={16} className={classes.header} >
                        <Grid item xs={6}>
                            <Typography  color={'inherit'}>{txt.publicationStatsTitle1}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'center'}}>
                            <Typography  color={'inherit'}>{txt.publicationStatsTitle2}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'right'}}>
                            <Typography  color={'inherit'}>{txt.publicationStatsTitle3}</Typography>
                        </Grid>
                    </Grid>
                    {/* Header */}

                    {/* Total pubs */}
                    <Grid container spacing={16} className={classes.data} >
                        <Grid item xs={6}>
                            <Typography >{txt.publicationStatsRowTitle4}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'center'}}>
                            <Typography >{pubStats.thomson_citation_count_i.count}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'right'}}>
                            <Typography  >{pubStats.scopus_citation_count_i.count}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    {/* Total pubs */}

                    {/* Range */}
                    <Grid container spacing={16} className={classes.data} >
                        <Grid item xs={6}>
                            <Typography >{txt.publicationStatsRowTitle5}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'center'}}>
                            <Typography >{pubStats.thomson_citation_count_i.years}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'right'}}>
                            <Typography  >{pubStats.scopus_citation_count_i.years}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    {/* Range */}

                    {/* hindex */}
                    <Grid container spacing={16} className={classes.data} >
                        <Grid item xs={6}>
                            <Typography >{txt.publicationStatsRowTitle1}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'center'}}>
                            <Typography >
                                {
                                    !pubStats.thomson_citation_count_i.hindex || pubStats.thomson_citation_count_i.hindex === ''
                                    || pubStats.thomson_citation_count_i.hindex.toFixed(0) === '0' || pubStats.thomson_citation_count_i.hindex === '0'
                                        ? txt.publicationStatsNA
                                        : pubStats.thomson_citation_count_i.hindex.toFixed(0)
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'right'}}>
                            <Typography  >
                                {
                                    !pubStats.scopus_citation_count_i.hindex || pubStats.scopus_citation_count_i.hindex === ''
                                    || pubStats.scopus_citation_count_i.hindex.toFixed(0) === '0' || pubStats.scopus_citation_count_i.hindex === '0'
                                        ? txt.publicationStatsNA
                                        : pubStats.scopus_citation_count_i.hindex.toFixed(0)
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    {/* hindex */}

                    {/* Average */}
                    <Grid container spacing={16} className={classes.data} >
                        <Grid item xs={6}>
                            <Typography >{txt.publicationStatsRowTitle2}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'center'}}>
                            <Typography >{pubStats.thomson_citation_count_i.avg && pubStats.thomson_citation_count_i.avg.toFixed(1)}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'right'}}>
                            <Typography  >{pubStats.scopus_citation_count_i.avg && pubStats.scopus_citation_count_i.avg.toFixed(1)}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    {/* Average */}

                    {/* Total citations */}
                    <Grid container spacing={16} className={classes.data} >
                        <Grid item xs={6}>
                            <Typography >{txt.publicationStatsRowTitle3}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'center'}}>
                            <Typography >{pubStats.thomson_citation_count_i.sum}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'right'}}>
                            <Typography  >{pubStats.scopus_citation_count_i.sum}</Typography>
                        </Grid>
                    </Grid>

                </div>
                {/* Total citations */}

            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PublicationStats);
