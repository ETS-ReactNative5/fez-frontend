export const getActionSuffix = action => action.substring(action.indexOf('@') + 1, action.length);
export const getAction = action => action.substring(0, action.indexOf('@') + 1);

// Academic stats
export const AUTHOR_PUBLICATIONS_STATS_LOADING = 'AUTHOR_PUBLICATIONS_STATS_LOADING';
export const AUTHOR_PUBLICATIONS_STATS_LOADED = 'AUTHOR_PUBLICATIONS_STATS_LOADED';
export const AUTHOR_PUBLICATIONS_COUNT_PER_TYPE_LOADED = 'AUTHOR_PUBLICATIONS_COUNT_PER_TYPE_LOADED';
export const AUTHOR_PUBLICATIONS_BY_YEAR_LOADED = 'AUTHOR_PUBLICATIONS_BY_YEAR_LOADED';
export const AUTHOR_PUBLICATIONS_STATS_FAILED = 'AUTHOR_PUBLICATIONS_STATS_FAILED';
export const AUTHOR_PUBLICATIONS_COUNT_TOTAL_LOADED = 'AUTHOR_PUBLICATIONS_COUNT_TOTAL_LOADED';

// ACML
export const ACML_QUICK_TEMPLATES_LOADING = 'ACML_QUICK_TEMPLATES_LOADING';
export const ACML_QUICK_TEMPLATES_LOADED = 'ACML_QUICK_TEMPLATES_LOADED';
export const ACML_QUICK_TEMPLATES_FAILED = 'ACML_QUICK_TEMPLATES_FAILED';

// Claim publication actions
export const POSSIBLY_YOUR_PUBLICATIONS_LOADING = 'POSSIBLY_YOUR_PUBLICATIONS_LOADING';
export const POSSIBLY_YOUR_PUBLICATIONS_LOADED = 'POSSIBLY_YOUR_PUBLICATIONS_LOADED';
export const POSSIBLY_YOUR_PUBLICATIONS_FACETS_LOADED = 'POSSIBLY_YOUR_PUBLICATIONS_FACETS_LOADED';
export const POSSIBLY_YOUR_PUBLICATIONS_FAILED = 'POSSIBLY_YOUR_PUBLICATIONS_FAILED';

export const COUNT_POSSIBLY_YOUR_PUBLICATIONS_LOADING = 'COUNT_POSSIBLY_YOUR_PUBLICATIONS_LOADING';
export const COUNT_POSSIBLY_YOUR_PUBLICATIONS_LOADED = 'COUNT_POSSIBLY_YOUR_PUBLICATIONS_LOADED';
export const COUNT_POSSIBLY_YOUR_PUBLICATIONS_FAILED = 'COUNT_POSSIBLY_YOUR_PUBLICATIONS_FAILED';

export const HIDE_PUBLICATIONS_LOADING = 'HIDE_PUBLICATIONS_LOADING';
export const HIDE_PUBLICATIONS_LOADED = 'HIDE_PUBLICATIONS_LOADED';
export const HIDE_PUBLICATIONS_FAILED = 'HIDE_PUBLICATIONS_FAILED';
export const HIDE_PUBLICATIONS_FAILED_RESET = 'HIDE_PUBLICATIONS_FAILED_RESET';

export const PUBLICATION_TO_CLAIM_SET = 'PUBLICATION_TO_CLAIM_SET';
export const PUBLICATION_TO_CLAIM_CLEAR = 'PUBLICATION_TO_CLAIM_CLEAR';

export const PUBLICATION_TO_CLAIM_LOADING = 'PUBLICATION_TO_CLAIM_LOADING';
export const PUBLICATION_TO_CLAIM_LOADED = 'PUBLICATION_TO_CLAIM_LOADED';
export const PUBLICATION_TO_CLAIM_FAILED = 'PUBLICATION_TO_CLAIM_FAILED';

export const CLAIM_PUBLICATION_CREATE_PROCESSING = 'CLAIM_PUBLICATION_CREATE_PROCESSING';
export const CLAIM_PUBLICATION_CREATE_COMPLETED = 'CLAIM_PUBLICATION_CREATE_COMPLETED';
export const CLAIM_PUBLICATION_CREATE_FAILED = 'CLAIM_PUBLICATION_CREATE_FAILED';

// Search
/**
 * Action types
 * for specific source actions will create source@SEARCH_ACTION, eg SEARCH_LOADING@wos etc
 */
export const SEARCH_LOADING = 'SEARCH_LOADING';
export const SEARCH_LOADED = 'SEARCH_LOADED';
export const SEARCH_FAILED = 'SEARCH_FAILED';
export const SEARCH_SOURCE_COUNT = 'SEARCH_SOURCE_COUNT';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY';

export const EXPORT_PUBLICATIONS_LOADING = 'EXPORT_PUBLICATIONS_LOADING';
export const EXPORT_PUBLICATIONS_LOADED = 'EXPORT_PUBLICATIONS_LOADED';
export const EXPORT_PUBLICATIONS_FAILED = 'EXPORT_PUBLICATIONS_FAILED';

// authors publications
export const LATEST_PUBLICATIONS_LOADING = 'LATEST_PUBLICATIONS_LOADING';
export const LATEST_PUBLICATIONS_LOADED = 'LATEST_PUBLICATIONS_LOADED';
export const LATEST_PUBLICATIONS_FAILED = 'LATEST_PUBLICATIONS_FAILED';

export const AUTHOR_PUBLICATIONS_LOADING = 'AUTHOR_PUBLICATIONS_LOADING';
export const AUTHOR_PUBLICATIONS_LOADED = 'AUTHOR_PUBLICATIONS_LOADED';
export const AUTHOR_PUBLICATIONS_FAILED = 'AUTHOR_PUBLICATIONS_FAILED';

export const TRENDING_PUBLICATIONS_LOADING = 'TRENDING_PUBLICATIONS_LOADING';
export const TRENDING_PUBLICATIONS_LOADED = 'TRENDING_PUBLICATIONS_LOADED';
export const TRENDING_PUBLICATIONS_FAILED = 'TRENDING_PUBLICATIONS_FAILED';

export const TOP_CITED_PUBLICATIONS_LOADING = 'TOP_CITED_PUBLICATIONS_LOADING';
export const TOP_CITED_PUBLICATIONS_LOADED = 'TOP_CITED_PUBLICATIONS_LOADED';
export const TOP_CITED_PUBLICATIONS_FAILED = 'TOP_CITED_PUBLICATIONS_FAILED';

// Accounts/authors
export const CURRENT_ACCOUNT_LOADING = 'CURRENT_ACCOUNT_LOADING';
export const CURRENT_ACCOUNT_LOADED = 'CURRENT_ACCOUNT_LOADED';
export const CURRENT_ACCOUNT_ANONYMOUS = 'CURRENT_ACCOUNT_ANONYMOUS';
export const CURRENT_ACCOUNT_SESSION_EXPIRED = 'CURRENT_ACCOUNT_SESSION_EXPIRED';
export const CURRENT_ACCOUNT_SESSION_VALID = 'CURRENT_ACCOUNT_SESSION_VALID';
export const CLEAR_CURRENT_ACCOUNT_SESSION_FLAG = 'CLEAR_CURRENT_ACCOUNT_SESSION_FLAG';

export const CURRENT_AUTHOR_LOADING = 'CURRENT_AUTHOR_LOADING';
export const CURRENT_AUTHOR_LOADED = 'CURRENT_AUTHOR_LOADED';
export const CURRENT_AUTHOR_FAILED = 'CURRENT_AUTHOR_FAILED';
export const CURRENT_AUTHOR_SAVING = 'CURRENT_AUTHOR_SAVING';
export const CURRENT_AUTHOR_SAVED = 'CURRENT_AUTHOR_SAVED';
export const CURRENT_AUTHOR_SAVE_FAILED = 'CURRENT_AUTHOR_SAVE_FAILED';
export const CURRENT_AUTHOR_SAVE_RESET = 'CURRENT_AUTHOR_SAVE_RESET';

export const CURRENT_AUTHOR_DETAILS_LOADING = 'CURRENT_AUTHOR_DETAILS_LOADING';
export const CURRENT_AUTHOR_DETAILS_LOADED = 'CURRENT_AUTHOR_DETAILS_LOADED';
export const CURRENT_AUTHOR_DETAILS_FAILED = 'CURRENT_AUTHOR_DETAILS_FAILED';

export const AUTHORS_LOADING = 'AUTHORS_LOADING';
export const AUTHORS_LOADED = 'AUTHORS_LOADED';
export const AUTHORS_LOAD_FAILED = 'AUTHORS_LOAD_FAILED';

// Records
export const CREATE_RECORD_RESET = 'CREATE_RECORD_RESET';
export const CREATE_RECORD_SAVING = 'CREATE_RECORD_SAVING';
export const CREATE_RECORD_SUCCESS = 'CREATE_RECORD_SUCCESS';
export const CREATE_RECORD_FAILED = 'CREATE_RECORD_FAILED';

export const ADMIN_CREATE_RECORD_RESET = 'ADMIN_CREATE_RECORD_RESET';
export const ADMIN_CREATE_RECORD_SAVING = 'ADMIN_CREATE_RECORD_SAVING';
export const ADMIN_CREATE_RECORD_SUCCESS = 'ADMIN_CREATE_RECORD_SUCCESS';
export const ADMIN_CREATE_RECORD_FAILED = 'ADMIN_CREATE_RECORD_FAILED';

export const SEARCH_COLLECTION_LOADING = 'SEARCH_COLLECTION_LOADING';
export const SEARCH_COLLECTION_LOADED = 'SEARCH_COLLECTION_LOADED';
export const SEARCH_COLLECTION_FAILED = 'SEARCH_COLLECTION_FAILED';

export const CREATE_COLLECTION_SAVING = 'CREATE_COLLECTION_SAVING';
export const CREATE_COLLECTION_FAILED = 'CREATE_COLLECTION_FAILED';
export const CREATE_COLLECTION_SUCCESS = 'CREATE_COLLECTION_SUCCESS';

export const SEARCH_COMMUNITIES_LOADING = 'SEARCH_COMMUNITIES_LOADING';
export const SEARCH_COMMUNITIES_LOADED = 'SEARCH_COMMUNITIES_LOADED';
export const SEARCH_COMMUNITIES_FAILED = 'SEARCH_COMMUNITIES_FAILED';

export const CREATE_COMMUNITY_SAVING = 'CREATE_COMMUNITY_SAVING';
export const CREATE_COMMUNITY_FAILED = 'CREATE_COMMUNITY_FAILED';
export const CREATE_COMMUNITY_SUCCESS = 'CREATE_COMMUNITY_SUCCESS';

// View records
export const VIEW_RECORD_CLEAR = 'VIEW_RECORD_CLEAR';

export const VIEW_RECORD_LOADING = 'VIEW_RECORD_LOADING';
export const VIEW_RECORD_LOADED = 'VIEW_RECORD_LOADED';
export const VIEW_RECORD_LOAD_FAILED = 'VIEW_RECORD_LOAD_FAILED';

export const VIEW_RECORD_CULTURAL_SENSITIVITY_STATEMENT_HIDE = 'VIEW_RECORD_CULTURAL_SENSITIVITY_STATEMENT_HIDE';

// Fix records
export const FIX_RECORD_SET = 'FIX_RECORD_SET';
export const FIX_RECORD_CLEAR = 'FIX_RECORD_CLEAR';

export const FIX_RECORD_LOADING = 'FIX_RECORD_LOADING';
export const FIX_RECORD_LOADED = 'FIX_RECORD_LOADED';
export const FIX_RECORD_LOAD_FAILED = 'FIX_RECORD_LOAD_FAILED';

export const FIX_RECORD_PROCESSING = 'FIX_RECORD_PROCESSING';
export const FIX_RECORD_SUCCESS = 'FIX_RECORD_SUCCESS';
export const FIX_RECORD_UNCLAIM_SUCCESS = 'FIX_RECORD_UNCLAIM_SUCCESS';
export const FIX_RECORD_FAILED = 'FIX_RECORD_FAILED';

// Search keys
export const SEARCH_KEY_LOOKUP_LOADING = 'SEARCH_KEY_LOOKUP_LOADING';
export const SEARCH_KEY_LOOKUP_LOADED = 'SEARCH_KEY_LOOKUP_LOADED';
export const SEARCH_KEY_LOOKUP_FAILED = 'SEARCH_KEY_LOOKUP_FAILED';

// Controlled vocabularies
export const VOCABULARIES_LOADING = 'VOCABULARIES_LOADING';
export const VOCABULARIES_LOADED = 'VOCABULARIES_LOADED';
export const VOCABULARIES_LOAD_FAILED = 'VOCABULARIES_LOAD_FAILED';

// Dashboard lure
export const APP_DASHBOARD_POSSIBLY_YOUR_PUBLICATIONS_LURE_HIDE = 'APP_DASHBOARD_POSSIBLY_YOUR_PUBLICATIONS_LURE_HIDE';
export const APP_ALERT_SHOW = 'APP_ALERT_SHOW';
export const APP_ALERT_HIDE = 'APP_ALERT_HIDE';
export const SET_REDIRECT_PATH = 'SET_REDIRECT_PATH';
export const CLEAR_REDIRECT_PATH = 'CLEAR_REDIRECT_PATH';

// News feed
export const NEWS_LOADING = 'NEWS_LOADING';
export const NEWS_LOADED = 'NEWS_LOADED';
export const NEWS_LOAD_FAILED = 'NEWS_LOAD_FAILED';

// Lookup Tools
export const THIRD_PARTY_LOOKUP_TOOL_CLEAR = 'THIRD_PARTY_LOOKUP_TOOL_CLEAR';
export const THIRD_PARTY_LOOKUP_TOOL_LOADING = 'THIRD_PARTY_LOOKUP_TOOL_LOADING';
export const THIRD_PARTY_LOOKUP_TOOL_SUCCESS = 'THIRD_PARTY_LOOKUP_TOOL_SUCCESS';
export const THIRD_PARTY_LOOKUP_TOOL_LOAD_FAILED = 'THIRD_PARTY_LOOKUP_TOOL_LOAD_FAILED';

// List of all actions loading publications - for middleware
export const loadPublicationsListActions = new RegExp(`^(\
${LATEST_PUBLICATIONS_LOADED}|\
${AUTHOR_PUBLICATIONS_LOADED}(@\\w+)|\
${SEARCH_LOADED}(|@\\w+)|\
${POSSIBLY_YOUR_PUBLICATIONS_LOADED}|\
${TRENDING_PUBLICATIONS_LOADED}(@\\w+)|\
${TOP_CITED_PUBLICATIONS_LOADED}(@\\w+)\
)$`);
export const loadPublicationActions = new RegExp(`^(${FIX_RECORD_LOADED}|${VIEW_RECORD_LOADED})$`);

// digiteam batch import - fetch list of directories for importing
export const DIRECTORY_LIST_LOADING = 'DIRECTORY_LIST_LOADING';
export const DIRECTORY_LIST_LOADED = 'DIRECTORY_LIST_LOADED';
export const DIRECTORY_LIST_FAILED = 'DIRECTORY_LIST_FAILED';

// digiteam batch import - submit import request
export const BATCH_IMPORT_REQUESTING = 'BATCH_IMPORT_REQUESTING';
export const BATCH_IMPORT_REQUESTED = 'BATCH_IMPORT_REQUESTED';
export const BATCH_IMPORT_REQUEST_FAILED = 'BATCH_IMPORT_REQUEST_FAILED';

// Security
export const SECURITY_POLICY_LOADING = 'SECURITY_POLICY_LOADING';
export const SECURITY_POLICY_LOADED = 'SECURITY_POLICY_LOADED';
export const SECURITY_POLICY_LOAD_FAILED = 'SECURITY_POLICY_LOAD_FAILED';

export const SECURITY_POLICY_SAVING = 'SECURITY_POLICY_SAVING';
export const SECURITY_POLICY_SAVED = 'SECURITY_POLICY_SAVED';
export const SECURITY_POLICY_SAVE_FAILED = 'SECURITY_POLICY_SAVE_FAILED';

export const ADMIN_UPDATE_WORK_PROCESSING = 'ADMIN_UPDATE_WORK_PROCESSING';
export const ADMIN_UPDATE_WORK_SUCCESS = 'ADMIN_UPDATE_WORK_SUCCESS';
export const ADMIN_UPDATE_WORK_FAILED = 'ADMIN_UPDATE_WORK_PROCESSING';

export const ISSN_SHERPA_LOADING = 'ISSN_SHERPA_LOADING';
export const ISSN_SHERPA_LOADED = 'ISSN_SHERPA_LOADED';
export const ISSN_SHERPA_LOAD_FAILED = 'ISSN_SHERPA_LOAD_FAILED';

export const ISSN_ULRICHS_LOADING = 'ISSN_ULRICHS_LOADING';
export const ISSN_ULRICHS_LOADED = 'ISSN_ULRICHS_LOADED';
export const ISSN_ULRICHS_LOAD_FAILED = 'ISSN_ULRICHS_LOAD_FAILED';
