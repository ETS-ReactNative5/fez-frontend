import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import locale from 'locale/viewRecord';
import { viewRecordsConfig, routes } from 'config';
import { StandardCard } from 'modules/SharedComponents/Toolbox/StandardCard';
import {
    AuthorsCitationView,
    DoiCitationView,
    EditorsCitationView,
    DateCitationView,
} from 'modules/SharedComponents/PublicationCitation/components/citations/partials';
import { ExternalLink } from 'modules/SharedComponents/ExternalLink';
import ReactHtmlParser from 'react-html-parser';
import PublicationMap from './PublicationMap';
import JournalName from './partials/JournalName';
import { Link } from 'react-router-dom';
import { GOOGLE_MAPS_API_CHINA_URL, GOOGLE_MAPS_API_URL } from 'config/general';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    gridRow: {
        borderBottom: `1px solid ${theme.palette.secondary.light}`,
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
});

export const renderAuthors = (publication, props = {}) => {
    const componentProps = {
        key: 'additional-information-authors',
        publication,
        prefix: '',
        suffix: '',
        separator: ', ',
        initialNumberOfAuthors: publication.fez_record_search_key_author.length,
        showLink: true,
        ...props,
    };
    return <AuthorsCitationView {...componentProps} />;
};

export const formatDate = (date, format = 'YYYY-MM-DD') => {
    return <DateCitationView format={format} date={date} prefix={''} suffix={''} data-testid="rek-date" />;
};

export const formatPublicationDate = (publicationDate, displayTypeLookup) => {
    return formatDate(publicationDate, viewRecordsConfig.publicationDateFormat[displayTypeLookup]);
};

export class AdditionalInformationClass extends PureComponent {
    static propTypes = {
        account: PropTypes.object,
        publication: PropTypes.object.isRequired,
        classes: PropTypes.object,
        isNtro: PropTypes.bool,
    };
    static contextTypes = {
        userCountry: PropTypes.any,
    };

    renderRow = (heading, data, index, field) => {
        const labelTestId = `${field.replace(/_/g, '-')}-label`;
        return (
            <div style={{ padding: 8 }} key={index}>
                <Grid
                    container
                    spacing={2}
                    key={`additional-info-${heading}`}
                    className={this.props.classes.gridRow}
                    alignItems="flex-start"
                >
                    <Grid item xs={12} sm={3}>
                        <Typography
                            variant="body2"
                            component={'span'}
                            classes={{ root: this.props.classes.header }}
                            data-testid={labelTestId}
                        >
                            {heading}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9} className={this.props.classes.data}>
                        <Typography variant="body2" component={'span'}>
                            {data}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    };

    renderLink = (link, value, testId = '') => {
        return (
            <Link to={link} {...{ ['data-testid']: testId || undefined }}>
                {value}
            </Link>
        );
    };

    renderList = (list, subkey, getLink) => {
        const testId = subkey.replace(/_/g, '-');
        return (
            <ul key={subkey} className={this.props.classes.list}>
                {list.map((item, index) => (
                    <li key={`${testId}-${index}`} data-testid={`${testId}-${index}`}>
                        {(() => {
                            const data = this.getData(item, subkey);
                            if (getLink) {
                                return this.renderLink(getLink(item[subkey], data), data);
                            } else {
                                return data;
                            }
                        })()}
                    </li>
                ))}
            </ul>
        );
    };

    // render a list of objects (objects with order fields)
    renderObjectList = (objects, subkey) => {
        switch (subkey) {
            case 'rek_author':
                return renderAuthors(this.props.publication);
            case 'rek_contributor':
                return this.renderContributors(this.props.publication);
            case 'rek_keywords':
                return this.renderList(objects, subkey, routes.pathConfig.list.keyword);
            case 'rek_seo_code':
                return this.renderList(objects, subkey, routes.pathConfig.list.subject);
            case 'rek_alternate_genre':
                return this.renderList(objects, subkey, routes.pathConfig.list.subject);
            case 'rek_contact_details_email':
                return this.renderContactEmail();
            case 'rek_geographic_area':
                return this.renderMap(objects);
            default:
                return this.renderList(objects, subkey);
        }
    };

    // render a single object (without order field)
    renderObject = (object, subkey) => {
        const data = this.getData(object, subkey);

        // date fields
        if (viewRecordsConfig.dateFields.includes(subkey)) {
            return formatDate(data, viewRecordsConfig.dateFieldFormat[subkey]);
        }

        // html fields
        if (viewRecordsConfig.htmlFields.includes(subkey)) {
            return this.renderHTML(data);
        }

        switch (subkey) {
            case 'rek_doi':
                return this.renderDoi(data);
            case 'rek_journal_name':
                return this.renderJournalName();
            case 'rek_publisher':
                return this.renderLink(routes.pathConfig.list.publisher(data), data);
            case 'rek_herdc_code':
                return this.renderLink(routes.pathConfig.list.herdcStatus(object[subkey]), data);
            case 'rek_herdc_status':
                return this.renderLink(routes.pathConfig.list.herdcStatus(object[`${subkey}_lookup`]), data);
            case 'rek_ands_collection_type':
                return !!data && data;
            case 'rek_access_conditions':
                return !!data && data;
            case 'rek_series':
                return this.renderLink(routes.pathConfig.list.series(object[subkey]), object[subkey]);
            case 'rek_license':
                return this.renderLicense(object[subkey], data);
            case 'rek_org_unit_name':
                return this.renderLink(routes.pathConfig.list.orgUnitName(data), data);
            case 'rek_institutional_status':
                return this.renderLink(routes.pathConfig.list.institutionalStatus(object[`${subkey}_lookup`]), data);
            case 'rek_book_title':
                return this.renderLink(routes.pathConfig.list.bookTitle(object[subkey]), data);
            // case 'rek_job_number':
            //     return this.renderLink(routes.pathConfig.list.jobNumber(object[subkey]), data);
            case 'rek_conference_name':
                return this.renderLink(routes.pathConfig.list.conferenceName(object[subkey]), data);
            case 'rek_proceedings_title':
                return this.renderLink(routes.pathConfig.list.proceedingsTitle(object[subkey]), data);
            default:
                return data;
        }
    };

    // render rek fields from fez_record_search_key
    renderContent = (key, value) => {
        let renderedValue;
        switch (key) {
            case 'rek_title':
                renderedValue = this.renderTitle();
                break;
            case 'rek_date':
                renderedValue = formatPublicationDate(value, this.props.publication.rek_display_type_lookup);
                break;
            // case 'rek_start_date':
            //     renderedValue =  formatPublicationDate(value, this.props.publication.rek_display_type_lookup);
            //     break;
            // case 'rek_end_date':
            //     renderedValue = formatPublicationDate(value, this.props.publication.rek_display_type_lookup);
            //     break;
            case 'rek_description':
                renderedValue = this.renderHTML(value);
                break;
            default:
                renderedValue = value;
        }
        return <span data-testid={key.replace(/_/g, '-')}>{renderedValue}</span>;
    };

    renderTitle = () => {
        const { publication } = this.props;
        return this.renderHTML(
            publication.rek_formatted_title ? publication.rek_formatted_title : publication.rek_title,
        );
    };

    renderLicense = (cvoId, lookup) => {
        const licenseLookup = this.renderLink(routes.pathConfig.list.license(lookup), lookup);
        const licenseLink = viewRecordsConfig.licenseLinks[cvoId] ? viewRecordsConfig.licenseLinks[cvoId] : null;
        const uqLicenseLinkText =
            licenseLink && licenseLink.className.indexOf('uq') === 0
                ? locale.viewRecord.sections.additionalInformation.licenseLinkText
                : null;

        return (
            <span>
                {licenseLookup}
                {licenseLink && (
                    <div>
                        <ExternalLink href={licenseLink.url} openInNewIcon={!!uqLicenseLinkText}>
                            {uqLicenseLinkText || <div className={`fez-icon license ${licenseLink.className}`} />}
                        </ExternalLink>
                    </div>
                )}
            </span>
        );
    };

    renderJournalName = () => {
        return <JournalName publication={this.props.publication} />;
    };

    renderContributors = publication => {
        return (
            <EditorsCitationView
                key="additional-information-editors"
                publication={publication}
                prefix={''}
                suffix={''}
                separator={', '}
                initialNumberOfEditors={publication.fez_record_search_key_contributor.length}
                showLink
            />
        );
    };

    renderMap = coordinatesList => {
        if (coordinatesList.length === 0 || !coordinatesList[0].rek_geographic_area) {
            return <span />;
        }
        const mapApiUrl = this.context.userCountry === 'CN' ? GOOGLE_MAPS_API_CHINA_URL : GOOGLE_MAPS_API_URL;
        return (
            <PublicationMap
                googleMapURL={mapApiUrl}
                loadingElement={<div className="googleMap loading" />}
                containerElement={<div style={{ height: '400px' }} data-testid="rek-geographic-area" />}
                mapElement={<div style={{ height: '100%' }} />}
                coordinates={coordinatesList[0].rek_geographic_area}
                readOnly
            />
        );
    };

    renderDoi = doi => {
        return <DoiCitationView key="additional-information-doi" doi={doi} />;
    };

    // title/description/abstract have been sanitized in middleware
    renderHTML = data => {
        return ReactHtmlParser(data);
    };

    // get lookup data if it exsts, except rek_issn_lookup as it returns sherpa romeo color
    getData = (object, subkey) => {
        const lookupSuffix = '_lookup';
        return subkey === 'rek_oa_status' || (object[subkey + lookupSuffix] && subkey !== 'rek_issn')
            ? object[subkey + lookupSuffix]
            : object[subkey];
    };

    getAbstract = publication => {
        return this.props.isNtro
            ? null
            : (publication.rek_formatted_abstract && publication.rek_formatted_abstract.replace(/&nbsp;/g, ' ')) ||
                  (publication.rek_description && publication.rek_description.replace(/&nbsp;/g, ' ')) ||
                  null;
    };

    // TODO: display original contact email for admin users
    renderContactEmail = () => {
        return (
            <a href={`mailto:${viewRecordsConfig.genericDataEmail}`} data-testid="rek-contact-details-email">
                {viewRecordsConfig.genericDataEmail}
            </a>
        );
    };

    transformFieldNameToSubkey = field => {
        const keyPrefix = 'fez_record_search_key_';
        const subkeyPrefix = 'rek_';
        return field.indexOf(keyPrefix) === 0 ? subkeyPrefix + field.substring(keyPrefix.length) : null;
    };

    excludeAdminOnlyFields = fields => {
        return fields.filter(item => !locale.viewRecord.adminFields.includes(item.field));
    };

    renderColumns = () => {
        const rows = [];
        const publication = this.props.publication;
        const displayType = publication.rek_display_type_lookup;
        const headings = locale.viewRecord.headings;
        const displayTypeHeadings = displayType && headings[displayType] ? headings[displayType] : [];
        const footerFields = locale.viewRecord.fields.footer;
        let fields =
            displayType && locale.viewRecord.fields[displayType]
                ? locale.viewRecord.fields[displayType].concat(footerFields)
                : footerFields;
        fields = this.props.account && this.props.account.canMasquerade ? fields : this.excludeAdminOnlyFields(fields);

        fields
            .sort((field1, field2) => field1.order - field2.order)
            .map((item, index) => {
                let data = '';
                const field = item.field;
                let value;
                switch (field) {
                    case 'rek_description':
                        value = this.getAbstract(publication);
                        break;
                    case 'rek_date':
                        value = moment(publication[field]).isSame(moment('1000-01-01T00:00:00Z'))
                            ? null
                            : publication[field];
                        break;
                    default:
                        value = publication[field];
                }

                // do not display field when value is null, empty array
                if (value && Object.keys(value).length > 0) {
                    const subkey = this.transformFieldNameToSubkey(field);
                    const heading = displayTypeHeadings[field] ? displayTypeHeadings[field] : headings.default[field];

                    // logic to get values from fez_record_search_key fields
                    if (subkey) {
                        data = Array.isArray(value)
                            ? this.renderObjectList(value, subkey)
                            : this.renderObject(value, subkey);
                    } else {
                        data = this.renderContent(field, value);
                    }

                    rows.push(this.renderRow(heading, data, index, subkey || field));
                }
            });

        return rows;
    };

    render() {
        if (!this.props.publication || !this.props.publication.rek_display_type_lookup) {
            return null;
        }
        return (
            <Grid item xs={12}>
                <StandardCard title={locale.viewRecord.sections.additionalInformation.title}>
                    {this.renderColumns()}
                </StandardCard>
            </Grid>
        );
    }
}

const StyledAdditionalInformation = withStyles(styles, { withTheme: true })(AdditionalInformationClass);
const AdditionalInformation = props => <StyledAdditionalInformation {...props} />;
export default AdditionalInformation;
