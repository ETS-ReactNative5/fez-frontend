import * as actions from 'actions/actionTypes';
import { pathConfig } from 'config/pathConfig';

const getExactMatchKeywords = keywordsResponse => {
    const exactMatch =
        !!keywordsResponse.titleExactMatch &&
        keywordsResponse.titleExactMatch.length > 0 &&
        keywordsResponse.titleExactMatch.map(journal => ({
            keyword: journal.jnl_title,
            title: journal.jnl_title,
            href: pathConfig.journal.view(journal.jnl_id),
        }));

    return exactMatch || [];
};

const getTitleMatchKeywords = (titleFuzzyMatch, query) => {
    const regexString = `\\w*${query}\\w*`;
    const regex = new RegExp(regexString, 'ig');
    const titleMatch =
        !!titleFuzzyMatch &&
        titleFuzzyMatch.length > 0 &&
        titleFuzzyMatch.reduce((matches, journal) => [...matches, ...journal.jnl_title.match(regex)], []);
    return Array.from(new Set(titleMatch))
        .filter(keyword => !!keyword)
        .map(keyword => ({ keyword }));
};

const getKeywordMatchKeywords = (descriptionFuzzyMatch, query) => {
    const regexString = `\\w*${query}\\w*`;
    const regex = new RegExp(regexString, 'ig');

    const keywordMatch =
        !!descriptionFuzzyMatch &&
        descriptionFuzzyMatch.length > 0 &&
        descriptionFuzzyMatch.reduce(
            // Loop through each journal
            (matches, journal) =>
                !!journal.fez_journal_issn && journal.fez_journal_issn.length > 0
                    ? [
                          ...matches,
                          ...journal.fez_journal_issn.reduce(
                              // Loop through each journal issn object
                              (matchFromEachIssn, issn) =>
                                  (!!issn.fez_ulrichs.ulr_description && [
                                      ...matchFromEachIssn,
                                      ...issn.fez_ulrichs.ulr_description.match(regex),
                                  ]) || [...matchFromEachIssn],
                              [],
                          ),
                      ]
                    : [...matches],
            [],
        );

    return Array.from(new Set(keywordMatch))
        .filter(keyword => !!keyword)
        .map(keyword => ({ keyword }));
};

const getSubjectMatchKeywords = keywordsResponse => {
    const subjectMatch = !!keywordsResponse.subject && keywordsResponse.subject.map(keyword => ({ ...keyword }));

    return subjectMatch;
};

const getKeywords = (keywordsResponse, query) => {
    const exactMatch = getExactMatchKeywords(keywordsResponse);
    const titleMatch = getTitleMatchKeywords([...keywordsResponse.titleFuzzyMatch], query);
    const keywordMatch = getKeywordMatchKeywords([...keywordsResponse.descriptionFuzzyMatch], query);
    const subjectMatch = getSubjectMatchKeywords(keywordsResponse);

    return {
        exactMatch,
        titleMatch,
        keywordMatch,
        subjectMatch,
    };
};

const journalSearchKeywordsEnhancer = () => next => action => {
    if (action.type === actions.JOURNAL_SEARCH_KEYWORDS_LOADED) {
        const keywords = getKeywords(action.payload, action.query);
        console.log(keywords);
        return next({ ...action, payload: keywords });
    }

    return next(action);
};

export default journalSearchKeywordsEnhancer;
