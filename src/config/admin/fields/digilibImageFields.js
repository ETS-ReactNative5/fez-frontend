import commonFields from './commonFields';

export default {
    ...commonFields,
    identifiers: () => [
        {
            title: 'Manage identifiers',
            groups: [['rek_wok_doc_type', 'rek_scopus_doc_type'], ['rek_pubmed_doc_type']],
        },
        {
            title: 'Manage links',
            groups: [['links']],
        },
    ],
    bibliographic: () => [
        {
            title: 'Title',
            groups: [['rek_title']],
        },
        {
            title: 'Bibliographic',
            groups: [
                ['fez_record_search_key_publisher'],
                ['rek_date'],
                ['rek_description'],
                ['fez_record_search_key_rights'],
                ['fez_record_search_key_refereed_source'],
                [
                    'fez_record_search_key_construction_date',
                    'fez_record_search_key_date_photo_taken',
                    'fez_record_search_key_date_scanned',
                ],
            ],
        },
        {
            title: 'Related publications', // Succeeds
            groups: [['fez_record_search_key_isderivationof']],
        },
        {
            title: 'Period(s)',
            groups: [['fez_record_search_key_period']],
        },
        {
            title: 'Structural system(s)',
            groups: [['fez_record_search_key_structural_systems']],
        },
        {
            title: 'Style',
            groups: [['fez_record_search_key_style']],
        },
        {
            title: 'Subcategory(ies)',
            groups: [['fez_record_search_key_subcategory']],
        },
        {
            title: 'Surrounding feature(s)',
            groups: [['fez_record_search_key_surrounding_features']],
        },
        {
            title: 'Interior feature(s)',
            groups: [['fez_record_search_key_interior_features']],
        },
        {
            title: 'Building material(s)',
            groups: [['fez_record_search_key_building_materials']],
        },
        {
            title: 'Category(ies)',
            groups: [['fez_record_search_key_category']],
        },
        {
            title: 'Condition(s)',
            groups: [['fez_record_search_key_condition']],
        },
        {
            title: 'Alternative title(s)',
            groups: [['fez_record_search_key_alternative_title']],
        },
        {
            title: 'Architectural feature(s)',
            groups: [['fez_record_search_key_architectural_features']],
        },
    ],
    authors: () => [
        {
            title: 'Architects',
            groups: [['architects']],
        },
        {
            title: 'Photographers',
            groups: [['photographers']],
        },
        {
            title: 'Other contributors',
            groups: [['editors']],
        },
    ],
    additionalInformation: () => [
        {
            title: 'Member of collections',
            groups: [['collections']],
        },
        {
            title: 'Additional information',
            groups: [
                ['fez_record_search_key_institutional_status', 'fez_record_search_key_oa_status'],
                ['additionalNotes'],
            ],
        },
    ],
    ntro: () => [],
};

export const validateDigilibImage = (
    { bibliographicSection: bs, filesSection: fs, authorsSection: as },
    { validationErrorsSummary: summary },
) => ({
    bibliographicSection: {
        ...((!((bs || {}).fez_record_search_key_rights || {}).rek_rights && {
            fez_record_search_key_rights: {
                rek_rights: summary.rek_rights,
            },
        }) ||
            {}),
        ...((!((bs || {}).fez_record_search_key_publisher || {}).rek_publisher && {
            fez_record_search_key_publisher: {
                rek_publisher: summary.rek_publisher,
            },
        }) ||
            {}),
    },
    filesSection: {
        ...((fs || {}).rek_copyright !== 'on' && {
            rek_copyright: summary.rek_copyright,
        }),
    },
    authorsSection: {
        ...(((as || {}).authors || []).length === 0 && {
            authors: summary.authors,
        }),
    },
});
