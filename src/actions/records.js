import {postRecord, patchRecord, putUploadFiles} from '../repositories';
import * as transformers from './transformers';

export const RECORD_RESET = 'RECORD_RESET';
export const RECORD_CREATED = 'RECORD_CREATED';
export const RECORD_CREATE_FAILED = 'RECORD_CREATE_FAILED';
export const RECORD_PROCESSING = 'RECORD_PROCESSING';
import * as config from 'config/general';
import {fileUploadActions} from 'uqlibrary-react-toolbox';

/**
 * Save a new record involves up to three steps: create a new record, upload files, update record with uploaded files.
 * If error occurs on any stage failed action is displated
 * @param {object} data to be posted, refer to backend API
 * @param {array} files to be uploaded for this record
 * @returns {action}
 */
export function createNewRecord(data) {
    console.log(data);
    return dispatch => {
        dispatch({type: RECORD_PROCESSING});

        // set default values, links
        const recordRequest = {
            ...config.NEW_RECORD_DEFAULT_VALUES,
            ...data,
            ...transformers.recordRekLink(data),
            ...transformers.recordAuthors(data.authors),
            ...transformers.recordAuthorsId(data.authors)
        };

        console.log(data.authors);

        // delete extra form values from request object
        if (recordRequest.authors) delete recordRequest.authors;
        if (recordRequest.editors) delete recordRequest.editors;
        if (recordRequest.files) delete recordRequest.files;
        if (recordRequest.author) delete recordRequest.author;

        return postRecord(recordRequest)
            .then(response => {
                // set a pid on a new record
                data.rek_pid = response.data.rek_pid;
                // process files
                if (!data.files || data.files.length === 0) return response;
                return putUploadFiles(response.data.rek_pid, data.files, dispatch);
            })
            .then(response => {
                if (!data.files || data.files.length === 0) return response;
                // process uploaded files into API format for a patch
                const recordPatch = {
                    ...transformers.recordFileAttachment(data.files)
                };
                return patchRecord(data.rek_pid, recordPatch);
            })
            .then(response => {
                dispatch({
                    type: RECORD_CREATED,
                    payload: response.data
                });
                dispatch(fileUploadActions.clearFileUpload());
                return Promise.resolve(response.data);
            })
            .catch(error => {
                dispatch({
                    type: RECORD_CREATE_FAILED,
                    payload: error
                });
                return Promise.reject(error);
            });
    };
}

/**
 * Reset record state
 * @returns {action}
 */
export function resetRecordState() {
    return dispatch => dispatch({type: RECORD_RESET});
}
