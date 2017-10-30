import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import * as Partials from './partials';

export default class ResearchReportCitation extends Component {
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
            publisher: this.props.publication.fez_record_search_key_publisher ?
                this.props.publication.fez_record_search_key_publisher.rek_publisher : null,
            placeOfPublication: this.props.publication.fez_record_search_key_place_of_publication ?
                this.props.publication.fez_record_search_key_place_of_publication.rek_place_of_publication : null,
            doi: this.props.publication.fez_record_search_key_doi ?
                this.props.publication.fez_record_search_key_doi.rek_doi : null,
            series: this.props.publication.fez_record_search_key_series ?
                this.props.publication.fez_record_search_key_series.rek_series : null
        };

        // eSpace citation view for ResearchReport
        // {Author}{Year| (|).}<i>{Title of report| |.}</i>{Series| |,}{Place of Publication| |:}{Publisher| |.} {doi| doi:|}
        return (
            <div className="citationContent citationResearchReport">
                <FontIcon className="material-icons citationIcon" data-place="left">
                    format_quote
                </FontIcon>

                {/* authors list */}
                <Partials.AuthorsCitationView publication={this.props.publication} />

                {/* publication year */}
                <Partials.YearCitationView date={this.props.publication.rek_date} />

                {/* research report title */}
                <Partials.CitationView className="citationTitle" value={record.title} />

                {/* series */}
                <Partials.CitationView className="citationSeries" value={record.series} />

                {/* place of publication */}
                <Partials.CitationView className="citationPlaceOfPublication" suffix=":" value={record.placeOfPublication} />

                {/* publisher */}
                <Partials.CitationView className="citationPublisher" value={record.publisher} />

                {/* doi */}
                <Partials.DoiCitationView doi={record.doi} />
            </div>
        );
    }
}
