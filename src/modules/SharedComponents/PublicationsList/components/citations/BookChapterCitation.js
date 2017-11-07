import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import * as Partials from './partials';

export default class BookChapterCitation extends Component {
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
            bookTitle: this.props.publication.fez_record_search_key_book_title ?
                this.props.publication.fez_record_search_key_book_title.rek_book_title : null,
            edition: this.props.publication.fez_record_search_key_edition ?
                this.props.publication.fez_record_search_key_edition.rek_edition : null,
            placeOfPublication: this.props.publication.fez_record_search_key_place_of_publication ?
                this.props.publication.fez_record_search_key_place_of_publication.rek_place_of_publication : null,
            publisher: this.props.publication.fez_record_search_key_publisher ?
                this.props.publication.fez_record_search_key_publisher.rek_publisher : null,
            doi: this.props.publication.fez_record_search_key_doi ?
                this.props.publication.fez_record_search_key_doi.rek_doi : null
        };

        // eSpace citation view for Book Chapter
        // {Author}{Publication Year| (|).}<i>{Title| |.}</i>{Book Title| |.}{Editor| edited by |.}{Place of Publication| |:}{Publisher| |.}{Start page| |}{End page|-|.}{doi| doi:|}
        return (
            <div className="citationContent citationBookChapter">
                <FontIcon className="material-icons citationIcon" data-place="left">
                    format_quote
                </FontIcon>

                {/* {Author} */}
                <Partials.AuthorsCitationView publication={this.props.publication} />

                {/* {Publication Year| (|).} */}
                <Partials.DateCitationView date={this.props.publication.rek_date} />

                {/* {Title| |.} */}
                <Partials.CitationView className="citationTitle" value={record.title} />

                {/* Book Title| |. */}
                <Partials.CitationView className="citationBookTitle" value={record.bookTitle} />

                {/* {Editor| edited by |.}*/}
                <Partials.EditorsCitationView publication={this.props.publication} />

                {/* {Place of Publication| |:} */}
                <Partials.CitationView className="citationPlaceOfPublication" value={record.placeOfPublication} suffix=":" />

                {/* {Publisher| |.} */}
                <Partials.CitationView className="citationPublisher" value={record.publisher} />

                {/* {Start page| |}{End page|-|.} */}
                <Partials.PageRangeCitationView publication={this.props.publication} />

                {/* {doi| doi:|} */}
                <Partials.DoiCitationView doi={record.doi} />
            </div>
        );
    }
}
