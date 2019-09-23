import {
    PUBLICATION_TYPE_AUDIO_DOCUMENT,
    PUBLICATION_TYPE_BOOK_CHAPTER,
    PUBLICATION_TYPE_BOOK,
    PUBLICATION_TYPE_CONFERENCE_PAPER,
    PUBLICATION_TYPE_CONFERENCE_PROCEEDINGS,
    PUBLICATION_TYPE_DIGILIB_IMAGE,
    PUBLICATION_TYPE_CREATIVE_WORK,
    PUBLICATION_TYPE_DATA_COLLECTION,
    PUBLICATION_TYPE_DEPARTMENT_TECHNICAL_REPORT,
    PUBLICATION_TYPE_IMAGE,
    PUBLICATION_TYPE_JOURNAL_ARTICLE,
    PUBLICATION_TYPE_JOURNAL,
    PUBLICATION_TYPE_MANUSCRIPT,
    PUBLICATION_TYPE_NEWSPAPER_ARTICLE,
    PUBLICATION_TYPE_PATENT,
    PUBLICATION_TYPE_PREPRINT,
    PUBLICATION_TYPE_RESEARCH_REPORT,
    PUBLICATION_TYPE_SEMINAR_PAPER,
    PUBLICATION_TYPE_THESIS,
    PUBLICATION_TYPE_VIDEO_DOCUMENT,
    PUBLICATION_TYPE_WORKING_PAPER,
} from 'config/general';

import {
    audioFields,
    bookChapterFields,
    bookFields,
    conferencePaperFields,
    conferenceProceedingsFields,
    digilibImageFields,
    creativeWorkFields,
    dataCollectionFields,
    departmentTechnicalReportFields,
    imageFields,
    journalArticleFields,
    journalFields,
    manuscriptFields,
    newspaperArticleFields,
    patentFields,
    preprintFields,
    researchReportFields,
    seminarPaperFields,
    thesisFields,
    videoFields,
    workingPaperFields,
} from './fields';

export default {
    [PUBLICATION_TYPE_AUDIO_DOCUMENT]: audioFields,
    [PUBLICATION_TYPE_BOOK_CHAPTER]: bookChapterFields,
    [PUBLICATION_TYPE_BOOK]: bookFields,
    [PUBLICATION_TYPE_CONFERENCE_PAPER]: conferencePaperFields,
    [PUBLICATION_TYPE_CONFERENCE_PROCEEDINGS]: conferenceProceedingsFields,
    [PUBLICATION_TYPE_DIGILIB_IMAGE]: digilibImageFields,
    [PUBLICATION_TYPE_CREATIVE_WORK]: creativeWorkFields,
    [PUBLICATION_TYPE_DATA_COLLECTION]: dataCollectionFields,
    [PUBLICATION_TYPE_DEPARTMENT_TECHNICAL_REPORT]: departmentTechnicalReportFields,
    [PUBLICATION_TYPE_IMAGE]: imageFields,
    [PUBLICATION_TYPE_JOURNAL_ARTICLE]: journalArticleFields,
    [PUBLICATION_TYPE_JOURNAL]: journalFields,
    [PUBLICATION_TYPE_MANUSCRIPT]: manuscriptFields,
    [PUBLICATION_TYPE_NEWSPAPER_ARTICLE]: newspaperArticleFields,
    [PUBLICATION_TYPE_PATENT]: patentFields,
    [PUBLICATION_TYPE_PREPRINT]: preprintFields,
    [PUBLICATION_TYPE_RESEARCH_REPORT]: researchReportFields,
    [PUBLICATION_TYPE_SEMINAR_PAPER]: seminarPaperFields,
    [PUBLICATION_TYPE_THESIS]: thesisFields,
    [PUBLICATION_TYPE_VIDEO_DOCUMENT]: videoFields,
    [PUBLICATION_TYPE_WORKING_PAPER]: workingPaperFields,
};
