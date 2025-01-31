import React from 'react';
import PropTypes from 'prop-types';
import locale from 'locale/viewRecord';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { StandardCard } from 'modules/SharedComponents/Toolbox/StandardCard';
import { ORG_TYPES_LOOKUP, ORG_TYPE_NOT_SET } from 'config/general';

const useStyles = makeStyles(
    theme => ({
        gridRow: {
            borderBottom: `1px solid ${theme.palette.secondary.light}`,
        },
        data: {
            paddingRight: 4,
        },
        containerPadding: {
            padding: `${theme.spacing(1)}px 0`,
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(1),
            },
        },
    }),
    { withTheme: true },
);

const searchByOrder = (grantData, orderSubkey, order) => {
    return grantData && grantData.filter(grantData => grantData[orderSubkey] === order)[0];
};

const GrantDetails = ({ grantAgencyName, grantId, grantText, order, index }) => {
    const txt = locale.viewRecord.headings.default.grantInformation;
    const classes = useStyles();

    const hasGrantId = !!grantId && !!grantId.rek_grant_id && grantId.rek_grant_id.trim().length > 0;
    const grantIdTitle = hasGrantId ? txt.fez_record_search_key_grant_id : '';
    const grantIdValue =
        hasGrantId && grantId.rek_grant_id !== ORG_TYPES_LOOKUP[ORG_TYPE_NOT_SET] ? grantId.rek_grant_id : '';

    return (
        <div className={classes.containerPadding} key={index}>
            <Grid container spacing={2} key={order} className={classes.gridRow} alignItems="flex-start">
                <Grid item xs={12} sm={3}>
                    <Typography variant="body2" data-testid={`rek-grant-label-${index}`}>
                        {`${txt.fez_record_search_key_grant_agency}${(grantIdTitle && ` (${grantIdTitle})`) || ''}`}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Typography variant="body2">
                        <span data-testid={`rek-grant-agency-${index}`}>{grantAgencyName.rek_grant_agency}</span>
                        {(grantIdValue && <span data-testid={`rek-grant-id-${index}`}> ({grantIdValue}) </span>) || ''}
                    </Typography>
                    <Typography variant="body2" data-testid={`rek-grant-text-${index}`}>
                        {grantText && grantText.rek_grant_text}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

GrantDetails.propTypes = {
    grantAgencyName: PropTypes.object,
    grantId: PropTypes.object,
    grantText: PropTypes.object,
    index: PropTypes.number,
    order: PropTypes.number,
};

export const GrantInformation = ({ publication }) => {
    if (
        !publication.fez_record_search_key_grant_agency ||
        publication.fez_record_search_key_grant_agency.length === 0
    ) {
        return null;
    }

    const fundingText =
        (publication.fez_record_search_key_grant_text &&
            publication.fez_record_search_key_grant_text.length === 1 &&
            publication.fez_record_search_key_grant_text[0].rek_grant_text) ||
        null;

    const renderGrants = (publication, includeFundingText) => {
        const grantAgencies = publication.fez_record_search_key_grant_agency;
        const grantIds = publication.fez_record_search_key_grant_id;
        const grantTexts = publication.fez_record_search_key_grant_text;

        return grantAgencies
            .sort(
                (grantAgency1, grantAgency2) =>
                    grantAgency1.rek_grant_agency_order - grantAgency2.rek_grant_agency_order,
            )
            .map((grantAgencyName, index) => {
                const order = grantAgencyName.rek_grant_agency_order;
                const grantId = searchByOrder(grantIds, 'rek_grant_id_order', order);
                const grantText =
                    (includeFundingText && searchByOrder(grantTexts, 'rek_grant_text_order', order)) || {};
                return <GrantDetails key={index} {...{ grantAgencyName, grantId, grantText, order, index }} />;
            });
    };

    return (
        <Grid item xs={12}>
            <StandardCard title={locale.viewRecord.sections.grantInformation}>
                {fundingText && (
                    <Typography id="grantInformation" variant="body2" gutterBottom data-testid="rek-grant-text">
                        {fundingText}
                    </Typography>
                )}
                {publication.fez_record_search_key_grant_agency && renderGrants(publication, !fundingText)}
            </StandardCard>
        </Grid>
    );
};

GrantInformation.propTypes = {
    publication: PropTypes.object,
};

export default GrantInformation;
