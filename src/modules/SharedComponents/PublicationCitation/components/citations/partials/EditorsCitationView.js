import React from 'react';
import PropTypes from 'prop-types';
import AuthorsCitationView from './AuthorsCitationView';
import {pathConfig} from 'config/routes';

const EditorsCitationView = ({publication, prefix = ' edited by ', suffix = '. ', separator = ', ', showLink = false, initialNumberOfEditors = 10}) => {
    return (
        <AuthorsCitationView
            publication={publication}
            className="citationEditors"
            prefix={prefix}
            suffix={suffix}
            separator={separator}
            searchKey={{
                key: 'fez_record_search_key_contributor',
                subkey: 'rek_contributor',
                order: 'rek_contributor_order'
            }}
            idSearchKey={{
                idKey: 'fez_record_search_key_contributor_id',
                idSubkey: 'rek_contributor_id',
                idOrder: 'rek_contributor_id_order'
            }}
            initialNumberOfAuthors={initialNumberOfEditors}
            showLink={showLink}
            getLink={pathConfig.list.contributor}
        />
    );
};

EditorsCitationView.propTypes = {
    publication: PropTypes.object.isRequired,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    separator: PropTypes.string,
    initialNumberOfEditors: PropTypes.number,
    showLink: PropTypes.bool
};

export default EditorsCitationView;
