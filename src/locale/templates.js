// import {APP_URL} from 'config';

export default {
    issues: {
        fixRecord: ({comments = '', link = '', files = ''}) =>
            `${comments && ('Added comments : ' + comments + '\n')}` +
            `${link && ('Added link     : ' + link + '\n') || ''}` +
            `${files && ('Added files    : ' + files) || ''}`
    }
};
