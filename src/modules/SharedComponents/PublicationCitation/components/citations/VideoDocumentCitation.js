import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Partials from './partials';

export default class VideoDocumentCitation extends Component {
    static propTypes = {
        publication: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const record = {
            id: this.props.publication.rek_pid,
            title: this.props.publication.rek_title,
            series: this.props.publication.fez_record_search_key_series
                ? this.props.publication.fez_record_search_key_series.rek_series : null,
        };

        // eSpace citation view for Video
        // {Creator}{Year| (|).}<i>{Title| |.}</i>{Series| |.}
        return (
            <div className="citationContent citationVideo">
                {/* {Creator}*/}
                <Partials.AuthorsCitationView publication={this.props.publication}/>

                {/* {Year| (|).} */}
                <Partials.DateCitationView date={this.props.publication.rek_date}/>

                {/* <i>{Title| |.}</i> */}
                <Partials.CitationTitleView className="citationTitle" value={record.title}/>

                {/* {Series| |.} */}
                <Partials.CitationView className="citationSeries" value={record.series}/>
            </div>
        );
    }
}
