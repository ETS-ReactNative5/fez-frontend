import { generateCancelToken } from 'config';
import { MIME_TYPE_WHITELIST } from 'modules/SharedComponents/Toolbox/FileUploader/config';
import * as fileUploadActions from 'modules/SharedComponents/Toolbox/FileUploader/actions';
import { FILE_UPLOAD_API } from './routes';
import { post, put } from './generic';
import Raven from 'raven-js';
import locale from 'locale/global';
const moment = require('moment');

/**
 * Uploads a file directly into an S3 bucket via API
 * @param {string} pid of object, folder name to where file will be uploaded
 * @param {object} file to be uploaded
 * @param {function} dispatch
 * @returns {Promise}
 */
export function putUploadFile(pid, file, dispatch) {
    return post(FILE_UPLOAD_API(), {
        Key: `${pid}/${file.name}`,
        Metadata: {
            dsi_security_policy: file.access_condition_id === 8 ? 1 : 5,
            ...(file.access_condition_id === 9 && !moment(file.date).isSame(moment(), 'day')
                ? { dsi_embargo_date: moment(file.date).format(locale.global.embargoDateFormat) }
                : {}),
        },
    })
        .then(uploadUrl => {
            const extension = file.name
                .split('.')
                .pop()
                .toString()
                .toLowerCase();
            const headers = {};
            if (MIME_TYPE_WHITELIST.hasOwnProperty(extension)) {
                headers['Content-Type'] = MIME_TYPE_WHITELIST[extension];
            }
            const options = {
                headers,
                onUploadProgress: fileUploadActions.notifyFileUploadProgress(file.name, dispatch),
                cancelToken: generateCancelToken().token,
            };
            const fileUrl = Array.isArray(uploadUrl) && uploadUrl.length > 0 ? uploadUrl[0] : uploadUrl;
            return put({ apiUrl: fileUrl }, file.fileData, options);
        })
        .then(uploadResponse => {
            fileUploadActions.notifyFileUploadProgress(file.name, dispatch)({ loaded: 1, total: 1 });
            return Promise.resolve(uploadResponse);
        })
        .catch(error => {
            if (process.env.ENABLE_LOG) Raven.captureException(error);
            if (fileUploadActions) {
                dispatch(fileUploadActions.notifyUploadFailed(file.name));
            }
            return Promise.reject(error);
        });
}

/**
 * Uploads a list of files
 * @param {string} pid of object, folder name to where file will be uploaded
 * @param {array} files to be uploaded
 * @param {function} dispatch
 * @returns {Promise.all}
 */
export function putUploadFiles(pid, files, dispatch) {
    const filenameList = files && Array.isArray(files) && files.map(item => item.name);
    const checkIfDuplicateExists = w => {
        return new Set(w).size !== w.length;
    };
    const duplicateFileNames = checkIfDuplicateExists(filenameList);
    if (!!duplicateFileNames) {
        Raven.captureMessage(`Duplicate files found when uploading files for PID ${pid} : ${filenameList}`);
    }
    dispatch(fileUploadActions.startFileUpload());
    const uploadFilesPromises = files.map(file => {
        return putUploadFile(pid, file, dispatch);
    });

    return Promise.all(uploadFilesPromises);
}
