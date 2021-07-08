import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { Alert } from 'modules/SharedComponents/Toolbox/Alert';

import ExactMatchSearchKeywordsList from './partials/ExactMatchSearchKeywordsList';
import SearchKeywordsList from './partials/SearchKeywordsList';
import ForCodeSearchKeywordsList from './partials/ForCodeSearchKeywordsList';

import locale from 'locale/components';

export const KeywordsBrowser = ({ onKeywordAdd }) => {
    const txt = locale.components.journalSearch;

    const journalSearchKeywords = useSelector(state => state.get('journalReducer').journalSearchKeywords);
    const journalSearchKeywordsError = useSelector(state => state.get('journalReducer').journalSearchKeywordsError);

    const hasJournalSearchKeywordsFailed = !!journalSearchKeywordsError;

    const hasExactKeywords = journalSearchKeywords.exactMatch.length > 0;
    const hasTitleKeywords = journalSearchKeywords.titleMatch.length > 0;
    const hasKeywordKeywords = journalSearchKeywords.keywordMatch.length > 0;
    const hasSubjectKeywords = journalSearchKeywords.subjectMatch.length > 0;

    const hasAnyKeywordsLoaded = hasExactKeywords || hasTitleKeywords || hasKeywordKeywords || hasSubjectKeywords;

    /**
     * Handle click event on keyword
     *
     * @param {string} type Type of keyword (Title|Keyword|Subject)
     * @param {string} keyword Keyword string
     * @returns void
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeywordClick = React.useCallback((type, keyword) => onKeywordAdd({ type, text: keyword }), []);

    /**
     * Handle click event on FoR code matching keyword
     *
     * @param {string} keyword Keyword string
     * @returns void
     */
    const handleSubjectKeywordClick = React.useCallback(
        keyword => handleKeywordClick(txt.keywordsBrowser.forCodeMatch.chipTitle, keyword),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    /**
     * Handle click event on Title containing keyword
     *
     * @param {string} keyword Keyword string
     * @returns void
     */
    const handleTitleKeywordClick = React.useCallback(
        keyword => handleKeywordClick(txt.keywordsBrowser.titleMatch.chipTitle, keyword),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    /**
     * Handle click event on Keyword matching keyword
     *
     * @param {string} keyword Keyword string
     * @returns void
     */
    const handleKeywordsKeywordClick = React.useCallback(
        keyword => handleKeywordClick(txt.keywordsBrowser.keywordMatch.chipTitle, keyword),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    if (!hasAnyKeywordsLoaded) {
        return <div />;
    }

    return (
        <Grid container>
            {hasJournalSearchKeywordsFailed && (
                <Grid item>
                    <Alert {...journalSearchKeywordsError} />
                </Grid>
            )}
            {(hasExactKeywords || hasTitleKeywords) && (
                <Grid item xs={12} md={4}>
                    <Grid container>
                        {hasExactKeywords && (
                            <Grid item xs={12}>
                                <ExactMatchSearchKeywordsList
                                    keywordsListTitle={txt.keywordsBrowser.exactMatch.title}
                                    keywordsList={journalSearchKeywords.exactMatch}
                                />
                            </Grid>
                        )}
                        {hasTitleKeywords && (
                            <Grid item xs={12}>
                                <SearchKeywordsList
                                    keywordsListTitle={txt.keywordsBrowser.titleMatch.title}
                                    keywordsList={journalSearchKeywords.titleMatch}
                                    onKeywordClick={handleTitleKeywordClick}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            )}
            {hasKeywordKeywords && (
                <Grid item xs={12} md={4}>
                    <SearchKeywordsList
                        keywordsListTitle={txt.keywordsBrowser.keywordMatch.title}
                        keywordsList={journalSearchKeywords.keywordMatch}
                        onKeywordClick={handleKeywordsKeywordClick}
                    />
                </Grid>
            )}
            {hasSubjectKeywords && (
                <Grid item xs={12} md={4}>
                    <ForCodeSearchKeywordsList
                        keywordsListTitle={txt.keywordsBrowser.forCodeMatch.title}
                        keywordsList={journalSearchKeywords.subjectMatch}
                        onKeywordClick={handleSubjectKeywordClick}
                    />
                </Grid>
            )}
        </Grid>
    );
};

KeywordsBrowser.propTypes = {
    onKeywordAdd: PropTypes.func.isRequired,
};

export default React.memo(KeywordsBrowser);
