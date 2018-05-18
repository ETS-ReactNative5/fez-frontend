import * as actions from './actionTypes';
import {get} from 'repositories/generic';
import * as routes from 'repositories/routes';

/**
 * Load a list of news from fez
 * @returns {action}
 */
export function loadNewsFeed() {
    return dispatch => {
        dispatch({type: actions.NEWS_LOADING});
        return get(routes.GET_NEWS_API())
            .then(newsData => {
                dispatch({
                    type: actions.NEWS_LOADED,
                    payload: newsData
                });
            })
            .catch(error => {
                dispatch({
                    type: actions.NEWS_LOAD_FAILED,
                    payload: error.message
                });
            });
    };
}
