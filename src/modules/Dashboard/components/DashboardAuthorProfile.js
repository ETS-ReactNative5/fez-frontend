import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {HelpIcon} from 'modules/SharedComponents/Toolbox/HelpDrawer';
import locale from 'locale/pages';
import DashboardAuthorDetails from './DashboardAuthorDetails';
import DashboardArticleCount from '../containers/DashboardArticleCount';
import DashboardResearcherIds from './DashboardResearcherIds';
import DashboardAuthorAvatar from './DashboardAuthorAvatar';
import {Grid, withStyles, Card, Hidden} from '@material-ui/core';

const background = require('../../../../public/images/dashboard_cover.jpg');

const styles = {
    wrapper: {
        backgroundImage: 'url(' + background + ')',
        backgroundSize: 'cover',
        padding: 16
    }
};

class DashboardAuthorProfile extends PureComponent {
    static propTypes = {
        author: PropTypes.object,
        authorDetails: PropTypes.object,
        history: PropTypes.object.isRequired,
        classes: PropTypes.object
    };

    render() {
        const txt = locale.pages.dashboard.header;
        const {author, authorDetails, history, classes} = this.props;
        if (!authorDetails) {
            return <div className="AuthorProfile empty" />;
        }

        return (
            <Card className={classes.wrapper}>
                <Grid container spacing={24} alignContent={'center'} alignItems={'center'} justify={'center'}>
                    {
                        txt.help &&
                        <div className="is-pulled-right">
                            <HelpIcon {...txt.help} />
                        </div>
                    }
                    {/* Profile avatar */}
                    {
                        authorDetails.image_exists === 1 &&
                        <Grid item xs={'auto'}>
                            <DashboardAuthorAvatar
                                values={{
                                    uqr_id: authorDetails.uqr_id || author.aut_id || '',
                                    title: author.aut_title || '',
                                    givenName: author.aut_fname || '',
                                    familyName: author.aut_lname || ''
                                }}/>
                        </Grid>
                    }
                    {/* Author Details/Name/Orgs/ResearcherIDs */}
                    <Grid item xs>
                        <Grid container>
                            <Grid item xs={12}>
                                <DashboardAuthorDetails
                                    {...{
                                        title: author.aut_title || '',
                                        givenName: author.aut_fname || '',
                                        familyName: author.aut_lname || '',
                                        orgUnits: authorDetails.org_units,
                                        positions: authorDetails.positions
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DashboardResearcherIds
                                    values={{
                                        publons: parseInt(author.aut_publons_id, 10) === 1 ? author.aut_orcid_id : author.aut_publons_id,
                                        researcher: author.aut_researcher_id,
                                        scopus: author.aut_scopus_id,
                                        google_scholar: author.aut_google_scholar_id,
                                        orcid: author.aut_orcid_id
                                    }}
                                    authenticated={{
                                        publons: Boolean(author.aut_publons_id),
                                        researcher: Boolean(author.aut_researcher_id),
                                        scopus: Boolean(author.aut_is_scopus_id_authenticated),
                                        google_scholar: Boolean(author.aut_google_scholar_id),
                                        orcid: Boolean(author.aut_orcid_id)
                                    }}
                                    history={history}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Publication count */}
                    <Hidden smDown>
                        <Grid item xs={'auto'}>
                            <DashboardArticleCount />
                        </Grid>
                    </Hidden>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(DashboardAuthorProfile);
