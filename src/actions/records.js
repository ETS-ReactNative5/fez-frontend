import {post, patch} from 'repositories/generic';
import * as routes from 'repositories/routes';
import {putUploadFiles} from '../repositories';
import * as transformers from './transformers';
import {NEW_RECORD_DEFAULT_VALUES} from 'config/general';
import * as actions from './actionTypes';

/**
 * Save a new record involves up to three steps: create a new record, upload files, update record with uploaded files.
 * If error occurs on any stage failed action is dispatched
 * @param {object} data to be posted, refer to backend API
 * @returns {promise} - this method is used by redux form onSubmit which requires Promise resolve/reject as a return
 */
export function createNewRecord(data) {
    return dispatch => {
        dispatch({type: actions.CREATE_RECORD_SAVING});

        // set default values, links
        const recordRequest = {
            ...NEW_RECORD_DEFAULT_VALUES,
            ...JSON.parse(JSON.stringify(data)),
            ...transformers.getRecordLinkSearchKey(data),
            ...transformers.getRecordAuthorsSearchKey(data.authors || data.currentAuthor),
            ...transformers.getRecordAuthorsIdSearchKey(data.authors || data.currentAuthor),
            ...transformers.getRecordContributorsSearchKey(data.editors),
            ...transformers.getRecordContributorsIdSearchKey(data.editors),
            ...transformers.getRecordSupervisorsSearchKey(data.supervisors),
            ...transformers.getRecordSubjectSearchKey(data.fieldOfResearch)
        };

        // delete extra form values from request object
        if (recordRequest.authors) delete recordRequest.authors;
        if (recordRequest.editors) delete recordRequest.editors;
        if (recordRequest.files) delete recordRequest.files;
        if (recordRequest.currentAuthor) delete recordRequest.currentAuthor;
        if (recordRequest.supervisors) delete recordRequest.supervisors;
        if (recordRequest.fieldOfResearch) delete recordRequest.fieldOfResearch;

        let newRecord = null;
        const hasFilesToUpload = data.files && data.files.queue && data.files.queue.length > 0;
        const recordPatch = hasFilesToUpload ? {...transformers.getRecordFileAttachmentSearchKey(data.files.queue)} : null;

        return post(routes.NEW_RECORD_API(), recordRequest)
            .then(response => {
                // save new record response
                newRecord = response.data;
                return response;
            })
            .then(() =>(hasFilesToUpload ? putUploadFiles(newRecord.rek_pid, data.files.queue, dispatch) : newRecord))
            .then(() => (hasFilesToUpload ? patch(routes.EXISTING_RECORD_API({pid: newRecord.rek_pid}), recordPatch) : newRecord))
            .then((response) => {
                dispatch({
                    type: actions.CREATE_RECORD_SUCCESS,
                    payload: response.data ? response.data : newRecord
                });
                return Promise.resolve(response.data ? response.data : newRecord);
            })
            .catch(error => {
                // record was created, but file upload or record patch failed
                if (!!newRecord && !!newRecord.rek_pid) {
                    dispatch({
                        type: actions.CREATE_RECORD_SUCCESS,
                        payload: {
                            newRecord: newRecord,
                            fileUploadFailed: true
                        }
                    });

                    return Promise.resolve(newRecord);
                }

                dispatch({
                    type: actions.CREATE_RECORD_FAILED,
                    payload: error.message
                });

                return Promise.reject(error);
            });
    };
}


/**
 * Submit thesis involves two steps: upload files, create record with uploaded files.
 * If error occurs on any stage failed action is dispatched
 * @param {object} data to be posted, refer to backend API
 * @returns {promise} - this method is used by redux form onSubmit which requires Promise resolve/reject as a return
 */
export function submitThesis(data, author) {
    return dispatch => {
        const hasFilesToUpload = data.files && data.files.queue && data.files.queue.length > 0;
        if (!hasFilesToUpload) {
            // reject thesis submission, files are required
            return Promise.reject('Please attach files to proceed with thesis submission');
        }
        // set default values, links
        const recordRequest = {
            ...JSON.parse(JSON.stringify(data)),
            ...transformers.getRecordAuthorsSearchKey(data.currentAuthor),
            ...transformers.getRecordAuthorsIdSearchKey(data.currentAuthor),
            ...transformers.getRecordSupervisorsSearchKey(data.supervisors),
            ...transformers.getRecordSubjectSearchKey(data.fieldOfResearch),
            ...transformers.getRecordFileAttachmentSearchKey(data.files.queue)
        };

        // delete extra form values from request object
        if (recordRequest.authors) delete recordRequest.authors;
        if (recordRequest.editors) delete recordRequest.editors;
        if (recordRequest.files) delete recordRequest.files;
        if (recordRequest.currentAuthor) delete recordRequest.currentAuthor;
        if (recordRequest.supervisors) delete recordRequest.supervisors;
        if (recordRequest.fieldOfResearch) delete recordRequest.fieldOfResearch;

        let fileUploadSucceeded = false;
        dispatch({type: actions.CREATE_RECORD_SAVING});

        // debugger;
        return putUploadFiles(`UQ:${author.aut_student_username}`, data.files.queue, dispatch)
            .then((response) => {
                fileUploadSucceeded = !!response;
                return post(routes.NEW_RECORD_API(), recordRequest);
            })
            .then(response => {
                dispatch({
                    type: actions.CREATE_RECORD_SUCCESS,
                    payload: {
                        newRecord: response
                    }
                });
                return response;
            })
            .catch(error => {
                const specificError = !fileUploadSucceeded
                    ? 'File upload failed. Issue has been created to notify eSpace administrators. '
                    : 'Error occurred while saving record to eSpace. ';
                const compositeError = `${specificError} ${ error.message ? `(${error.message})` : '' }`;

                dispatch({
                    type: actions.CREATE_RECORD_FAILED,
                    payload: compositeError
                });

                return Promise.reject(compositeError);
            });
    };
}
/**
 * Clear new record
 * @returns {action}
 */
export function clearNewRecord() {
    return dispatch => {
        dispatch({
            type: actions.CREATE_RECORD_RESET
        });
    };
}
