export default {
    files: ({ isDataset, displayAdvisoryStatement } = { isDataset: false, displayAdvisoryStatement: false }) => [
        {
            groups: [['fez_datastream_info']],
        },
        {
            title: 'Files',
            groups: [['files']],
        },
        ...(displayAdvisoryStatement
            ? [
                {
                    title: 'Advisory statement',
                    groups: [['advisoryStatement']],
                },
            ]
            : []),
        {
            title: isDataset ? 'Deposit agreement' : 'Copyright agreement',
            groups: [['rek_copyright']],
        },
    ],
    grantInformation: () => [
        {
            title: 'Grant information',
            groups: [['grants']],
        },
    ],
    identifiers: (
        { displayAll, displayIdentifiers, displayLocation } = {
            displayAll: false,
            displayIdentifiers: false,
            displayLocation: false,
        },
    ) => [
        {
            title: 'Manage identifiers',
            groups: [
                ['fez_record_search_key_doi'],
                ...((displayAll && [
                    ['fez_record_search_key_isi_loc', 'rek_wok_doc_type'],
                    ['fez_record_search_key_scopus_id', 'rek_scopus_doc_type'],
                    ['fez_record_search_key_pubmed_id', 'rek_pubmed_doc_type'],
                ]) ||
                    []),
            ],
        },
        {
            title: 'Manage links',
            groups: [['links'], ['rek_status']],
        },
        ...(displayIdentifiers
            ? [
                {
                    title: 'Identifiers',
                    groups: [['fez_record_search_key_identifier']],
                },
            ]
            : []),
        ...(displayLocation
            ? [
                {
                    title: 'Location',
                    groups: [['fez_record_search_key_location_identifiers']],
                },
            ]
            : []),
    ],
};
