export { accounts, authorsSearch, currentAuthor, authorDetails, uqrdav10, uqagrinb } from './account';
export {
    collectionRecord,
    collectionSearchList,
    collectionsByCommunity,
    communityRecord,
    communitySearchList,
    externalDoiSearchResultList,
    externalPubMedSearchResultsList,
    externalTitleScopusResultsList,
    externalTitleSearchResultsList,
    incompleteNTROlist,
    incompleteNTROrecord,
    incompleteNTRORecordUQ352045,
    internalTitleSearchList,
    internalTitleSearchListNoResults,
    lookupToolIncites,
    myDatasetList,
    myRecordsList,
    possibleUnclaimedList,
    publicationTypeListAudio,
    publicationTypeListBook,
    publicationTypeListBookChapter,
    publicationTypeListBookEdited,
    publicationTypeListConferencePaper,
    publicationTypeListConferenceProceedings,
    publicationTypeListCreativeWork,
    publicationTypeListDataCollection,
    publicationTypeListDepartmentTechnicalReport,
    publicationTypeListDesign,
    publicationTypeListDigilibImage,
    publicationTypeListGenericDocument,
    publicationTypeListImage,
    publicationTypeListJournal,
    publicationTypeListJournalArticle,
    publicationTypeListManuscript,
    publicationTypeListNewspaperArticle,
    publicationTypeListPatent,
    publicationTypeListPreprint,
    publicationTypeListReferenceEntry,
    publicationTypeListResearchReport,
    publicationTypeListSeminarPaper,
    publicationTypeListThesis,
    publicationTypeListVideo,
    publicationTypeListWorkingPaper,
    record,
    recordVersionLegacy,
    recordVersion,
    recordsTypeList,
    recordWithDatastreams,
    recordWithLotOfAuthors,
    recordWithoutAuthorIds,
    recordWithTiffAndThumbnail,
    unpublishedSearchList,
    UQ716942uqagrinb,
    UQ353708,
    UQ339703,
} from './records';

export { vocabulariesList } from './vocabularies';
export { hindexResponse, trendingPublications, currentAuthorStats } from './academicStats';
export { searchKeyList } from './searchKeys';
export { authorOrcidDetails, orcidSyncStatus, orcidSyncResponse, orcidSyncNullResponse } from './orcid';
export { newsFeed } from './newsFeed';
export { batchImportDirectories } from './batchImportDirectories';
export { sherpaRomeo } from './sherpaRomeo';
export { ulrichs } from './ulrichs';
export { mockRecordToFix } from './testing/records';
export { journalLookup } from './journalLookup';
export { keywordsSearch } from './journals/search/keyword/bio';
export { journalDetails } from './journal';
export { journalsList } from './journals';
export { journalList } from './journalList';

export { bulkUpdatesList } from './bulkUpdates';

// Favourite search mock data
export { default as favouriteSearchList } from './favouriteSearch/favouriteSearchList';
export { default as favouriteSearchItem } from './favouriteSearch/favouriteSearchItem';

// Detailed History Mock Data
export { detailedHistory } from './detailedHistory';

// My editorial appointments mock data
export { default as myEditorialAppointmentsList } from './myEditorialAppointments/myEditorialAppointmentsList';
export { default as myEditorialAppointmentItem } from './myEditorialAppointments/myEditorialAppointmentItem';

export { userList } from './testing/usersList';