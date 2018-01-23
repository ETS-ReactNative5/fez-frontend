import * as actions from './actionTypes';
import {get, patch} from 'repositories/generic';
import * as routes from 'repositories/routes';
import {pathConfig} from 'config/routes';
import * as transformers from './transformers';

/**
 * Returns the authors list based on a query, filtered locally by filterBy function
 * @param {string} query passed on to api call
 * @param {function} filterBy function to filter/transform results from api list, eg users with org ids only
 * @returns {action}
 */
export function searchAuthors(query, filterBy) {
    return dispatch => {
        dispatch({type: actions.AUTHORS_LOADING});

        return get(routes.AUTHORS_SEARCH_API({query: query}))
            .then(response => {
                const data = response.data.map((item) => {
                    item.displayName = item.aut_title + ' ' + item.aut_display_name +
                        (item.aut_org_username ? ' (' + item.aut_org_username + ')' : '') +
                        (item.aut_student_username ? ' (' + item.aut_student_username + ')' : '');
                    return item;
                });

                dispatch({
                    type: actions.AUTHORS_LOADED,
                    payload: filterBy ? data.filter(filterBy) : data
                });
            })
            .catch(error => {
                dispatch({
                    type: actions.AUTHORS_LOAD_FAILED,
                    payload: error.message
                });
            });
    };
}

/**
 * Update current author record
 * @param {string} authorId
 * @param {object} patch request
 * @returns {Promise}
 */
export function updateCurrentAuthor(authorId, data) {
    return dispatch => {
        dispatch({type: actions.CURRENT_AUTHOR_SAVING});

        return patch(routes.AUTHOR_API({authorId}), data)
            .then((response) => {
                dispatch({
                    type: actions.CURRENT_AUTHOR_SAVED,
                    payload: response.data
                });

                return Promise.resolve(response.data);
            })
            .catch(error => {
                dispatch({
                    type: actions.CURRENT_AUTHOR_SAVE_FAILED,
                    payload: error.message
                });

                return Promise.reject(error);
            });
    };
}

/**
 * Returns orcid access token for an author and updates author details with linked ORCID id
 * @param {string} userId
 * @param {string} authorId
 * @param {string} orcidCode - code return in query string from ORCID authorisation process
 * @returns {action}
 */
export function linkAuthorOrcidId(userId, authorId, orcidCode) {
    return dispatch => {
        dispatch({type: actions.CURRENT_AUTHOR_SAVING});

        let orcidId = null;

        // parameters required for AUTHOR_ORCID_DETAILS_API call
        // TODO: redirUri should be moved to backend (API update pending)
        const params = {
            code: orcidCode,
            redirUri: pathConfig.authorIdentifiers.orcid.absoluteLink
        };

        // get ORCID id for current user
        return get(routes.AUTHOR_ORCID_DETAILS_API({userId: userId, params: params}))
            .then((response) => {
                console.log(response);
                orcidId = response.orcid;

                // response should contain orcid id
                if (!orcidId) {
                    return Promise.reject(new Error('ORCID id is missing in API response. '));
                }

                // patch author record with corresponding ORCID id
                const authorPatchRequest = transformers.getAuthorIdentifierOrcidPatchRequest(authorId, orcidId, response);
                return patch(routes.AUTHOR_API({authorId}), authorPatchRequest);
            })
            .then((response) => {
                // author details saved successfully
                dispatch({
                    type: actions.CURRENT_AUTHOR_SAVED,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: actions.CURRENT_AUTHOR_SAVE_FAILED,
                    payload: error.message
                });
            });
    };
}

/*
* Dispatch action to notify reducer to clean up current author saving state (eg progress, errors)
* @returns {action}
* */
export function resetSavingAuthorState() {
    return dispatch => {
        dispatch({type: actions.CURRENT_AUTHOR_SAVE_RESET});
    };
}
