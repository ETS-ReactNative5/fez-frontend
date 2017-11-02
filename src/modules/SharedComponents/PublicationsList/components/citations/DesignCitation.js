import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import * as Partials from './partials';

export default class DesignCitation extends Component {
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
            source: this.props.publication.fez_record_search_key_source ?
                this.props.publication.fez_record_search_key_source.rek_source : null
        };

        // eSpace citation view for Design
        // {Creator}{Publication Year| (|).}<i>{Title| |.}</i>{Source| |.}

        return (
            <div className="citationContent citationDesign">
                <FontIcon className="material-icons citationIcon" data-place="left">
                    format_quote
                </FontIcon>

                {/* {Creator} */}
                <Partials.AuthorsCitationView publication={this.props.publication} />

                {/* {Publication Year| (|).} */}
                <Partials.DateCitationView date={this.props.publication.rek_date} />

                {/* <i>{Title| |.}</i> */}
                <Partials.CitationView className="citationTitle" value={record.title} />

                {/* {Source| |.} */}
                <Partials.CitationView className="citationSource" value={record.source} />
            </div>
        );
    }
}
