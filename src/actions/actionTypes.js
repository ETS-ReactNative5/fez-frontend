export const getActionSuffix = (action) => (action.substring(action.indexOf('@') + 1, action.length));
export const getAction = (action) => (action.substring(0, action.indexOf('@') + 1));

// Academic stats
export const ACADEMIC_PUBLICATIONS_BY_YEAR_LOADING = 'ACADEMIC_PUBLICATIONS_BY_YEAR_LOADING';
export const ACADEMIC_PUBLICATIONS_BY_YEAR_LOADED = 'ACADEMIC_PUBLICATIONS_BY_YEAR_LOADED';
export const ACADEMIC_PUBLICATIONS_COUNT_LOADED = 'ACADEMIC_PUBLICATIONS_COUNT_LOADED';
export const ACADEMIC_PUBLICATIONS_BY_YEAR_FAILED = 'ACADEMIC_PUBLICATIONS_BY_YEAR_FAILED';

export const ACADEMIC_PUBLICATIONS_STATS_LOADING = 'ACADEMIC_PUBLICATIONS_STATS_LOADING';
export const ACADEMIC_PUBLICATIONS_STATS_LOADED = 'ACADEMIC_PUBLICATIONS_STATS_LOADED';
export const ACADEMIC_PUBLICATIONS_STATS_FAILED = 'ACADEMIC_PUBLICATIONS_STATS_FAILED';

// ACML
export const ACML_QUICK_TEMPLATES_LOADING = 'ACML_QUICK_TEMPLATES_LOADING';
export const ACML_QUICK_TEMPLATES_LOADED = 'ACML_QUICK_TEMPLATES_LOADED';
export const ACML_QUICK_TEMPLATES_FAILED = 'ACML_QUICK_TEMPLATES_FAILED';

// Claim publication actions
export const POSSIBLY_YOUR_PUBLICATIONS_LOADING = 'POSSIBLY_YOUR_PUBLICATIONS_LOADING';
export const POSSIBLY_YOUR_PUBLICATIONS_COMPLETED = 'POSSIBLY_YOUR_PUBLICATIONS_COMPLETED';
export const POSSIBLY_YOUR_PUBLICATIONS_FACETS_COMPLETED = 'POSSIBLY_YOUR_PUBLICATIONS_FACETS_COMPLETED';
export const POSSIBLY_YOUR_PUBLICATIONS_FAILED = 'POSSIBLY_YOUR_PUBLICATIONS_FAILED';

export const COUNT_POSSIBLY_YOUR_PUBLICATIONS_LOADING = 'COUNT_POSSIBLY_YOUR_PUBLICATIONS_LOADING';
export const COUNT_POSSIBLY_YOUR_PUBLICATIONS_COMPLETED = 'COUNT_POSSIBLY_YOUR_PUBLICATIONS_COMPLETED';
export const COUNT_POSSIBLY_YOUR_PUBLICATIONS_FAILED = 'COUNT_POSSIBLY_YOUR_PUBLICATIONS_FAILED';

export const HIDE_PUBLICATIONS_LOADING = 'HIDE_PUBLICATIONS_LOADING';
export const HIDE_PUBLICATIONS_COMPLETED = 'HIDE_PUBLICATIONS_COMPLETED';
export const HIDE_PUBLICATIONS_FAILED = 'HIDE_PUBLICATIONS_FAILED';

export const PUBLICATION_TO_CLAIM_SET = 'PUBLICATION_TO_CLAIM_SET';
export const PUBLICATION_TO_CLAIM_CLEAR = 'PUBLICATION_TO_CLAIM_CLEAR';

export const CLAIM_PUBLICATION_CREATE_PROCESSING = 'CLAIM_PUBLICATION_CREATE_PROCESSING';
export const CLAIM_PUBLICATION_CREATE_COMPLETED = 'CLAIM_PUBLICATION_CREATE_COMPLETED';
export const CLAIM_PUBLICATION_CREATE_FAILED = 'CLAIM_PUBLICATION_CREATE_FAILED';

// Publications types/subtypes
export const PUBLICATION_TYPES_LOADING = 'PUBLICATION_TYPES_LOADING';
export const PUBLICATION_TYPES_LOAD_FAILED = 'PUBLICATION_TYPES_LOAD_FAILED';
export const PUBLICATION_TYPES_LOADED = 'PUBLICATION_TYPES_LOADED';

export const PUBLICATION_SUBTYPES_LOADING = 'PUBLICATION_SUBTYPES_LOADING';
export const PUBLICATION_SUBTYPES_LOADED = 'PUBLICATION_SUBTYPES_LOADED';
export const PUBLICATION_SUBTYPES_LOAD_FAILED = 'PUBLICATION_SUBTYPES_LOAD_FAILED';

// Search
/**
 * Action types
 * for specific source actions will create source@SEARCH_ACTION, eg SEARCH_LOADING@wos etc
 */
export const SEARCH_LOADING = 'SEARCH_LOADING';
export const SEARCH_COMPLETED = 'SEARCH_COMPLETED';
export const SEARCH_FAILED = 'SEARCH_FAILED';
export const SEARCH_SOURCE_COUNT = 'SEARCH_SOURCE_COUNT';

// authors publications
export const LATEST_PUBLICATIONS_LOADING = 'LATEST_PUBLICATIONS_LOADING';
export const LATEST_PUBLICATIONS_COMPLETED = 'LATEST_PUBLICATIONS_COMPLETED';
export const LATEST_PUBLICATIONS_FAILED = 'LATEST_PUBLICATIONS_FAILED';

export const AUTHOR_PUBLICATIONS_LOADING = 'AUTHOR_PUBLICATIONS_LOADING';
export const AUTHOR_PUBLICATIONS_COMPLETED = 'AUTHOR_PUBLICATIONS_COMPLETED';
export const AUTHOR_PUBLICATIONS_FAILED = 'AUTHOR_PUBLICATIONS_FAILED';

export const TRENDING_PUBLICATIONS_LOADING = 'TRENDING_PUBLICATIONS_LOADING';
export const TRENDING_PUBLICATIONS_COMPLETED = 'TRENDING_PUBLICATIONS_COMPLETED';
export const TRENDING_PUBLICATIONS_FAILED = 'TRENDING_PUBLICATIONS_FAILED';

// Accounts/authors
export const ACCOUNT_LOADING = 'ACCOUNT_LOADING';
export const ACCOUNT_LOADED = 'ACCOUNT_LOADED';
export const ACCOUNT_ANONYMOUS = 'ACCOUNT_ANONYMOUS';

export const ACCOUNT_AUTHOR_LOADING = 'ACCOUNT_AUTHOR_LOADING';
export const ACCOUNT_AUTHOR_FAILED = 'ACCOUNT_AUTHOR_FAILED';
export const ACCOUNT_AUTHOR_LOADED = 'ACCOUNT_AUTHOR_LOADED';

export const ACCOUNT_AUTHOR_DETAILS_LOADING = 'ACCOUNT_AUTHOR_DETAILS_LOADING';
export const ACCOUNT_AUTHOR_DETAILS_FAILED = 'ACCOUNT_AUTHOR_DETAILS_FAILED';
export const ACCOUNT_AUTHOR_DETAILS_LOADED = 'ACCOUNT_AUTHOR_DETAILS_LOADED';

export const AUTHORS_LOADING = 'AUTHORS_LOADING';
export const AUTHORS_LOAD_FAILED = 'AUTHORS_LOAD_FAILED';
export const AUTHORS_LOADED = 'AUTHORS_LOADED';

export const AUTHOR_DETAILS_LOADING = 'AUTHOR_DETAILS_LOADING';
export const AUTHOR_DETAILS_FAILED = 'AUTHOR_DETAILS_FAILED';
export const AUTHOR_DETAILS_LOADED = 'AUTHOR_DETAILS_LOADED';

// Records
export const RECORD_RESET = 'RECORD_RESET';
export const RECORD_CREATED = 'RECORD_CREATED';
export const RECORD_CREATE_FAILED = 'RECORD_CREATE_FAILED';
export const RECORD_PROCESSING = 'RECORD_PROCESSING';

// Org units
export const ORG_UNITS_LOADING = 'ORG_UNITS_LOADING';
export const ORG_UNITS_LOADED = 'ORG_UNITS_LOADED';
export const ORG_UNITS_LOAD_FAILED = 'ORG_UNITS_LOAD_FAILED';

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
// TODO: other actions...
