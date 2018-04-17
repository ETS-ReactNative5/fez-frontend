import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import * as Partials from './partials';

export default class JournalCitation extends Component {
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
            volumeNumber: this.props.publication.fez_record_search_key_volume_number ?
                this.props.publication.fez_record_search_key_volume_number.rek_volume_number : null,
            issueNumber: this.props.publication.fez_record_search_key_issue_number ?
                this.props.publication.fez_record_search_key_issue_number.rek_issue_number : null
        };

        // eSpace citation view for Journal
        // {Title of journal}{Publication Year| (|).}{Volume number| |}{Issue number| (|)}.
        return (
            <div className="citationContent citationJournal">
                <FontIcon className="material-icons citationIcon" data-place="left">
                    format_quote
                </FontIcon>

                {/* {Title of journal} */}
                <Partials.CitationTitleView className="citationJournalName" value={record.title} prefix="" suffix=" " />

                {/* {Publication Year| (|).}*/}
                <Partials.DateCitationView date={this.props.publication.rek_date} />

                {/* {Volume number| |}*/}
                <Partials.CitationView className="citationVolumeNumber" value={record.volumeNumber} suffix=" "/>

                {/* {Issue number| (|)}*/}
                <Partials.CitationView className="citationIssueNumber" value={record.issueNumber} prefix="(" suffix=")."/>
            </div>
        );
    }
}
