/* eslint-disable max-len */
import Immutable from 'immutable';

import { validation } from 'config';

import locale from 'locale/components';
import { default as formLocale } from 'locale/publicationForm';
import {
    AIATSIS_CODES_VOCAB_ID,
    FIELD_OF_RESEARCH_VOCAB_ID,
    PUBLICATION_TYPE_AUDIO_DOCUMENT,
    PUBLICATION_TYPE_BOOK,
    PUBLICATION_TYPE_BOOK_CHAPTER,
    PUBLICATION_TYPE_CONFERENCE_PAPER,
    PUBLICATION_TYPE_CREATIVE_WORK,
    PUBLICATION_TYPE_DATA_COLLECTION,
    PUBLICATION_TYPE_DESIGN,
    PUBLICATION_TYPE_DIGILIB_IMAGE,
    PUBLICATION_TYPE_GENERIC_DOCUMENT,
    PUBLICATION_TYPE_IMAGE,
    PUBLICATION_TYPE_JOURNAL_ARTICLE,
    PUBLICATION_TYPE_MANUSCRIPT,
    PUBLICATION_TYPE_PATENT,
    PUBLICATION_TYPE_PREPRINT,
    PUBLICATION_TYPE_RESEARCH_REPORT,
    PUBLICATION_TYPE_THESIS,
    PUBLICATION_TYPE_VIDEO_DOCUMENT,
} from 'config/general';

import { AccessSelectorField } from 'modules/SharedComponents/Toolbox/AccessSelectorField';
import { AlternateGenreField } from 'modules/SharedComponents/Toolbox/AlternateGenreField';
import { AttachedFilesField } from 'modules/SharedComponents/Toolbox/AttachedFilesField';
import { AudienceSizeField } from 'modules/SharedComponents/Toolbox/AudienceSizeField';
import {
    AuthorIdField,
    CollectionField,
    FieldOfResearchListField,
    OrgUnitNameField,
    OrgNameField,
    RelatedDatasetAndPublicationListField,
    SeriesField,
} from 'modules/SharedComponents/LookupFields';
import { ContentIndicatorsField } from 'modules/SharedComponents/Toolbox/ContentIndicatorsField';
import { ContributorsEditorField } from 'modules/SharedComponents/ContributorsEditor';
import { CopyrightAgreementField } from 'modules/SharedComponents/Toolbox/CopyrightAgreementField';
import { DatePickerField } from 'modules/SharedComponents/Toolbox/DatePickerField';
import { FileUploadField } from 'modules/SharedComponents/Toolbox/FileUploader';
import { GeoCoordinatesField } from 'modules/SharedComponents/Toolbox/GeoCoordinatesField';
import { GrantListEditorField } from 'modules/SharedComponents/GrantListEditor';
import { HerdcCodeField } from 'modules/SharedComponents/Toolbox/HerdcCodeField';
import { HerdcStatusField } from 'modules/SharedComponents/Toolbox/HerdcStatusField';
import { InstitutionalStatusField } from 'modules/SharedComponents/Toolbox/InstitutionalStatusField';
import { LanguageField } from 'modules/SharedComponents/Toolbox/LanguageField';
import { LicenseSelectorField } from 'modules/SharedComponents/Toolbox/LicenseSelectorField';
import { AndsCollectionTypesField } from 'modules/SharedComponents/Toolbox/AndsCollectionTypesField';
import {
    LinkInfoListEditorField,
    ListEditorField,
    ScaleOfSignificanceListEditorField,
} from 'modules/SharedComponents/Toolbox/ListEditor';
import { OAStatusField } from 'modules/SharedComponents/Toolbox/OAStatusField';
import { PublicationSubtypeField, ThesisSubtypeField } from 'modules/SharedComponents/PublicationSubtype';
import { PubmedDocTypesField } from 'modules/SharedComponents/Toolbox/PubmedDocTypesField';
import { QualityIndicatorField } from 'modules/SharedComponents/Toolbox/QualityIndicatorField';
import { RefereedSourceField } from 'modules/SharedComponents/Toolbox/RefereedSourceField';
import { RichEditorField } from 'modules/SharedComponents/RichEditor';
import { ScopusDocTypesField } from 'modules/SharedComponents/Toolbox/ScopusDocTypesField';
import { TextField as GenericTextField } from 'modules/SharedComponents/Toolbox/TextField';
import { WoSDocTypesField } from 'modules/SharedComponents/Toolbox/WoSDocTypesField';
import IssnListEditorField from '../../modules/SharedComponents/Toolbox/ListEditor/IssnListEditorField';

export default {
    default: {
        rek_title: {
            component: RichEditorField,
            componentProps: {
                name: 'bibliographicSection.rek_title',
                title: 'Formatted title',
                titleProps: {
                    variant: 'caption',
                    style: {
                        opacity: 0.666,
                    },
                },
                height: 100,
                format: value => Immutable.Map(value),
                validate: [validation.required],
                required: true,
            },
        },
        rek_herdc_notes: {
            component: RichEditorField,
            componentProps: {
                name: 'adminSection.rek_herdc_notes',
                title: 'HERDC notes',
                disabled: true,
                titleProps: {
                    variant: 'caption',
                    style: {
                        opacity: 0.666,
                    },
                },
                height: 100,
                format: value => Immutable.Map(value),
            },
        },
        internalNotes: {
            component: RichEditorField,
            componentProps: {
                name: 'adminSection.internalNotes',
                title: 'Internal notes',
                titleProps: {
                    variant: 'caption',
                    style: {
                        opacity: 0.666,
                    },
                },
                height: 100,
                format: value => Immutable.Map(value),
            },
        },
        fez_record_search_key_isi_loc: {
            component: GenericTextField,
            componentProps: {
                name: 'identifiersSection.fez_record_search_key_isi_loc.rek_isi_loc',
                fullWidth: true,
                label: 'WoS ID',
                placeholder: '',
            },
        },
        fez_record_search_key_scopus_id: {
            component: GenericTextField,
            componentProps: {
                name: 'identifiersSection.fez_record_search_key_scopus_id.rek_scopus_id',
                fullWidth: true,
                label: 'Scopus ID',
                placeholder: '',
            },
        },
        fez_record_search_key_pubmed_id: {
            component: GenericTextField,
            componentProps: {
                name: 'identifiersSection.fez_record_search_key_pubmed_id.rek_pubmed_id',
                fullWidth: true,
                label: 'PubMed ID',
                placeholder: '',
            },
        },
        fez_record_search_key_pubmed_central_id: {
            component: GenericTextField,
            componentProps: {
                name: 'identifiersSection.fez_record_search_key_pubmed_central_id.rek_pubmed_central_id',
                fullWidth: true,
                label: 'PubMed Central ID',
                placeholder: '',
            },
        },
        rek_wok_doc_type: {
            component: WoSDocTypesField,
            componentProps: {
                name: 'identifiersSection.rek_wok_doc_type',
                label: 'WoS doc type(s)',
                placeholder: '',
            },
        },
        rek_scopus_doc_type: {
            component: ScopusDocTypesField,
            componentProps: {
                name: 'identifiersSection.rek_scopus_doc_type',
                label: 'Scopus doc type(s)',
                placeholder: '',
            },
        },
        rek_pubmed_doc_type: {
            component: PubmedDocTypesField,
            componentProps: {
                name: 'identifiersSection.rek_pubmed_doc_type',
                label: 'PubMed doc type(s)',
                placeholder: '',
            },
        },
        links: {
            component: LinkInfoListEditorField,
            componentProps: {
                name: 'identifiersSection.links',
                label: 'Link',
                placeholder: '',
                locale: locale.components.linkListForm.field,
            },
        },
        rek_description: {
            component: RichEditorField,
            componentProps: {
                name: 'bibliographicSection.rek_description',
                title: 'Abstract / Description',
                titleProps: {
                    variant: 'caption',
                    style: {
                        opacity: 0.666,
                    },
                },
                height: 100,
                format: value => Immutable.Map(value),
            },
        },
        rek_date: {
            component: DatePickerField,
            componentProps: {
                name: 'bibliographicSection.rek_date',
                label: 'Publication date',
                placeholder: 'Publication date',
                required: true,
                fullWidth: true,
                validate: [validation.required],
            },
        },
        collections: {
            component: CollectionField,
            componentProps: {
                floatingLabelText: 'Member of collections',
                hintText: 'Begin typing to select and add collection(s)',
                name: 'additionalInformationSection.collections',
                required: true,
                fullwidth: true,
                validate: [validation.requiredList],
            },
        },
        rek_subtype: {
            component: PublicationSubtypeField,
            componentProps: {
                name: 'additionalInformationSection.rek_subtype',
                label: 'Work sub-type',
                required: true,
                placeholder: '',
                validate: [validation.required],
            },
        },
        languages: {
            component: LanguageField,
            componentProps: {
                name: 'bibliographicSection.languages',
                label: 'Language of work',
                placeholder: 'Language of work',
                multiple: true,
            },
        },
        fez_record_search_key_audience_size: {
            component: AudienceSizeField,
            componentProps: {
                name: 'ntroSection.fez_record_search_key_audience_size.rek_audience_size',
                fullWidth: true,
                label: 'Audience size',
            },
        },
        fez_record_search_key_journal_name: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_journal_name.rek_journal_name',
                fullWidth: true,
                label: 'Journal name',
                placeholder: '',
                required: true,
                validate: [validation.required],
            },
        },
        fez_record_search_key_book_title: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_book_title.rek_book_title',
                fullWidth: true,
                label: 'Book title',
                placeholder: '',
                required: true,
                validate: [validation.required],
            },
        },
        fez_record_search_key_conference_name: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_conference_name.rek_conference_name',
                fullWidth: true,
                label: 'Conference name',
                placeholder: 'Conference name',
                required: true,
                validate: [validation.required],
            },
        },
        fez_record_search_key_proceedings_title: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_proceedings_title.rek_proceedings_title',
                fullWidth: true,
                label: 'Proceedings title',
                placeholder: 'Proceedings title',
            },
        },
        fez_record_search_key_native_script_book_title: {
            component: GenericTextField,
            componentProps: {
                name:
                    'bibliographicSection.fez_record_search_key_native_script_book_title.rek_native_script_book_title',
                fullWidth: true,
                label: 'Native script book title',
                placeholder: '',
            },
        },
        fez_record_search_key_roman_script_book_title: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_roman_script_book_title.rek_roman_script_book_title',
                fullWidth: true,
                label: 'Roman script book title',
                placeholder: '',
            },
        },
        fez_record_search_key_translated_book_title: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_translated_book_title.rek_translated_book_title',
                fullWidth: true,
                label: 'Translated book title',
                placeholder: '',
            },
        },
        fez_record_search_key_native_script_conference_name: {
            component: GenericTextField,
            componentProps: {
                name:
                    'bibliographicSection.fez_record_search_key_native_script_conference_name.rek_native_script_conference_name',
                fullWidth: true,
                label: 'Native script conference name',
                placeholder: 'Native script conference name',
            },
        },
        fez_record_search_key_roman_script_conference_name: {
            component: GenericTextField,
            componentProps: {
                name:
                    'bibliographicSection.fez_record_search_key_roman_script_conference_name.rek_roman_script_conference_name',
                fullWidth: true,
                label: 'Roman script conference name',
                placeholder: 'Roman script conference name',
            },
        },
        fez_record_search_key_translated_conference_name: {
            component: GenericTextField,
            componentProps: {
                name:
                    'bibliographicSection.fez_record_search_key_translated_conference_name.rek_translated_conference_name',
                fullWidth: true,
                label: 'Translated conference name',
                placeholder: 'Translated conference name',
            },
        },
        fez_record_search_key_native_script_proceedings_title: {
            component: GenericTextField,
            componentProps: {
                name:
                    'bibliographicSection.fez_record_search_key_native_script_proceedings_title.rek_native_script_proceedings_title',
                fullWidth: true,
                label: 'Native script proceedings title',
                placeholder: 'Native script proceedings title',
            },
        },
        fez_record_search_key_roman_script_proceedings_title: {
            component: GenericTextField,
            componentProps: {
                name:
                    'bibliographicSection.fez_record_search_key_roman_script_proceedings_title.rek_roman_script_proceedings_title',
                fullWidth: true,
                label: 'Roman script proceedings title',
                placeholder: 'Roman script proceedings title',
            },
        },
        fez_record_search_key_translated_proceedings_title: {
            component: GenericTextField,
            componentProps: {
                name:
                    'bibliographicSection.fez_record_search_key_translated_proceedings_title.rek_translated_proceedings_title',
                fullWidth: true,
                label: 'Translated proceedings title',
                placeholder: 'Translated proceedings title',
            },
        },
        fez_record_search_key_doi: {
            component: GenericTextField,
            componentProps: {
                name: 'identifiersSection.fez_record_search_key_doi.rek_doi',
                fullWidth: true,
                label: 'DOI',
                placeholder: '',
                validate: [validation.doi],
            },
        },
        fez_record_search_key_place_of_publication: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_place_of_publication.rek_place_of_publication',
                fullWidth: true,
                label: 'Place of publication',
                placeholder: '',
            },
        },
        fez_record_search_key_publisher: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_publisher.rek_publisher',
                fullWidth: true,
                label: 'Publisher name',
                placeholder: '',
            },
        },
        fez_record_search_key_volume_number: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_volume_number.rek_volume_number',
                fullWidth: true,
                label: 'Volume',
                placeholder: '',
            },
        },
        fez_record_search_key_issue_number: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_issue_number.rek_issue_number',
                fullWidth: true,
                label: 'Issue',
                placeholder: '',
            },
        },
        fez_record_search_key_article_number: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_article_number.rek_article_number',
                fullWidth: true,
                label: 'Article number',
                placeholder: '',
            },
        },
        fez_record_search_key_patent_number: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_patent_number.rek_patent_number',
                fullWidth: true,
                label: 'Patent number',
                placeholder: '',
            },
        },
        fez_record_search_key_start_page: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_start_page.rek_start_page',
                fullWidth: true,
                label: 'Start page',
                placeholder: '',
            },
        },
        fez_record_search_key_end_page: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_end_page.rek_end_page',
                fullWidth: true,
                label: 'End page',
                placeholder: '',
            },
        },
        fez_record_search_key_oa_embargo_days: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_oa_embargo_days.rek_oa_embargo_days',
                fullWidth: true,
                label: 'DOI embargo days',
                placeholder: '',
                required: true,
                validate: [validation.required],
            },
        },
        fez_record_search_key_keywords: {
            component: ListEditorField,
            componentProps: {
                scrollListHeight: 250,
                scrollList: true,
                name: 'bibliographicSection.fez_record_search_key_keywords',
                maxInputLength: 111,
                searchKey: {
                    value: 'rek_keywords',
                    order: 'rek_keywords_order',
                },
                locale: locale.components.keywordsForm.field,
                canEdit: true,
            },
        },
        issnField: {
            component: IssnListEditorField,
            componentProps: {
                remindToAdd: true,
                name: 'bibliographicSection.issnField',
                isValid: validation.isValidIssn,
                locale: locale.components.issnForm.field,
                inputNormalizer: value => {
                    const newValue = value.replace('-', '');
                    return newValue.length >= 4 ? [newValue.slice(0, 4), '-', newValue.slice(4)].join('') : newValue;
                },
                canEdit: true,
            },
        },
        fez_record_search_key_isbn: {
            component: ListEditorField,
            componentProps: {
                remindToAdd: true,
                name: 'bibliographicSection.fez_record_search_key_isbn',
                isValid: validation.isValidIsbn,
                searchKey: {
                    value: 'rek_isbn',
                    order: 'rek_isbn_order',
                },
                locale: locale.components.isbnForm.field,
                canEdit: true,
            },
        },
        fez_record_search_key_ismn: {
            component: ListEditorField,
            componentProps: {
                remindToAdd: true,
                name: 'ntroSection.fez_record_search_key_ismn',
                isValid: validation.isValidIsmn,
                searchKey: {
                    value: 'rek_ismn',
                    order: 'rek_ismn_order',
                },
                locale: locale.components.ismnForm.field,
                canEdit: true,
            },
        },
        fez_record_search_key_edition: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_edition.rek_edition',
                fullWidth: true,
                label: 'Edition',
                placeholder: '',
            },
        },
        fez_record_search_key_series: {
            component: SeriesField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_series.rek_series',
                fullWidth: true,
                label: 'Series',
                placeholder: '',
                multiline: true,
                floatingLabelText: 'Series',
            },
        },
        fez_record_search_key_chapter_number: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_chapter_number.rek_chapter_number',
                fullWidth: true,
                label: 'Chapter number',
                placeholder: '',
            },
        },
        fez_record_search_key_total_pages: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_total_pages.rek_total_pages',
                fullWidth: true,
                label: 'Total pages / Extent',
                placeholder: '',
            },
        },
        subjects: {
            component: FieldOfResearchListField,
            componentProps: {
                name: 'bibliographicSection.subjects',
                locale: locale.components.subjectForm.field,
                distinctOnly: true,
                category: [FIELD_OF_RESEARCH_VOCAB_ID, AIATSIS_CODES_VOCAB_ID].join(','),
                canEdit: true,
            },
        },
        fez_record_search_key_refereed_source: {
            component: RefereedSourceField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_refereed_source.rek_refereed_source',
                label: 'Refereed source',
            },
        },
        languageOfJournalName: {
            component: LanguageField,
            componentProps: {
                name: 'bibliographicSection.languageOfJournalName',
                label: 'Language of journal name',
                placeholder: '',
                multiple: true,
            },
        },
        languageOfBookTitle: {
            component: LanguageField,
            componentProps: {
                name: 'bibliographicSection.languageOfBookTitle',
                label: 'Language of book title',
                placeholder: '',
                multiple: true,
            },
        },
        languageOfConferenceName: {
            component: LanguageField,
            componentProps: {
                name: 'bibliographicSection.languageOfConferenceName',
                label: 'Language of conference name',
                placeholder: 'Language of conference name',
                multiple: true,
                fullWidth: true,
            },
        },
        languageOfProceedingsTitle: {
            component: LanguageField,
            componentProps: {
                name: 'bibliographicSection.languageOfProceedingsTitle',
                label: 'Language of proceedings title',
                placeholder: 'Language of proceedings title',
                multiple: true,
                fullWidth: true,
            },
        },
        fez_record_search_key_conference_location: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_conference_location.rek_conference_location',
                label: 'Conference location',
                placeholder: 'Conference location',
                required: true,
                fullWidth: true,
                validate: [validation.required],
            },
        },
        fez_record_search_key_conference_dates: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_conference_dates.rek_conference_dates',
                label: 'Conference dates',
                placeholder: 'Conference dates',
                required: true,
                fullWidth: true,
                validate: [validation.required],
            },
        },
        languageOfTitle: {
            component: LanguageField,
            componentProps: {
                name: 'bibliographicSection.languageOfTitle',
                label: 'Language of title',
                placeholder: '',
                multiple: true,
            },
        },
        fez_record_search_key_native_script_journal_name: {
            component: GenericTextField,
            componentProps: {
                name:
                    'bibliographicSection.fez_record_search_key_native_script_journal_name.rek_native_script_journal_name',
                label: 'Native script journal name',
                placeholder: '',
                fullWidth: true,
            },
        },
        fez_record_search_key_roman_script_journal_name: {
            component: GenericTextField,
            componentProps: {
                name:
                    'bibliographicSection.fez_record_search_key_roman_script_journal_name.rek_roman_script_journal_name',
                label: 'Roman script journal name',
                placeholder: '',
                fullWidth: true,
            },
        },
        fez_record_search_key_translated_journal_name: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_translated_journal_name.rek_translated_journal_name',
                label: 'Translated journal name',
                placeholder: '',
                fullWidth: true,
            },
        },
        fez_record_search_key_native_script_title: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_native_script_title.rek_native_script_title',
                label: 'Native script title',
                placeholder: '',
                fullWidth: true,
            },
        },
        fez_record_search_key_roman_script_title: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_roman_script_title.rek_roman_script_title',
                label: 'Roman script title',
                placeholder: '',
                fullWidth: true,
            },
        },
        fez_record_search_key_translated_title: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_translated_title.rek_translated_title',
                label: 'Translated title',
                placeholder: '',
                fullWidth: true,
            },
        },
        authors: {
            component: ContributorsEditorField,
            componentProps: {
                name: 'authorsSection.authors',
                showIdentifierLookup: true,
                locale: formLocale.journalArticle.authors.field,
                canEdit: true,
            },
        },
        editors: {
            component: ContributorsEditorField,
            componentProps: {
                name: 'authorsSection.editors',
                showIdentifierLookup: true,
                locale: formLocale.book.editors.field,
                canEdit: true,
            },
        },
        files: {
            component: FileUploadField,
            componentProps: {
                name: 'filesSection.files',
                requireOpenAccessStatus: true,
            },
        },
        contentIndicators: {
            component: ContentIndicatorsField,
            componentProps: {
                name: 'additionalInformationSection.contentIndicators',
                label: locale.components.contentIndicators.label,
                multiple: true,
                fullWidth: true,
            },
        },
        fez_record_search_key_herdc_code: {
            component: HerdcCodeField,
            componentProps: {
                name: 'additionalInformationSection.fez_record_search_key_herdc_code.rek_herdc_code',
                label: 'Category code',
            },
        },
        fez_record_search_key_herdc_status: {
            component: HerdcStatusField,
            componentProps: {
                name: 'additionalInformationSection.fez_record_search_key_herdc_status.rek_herdc_status',
                label: 'Category code status',
            },
        },
        fez_record_search_key_institutional_status: {
            component: InstitutionalStatusField,
            componentProps: {
                name:
                    'additionalInformationSection.fez_record_search_key_institutional_status.rek_institutional_status',
                label: 'Institutional status',
            },
        },
        fez_record_search_key_oa_status: {
            component: OAStatusField,
            componentProps: {
                name: 'additionalInformationSection.fez_record_search_key_oa_status.rek_oa_status',
                label: 'OA status',
            },
        },
        additionalNotes: {
            component: RichEditorField,
            componentProps: {
                name: 'additionalInformationSection.additionalNotes',
                title: 'Additional notes',
                titleProps: {
                    variant: 'caption',
                    style: {
                        opacity: 0.666,
                    },
                },
                height: 100,
                format: value => Immutable.Map(value),
            },
        },
        advisoryStatement: {
            component: RichEditorField,
            componentProps: {
                name: 'filesSection.advisoryStatement',
                title: 'Advisory statement',
                titleProps: {
                    variant: 'caption',
                    style: {
                        opacity: 0.666,
                    },
                },
                height: 100,
                format: value => Immutable.Map(value),
            },
        },
        fez_record_search_key_transcript: {
            component: RichEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_transcript',
                title: 'Transcript',
                titleProps: {
                    variant: 'caption',
                    style: {
                        opacity: 0.666,
                    },
                },
                height: 100,
                format: value => Immutable.Map(value),
            },
        },
        significanceAndContributionStatement: {
            component: ScaleOfSignificanceListEditorField,
            componentProps: {
                name: 'ntroSection.significanceAndContributionStatement',
                label: 'Scale/significance of work - Contribution statement',
                placeholder: '',
                locale: locale.components.scaleOfSignificanceListForm.field,
            },
        },
        qualityIndicators: {
            component: QualityIndicatorField,
            componentProps: {
                name: 'ntroSection.qualityIndicators',
                label: 'Quality indicators',
                multiple: true,
            },
        },
        grants: {
            component: GrantListEditorField,
            componentProps: {
                name: 'grantInformationSection.grants',
            },
        },
        fez_datastream_info: {
            component: AttachedFilesField,
            componentProps: {
                name: 'filesSection.fez_datastream_info',
                locale: { ...locale.components.attachedFiles, title: 'Attached files' },
                canEdit: true,
            },
        },
        rek_copyright: {
            component: CopyrightAgreementField,
            componentProps: {
                name: 'filesSection.rek_copyright',
                label: 'Copyright Agreement',
                placeholder: '',
                validate: [validation.required],
                copyrightAgreement:
                    'Depositors of metadata (i.e. abstracts / bibliographic content) must tick this declaration box to facilitate the required workflow but the declaration DOES NOT APPLY to these deposits. [This a temporary measure awaiting redesign of the deposit process].',
            },
        },
        fez_record_search_key_date_available: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_date_available.rek_date_available',
                label: 'Year available',
                fullWidth: true,
                validate: [validation.dateTimeYear],
            },
        },
        fez_record_search_key_date_recorded: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_date_recorded.rek_date_recorded',
                label: 'Year recorded',
                fullWidth: true,
                validate: [validation.dateTimeYear],
            },
        },
        fez_record_search_key_isderivationof: {
            component: RelatedDatasetAndPublicationListField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_isderivationof',
                searchKey: { value: 'rek_isderivationof', order: 'rek_isderivationof_order' },
                locale: {
                    form: formLocale.addDataset.information.optionalDatasetDetails.fieldLabels.relatedDatasets,
                },
                height: 50,
                canEdit: true,
            },
        },
        fez_record_search_key_location: {
            component: ListEditorField,
            componentProps: {
                name: 'identifiersSection.fez_record_search_key_location',
                title: 'Locations',
                searchKey: {
                    value: 'rek_location',
                    order: 'rek_location_order',
                },
                locale: locale.components.locationForm.field,
            },
        },
        fez_record_search_key_identifier: {
            component: ListEditorField,
            componentProps: {
                name: 'identifiersSection.fez_record_search_key_identifier',
                title: 'Identifiers',
                searchKey: {
                    value: 'rek_identifier',
                    order: 'rek_identifier_order',
                },
                locale: locale.components.identifierForm.field,
            },
        },
        fez_record_search_key_source: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_source.rek_source',
                fullWidth: true,
                label: 'Source',
                placeholder: '',
                multiline: true,
            },
        },
        fez_record_search_key_rights: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_rights.rek_rights',
                fullWidth: true,
                label: 'Rights',
                placeholder: '',
                multiline: true,
                required: true,
                validate: [validation.required],
            },
        },
        fez_record_search_key_acknowledgements: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_acknowledgements.rek_acknowledgements',
                fullWidth: true,
                label: 'Acknowledgements',
                multiline: true,
                placeholder: '',
            },
        },
        fez_record_search_key_length: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_length.rek_length',
                fullWidth: true,
                label: 'Length',
                placeholder: '',
            },
        },
        fez_record_search_key_license: {
            component: LicenseSelectorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_license.rek_license',
                label: 'License',
            },
        },
        fez_record_search_key_original_format: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_original_format.rek_original_format',
                fullWidth: true,
                label: 'Original format',
                multiline: true,
                placeholder: '',
            },
        },
        fez_record_search_key_alternate_genre: {
            component: AlternateGenreField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_alternate_genre',
                label: 'Alternate genre',
                multiple: true,
            },
        },
        rek_genre: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.rek_genre',
                fullWidth: true,
                label: 'Type',
            },
        },
        rek_genre_type: {
            component: ThesisSubtypeField,
            componentProps: {
                name: 'bibliographicSection.rek_genre_type',
                fullWidth: true,
                label: 'Thesis type',
                required: true,
                validate: [validation.required],
            },
        },
        geoCoordinates: {
            component: GeoCoordinatesField,
            componentProps: {
                name: 'bibliographicSection.geoCoordinates',
                fullWidth: true,
                label: 'Geographic area',
                isSearch: true,
            },
        },
        fez_record_search_key_access_conditions: {
            component: AccessSelectorField,
            componentProps: {
                name: 'additionalInformationSection.fez_record_search_key_access_conditions.rek_access_conditions',
                id: 'data-collection-access-selector',
                required: true,
                validate: [validation.required],
                ...formLocale.addDataset.information.accessAndLicensing.fieldLabels.accessConditions,
            },
        },
        fez_record_search_key_type_of_data: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_type_of_data',
                searchKey: {
                    value: 'rek_type_of_data',
                    order: 'rek_type_of_data_order',
                },
                locale: locale.components.typeOfDataForm.field,
            },
        },
        fez_record_search_key_data_volume: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_data_volume.rek_data_volume',
                fullWidth: true,
                label: 'Data volume',
            },
        },
        fez_record_search_key_software_required: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_software_required',
                searchKey: {
                    value: 'rek_software_required',
                    order: 'rek_software_required_order',
                },
                locale: locale.components.softwareRequiredForm.field,
            },
        },
        fez_record_search_key_related_datasets: {
            component: RichEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_related_datasets',
                title: 'Related datasets',
                titleProps: {
                    variant: 'caption',
                    style: {
                        opacity: 0.666,
                    },
                },
                format: value => Immutable.Map(value),
            },
        },
        fez_record_search_key_related_publications: {
            component: RichEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_related_publications',
                title: 'Related publications',
                titleProps: {
                    variant: 'caption',
                    style: {
                        opacity: 0.666,
                    },
                },
                format: value => Immutable.Map(value),
            },
        },
        fez_record_search_key_isdatasetof: {
            component: RelatedDatasetAndPublicationListField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_isdatasetof',
                searchKey: { value: 'rek_isdatasetof', order: 'rek_isdatasetof_order' },
                locale: {
                    form: formLocale.addDataset.information.optionalDatasetDetails.fieldLabels.relatedDatasets,
                },
                canEdit: true,
            },
            height: 50,
        },
        contactName: {
            component: GenericTextField,
            componentProps: {
                name: 'additionalInformationSection.contactName',
                fullWidth: true,
                required: true,
                validate: [validation.required],
                ...formLocale.addDataset.information.dataset.fieldLabels.contactName,
            },
        },
        contactNameId: {
            component: AuthorIdField,
            componentProps: {
                name: 'additionalInformationSection.contactNameId',
                fullWidth: true,
                showClear: true,
                ...formLocale.addDataset.information.dataset.fieldLabels.contactId,
            },
        },
        contactEmail: {
            component: GenericTextField,
            componentProps: {
                name: 'additionalInformationSection.contactEmail',
                fullWidth: true,
                required: true,
                validate: [validation.required, validation.email],
                ...formLocale.addDataset.information.dataset.fieldLabels.contactEmail,
            },
        },
        fez_record_search_key_ands_collection_type: {
            component: AndsCollectionTypesField,
            componentProps: {
                name:
                    'additionalInformationSection.fez_record_search_key_ands_collection_type.rek_ands_collection_type',
                label: 'Collection type',
            },
        },
        fez_record_search_key_project_name: {
            component: GenericTextField,
            componentProps: {
                name: 'additionalInformationSection.fez_record_search_key_project_name.rek_project_name',
                fullWidth: true,
                ...formLocale.addDataset.information.project.fieldLabels.projectName,
            },
        },
        fez_record_search_key_project_id: {
            component: GenericTextField,
            componentProps: {
                name: 'additionalInformationSection.fez_record_search_key_project_id.rek_project_id',
                fullWidth: true,
                ...formLocale.addDataset.information.project.fieldLabels.projectId,
            },
        },
        fez_record_search_key_project_description: {
            component: GenericTextField,
            componentProps: {
                name: 'additionalInformationSection.fez_record_search_key_project_description.rek_project_description',
                fullWidth: true,
                height: 100,
                required: true,
                validate: [validation.required],
                rows: 5,
                multiline: true,
                ...formLocale.addDataset.information.project.fieldLabels.projectDescription,
            },
        },
        fez_record_search_key_project_start_date: {
            component: DatePickerField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_project_start_date.rek_project_start_date',
                label: 'Project start date',
                placeholder: 'Project start date',
                fullWidth: true,
            },
        },
        fez_record_search_key_start_date: {
            component: DatePickerField,
            componentProps: {
                name: 'additionalInformationSection.fez_record_search_key_start_date.rek_start_date',
                label: 'Start date',
                placeholder: 'Start date',
                fullWidth: true,
            },
        },
        fez_record_search_key_end_date: {
            component: DatePickerField,
            componentProps: {
                name: 'additionalInformationSection.fez_record_search_key_end_date.rek_end_date',
                label: 'End date',
                placeholder: 'End date',
                fullWidth: true,
            },
        },
        fez_record_search_key_time_period_start_date: {
            component: DatePickerField,
            componentProps: {
                name:
                    'additionalInformationSection.fez_record_search_key_time_period_start_date.rek_time_period_start_date',
                label: 'Time coverage start date',
                placeholder: 'Time coverage start date',
                fullWidth: true,
            },
        },
        fez_record_search_key_time_period_end_date: {
            component: DatePickerField,
            componentProps: {
                name:
                    'additionalInformationSection.fez_record_search_key_time_period_end_date.rek_time_period_end_date',
                label: 'Time coverage end date',
                placeholder: 'Time coverage end date',
                fullWidth: true,
            },
        },
        fez_record_search_key_org_name: {
            component: OrgNameField,
            componentProps: {
                fullWidth: true,
                label: 'Institution',
                name: 'bibliographicSection.fez_record_search_key_org_name.rek_org_name',
                placeholder: '',
                floatingLabelText: 'Institution',
            },
        },
        fez_record_search_key_org_unit_name: {
            component: OrgUnitNameField,
            componentProps: {
                fullWidth: true,
                label: 'School, department, or centre',
                name: 'bibliographicSection.fez_record_search_key_org_unit_name.rek_org_unit_name',
                floatingLabelText: 'School, department, or centre',
                showClear: true,
            },
        },
        fez_record_search_key_report_number: {
            component: GenericTextField,
            componentProps: {
                fullWidth: true,
                label: 'Report number',
                name: 'bibliographicSection.fez_record_search_key_report_number.rek_report_number',
                placeholder: '',
            },
        },
        fez_record_search_key_parent_publication: {
            component: GenericTextField,
            componentProps: {
                fullWidth: true,
                label: 'Parent Publication',
                name: 'bibliographicSection.fez_record_search_key_parent_publication.rek_parent_publication',
                multiline: true,
                placeholder: '',
            },
        },
        fez_record_search_key_newspaper: {
            component: GenericTextField,
            componentProps: {
                fullWidth: true,
                label: 'Newspaper',
                name: 'bibliographicSection.fez_record_search_key_newspaper.rek_newspaper',
                placeholder: '',
            },
        },
        fez_record_search_key_section: {
            component: GenericTextField,
            componentProps: {
                fullWidth: true,
                label: 'Section',
                name: 'bibliographicSection.fez_record_search_key_section.rek_section',
                placeholder: '',
            },
        },
        fez_record_search_key_translated_newspaper: {
            component: GenericTextField,
            componentProps: {
                fullWidth: true,
                label: 'Translated newspaper',
                name: 'bibliographicSection.fez_record_search_key_translated_newspaper.rek_translated_newspaper',
                placeholder: '',
            },
        },
        fez_record_search_key_scale: {
            component: GenericTextField,
            componentProps: {
                fullWidth: true,
                label: 'Scale',
                name: 'bibliographicSection.fez_record_search_key_scale.rek_scale',
                placeholder: '',
            },
        },
        fez_record_search_key_job_number: {
            component: GenericTextField,
            componentProps: {
                fullWidth: true,
                label: 'Job number',
                name: 'bibliographicSection.fez_record_search_key_job_number.rek_job_number',
                placeholder: '',
            },
        },
        fez_record_search_key_period: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_period',
                title: 'Periods',
                searchKey: {
                    value: 'rek_period',
                    order: 'rek_period_order',
                },
                locale: locale.components.periodForm.field,
            },
        },
        fez_record_search_key_structural_systems: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_structural_systems',
                title: 'Structural systems',
                searchKey: {
                    value: 'rek_structural_systems',
                    order: 'rek_structural_systems_order',
                },
                locale: locale.components.structuralSystemsForm.field,
            },
        },
        fez_record_search_key_style: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_style',
                title: 'Styles',
                searchKey: {
                    value: 'rek_style',
                    order: 'rek_style_order',
                },
                locale: locale.components.styleForm.field,
            },
        },
        fez_record_search_key_subcategory: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_subcategory',
                title: 'Subcategories',
                searchKey: {
                    value: 'rek_subcategory',
                    order: 'rek_subcategory_order',
                },
                locale: locale.components.subcategoryForm.field,
            },
        },
        fez_record_search_key_surrounding_features: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_surrounding_features',
                title: 'Surrounding features',
                searchKey: {
                    value: 'rek_surrounding_features',
                    order: 'rek_surrounding_features_order',
                },
                locale: locale.components.surroundingFeaturesForm.field,
            },
        },
        fez_record_search_key_interior_features: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_interior_features',
                title: 'Interior features',
                searchKey: {
                    value: 'rek_interior_features',
                    order: 'rek_interior_features_order',
                },
                locale: locale.components.interiorFeaturesForm.field,
            },
        },
        fez_record_search_key_date_photo_taken: {
            component: DatePickerField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_date_photo_taken.rek_date_photo_taken',
                label: 'Date photo taken',
                placeholder: 'Date photo taken',
                fullWidth: true,
            },
        },
        fez_record_search_key_date_scanned: {
            component: DatePickerField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_date_scanned.rek_date_scanned',
                label: 'Date photo scanned',
                placeholder: 'Date photo scanned',
                fullWidth: true,
            },
        },
        fez_record_search_key_building_materials: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_building_materials',
                title: 'Interior features',
                searchKey: {
                    value: 'rek_building_materials',
                    order: 'rek_building_materials_order',
                },
                locale: locale.components.buildingMaterialsForm.field,
            },
        },
        fez_record_search_key_category: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_category',
                title: 'Category',
                searchKey: {
                    value: 'rek_category',
                    order: 'rek_category_order',
                },
                locale: locale.components.categoryForm.field,
            },
        },
        fez_record_search_key_condition: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_condition',
                title: 'Conditions',
                searchKey: {
                    value: 'rek_condition',
                    order: 'rek_condition_order',
                },
                locale: locale.components.conditionForm.field,
            },
        },
        fez_record_search_key_construction_date: {
            component: GenericTextField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_construction_date.rek_construction_date',
                label: 'Construction date',
                placeholder: 'Construction date',
                fullWidth: true,
            },
        },
        fez_record_search_key_alternative_title: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_alternative_title',
                title: 'Alternative titles',
                searchKey: {
                    value: 'rek_alternative_title',
                    order: 'rek_alternative_title_order',
                },
                locale: locale.components.alternativeTitleForm.field,
            },
        },
        fez_record_search_key_architectural_features: {
            component: ListEditorField,
            componentProps: {
                name: 'bibliographicSection.fez_record_search_key_architectural_features',
                title: 'Alternative titles',
                searchKey: {
                    value: 'rek_architectural_features',
                    order: 'rek_architectural_features_order',
                },
                locale: locale.components.architecturalFeaturesForm.field,
            },
        },
        architects: {
            component: ContributorsEditorField,
            componentProps: {
                name: 'authorsSection.architects',
                showIdentifierLookup: true,
                locale: locale.components.architects.field,
                canEdit: true,
            },
        },
        creators: {
            component: ContributorsEditorField,
            componentProps: {
                name: 'authorsSection.creators',
                showIdentifierLookup: true,
                locale: locale.components.designCreators.field,
                canEdit: true,
            },
        },
        supervisors: {
            component: ContributorsEditorField,
            componentProps: {
                name: 'authorsSection.supervisors',
                showIdentifierLookup: true,
                locale: locale.components.supervisors.field,
                canEdit: true,
            },
        },
    },
    override: {
        [PUBLICATION_TYPE_CONFERENCE_PAPER]: {
            fez_record_search_key_journal_name: () => ({
                required: false,
                validate: null,
            }),
        },
        [PUBLICATION_TYPE_AUDIO_DOCUMENT]: {
            rek_date: () => ({
                label: 'Date',
                placeholder: 'Date',
            }),
        },
        [PUBLICATION_TYPE_BOOK]: {
            fez_record_search_key_publisher: () => ({
                required: true,
                validate: [validation.required],
            }),
            fez_record_search_key_place_of_publication: () => ({
                required: true,
                validate: [validation.required],
            }),
            authors: ({ isNtro }) => ({ isNtro }),
        },
        [PUBLICATION_TYPE_BOOK_CHAPTER]: {
            fez_record_search_key_publisher: () => ({
                required: true,
                validate: [validation.required],
            }),
            fez_record_search_key_place_of_publication: () => ({
                required: true,
                validate: [validation.required],
            }),
            authors: ({ isNtro }) => ({ isNtro }),
        },
        [PUBLICATION_TYPE_CREATIVE_WORK]: {
            fez_record_search_key_place_of_publication: () => ({
                required: true,
                validate: [validation.required],
            }),
            authors: ({ isNtro }) => ({ isNtro }),
        },
        [PUBLICATION_TYPE_DATA_COLLECTION]: {
            rek_copyright: () => ({
                label: 'Deposit agreement',
                copyrightAgreement: formLocale.addDataset.information.agreement.text,
            }),
            fez_record_search_key_project_name: () => ({
                required: true,
                validate: [validation.required],
            }),
            fez_record_search_key_rights: () => ({
                required: false,
                validate: [],
                name: 'additionalInformationSection.fez_record_search_key_rights.rek_rights',
            }),
            fez_record_search_key_start_date: () => ({
                label: 'Collection start date',
            }),
            fez_record_search_key_end_date: () => ({
                label: 'Collection end date',
            }),
            authors: () => ({
                showRoleInput: true,
                locale: locale.components.creators.field,
            }),
            rek_description: () => ({
                required: true,
                validate: [validation.required],
            }),
            fez_record_search_key_publisher: () => ({
                required: true,
                validate: [validation.required],
            }),
            fez_record_search_key_ands_collection_type: () => ({
                required: true,
                validate: [validation.required],
            }),
            subjects: () => ({
                required: true,
                validate: [validation.requiredList],
            }),
        },
        [PUBLICATION_TYPE_DESIGN]: {
            fez_record_search_key_original_format: () => ({
                label: 'Physical description',
            }),
            fez_record_search_key_project_name: () => ({
                name: 'bibliographicSection.fez_record_search_key_project_name.rek_project_name',
            }),
        },
        [PUBLICATION_TYPE_DIGILIB_IMAGE]: {
            authors: () => ({
                locale: locale.components.photographers.field,
            }),
        },
        [PUBLICATION_TYPE_GENERIC_DOCUMENT]: {
            rek_date: () => ({
                label: 'Date',
                placeholder: 'Date',
            }),
        },
        [PUBLICATION_TYPE_IMAGE]: {
            rek_date: () => ({
                label: 'Date',
                placeholder: 'Date',
            }),
        },
        [PUBLICATION_TYPE_JOURNAL_ARTICLE]: {
            authors: ({ isNtro }) => ({ isNtro }),
        },
        [PUBLICATION_TYPE_MANUSCRIPT]: {
            rek_date: () => ({
                label: 'Date',
                placeholder: 'Date',
            }),
        },
        [PUBLICATION_TYPE_PREPRINT]: {
            rek_date: ({ isCreate }) => ({
                label: 'Date',
                placeholder: 'Date',
                required: isCreate,
            }),
        },
        [PUBLICATION_TYPE_PATENT]: {
            rek_date: () => ({
                label: 'Date of issue',
                placeholder: 'Date of issue',
            }),
            fez_record_search_key_publisher: () => ({
                label: 'Patent owner',
            }),
        },
        [PUBLICATION_TYPE_RESEARCH_REPORT]: {
            fez_record_search_key_place_of_publication: () => ({
                required: true,
                validate: [validation.required],
            }),
        },
        [PUBLICATION_TYPE_THESIS]: {
            fez_record_search_key_org_unit_name: () => ({
                label: 'School, centre, or institute',
                floatingLabelText: 'School, centre, or institute',
                required: true,
                validate: [validation.required],
            }),
        },
        [PUBLICATION_TYPE_VIDEO_DOCUMENT]: {
            rek_date: () => ({
                label: 'Date',
                placeholder: 'Date',
            }),
        },
    },
};
