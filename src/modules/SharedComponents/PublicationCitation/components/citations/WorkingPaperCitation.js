import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Partials from './partials';

export default class WorkingPaperCitation extends Component {
    static propTypes = {
        publication: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const record = {
            id: this.props.publication.rek_pid,
            title: this.props.publication.rek_title,
            series: this.props.publication.fez_record_search_key_series ?
                this.props.publication.fez_record_search_key_series.rek_series : null,
            reportNumber: this.props.publication.fez_record_search_key_report_number ?
                this.props.publication.fez_record_search_key_report_number.rek_report_number : null,
            orgUnit: this.props.publication.fez_record_search_key_org_unit_name ?
                this.props.publication.fez_record_search_key_org_unit_name.rek_org_unit_name : null,
            orgName: this.props.publication.fez_record_search_key_org_name ?
                this.props.publication.fez_record_search_key_org_name.rek_org_name : null,
            doi: this.props.publication.fez_record_search_key_doi ?
                this.props.publication.fez_record_search_key_doi.rek_doi : null
        };

        // eSpace citation view for Working Paper
        // {Author}{Publication Year| (|).}<i>{Title| |.}</i>{Series| |.} {Report Number| |.}{School, Department or Centre| |,}{Institution| |.}{doi| doi:|}

        return (
            <div className="citationContent citationWorkingPaper">
                {/* {Creator} */}
                <Partials.AuthorsCitationView publication={this.props.publication} />

                {/* {Publication Year| (|).} */}
                <Partials.DateCitationView date={this.props.publication.rek_date} />

                {/* <i>{Title| |.}</i> */}
                <Partials.CitationTitleView className="citationTitle" value={record.title} />

                {/* {Series| |.} */}
                <Partials.CitationView className="citationSource" value={record.series} />

                {/* {Report Number| |.} */}
                <Partials.CitationView className="citationReportNumber" value={record.reportNumber} />

                {/* {School, Department or Centre| |,} */}
                <Partials.CitationView className="citationOrgUnit" value={record.orgUnit} suffix=", " />

                {/* {Institution| |.} */}
                <Partials.CitationView className="citationOrgName" value={record.orgName} />

                {/* {doi| doi:|} */}
                <Partials.DoiCitationView doi={record.doi} />
            </div>
        );
    }
}
