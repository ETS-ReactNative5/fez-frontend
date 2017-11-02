import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import * as Partials from './partials';

export default class NewspaperArticleCitation extends Component {
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
            newspaper: this.props.publication.fez_record_search_key_newspaper
                ? this.props.publication.fez_record_search_key_newspaper.rek_newspaper
                : null,
            startPage: this.props.publication.fez_record_search_key_start_page
                ? this.props.publication.fez_record_search_key_start_page.rek_start_page
                : null,
            endPage: this.props.publication.fez_record_search_key_end_page
                ? this.props.publication.fez_record_search_key_end_page.rek_end_page
                : null
        };

        // eSpace citation view for Newspaper Article
        // {Author}{Publication Date| (|).|y, m d}{Title| |.}<i>{Newspaper| |}</i>{Start page| , |}{End page|-|}

        return (
            <div className="citationContent citationNewspaperArticle">
                <FontIcon className="material-icons citationIcon" data-place="left">
                    format_quote
                </FontIcon>

                {/* {Author} */}
                <Partials.AuthorsCitationView publication={this.props.publication} />

                {/* {Publication Date| (|).|Y, m d} */}
                <Partials.DateCitationView date={this.props.publication.rek_date} format="YYYY[,] MMMM D" />

                {/* {Title| |.} */}
                <Partials.CitationView className="citationTitleNoItalics" value={record.title} />

                {/* <i>{Newspaper| |}</i> */}
                <Partials.CitationView className="citationNewspaper" value={record.newspaper} suffix="" />

                {/* {Start page| , |} */}
                <Partials.CitationView className="citationStartPage" value={record.startPage} prefix=", " suffix="" />

                {/* {End page|-|} */}
                <Partials.CitationView className="citationEndPage" value={record.endPage} prefix="-" />
            </div>
        );
    }
}
