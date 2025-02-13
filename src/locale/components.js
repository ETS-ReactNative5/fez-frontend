/* eslint-disable max-len */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { selectFields } from 'locale/selectFields';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Duis turpis risus, mollis in sem id, auctor tempus tellus. ' +
    'Praesent maximus tempor tellus pellentesque tincidunt. ' +
    'Integer maximus accumsan tellus ac aliquet. Nam sollicitudin ' +
    'odio a leo euismod, quis pharetra arcu laoreet. Mauris malesuada ' +
    'id diam dignissim aliquet. Aliquam rhoncus non urna in hendrerit. ' +
    'Pellentesque leo nibh, ornare non metus consequat, tincidunt ' +
    'scelerisque massa. Curabitur at pellentesque quam. Nulla facilisi. ' +
    'Nullam sit amet mattis est, ut finibus orci.';

export default {
    components: {
        publicationsList: {
            selectAllText: 'Select all',
        },
        facetsFilter: {
            title: 'Refine results',
            resetButtonText: 'Reset',
            yearPublishedCategory: 'Year published',
            yearPublishedFacet: {
                displayTitle: 'Published year range',
                fromFieldLabel: 'From',
                toFieldLabel: 'To',
                rangeSubmitButtonLabel: 'Go',
            },
            openAccessFilter: {
                displayTitle: 'Open access status',
                activeFilter: 'Show only open access works',
            },
            excludeFacetsList: ['Scopus document type', 'Genre', 'Year published'],
            renameFacetsList: { 'Display type': 'Work type', Subtype: 'Work subtype' },
            lookupFacetsList: {
                Collection: 'Collection (lookup)',
                Subject: 'Subject (lookup)',
            },
            // help: {
            //     title: 'Refining your results',
            //     text: 'Help about ....',
            //     buttonLabel: 'CLOSE'
            // },
        },
        publicationStats: {
            publicationStatsTitle1: 'eSpace works',
            publicationStatsTitle2: 'Web of science',
            publicationStatsTitle2mobile: 'WOS',
            publicationStatsTitle3: 'Scopus',
            publicationStatsRowTitle1: 'h-index',
            publicationStatsRowTitle2: 'Average citation count per work',
            publicationStatsRowTitle3: 'Total citations',
            publicationStatsRowTitle4: 'Total works',
            publicationStatsRowTitle5: 'Works year range',
            publicationStatsNA: 'N/A',
        },
        publicationCitation: {
            publicationSourcesLabel: 'Found in: ',
            citationCounts: {
                wosCountLabel: 'Web of Science citation count is [count]',
                scopusCountLabel: 'Scopus citation count is [count]',
                googleCountLabel: 'Citation counts in Google Scholar',
                altmetricCountLabel: 'Altmetric score is [count]',
                openAccessLabel: 'Open Access - [oa_status] - Free to read (embargo date might apply)',
                openAccessLockedLabel: 'Open Access - [oa_status] - Embargoed until [embargo_date]',
                statsLabel: 'View full statistics',
                altmetric: {
                    externalUrl: 'https://queensland.altmetric.com/details/[id]',
                    title: 'Altmetric',
                },
                google: {
                    externalUrl: 'https://scholar.google.com/scholar?q=intitle:[id]',
                    title: 'Google scholar',
                },
            },
            linkWillOpenInNewWindow: 'Full citation in [destination] will open in a new window',
            citationAuthors: {
                maxAuthorDisplayNumber: 29,
            },
            defaultActions: [
                { key: 'fixRecord', label: 'Request Correction', primary: false },
                // {key: 'shareRecord', primaryText: 'Share'} // TODO: implement shareRecord
            ],
            myTrendingPublications: {
                trendDifferenceShares: {
                    scopus: 'Difference in citations',
                    thomson: 'Difference in citations',
                    altmetric: 'Difference in social media activities',
                },
                sourceTitles: {
                    scopus: 'Scopus',
                    thomson: 'Web of science',
                    altmetric: 'Altmetric',
                },
                recordsPerSource: 5,
            },
        },
        myTrendingPublications: {
            loading: 'Loading your trending works',
            metrics: {
                altmetric: {
                    title: 'Altmetric score',
                    subtitle: 'The +plus score indicates recent increase in social media activity',
                    order: 2,
                },
                thomson: {
                    title: 'Web of Science citation count',
                    subtitle:
                        'The + (plus) value indicates how much the citation count has increased in the last three months.',
                    order: 1,
                },
                scopus: {
                    title: 'Scopus citation count',
                    subtitle:
                        'The + (plus) value indicates how much the citation count has increased in the last three months.',
                    order: 0,
                },
            },
        },
        trendingPublicationHelp: {
            title: 'About these metrics',
            text: (
                <React.Fragment>
                    <h3>WOS and Scopus</h3>
                    <p>
                        The + (plus) value indicates how much the citation count has increased in the last three months.
                    </p>
                    <h3>Altmetric score (social media activity)</h3>
                    <p>
                        The Altmetric score measures social media activity. The + (plus) value shows the increase in
                        social media activity over time.
                    </p>
                    <p>
                        You can click on the number as a link to see who is citing each work, or in the case of
                        Altmetric who is referencing the work in social media and news outlets.
                    </p>
                    For more information visit :<br />
                    <a
                        href="https://www.altmetric.com/about-altmetrics/what-are-altmetrics/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.altmetric.com/about-altmetrics/what-are-altmetrics/
                    </a>
                </React.Fragment>
            ),
            buttonLabel: 'CLOSE',
        },
        myLatestPublications: {
            loading: 'Loading your latest works',
            viewAllButtonLabel: 'View all',
        },
        topCitedPublications: {
            loading: 'Loading trending works',
            notAvailableAlert: {
                type: 'error',
                alertId: 'alert-error',
                title: 'There has been an error',
                message: 'Trending works are temporarily unavailable',
            },
            altmetric: {
                title: <span>Trending on Altmetric</span>,
                mobileTitle: 'Trending',
                heading: 'Altmetric score',
                subHeading: 'The +plus score indicates recent increase in social media activity',
                order: 0,
            },
            scopus: {
                title: <span>Trending on Scopus</span>,
                mobileTitle: 'Scopus',
                heading: 'Scopus citation count',
                subHeading:
                    'The + (plus) value indicates how much the citation count has increased in the last three months.',
                order: 1,
            },
            thomson: {
                title: <span>Trending on Web of science</span>,
                mobileTitle: 'WOS',
                heading: 'Web of Science citation count',
                subHeading:
                    'The + (plus) value indicates how much the citation count has increased in the last three months.',
                order: 2,
            },
            recordsPerSource: 20,
        },
        keywordsForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Keywords',
                        inputFieldHint: 'Type keywords (Add multiple using pipes eg: one|two|three)',
                        addButtonLabel: 'Add',
                        editButtonLabel: 'Update',
                        id: 'keywords-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Keyword',
                        reorderColumn: 'Reorder keywords',
                        deleteAll: 'Remove all keywords',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all keywords?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        editHint: 'Edit this item',
                        moveUpHint: 'Move keyword up the order',
                        moveDownHint: 'Move keyword down the order',
                        deleteHint: 'Remove this keyword',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete keyword',
                            confirmationMessage: 'Are you sure you want to delete this keyword?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        wokDocTypesForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'WokDocTypes',
                        inputFieldHint: 'Type WokDocTypes',
                        addButtonLabel: 'Add',
                        id: 'WokDocTypes-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'WokDocTypes',
                        reorderColumn: 'Reorder WokDocTypes',
                        deleteAll: 'Remove all WokDocTypes',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all WokDocTypes?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move WokDocTypes up the order',
                        moveDownHint: 'Move WokDocTypes down the order',
                        deleteHint: 'Remove this WokDocTypes',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete WokDocTypes',
                            confirmationMessage: 'Are you sure you want to delete this WokDocTypes?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        identifierForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Identifier',
                        inputFieldHint: 'Type Identifier',
                        addButtonLabel: 'Add',
                        id: 'Identifier-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Identifier',
                        reorderColumn: 'Reorder Identifier',
                        deleteAll: 'Remove all Identifier',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Identifier?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Identifier up the order',
                        moveDownHint: 'Move Identifier down the order',
                        deleteHint: 'Remove this Identifier',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Identifier',
                            confirmationMessage: 'Are you sure you want to delete this Identifier?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        locationForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Location',
                        inputFieldHint: 'Type Location',
                        addButtonLabel: 'Add',
                        id: 'Identifier-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Location',
                        reorderColumn: 'Reorder Location',
                        deleteAll: 'Remove all Location',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Location?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Location up the order',
                        moveDownHint: 'Move Location down the order',
                        deleteHint: 'Remove this Location',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Location',
                            confirmationMessage: 'Are you sure you want to delete this Location?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        placeOfRecordingForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Place of recording',
                        inputFieldHint: 'Type of Place of recording',
                        addButtonLabel: 'Add',
                        id: 'Location-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Place of recording',
                        reorderColumn: 'Reorder Place of recording',
                        deleteAll: 'Remove all Place of recording',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Places of recording?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Place of recording up the order',
                        moveDownHint: 'Move Place of recording down the order',
                        deleteHint: 'Remove this Place of recording',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Place of recording',
                            confirmationMessage: 'Are you sure you want to delete this Place of recording?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        fundingBodyForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Funding body',
                        inputFieldHint:
                            'Type the name of the funding body(s) associated with your research e.g. ARC, NHMRC',
                        addButtonLabel: 'Add',
                        id: 'funding-body-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Funding body',
                        reorderColumn: 'Reorder funding bodies',
                        deleteAll: 'Remove all funding bodies',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all funding bodies?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move funding body up the order',
                        moveDownHint: 'Move funding body down the order',
                        deleteHint: 'Remove this funding body',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete funding body',
                            confirmationMessage: 'Are you sure you want to delete this funding body?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        grantIdForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Grant IDs',
                        inputFieldHint: 'Type grantID',
                        addButtonLabel: 'Add',
                        id: 'grant-id-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Grant ID',
                        reorderColumn: 'Reorder grant IDs',
                        deleteAll: 'Remove all grant IDs',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all grant IDs?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move grant ID up the order',
                        moveDownHint: 'Move grant ID down the order',
                        deleteHint: 'Remove this grant ID',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete grant ID',
                            confirmationMessage: 'Are you sure you want to delete this grant ID?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        grants: {
            locale: {
                form: {
                    locale: {
                        grantAgencyNameLabel: 'Funder/Sponsor name',
                        grantAgencyNameHint: 'Enter Funder/Sponsor name for this work',
                        grantIdLabel: 'Grant ID',
                        grantIdHint: 'Enter grant number for this work, if available',
                        grantAgencyTypeLabel: 'Funder/Sponsor type',
                        grantAgencyTypeHint: 'Select Funder/Sponsor type',
                        addButton: 'Add grant',
                        editButton: 'Edit grant',
                        description:
                            "Add the grant's name, ID and type - then click the ADD GRANT button to add each to the list",
                    },
                },
                header: {
                    locale: {
                        GrantAgencyName: 'Funder/Sponsor name',
                        GrantID: 'Grant ID',
                        GrantAgencyType: 'Funder/Sponsor type',
                        reorderColumn: 'Reorder entries',
                        deleteAll: 'Remove all entries',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all entries?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        thirdPartyLookupTools: {
            display: {
                title: 'Lookup Tools - view raw output from APIs',
                loadingMessage: 'Loading',
                tooltip: {
                    show: 'Show form for',
                    hide: 'Hide form for',
                },
                resultsLabel: 'Results',
                noResultsFound: {
                    text: 'No results found',
                },
                clearButtonLabel: 'New Search',
            },
            forms: [
                {
                    apiType: 'incites', // this value should match the 'type' in the path used in api
                    lookupLabel: 'Incites',
                    primaryField: {
                        heading: 'UTs',
                        fromAria: '',
                        tip: '',
                        inputPlaceholder: 'Enter one or more UTs separated by a comma e.g. 000455548800001',
                    },
                    secondaryField: {
                        heading: 'API Key',
                        fromAria: '',
                        tip: 'Optional, a default key is provided. Limit: 1,000 queries per day',
                        inputPlaceholder: 'Enter API key',
                        reportInOutput: false, // determines if secondaryField will apear in the results page
                    },
                    bottomTip: '',
                    submitButtonLabel: 'Submit to Incites',
                    isMinimised: false, // set this to true when we have more than one form
                },
            ],
        },
        typeOfDataForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Type',
                        inputFieldHint: 'Enter type',
                        addButtonLabel: 'Add',
                        editButtonLabel: 'Update',
                        id: 'type-of-data-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Type',
                        reorderColumn: 'Reorder type',
                        deleteAll: 'Remove all types',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all types?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move type up the order',
                        moveDownHint: 'Move type down the order',
                        deleteHint: 'Remove this type',
                        editHint: 'Edit this type',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete type',
                            confirmationMessage: 'Are you sure you want to delete this type?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
            fieldDataset: {
                form: {
                    locale: {
                        inputFieldLabel: 'Type of data',
                        inputFieldHint: 'Enter type of data',
                        addButtonLabel: 'Add',
                        editButtonLabel: 'Update',
                        id: 'type-of-data-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Type of data',
                        reorderColumn: 'Reorder types of data',
                        deleteAll: 'Remove all types of data',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all types of data?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move type of data up the order',
                        moveDownHint: 'Move type of data down the order',
                        deleteHint: 'Remove this type of data',
                        editHint: 'Edit this type of data',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete type of data',
                            confirmationMessage: 'Are you sure you want to delete this type of data?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        softwareRequiredForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Software required',
                        inputFieldHint: 'Type software required',
                        addButtonLabel: 'Add software',
                        editButtonLabel: 'Update software',
                        id: 'software-required-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Software required',
                        reorderColumn: 'Reorder software required',
                        deleteAll: 'Remove all software required',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all software required?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        editHint: 'Edit this software required',
                        moveUpHint: 'Move software required up the order',
                        moveDownHint: 'Move software required down the order',
                        deleteHint: 'Remove this software required',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete software required',
                            confirmationMessage: 'Are you sure you want to delete this software required?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        isbnForm: {
            title: 'ISBN',
            text: 'You can add up to five ISBN values',
            // help: {
            //     title: 'ISBN value',
            //     text: 'Acceptable ISBN formats are....',
            //     buttonLabel: 'CLOSE'
            // },
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'ISBN value',
                        inputFieldHint: 'Enter ISBN, e.g. 13 digit: 9780815375296 or 10 digit: 1861972717',
                        addButtonLabel: <span>Add&nbsp;ISBN</span>,
                        editButtonLabel: <span>Update&nbsp;ISBN</span>,
                        remindToAddText: (
                            <span>
                                Please press <b>ENTER</b> or click <b>ADD</b> button to add this value to the list
                            </span>
                        ),
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'ISBN',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        editHint: 'Edit this item',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        issnForm: {
            title: 'ISSN',
            text: 'You can add up to five ISSN values',
            // help: {
            //     title: 'ISSN value',
            //     text: 'Acceptable ISSN formats are....',
            //     buttonLabel: 'CLOSE'
            // },
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'ISSN value',
                        inputFieldHint: 'Enter ISSN, e.g. 1838-9414',
                        addButtonLabel: <span>Add&nbsp;ISSN</span>,
                        editButtonLabel: <span>Update&nbsp;ISSN</span>,
                        remindToAddText: (
                            <span>
                                Please press <b>ENTER</b> or click <b>ADD</b> button to add this value to the list
                            </span>
                        ),
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'ISSN',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        editHint: 'Edit this item',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        ismnForm: {
            title: 'ISMN',
            text: 'You can add up to five ISMN values',
            // help: {
            //     title: 'ISMN value',
            //     text: 'Acceptable ISMN formats are....',
            //     buttonLabel: 'CLOSE'
            // },
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'ISMN value',
                        inputFieldHint: 'Enter ISMN, e.g. 9790720208015',
                        addButtonLabel: <span>Add&nbsp;ISMN</span>,
                        editButtonLabel: <span>Update&nbsp;ISMN</span>,
                        remindToAddText: (
                            <span>
                                Please press <b>ENTER</b> or click <b>ADD</b> button to add this value to the list
                            </span>
                        ),
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'ISMN',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        editHint: 'Edit this item',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        isrcForm: {
            title: 'ISRC',
            text: 'You can add up to five ISRC values',
            // help: {
            //     title: 'ISRC value',
            //     text: 'Acceptable ISRC formats are....',
            //     buttonLabel: 'CLOSE'
            // },
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'ISRC value',
                        inputFieldHint: 'Enter ISRC, e.g. US6R21320619',
                        addButtonLabel: <span>Add&nbsp;ISRC</span>,
                        editButtonLabel: <span>Update&nbsp;ISRC</span>,
                        remindToAddText: (
                            <span>
                                Please press <b>ENTER</b> or click <b>ADD</b> button to add this value to the list
                            </span>
                        ),
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'ISRC',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        editHint: 'Edit this item',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        linkListForm: {
            title: 'Manage links',
            field: {
                form: {
                    locale: {
                        linkInputFieldLabel: 'Link',
                        linkInputFieldHint: 'Enter link',
                        descriptionInputFieldLabel: 'Description',
                        descriptionFieldHint: 'Enter description',
                        addButtonLabel: <span>Add&nbsp;link</span>,
                        editButtonLabel: <span>Update&nbsp;link</span>,
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Link',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        scaleOfSignificanceListForm: {
            title: 'Manage scale/significance of work and creator contribution statement',
            field: {
                form: {
                    locale: {
                        significanceInputFieldLabel: 'Scale of significance',
                        significanceInputFieldHint: 'Please select scale of significance',
                        contributionStatementInputFieldLabel: 'Creator contribution statement',
                        contributionStatementFieldHint: 'Enter description',
                        addButtonLabel: <span>Add&nbsp;Scale of significance and Contribution statement</span>,
                        authorOrderAlert: {
                            message:
                                'Any changes made to the author order require that all contribution statements are also manually updated to match.',
                            type: 'info',
                            alertId: 'alert-info',
                        },
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Scale/significance of work - Creator contribution statement',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        scaleOfSignificanceListAdminForm: {
            field: {
                form: {
                    locale: {
                        significanceInputFieldLabel: 'Scale/Significance of work',
                        significanceInputFieldHint: 'Please select scale of significance',
                        contributionStatementInputFieldLabel: 'Creator research statement',
                        contributionStatementFieldHint: 'Enter description',
                        addButtonLabel: 'ADD SCALE/SIGNIFICANCE AND RESEARCH STATEMENT',
                        authorOrderAlert: {
                            message:
                                'Any changes made to the author order require that all contribution statements are also manually updated to match.',
                            type: 'info',
                        },
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Scale/significance of work - Creator research statement',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        authors: {
            title: 'Authors',
            description: 'Please provide a list of authors and then select your name from the list.',
            descriptionAuthorOrEditor:
                'Please provide a list of authors and then select your name once from the list of authors or editors.',
            help: {
                title: 'Authors/Designers name',
                text: (
                    <p>
                        For more information about identification of author/creator/designer, click{' '}
                        <a
                            target="_blank"
                            href="https://guides.library.uq.edu.au/for-researchers/uqespace-publications-datasets/ntro-submission-requirements#s-lg-box-20836546"
                        >
                            here
                        </a>
                    </p>
                ),
                buttonLabel: 'CLOSE',
            },
            field: {
                errorMessage: 'You can not add two authors with the same ID',
                form: {
                    locale: {
                        descriptionStep1: (
                            <div>
                                <span className="authorSteps" key="step-1">
                                    Step 1 of 2
                                </span>{' '}
                                - Please <b>add to a list of authors below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        descriptionStep1NoStep2: (
                            <div>
                                Please <b>add to a list of authors below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        nameAsPublishedLabel: "Enter each author's name as published (eg. Smith, John)",
                        nameAsPublishedHint: 'Type the name exactly as published',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add author',
                        nameAsPublishedFieldId: 'authors-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: (
                            <div>
                                <span className="authorSteps" key="step-2">
                                    Step 2 of 2
                                </span>{' '}
                                - Please <b>select your name</b> from the list below (if applicable).
                            </div>
                        ),
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: "Author's name as published",
                        identifierColumn: 'UQ identifier / Organisation',
                        reorderColumn: 'Reorder items',
                        organisationColumn: 'Organisation',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        lockedTooltip: 'You are not able to edit this row',
                        suffix: ' listed author',
                        unselectedHint: 'Select this to confirm [identifier] is you',
                        selectedHint: 'This is you',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this author ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        authorsList: suffix => ({
            title: `${capitalizeFirstLetter(suffix)}s`,
            field: {
                form: {
                    locale: {
                        nameAsPublishedLabel: `${capitalizeFirstLetter(suffix)}'s name as published`,
                        nameAsPublishedHint: 'Type the name exactly as published (eg. Smith, John)',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: `Add ${suffix}`,
                        creatorRoleLabel: "Enter creator's role",
                        creatorRoleHint:
                            'Select role from list or type the role of the creator in relation to the dataset',
                    },
                },
                header: {
                    locale: {
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: `${capitalizeFirstLetter(suffix)}'s name as published`,
                        identifierColumn: 'UQ identifiers',
                        organisationColumn: 'Organisation/Organisation type',
                        roleColumn: 'Creator role',
                    },
                },
                row: {
                    locale: {
                        suffix: ` listed ${suffix}`,
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                    },
                },
            },
        }),
        editors: {
            title: 'Editors',
            description: 'Please provide a list of editors and then select your name from the list.',
            descriptionAuthorOrEditor:
                'Please provide a list of editors and then select your name once from the list of authors or editors.',
            // help: {
            //     title: 'Editors',
            //     text: 'some help',
            //     buttonLabel: 'CLOSE'
            // },
            field: {
                form: {
                    locale: {
                        descriptionStep1: (
                            <div>
                                <span className="authorSteps" key="step-1">
                                    Step 1 of 2
                                </span>{' '}
                                - Please <b>add to a list of editors below</b>, in the format "John Smith".
                            </div>
                        ),
                        descriptionStep1NoStep2: (
                            <div>
                                Please <b>add to a list of editors below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        nameAsPublishedLabel: "Enter each editor's name as published (eg. John Smith)",
                        nameAsPublishedHint: 'Type the name in the format eg. "John Smith"',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add editor',
                        nameAsPublishedFieldId: 'editors-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: (
                            <div>
                                <span className="authorSteps" key="step-2">
                                    Step 2 of 2
                                </span>{' '}
                                - Please <b>select your name</b> from the list below (if applicable).
                            </div>
                        ),
                        contributorAssignmentColumn: 'Select your name (if applicable)',
                        nameColumn: 'Editor\'s name in the format eg. "John Smith"',
                        identifierColumn: 'UQ identifier / Organisation',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        suffix: ' listed editor',
                        unselectedHint: 'Select this to confirm this editor is you',
                        selectedHint: 'This is you',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this editor ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        creators: {
            title: 'Creators',
            // help: {
            //     title: 'Creators',
            //     text: 'some help',
            //     buttonLabel: 'CLOSE'
            // },
            description:
                'Please provide a list of creators (e.g. producer or performer if self-produced) and then select your name from the list.',
            descriptionCreatorOrContributor:
                'Please provide a list of creators (e.g. producer or performer if self-produced) and then select your name once from the list of creators or contributors.',
            field: {
                form: {
                    locale: {
                        descriptionStep1: (
                            <div>
                                <span className="authorSteps" key="step-1">
                                    Step 1 of 2
                                </span>{' '}
                                - Please <b>add to a list of creators below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        descriptionStep1NoStep2: (
                            <div>
                                Please <b>add to a list of creators below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        nameAsPublishedLabel: "Enter each creator's name as published (eg. Smith, John)",
                        nameAsPublishedHint: 'Type the name exactly as published',
                        creatorRoleLabel: "Enter creator's role",
                        creatorRoleHint:
                            'Select role from list or type the role of the creator in relation to the dataset',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add creator',
                        nameAsPublishedFieldId: 'creators-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: (
                            <div>
                                <span className="authorSteps" key="step-2">
                                    Step 2 of 2
                                </span>{' '}
                                - Please <b>select your name</b> from the list below (if applicable).
                            </div>
                        ),
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: "Creator's name as published",
                        roleColumn: "Creator's role",
                        identifierColumn: 'UQ identifier',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        suffix: ' listed creator',
                        unselectedHint: 'Select this to confirm this creator is you',
                        selectedHint: 'This is you',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this creator ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        designers: {
            title: 'Designer name',
            description: 'Please provide a list of designers and then select your name from the list.',
            help: {
                title: 'Designers',
                text: (
                    <p>
                        For more information about identification of author/creator/designer, click{' '}
                        <a
                            target="_blank"
                            href="https://guides.library.uq.edu.au/for-researchers/uqespace-publications-datasets/ntro-submission-requirements#s-lg-box-20836546"
                        >
                            here
                        </a>
                    </p>
                ),
                buttonLabel: 'CLOSE',
            },
            field: {
                form: {
                    locale: {
                        descriptionStep1: (
                            <div>
                                <span className="authorSteps" key="step-1">
                                    Step 1 of 2
                                </span>{' '}
                                - Please <b>add to a list of designers below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        descriptionStep1NoStep2: (
                            <div>
                                Please <b>add to a list of designers below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        nameAsPublishedLabel: "Enter each designer's name as published (eg. Smith, John)",
                        nameAsPublishedHint: 'Type the name exactly as published',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add designer',
                        nameAsPublishedFieldId: 'designers-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: (
                            <div>
                                <span className="authorSteps" key="step-2">
                                    Step 2 of 2
                                </span>{' '}
                                - Please <b>select your name</b> from the list below (if applicable).
                            </div>
                        ),
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: 'Designers name as published',
                        identifierColumn: 'UQ identifier',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        suffix: ' listed designer',
                        unselectedHint: 'Select this to confirm this designer is you',
                        selectedHint: 'This is you',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this designer ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        supervisors: {
            title: 'Supervisors',
            // help: {
            //     title: 'Supervisors help',
            //     text: 'Enter supervisor names e.g. first name, last name. Additional boxes will appear for more supervisors.',
            //     buttonLabel: 'CLOSE'
            // },
            description: 'Please provide a list of supervisors and then select your name from the list.',
            field: {
                form: {
                    locale: {
                        descriptionStep1: (
                            <div>
                                <span className="authorSteps" key="step-1">
                                    Step 1 of 2
                                </span>{' '}
                                - Please <b>add to a list of supervisors below</b>, in the format and order that they
                                are published.
                            </div>
                        ),
                        descriptionStep1NoStep2: (
                            <div>
                                Please <b>add to a list of supervisors below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        nameAsPublishedLabel: "Enter each supervisor's name as published (eg. Smith, John)",
                        nameAsPublishedHint: '',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add supervisor',
                        nameAsPublishedFieldId: 'supervisors-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: (
                            <div>
                                <span className="authorSteps" key="step-2">
                                    Step 2 of 2
                                </span>{' '}
                                - Please <b>select your name</b> from the list below (if applicable).
                            </div>
                        ),
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: "Supervisor's name as published",
                        identifierColumn: 'UQ identifier',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        suffix: ' listed supervisor',
                        unselectedHint: 'Select this to confirm this supervisor is you',
                        selectedHint: 'This is you',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this supervisor ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        designCreators: {
            title: 'Creators',
            // help: {
            //     title: 'Creators help',
            //     text: 'Enter creator names e.g. first name, last name. ' +
            // 'Additional boxes will appear for more creators.',
            //     buttonLabel: 'CLOSE'
            // },
            description: 'Please provide a list of creators and then select your name from the list.',
            field: {
                form: {
                    locale: {
                        descriptionStep1: (
                            <div>
                                <span className="authorSteps" key="step-1">
                                    Step 1 of 2
                                </span>{' '}
                                - Please <b>add to a list of creators below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        descriptionStep1NoStep2: (
                            <div>
                                Please <b>add to a list of creators below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        nameAsPublishedLabel: "Enter each creator's name as published (eg. Smith, John)",
                        nameAsPublishedHint: '',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add creator',
                        nameAsPublishedFieldId: 'creators-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: (
                            <div>
                                <span className="authorSteps" key="step-2">
                                    Step 2 of 2
                                </span>{' '}
                                - Please <b>select your name</b> from the list below (if applicable).
                            </div>
                        ),
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: "Creator's name as published",
                        identifierColumn: 'UQ identifier',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        suffix: ' listed creator',
                        unselectedHint: 'Select this to confirm this creator is you',
                        selectedHint: 'This is you',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this creator ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        thesisSubmissionSupervisors: {
            title: 'Supervisors',
            // help: {
            //     title: 'Supervisors help',
            //     text: 'Enter supervisor names e.g. first name, last name. Additional boxes will appear for more supervisors.',
            //     buttonLabel: 'CLOSE'
            // },
            field: {
                form: {
                    locale: {
                        descriptionStep1: '',
                        descriptionStep1NoStep2: 'List your current supervisors',
                        nameAsPublishedLabel: 'Enter each supervisor’s name on a separate line e.g. Firstname Surname',
                        nameAsPublishedHint: '',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add supervisor',
                        nameAsPublishedFieldId: 'supervisors-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: '',
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: "Supervisor's name",
                        identifierColumn: 'UQ identifier',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        suffix: ' listed supervisor',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this supervisor ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        contributors: {
            title: 'Contributors',
            help: {
                title: 'Contributors',
                text:
                    'This is the contributor, and may be different to the creator, e.g. interviewee, performer (if not self-produced). Type contributors in the order and form they appear on the work or associated material. Examples of associated material are programs or promotional material. Additional boxes will appear for more contributors.',
                buttonLabel: 'CLOSE',
            },
            field: {
                form: {
                    locale: {
                        descriptionStep1: (
                            <div>
                                <span className="authorSteps" key="step-1">
                                    Step 1 of 2
                                </span>{' '}
                                - Please <b>add to a list of contributors below</b>, in the format and order that they
                                are published.
                            </div>
                        ),
                        descriptionStep1NoStep2: (
                            <div>
                                Please <b>add to a list of contributors below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        nameAsPublishedLabel: "Enter each contributor's name as published (eg. Smith, John)",
                        nameAsPublishedHint: 'Type the name exactly as published',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add contributor',
                        nameAsPublishedFieldId: 'contributors-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: (
                            <div>
                                <span className="authorSteps" key="step-2">
                                    Step 2 of 2
                                </span>{' '}
                                - Please <b>select your name</b> from the list below (if applicable).
                            </div>
                        ),
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: "Contributor's name as published",
                        identifierColumn: 'UQ identifier / Organisation',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        suffix: ' listed contributor',
                        unselectedHint: 'Select this to confirm this contributor is you',
                        selectedHint: 'This is you',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this contributor ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        fieldOfResearchForm: {
            title: 'Field of research',
            text: 'Select up to 3 Field of Research (FoR) codes at the 4 digit level',
            // help: {
            //     title: 'Field of research',
            //     text: 'more info',
            //     buttonLabel: 'CLOSE'
            // },
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Field of research',
                        inputFieldHint: 'Start typing code or field name and select from list',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Field of research',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        deleteHint: 'Remove this item',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        subjectForm: {
            title: 'Subject',
            text: 'Select subject codes',
            // help: {
            //     title: 'Field of research',
            //     text: 'more info',
            //     buttonLabel: 'CLOSE'
            // },
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Begin typing to select and add subject(s)',
                        inputFieldHint: 'Start typing code or field name and select from list',
                        addButtonLabel: <span>Add&nbsp;Subject</span>,
                        editButtonLabel: <span>Edit&nbsp;Subject</span>,
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Subject',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        paging: {
            nextPage: 'Next',
            previousPage: 'Previous',
            maxPagesToShow: 5,
            pageSize: 'Works per page',
            pageOf: 'Page [currentPage] of [totalPages]',
            totalRecords: '([total] works)',
            pagingBracket: 3,
            pageButtonAriaLabel: 'Click to select page [pageNumber] of [totalPages] result pages',
            firstLastSeparator: '...',
        },
        sorting: {
            pageSize: 'Works per page',
            sortLabel: 'Sort results by',
            sortDirectionLabel: 'Sort order',
            sortBy: [
                { value: 'published_date', label: 'Published date' },
                { value: 'score', label: 'Search relevance' },
                { value: 'title', label: 'Title' },
                { value: 'created_date', label: 'Created date' },
                { value: 'updated_date', label: 'Updated date' },
                { value: 'altmetric_score', label: 'Altmetric score' },
                { value: 'scopus_citation_count', label: 'Scopus citation count' },
                { value: 'thomson_citation_count', label: 'Web of Science citation count' },
            ],
            sortDirection: ['Desc', 'Asc'],
            recordsPerPage: [10, 20, 50, 100],
            exportOnlyLabel: 'Export Only:',
            bulkExportConfirmation: {
                confirmationTitle: 'Export queued successfully',
                confirmationMessage: (
                    <span style={{ display: 'block', margin: '1em 0' }}>
                        Bulk export request has been queued. When the request has been processed, you will receive an
                        email with the exported file as an attachment.
                    </span>
                ),
                confirmButtonLabel: 'Close',
            },
        },
        newsFeed: {
            title: 'Latest news',
        },
        ntroFields: {
            header: {
                title: 'Non-traditional research output (NTRO) requirements',
                body: (
                    <React.Fragment>
                        <p>In order to submit this NTRO work type or update an existing NTRO work, you must include:</p>
                        <ol>
                            <li>
                                A creator research statement of up to 2000 characters (250 – 300 words) that includes
                                the background, contribution and significance of the work. It must be substantiated by
                                the 'Major' or ‘Minor’ Scale/Significance option that you select on the form.{' '}
                                <b>This is not for public view.</b>
                            </li>
                            <li>
                                An abstract/description of the work, up to 800 characters (approx. 100 words). This is
                                for public view.
                            </li>
                            <li>
                                At least one evidence file, e.g. a .pdf, .mp4, .tiff or .wav copy, representation or
                                review of the work.
                            </li>
                        </ol>

                        <p>
                            Note:
                            <br />A research statement can be updated at any time via the REQUEST CORRECTION button for
                            the work.
                        </p>
                    </React.Fragment>
                ),
            },
            metadata: {
                help: {
                    title: 'NTRO data',
                    text: (
                        <React.Fragment>
                            <Typography component="h4" variant="h6">
                                Quality indicators
                            </Typography>
                            <p>
                                For more information about each quality indicator option, click{' '}
                                <b>
                                    <a
                                        style={{ fontWeight: 700 }}
                                        target="_blank"
                                        href="https://guides.library.uq.edu.au/for-researchers/uqespace-publications-datasets/ntro-submission-requirements#s-lg-box-20836609"
                                    >
                                        here
                                    </a>
                                </b>
                            </p>
                        </React.Fragment>
                    ),
                    buttonLabel: 'CLOSE',
                },
            },
        },
        export: {
            label: 'Export page results',
            format: [
                { value: 'excel', label: 'Excel File' },
                { value: 'endnote', label: 'Endnote File' },
            ],
            filename: {
                prefix: 'espace_export',
                dateFormat: 'YYYYMMDDHHmmss',
            },
        },
        searchComponent: {
            searchBoxPlaceholder: 'Search eSpace',
            searchBoxHint: 'Enter your search query to search all fields in eSpace',
            ariaInputLabel: 'Enter your search query to search eSpace and then press Enter',
            searchButtonHint: 'Search eSpace',
            mobileSearchButtonAriaLabel: 'Click to search eSpace',
            advancedSearchButtonText: 'Advanced search',
            advancedSearchButtonAriaLabel: 'Click to switch to Advanced search',
            searchButtonText: 'Search',
            searchButtonAriaLabel: 'Click to search eSpace',
            simpleSearchToggle: 'Simple search',
            advancedSearch: {
                title: 'Advanced search',
                mode: 'advanced',
                tooltip: {
                    show: 'Show advanced search',
                    hide: 'Hide advanced search',
                },
                selectAria: 'Click to select a field to search from the list - [current_selection] currently selected',
                deleteAria: 'Click to delete this search row',
                fieldTypes: {
                    '0': {
                        order: 0, // order of appearance in adv search field list
                        map: '', // map refers to its real world lookup name to match Facets
                        title: 'Select a field',
                        combiner: null,
                        type: 'TextField',
                        id: 'initial',
                        hint: 'Select a field to search on',
                        validation: [],
                        ariaLabel: 'Select a field to search on',
                    },
                    divider1: {
                        order: 0.5,
                        type: 'divider',
                    },
                    all: {
                        order: 1,
                        map: '',
                        title: 'Any field',
                        id: 'any-field',
                        combiner: 'contains',
                        type: 'TextField',
                        hint: 'Add some text to search all fields with',
                        captionValue: 'anything',
                        validation: ['maxLength2000'],
                        ariaLabel: 'Type a value to search all fields for',
                    },
                    rek_title: {
                        order: 2,
                        map: 'Title',
                        title: 'Title',
                        combiner: 'contains',
                        type: 'TextField',
                        id: 'rek-title',
                        hint: 'Add a title',
                        validation: ['required', 'maxLength255'],
                        ariaLabel: 'Type a title to search for',
                    },
                    rek_book_title: {
                        order: 2.5,
                        map: 'Book title',
                        title: 'Book title for chapters',
                        combiner: 'contains',
                        type: 'TextField',
                        hint: 'Add a book title',
                        validation: ['required', 'maxLength255'],
                        ariaLabel: 'Type a book title to search for',
                        id: 'rek-book-title',
                    },
                    rek_pid: {
                        order: 9,
                        map: 'PID',
                        title: 'PID',
                        id: 'rek-pid',
                        combiner: 'is',
                        type: 'TextField',
                        hint: 'Add a PID',
                        validation: ['required', 'pid'],
                        ariaLabel: 'Type a PID to search for',
                    },
                    rek_author: {
                        order: 3,
                        map: 'Author',
                        title: 'Author Name',
                        combiner: 'contains',
                        id: 'rek-author',
                        type: 'TextField',
                        hint: 'Add an author name',
                        validation: ['required', 'maxLength255'],
                        ariaLabel: 'Type an author name to search for',
                    },
                    rek_contributor: {
                        order: 5,
                        map: 'Contributor',
                        title: 'Editor/Contributor',
                        id: 'rek-contributor',
                        combiner: 'contains',
                        type: 'TextField',
                        hint: 'Add an editor/contributor name',
                        validation: ['required', 'maxLength255'],
                        ariaLabel: 'Type a contributor name to search for',
                    },
                    rek_series: {
                        order: 10,
                        map: 'Series',
                        title: 'Series',
                        combiner: 'contains',
                        id: 'rek-series',
                        type: 'TextField',
                        hint: 'Add a series name',
                        validation: ['required', 'maxLength500'],
                        ariaLabel: 'Type a series name to search for',
                    },
                    rek_journal_name: {
                        order: 11,
                        map: 'Journal name',
                        title: 'Journal name',
                        id: 'rek-journal-name',
                        combiner: 'contains',
                        type: 'TextField',
                        hint: 'Add a journal name',
                        validation: ['required', 'maxLength500'],
                        ariaLabel: 'Type a journal name to search for',
                    },
                    rek_conference_name: {
                        order: 12,
                        map: 'Conference name',
                        title: 'Conference Name',
                        id: 'rek-conference-name',
                        combiner: 'contains',
                        type: 'TextField',
                        hint: 'Add a conference name',
                        validation: ['required', 'maxLength500'],
                        ariaLabel: 'Type a conference name to search for',
                    },
                    rek_doi: {
                        order: 8,
                        map: '',
                        title: 'DOI',
                        combiner: 'contains',
                        id: 'rek-doi',
                        type: 'TextField',
                        hint: 'Add a DOI',
                        validation: ['required', 'doi'],
                        ariaLabel: 'Type a DOI to search for',
                    },
                    rek_publisher: {
                        order: 13,
                        map: 'Publisher',
                        title: 'Publisher',
                        id: 'rek-publisher',
                        combiner: 'is',
                        type: 'PublisherLookup',
                        hint: 'Add a publisher',
                        validation: ['required'],
                        ariaLabel: 'Type a publisher to search for',
                    },
                    rek_ismemberof: {
                        order: 7,
                        map: 'Collection',
                        title: 'Collection',
                        combiner: 'is one of',
                        type: 'CollectionsLookup',
                        hint: 'Type a Collection title to search',
                        errorHint: 'There has been an error loading collections',
                        multiple: true,
                        validation: ['requiredList'],
                        ariaLabel: 'Select multiple collections to search for',
                        label: 'Collections',
                        collectionFieldId: 'rek-ismemberof',
                    },
                    rek_genre_type: {
                        order: 14,
                        map: 'Genre',
                        title: 'Thesis type',
                        combiner: 'is one of',
                        type: 'ThesisTypeLookup',
                        selectPrompt: 'Select a Thesis type',
                        multiple: true,
                        validation: ['requiredList'],
                        ariaLabel: 'Select multiple thesis types to search for',
                        id: 'rek-genre-type',
                    },
                    rek_author_id: {
                        order: 4,
                        map: 'Author Id',
                        title: 'Author ID',
                        combiner: 'is',
                        type: 'AuthorIdLookup',
                        hint: 'Type an author name to search',
                        validation: ['required', 'maxLength9'],
                        ariaLabel: 'Begin typing an author ID to select an author from the list',
                        id: 'rek-author-id',
                    },
                    rek_contributor_id: {
                        order: 6,
                        map: 'Contributor Id',
                        title: 'Contributor ID',
                        combiner: 'is',
                        type: 'ContributorIdLookup',
                        hint: 'Add a contributor id',
                        validation: ['required', 'maxLength9'],
                        ariaLabel: 'Begin typing an contributor ID to select an author from the list',
                        id: 'rek-contributor-id',
                    },
                    rek_org_unit_name: {
                        order: 15,
                        map: '',
                        title: 'School, Centre or Institute',
                        combiner: 'is',
                        type: 'OrgUnitLookup',
                        hint: 'Add a school, centre or institute',
                        validation: ['required'],
                        id: 'rek-org-unit-name',
                        ariaLabel: 'Begin typing an school, centre or institute name to select an author from the list',
                    },
                    rek_display_type: {
                        order: 20,
                        map: 'Work type',
                        title: 'Work type',
                        combiner: 'is one of',
                        type: null,
                        hint: 'Select work types',
                        validation: [],
                        id: 'rek-display-type',
                        ariaLabel: 'Select work types to search on',
                    },
                    facet_year_range: {
                        order: 21,
                        map: '',
                        title: 'Published year range',
                        captionTitle: 'Published',
                        type: null,
                        combiner: 'between',
                        fromHint: 'Year from',
                        fromAria: 'Enter a year to search from',
                        toAria: 'Enter a year to search to',
                        toHint: 'Year to',
                        invalidText: 'Invalid year range',
                        ariaLabel: 'Add valid year ranges to search between',
                    },
                    rek_status: {
                        order: 16,
                        map: 'Status',
                        title: 'Status',
                        combiner: 'is',
                        type: 'StatusLookup',
                        hint: 'Select status',
                        validation: ['required'],
                        ariaLabel: 'Select a status to search on',
                        isUnpublishedField: true,
                        id: 'rek-status',
                        selectPrompt: 'Select a status',
                    },
                    rek_created_date: {
                        order: 22,
                        title: 'Created date range',
                        captionTitle: 'Created',
                        type: null,
                        combiner: 'between',
                        ariaLabel: 'Add valid date ranges to search between',
                        isUnpublishedField: true,
                        validation: [],
                        captionFn: value =>
                            (value.from &&
                                value.to &&
                                value.from.isBefore(value.to) && {
                                    field: 'rek_created_date',
                                    title: 'Created',
                                    combiner: 'between',
                                    value: `${value.from.format('Do MMMM, YYYY')} and ${value.to.format(
                                        'Do MMMM, YYYY',
                                    )}`,
                                }) ||
                            null,
                    },
                    rek_updated_date: {
                        order: 23,
                        title: 'Updated date range',
                        captionTitle: 'Updated',
                        type: null,
                        combiner: 'between',
                        ariaLabel: 'Add valid date ranges to search between',
                        isUnpublishedField: true,
                        validation: [],
                        captionFn: value =>
                            (value.from &&
                                value.to &&
                                value.from.isBefore(value.to) && {
                                    field: 'rek_updated_date',
                                    title: 'Updated',
                                    combiner: 'between',
                                    value: `${value.from.format('Do MMMM, YYYY')} and ${value.to.format(
                                        'Do MMMM, YYYY',
                                    )}`,
                                }) ||
                            null,
                    },
                    mtj_jnl_id: {
                        order: 16,
                        map: 'Journal ID',
                        title: 'Journal ID',
                        combiner: 'is',
                        type: 'TextField',
                        hint: 'Type an journal ID to seach',
                        validation: ['required'],
                        ariaLabel: 'Begin typing an journal ID',
                        id: 'mtj_jnl_id',
                        disabled: true,
                    },
                },
                openAccess: {
                    title: 'Open access',
                    combiner: 'is',
                    captionText: <span className="value">open access/full text</span>,
                    ariaLabel: 'Check to search for open access / full text works',
                },
                addField: {
                    title: 'Add another field',
                    aria: 'Click to add another advanced search field',
                },
                reset: {
                    title: 'Reset',
                    aria: 'Click to reset the advanced search',
                },
                simpleSearch: {
                    title: 'Back To Simple search',
                    aria: 'Click to return to the simple search',
                },
                favouriteSearch: {
                    inputForm: {
                        confirmationTitle: 'Please add description',
                        confirmButtonLabel: 'Save favourite search',
                        cancelButtonLabel: 'Cancel',
                    },
                    favouriteSearchHint: 'Click to save favourite search',
                    favouriteSearchSaved: 'Saved as a favourite search',
                },
            },
        },
        whatIsEspace: {
            title: 'What is eSpace?',
            text: (
                <span>
                    The University of Queensland's institutional repository, UQ eSpace, aims to create global visibility
                    and accessibility of UQ’s scholarly research by enhancing discovery of UQ research via search
                    engines such as Google and Trove...
                </span>
            ),
            readMoreLabel: ' read more',
            readMoreTitle: 'Click to read more about UQ eSpace',
            readMoreLink: '/contact',
        },
        fileUploader: {
            label: 'Click here to select files, or drag files into this area to upload',
        },
        securitySection: {
            admin: {
                field: {
                    label: 'Use this interface as a...',
                    menuItemText: {
                        superAdmin: 'Super admin',
                        admin: 'Admin',
                    },
                },
                typeField: {
                    label: 'Preview form for...',
                    menuItemText: {
                        community: 'Community',
                        collection: 'Collection',
                        record: 'Record',
                        dataStream: 'Data Stream',
                    },
                },
            },
            community: {
                cardTitle: pid => (
                    <span>
                        <strong>Community</strong> level security - {pid}
                    </span>
                ),
                prompt: 'Select a security policy to apply',
                fieldLabel: 'Override community level policy to apply to this PID',
                selectedTitle: 'Selected community record security policy details',
                description: '',
            },
            collection: {
                cardTitle: pid => (
                    <span>
                        <strong>Collection</strong> level security - {pid}
                    </span>
                ),
                prompt: 'Select a security policy to apply',
                fieldLabel: 'Override collection level policy to apply to this PID',
                dataStreamFieldLabel: (
                    <span>
                        Override datastream level policy to apply to the <b>datastream</b> of this PID
                    </span>
                ),
                selectedTitle: 'Current collection level security policy details',
                dataStreamSelectedTitle: (
                    <span>
                        Current collection <b>datastream</b> level security policy details
                    </span>
                ),
                description: '',
            },
            record: {
                cardTitle: pid => (
                    <span>
                        <strong>Work</strong> level security - {pid}
                    </span>
                ),
                prompt: 'Select a security policy to apply',
                fieldLabel: 'Override work',
                dataStreamFieldLabel: 'Override work level policy to apply to this PID',
                selectedTitle: 'Selected work level security policy details',
                dataStreamSelectedTitle: 'Selected work level datastream security policy details',
                description: '',
                dataStream: {
                    cardTitle: pid => (
                        <span>
                            <strong>Datastream</strong> level security - {pid}
                        </span>
                    ),
                    overridePrompt: 'Override datastream security policy details',
                    overridePolicyPrompt: 'Security policy for this file to override inheritance',
                    noDataStreams: 'No datastreams to display',
                },
                inheritedPolicy: {
                    record: {
                        title: 'Inherited security policy details',
                    },
                    dataStream: {
                        title: 'Inherited datastream security policy details',
                    },
                },
            },
            submit: 'Submit',
        },
        contentIndicators: {
            label: 'Content Indicators',
            divider: ', ',
        },
        attachedFiles: {
            title: 'Files',
            fileName: 'File name',
            description: 'Description',
            embargoDate: 'Open access after [embargoDate]',
            size: 'Size',
            culturalSensitivityStatement:
                'Cultural Sensitivity Statement - Be advised that some files may contain content which is of a sensitive nature to some cultures or tastes.',
            linkTitle: 'Click to open this file in a new window - [filename] - [description] - [size]',
            preview: {
                videoTitle: 'Video preview',
                imageTitle: 'Image preview',
                openInNewWindow: 'Open/Download file in a new window',
                close: 'Close',
            },
            downloadButtonLabel: 'Download file',
            licenceConfirmation: licence =>
                (!!licence && {
                    confirmationTitle: licence.text,
                    confirmationMessage: licence?.description?.join(' '),
                    confirmButtonLabel: 'I agree',
                    cancelButtonLabel: 'Cancel',
                }) ||
                {},
        },
        digiTeam: {
            batchImport: {
                title: 'CSV ingest',
                help: {},
                formLabels: {
                    community: {
                        ...selectFields.community,
                    },
                    collection: {
                        ...selectFields.collection,
                    },
                    docType: {
                        label: 'Select a document type',
                        placeholder: 'Select a document type',
                        ariaLabel: 'Select a document type',
                        selectPrompt: 'Please select a document type',
                    },
                    subType: {
                        label: 'Select a document subtype',
                        placeholder: 'Select a document subtype',
                        ariaLabel: 'Select a document subtype',
                        selectPrompt: 'Please select a document subtype',
                    },
                    directory: {
                        ...selectFields.directory,
                    },
                    bulkFileIngest: {
                        label: 'Switch to bulk file/edit ingest',
                    },
                    cancelButtonLabel: 'Cancel and return to the homepage',
                    submitButtonLabel: 'Ingest now',
                },
                submitProgressAlert: {
                    type: 'info',
                    alertId: 'alert-info-batch-import',
                    title: 'Requesting CSV ingest',
                    message: 'Waiting for response...',
                },
                submitSuccessAlert: {
                    type: 'done',
                    alertId: 'alert-done-batch-import',
                    title: 'Success',
                    message: 'The request to batch-import has been submitted successfully.',
                },
                submitFailureAlert: {
                    type: 'error',
                    alertId: 'alert-error-batch-import',
                    title: 'Error',
                    message: 'The batch-import request could not be submitted.',
                },
                postSubmitPrompt: {
                    confirmButtonLabel: 'Start another ingest',
                },
                details: {
                    community: {
                        help: {},
                    },
                    collection: {
                        help: {},
                    },
                    docType: {
                        help: {},
                    },
                    directory: {
                        help: {},
                    },
                },
            },
        },
        periodForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Period',
                        inputFieldHint: 'Type Period',
                        addButtonLabel: 'Add',
                        id: 'Period-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Periods',
                        reorderColumn: 'Reorder Periods',
                        deleteAll: 'Remove all Periods',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Periods?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Period up the order',
                        moveDownHint: 'Move Period down the order',
                        deleteHint: 'Remove this Period',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Period',
                            confirmationMessage: 'Are you sure you want to delete this Period?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        structuralSystemsForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Structural systems',
                        inputFieldHint: 'Type Structural system Name',
                        addButtonLabel: 'Add',
                        id: 'Structural-Systems-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Structural systems',
                        reorderColumn: 'Reorder Structural systems',
                        deleteAll: 'Remove all Structural systems',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Structural systems?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Structural system up the order',
                        moveDownHint: 'Move Structural system down the order',
                        deleteHint: 'Remove this Structural system',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Structural system',
                            confirmationMessage: 'Are you sure you want to delete this Structural system?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        styleForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Style',
                        inputFieldHint: 'Type Style name',
                        addButtonLabel: 'Add',
                        id: 'Style-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Styles',
                        reorderColumn: 'Reorder Styles',
                        deleteAll: 'Remove all Styles',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Styles?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Style up the order',
                        moveDownHint: 'Move Style down the order',
                        deleteHint: 'Remove this Style',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Style',
                            confirmationMessage: 'Are you sure you want to delete this Style?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        categoryForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Category',
                        inputFieldHint: 'Type Category name',
                        addButtonLabel: 'Add',
                        id: 'Category-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Categories',
                        reorderColumn: 'Reorder Categories',
                        deleteAll: 'Remove all Categories',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Categories?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Category up the order',
                        moveDownHint: 'Move Category down the order',
                        deleteHint: 'Remove this Category',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Category',
                            confirmationMessage: 'Are you sure you want to delete this Category?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        subcategoryForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Subcategory',
                        inputFieldHint: 'Type Subcategory name',
                        addButtonLabel: 'Add',
                        id: 'Subcategory-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Subcategories',
                        reorderColumn: 'Reorder Subcategories',
                        deleteAll: 'Remove all Subcategories',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Subcategories?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Subcategory up the order',
                        moveDownHint: 'Move Subcategory down the order',
                        deleteHint: 'Remove this Subcategory',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Subcategory',
                            confirmationMessage: 'Are you sure you want to delete this Subcategory?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        surroundingFeaturesForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Surrounding features',
                        inputFieldHint: 'Type Surrounding feature name',
                        addButtonLabel: 'Add',
                        id: 'Surrounding-feature-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Surrounding features',
                        reorderColumn: 'Reorder Surrounding features',
                        deleteAll: 'Remove all Surrounding features',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Surrounding features?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Surrounding feature up the order',
                        moveDownHint: 'Move Surrounding feature down the order',
                        deleteHint: 'Remove this Surrounding feature',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Surrounding feature',
                            confirmationMessage: 'Are you sure you want to delete this Surrounding feature?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        interiorFeaturesForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Interior features',
                        inputFieldHint: 'Type Interior feature name',
                        addButtonLabel: 'Add',
                        id: 'Interior-feature-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Interior features',
                        reorderColumn: 'Reorder Interior features',
                        deleteAll: 'Remove all Interior features',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Interior features?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Interior feature up the order',
                        moveDownHint: 'Move Interior feature down the order',
                        deleteHint: 'Remove this Interior feature',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Interior feature',
                            confirmationMessage: 'Are you sure you want to delete this Interior feature?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        buildingMaterialsForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Building materials',
                        inputFieldHint: 'Type Building material name',
                        addButtonLabel: 'Add',
                        id: 'Interior-feature-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Building materials',
                        reorderColumn: 'Reorder Building materials',
                        deleteAll: 'Remove all Building materials',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Building materials?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Building material up the order',
                        moveDownHint: 'Move Building material down the order',
                        deleteHint: 'Remove this Building material',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Building material',
                            confirmationMessage: 'Are you sure you want to delete this Building material?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        conditionForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Conditions',
                        inputFieldHint: 'Type Condition name',
                        addButtonLabel: 'Add',
                        id: 'Interior-feature-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Conditions',
                        reorderColumn: 'Reorder Conditions',
                        deleteAll: 'Remove all Conditions',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Conditions?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Condition up the order',
                        moveDownHint: 'Move Condition down the order',
                        deleteHint: 'Remove this Condition',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Condition',
                            confirmationMessage: 'Are you sure you want to delete this Condition?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        alternativeTitleForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Alternative titles',
                        inputFieldHint: 'Type Alternative title',
                        addButtonLabel: 'Add',
                        id: 'Interior-feature-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Alternative titles',
                        reorderColumn: 'Reorder Alternative titles',
                        deleteAll: 'Remove all Alternative titles',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Alternative titles?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Alternative title up the order',
                        moveDownHint: 'Move Alternative title down the order',
                        deleteHint: 'Remove this Alternative title',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Alternative title',
                            confirmationMessage: 'Are you sure you want to delete this Alternative title?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        architecturalFeaturesForm: {
            field: {
                form: {
                    locale: {
                        inputFieldLabel: 'Architectural features',
                        inputFieldHint: 'Type Architectural feature',
                        addButtonLabel: 'Add',
                        id: 'Interior-feature-input',
                    },
                },
                header: {
                    locale: {
                        nameColumn: 'Architectural features',
                        reorderColumn: 'Reorder Architectural features',
                        deleteAll: 'Remove all Architectural features',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all Architectural features?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        moveUpHint: 'Move Architectural feature up the order',
                        moveDownHint: 'Move Architectural feature down the order',
                        deleteHint: 'Remove this Architectural feature',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete Architectural feature',
                            confirmationMessage: 'Are you sure you want to delete this Architectural feature?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        architects: {
            title: 'Architects',
            help: {
                title: 'Architects',
                text:
                    'Type architects in the order and form they appear on the work or associated material. Additional boxes will appear for more architects.',
                buttonLabel: 'CLOSE',
            },
            field: {
                form: {
                    locale: {
                        descriptionStep1: (
                            <div>
                                Please <b>add to a list of architects below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        descriptionStep1NoStep2: (
                            <div>
                                Please <b>add to a list of architects below</b>, in the format and order that they are
                                published.
                            </div>
                        ),
                        nameAsPublishedLabel: "Enter each architect's name as published (eg. Smith, John)",
                        nameAsPublishedHint: 'Type the name exactly as published',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add architect',
                        nameAsPublishedFieldId: 'architects-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: (
                            <div>
                                <span className="authorSteps" key="step-2">
                                    Step 2 of 2
                                </span>{' '}
                                - Please <b>select your name</b> from the list below (if applicable).
                            </div>
                        ),
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: "Architect's name as published",
                        identifierColumn: 'UQ identifier / Organisation',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        suffix: ' listed architect',
                        unselectedHint: 'Select this to confirm this architect is you',
                        selectedHint: 'This is you',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this architect ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        photographers: {
            title: 'Photographers',
            description: 'Please provide a list of photographers and then select your name from the list.',
            descriptionAuthorOrEditor:
                'Please provide a list of photographers and then select your name once from the list of photographer.',
            help: {
                title: "Photographer's name",
                text: (
                    <p>
                        For more information about identification of photographer, click{' '}
                        <a
                            target="_blank"
                            href="https://guides.library.uq.edu.au/for-researchers/uqespace-publications-datasets/ntro-submission-requirements#s-lg-box-20836546"
                        >
                            here
                        </a>
                    </p>
                ),
                buttonLabel: 'CLOSE',
            },
            field: {
                form: {
                    locale: {
                        descriptionStep1: (
                            <div>
                                <span className="authorSteps" key="step-1">
                                    Step 1 of 2
                                </span>{' '}
                                - Please <b>add to a list of photographers below</b>, in the format and order that they
                                are published.
                            </div>
                        ),
                        descriptionStep1NoStep2: (
                            <div>
                                Please <b>add to a list of photographers below</b>, in the format and order that they
                                are published.
                            </div>
                        ),
                        nameAsPublishedLabel: "Enter each photographer's name as published (eg. Smith, John)",
                        nameAsPublishedHint: 'Type the name exactly as published',
                        identifierLabel: 'UQ identifier (if available)',
                        addButton: 'Add photographer',
                        nameAsPublishedFieldId: 'photographers-name-as-published-field',
                    },
                },
                header: {
                    locale: {
                        descriptionStep2: (
                            <div>
                                <span className="authorSteps" key="step-2">
                                    Step 2 of 2
                                </span>{' '}
                                - Please <b>select your name</b> from the list below (if applicable).
                            </div>
                        ),
                        contributorAssignmentColumn: 'Select your name',
                        nameColumn: "Photographer's name as published",
                        identifierColumn: 'UQ identifier / Organisation',
                        reorderColumn: 'Reorder items',
                        deleteAll: 'Remove all items',
                        deleteAllConfirmation: {
                            confirmationTitle: 'Delete all',
                            confirmationMessage: 'Are you sure you want to delete all items?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
                row: {
                    locale: {
                        lockedTooltip: 'You are not able to edit this row',
                        suffix: ' listed photographer',
                        unselectedHint: 'Select this to confirm [identifier] is you',
                        selectedHint: 'This is you',
                        moveUpHint: 'Move item up the order',
                        moveDownHint: 'Move item down the order',
                        deleteHint: 'Remove this item',
                        editHint: 'Edit this item',
                        selectHint: 'Select this photographer ([name]) to assign it as you',
                        deleteRecordConfirmation: {
                            confirmationTitle: 'Delete item',
                            confirmationMessage: 'Are you sure you want to delete this item?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes',
                        },
                    },
                },
            },
        },
        audienceSizeField: {
            label: 'Audience size',
        },
        bulkUpdatesList: {
            tableTitle: '',
            columns: {
                startedAt: {
                    title: 'Started at',
                },
                createdAt: {
                    title: 'Created at',
                },
                finishedAt: {
                    title: 'Finished at',
                },
                user: {
                    title: 'User',
                },
                name: {
                    title: 'Name',
                },
                status: {
                    title: 'Status',
                },
                failedRecords: {
                    title: 'Failed records',
                },
                processedCount: {
                    title: 'Processed count',
                },
                totalCount: {
                    title: 'Total count',
                },
            },
        },
        favouriteSearchList: {
            tableTitle: '',
            columns: {
                realLink: {
                    title: 'Real link',
                    cellText: 'Link',
                },
                description: {
                    title: 'Description',
                    placeholderText: 'Description',
                    validationMessage: {
                        empty: 'This field is required',
                    },
                },
                aliasedLink: {
                    title: 'Aliased link',
                },
                alias: {
                    title: 'Alias',
                    placeholderText: 'Alias',
                    validationMessage: {
                        empty: 'This field is required',
                        invalid: 'Alias is not valid',
                    },
                    regex: /^[a-z0-9]+[a-z0-9-]*$/gi,
                },
            },
        },
        bulkUpdates: {
            selectPrompt: 'Please select an action',
            inputForm: action => ({
                confirmationTitle: `Bulk updates${!!action ? ' - ' + action.text : ''}`,
            }),
            bulkUpdatesForms: {
                createOrUpdateDoiForm: {
                    formLabels: {
                        doi: 'DOIs',
                        cancelButtonLabel: 'Cancel',
                        submitButtonLabel: 'Confirm',
                    },
                    alert: {
                        message: 'Would you like to create or update existing DOIs for the selected records?',
                        type: 'info',
                    },
                    collectionAlert: {
                        title: 'Note:',
                        message:
                            'There are one or more collections among the selected records. The changes will be apply to child records too.',
                        type: 'warning',
                    },
                    submittingAlert: {
                        title: 'Bulk create/update DOIs',
                        message: 'Creating bulk update job',
                        type: 'info',
                    },
                    successAlert: {
                        title: 'Bulk create/update DOIs',
                        message: 'Bulk update job created successfully',
                        type: 'done',
                    },
                    errorAlert: {
                        title: 'Bulk create/update DOIs',
                        type: 'error',
                    },
                },
                copyToOrRemoveFromCollectionForm: {
                    formLabels: {
                        collection: 'Collection(s)',
                        cancelButtonLabel: 'Cancel',
                        submitButtonLabel: 'Bulk update',
                    },
                    alert: (isRemoveFrom = false) => ({
                        title: `Bulk ${isRemoveFrom ? 'remove from' : 'copy to'} collection`,
                        message:
                            'Select destination collection if moving or copying to a collection, source collection if removing from a collection',
                        type: 'info',
                    }),
                    submittingAlert: (isRemoveFrom = false) => ({
                        title: `Bulk update - ${isRemoveFrom ? 'remove from' : 'copy to'} collection`,
                        message: 'Creating bulk update job',
                        type: 'info',
                    }),
                    successAlert: (isRemoveFrom = false) => ({
                        title: `Bulk update - ${isRemoveFrom ? 'remove from' : 'copy to'} collection`,
                        message: 'Bulk update job created successfully',
                        type: 'done',
                    }),
                    errorAlert: (isRemoveFrom = false) => ({
                        title: `Bulk update - ${isRemoveFrom ? 'remove from' : 'copy to'} collection`,
                        type: 'error',
                    }),
                    warningAlert: {
                        title: 'Note',
                        message: 'Please retain membership of at least one collection',
                        type: 'warning',
                    },
                },
                changeAuthorIdForm: {
                    selectPrompt: 'Please select an option to search author by',
                    formLabels: {
                        searchBy: 'Search author by',
                        searchByAuthorName: 'Search by Author Name',
                        searchByAuthorId: 'Search by Author Id',
                        authorId: 'Author Id',
                        cancelButtonLabel: 'Cancel',
                        submitButtonLabel: 'Bulk update',
                    },
                    alert: {
                        title: 'Bulk change author ID',
                        message:
                            'This will find all authors for each record that match author name string and update the author id with the value selected in author ID. It is case sensitive and will fail if multiple authors are matched. Such as Lee matching Lee and Leep',
                        type: 'info',
                    },
                    submittingAlert: {
                        title: 'Bulk update - change author ID',
                        message: 'Creating bulk update job',
                        type: 'info',
                    },
                    successAlert: {
                        title: 'Bulk update - change author ID',
                        message: 'Bulk update job created successfully',
                        type: 'done',
                    },
                    errorAlert: {
                        title: 'Bulk update - change author ID',
                        type: 'error',
                    },
                    warningAlert: {
                        title: 'Note',
                        message:
                            '[authorNameNoMatchCount] of the [numberOfSelectedWorks] works you have selected do not match and will not be updated',
                        type: 'warning',
                    },
                },
                changeDisplayTypeForm: {
                    formLabels: {
                        displayType: 'New display type',
                        subtype: 'New subtype',
                        cancelButtonLabel: 'Cancel',
                        submitButtonLabel: 'Bulk update',
                    },
                    alert: {
                        title: 'Bulk change display type',
                        message:
                            'Change a list of display types from a search or ad-hoc query to a different display type.  This will cause data loss where the display types don`t overlap next time the pid is updated.',
                        type: 'info',
                    },
                    submittingAlert: {
                        title: 'Bulk update - change display type',
                        message: 'Creating bulk update job',
                        type: 'info',
                    },
                    successAlert: {
                        title: 'Bulk update - change display type',
                        message: 'Bulk update job created successfully',
                        type: 'done',
                    },
                    errorAlert: {
                        title: 'Bulk update - change display type',
                        type: 'error',
                    },
                },
                changeSearchKeyValueForm: {
                    formLabels: {
                        searchKey: 'Search key',
                        searchKeyValue: 'Search key value',
                        editNotes: 'Edit notes',
                        cancelButtonLabel: 'Cancel',
                        submitButtonLabel: 'Bulk update',
                    },
                    submittingAlert: {
                        title: 'Bulk update - change search key value',
                        message: 'Creating bulk update job',
                        type: 'info',
                    },
                    successAlert: {
                        title: 'Bulk update - change search key value',
                        message: 'Bulk update job created successfully',
                        type: 'done',
                    },
                    errorAlert: {
                        title: 'Bulk update - change search key value',
                        type: 'error',
                    },
                },
            },
        },
        changeDisplayType: {
            title: 'Change display type from ',
            publicationType: {
                inputLabelText: 'New Work type',
                hintText: 'Select a Work type from the dropdown list',
            },
            publicationSubtype: {
                inputLabelText: 'New Work subtype',
                hintText: 'Select a work subtype from the dropdown list',
            },
            submit: 'Change display type',
            cancelButtonLabel: 'Cancel',
            loadingMessage: 'Loading work',
            workflowConfirmation: {
                confirmationTitle: 'Change Display type',
                confirmationMessage: 'Display type has been changed',
                cancelButtonLabel: 'View work',
                confirmButtonLabel: 'Edit full work',
            },
            progressAlert: {
                type: 'info_outline',
                title: 'Saving',
                message: 'Changing Display type is in progress.',
                showLoader: true,
            },
            successAlert: {
                type: 'done',
                title: 'Success',
                message: 'Display type has been changed successfully.',
            },
        },
        selectField: {
            community: {
                loadingHint: 'Loading communities...',
                selectPrompt: 'Please select a community',
            },
            collection: {
                loadingHint: 'Loading collections...',
                selectPrompt: 'Please select a collection',
            },
        },
        myEditorialAppointmentsList: {
            infoTextAlert: {
                type: 'info',
                message:
                    'Please record your editorial appointments on this page. This information will be made available to downstream systems such as the Individual Activity Profile (IAP). You only need to record your current editorial appointments.',
            },
            header: {
                columns: {
                    journalName: {
                        title: 'Journal name',
                    },
                    role: {
                        title: 'Editorial role',
                    },
                    startYear: {
                        title: 'Start year',
                    },
                    endYear: {
                        title: 'End year',
                    },
                },
            },
            form: {
                locale: {
                    journalNameLabel: 'Journal name',
                    journalNameHint: 'Type journal name or issn',
                    editorialRoleLabel: 'Editorial role',
                    editorialRoleHint: 'Please select an editorial role or type in',
                    otherRoleLabel: 'Other role name',
                    otherRoleHint: 'Please specify the other role name',
                    startYearLabel: 'Start year',
                    startYearHint: 'Please type in start year',
                    startYearErrorMessage: 'Year must be before or the same as the current year',
                    endYearLabel: 'End year',
                    endYearCurrentYearLabel: 'Current',
                    endYearHint: 'Current or future year only',
                    endYearErrorMessage: 'Year must be after or the same as the start year',
                    addButtonTooltip: 'Add new editorial appointment',
                    editButtonTooltip: 'Edit this editorial appointment',
                    deleteButtonTooltip: 'Delete this editorial appointment',
                },
            },
            row: {
                locale: {
                    editHint: 'Edit this item',
                },
            },
            successAlert: {
                alertId: 'alert-done-editorial-appointment-add',
                allowDismiss: true,
                type: 'done',
                message:
                    'An editorial role has been successfully added. It will take up to 24 hours before it appears in downstream systems such as IAP and Academic Portal.',
            },
        },
        JournalIdField: {
            placeholder: 'Enter ISSN or Journal Title',
            detailsLink: {
                title: 'View journal details in a new tab',
                linkText: 'View details',
            },
        },
        MasterJournalListIngest: {
            title: 'Master Journal List Ingest',
            help: {},
            formLabels: {
                directory: {
                    label: 'Choose ingest directory',
                },
                submitButtonLabel: 'Request ingest',
                cancelButtonLabel: 'Cancel',
            },
            submitProgressAlert: {
                type: 'info',
                alertId: 'alert-info-mjl-ingest',
                title: 'Requesting master journal list ingest',
                message: 'Waiting for response...',
            },
            submitSuccessAlert: {
                type: 'done',
                alertId: 'alert-done-mjl-ingest',
                title: 'Success',
                message: 'The request to ingest master journal list has been submitted successfully.',
            },
            submitFailureAlert: {
                type: 'error',
                alertId: 'alert-error-mjl-ingest',
                title: 'Error',
                message: 'The request to ingest master journal list could not be submitted.',
            },
        },
        manageAuthors: {
            loadingText: 'Loading authors',
            header: {
                columns: {
                    id: {
                        title: 'ID',
                    },
                    displayName: {
                        title: 'Display name',
                    },
                    uqUsername: {
                        title: 'UQ username',
                    },
                },
            },
            editRow: {
                fields: {
                    title: {
                        label: 'Title',
                    },
                    firstName: {
                        label: 'First name',
                    },
                    middleName: {
                        label: 'Middle name',
                    },
                    lastName: {
                        label: 'Last name',
                    },
                    email: {
                        label: 'Email',
                    },
                    displayName: {
                        label: 'Display name',
                    },
                    position: {
                        label: 'Position',
                    },
                    orgStaffId: {
                        label: 'Staff ID',
                        helperText: 'This is a 7 digit number, usually preceded by a 0',
                    },
                    orgStudentId: {
                        label: 'Student ID',
                        helperText: 'This is a 8 digit number, usually preceded by a 3 or 4',
                    },
                    orgUsername: {
                        label: 'Staff username',
                    },
                    studentUsername: {
                        label: 'Student username',
                        helperText:
                            "This is an 8 characters string: remove last digit from student ID and add prefix 's'.",
                    },
                    refNum: {
                        label: 'Ref num',
                    },
                    orgMembership: {
                        label: 'Org membership',
                    },
                    notes: {
                        label: 'Notes',
                    },
                    scopusId: {
                        label: 'Scopus ID',
                    },
                    googleScholarId: {
                        label: 'Google scholar ID',
                    },
                    peopleAustraliaId: {
                        label: 'People Australia ID',
                    },
                    orcidId: {
                        label: 'Orcid ID',
                    },
                    researcherId: {
                        label: 'Researcher ID',
                    },
                    isScopusIdAuthenticated: {
                        label: 'Is Scopus ID authenticated?',
                    },
                    isOrcidSyncEnabled: {
                        label: 'Is pub sync with ORCID profile enabled?',
                    },
                    openOrcidProfileInNewWindow: {
                        label: 'Open ORCID profile in new window',
                    },
                    isUsernameOverridden: {
                        label: 'Is username overridden by an admin?',
                    },
                },
                validation: {
                    aut_org_staff_id: 'The supplied Organisation Staff ID is already on file for another author.',
                    aut_org_student_id: 'The supplied Organisation Student ID is already on file for another author.',
                    aut_org_username: 'The supplied Organisation Username is already on file for another author.',
                    aut_student_username: 'The supplied Student username is already on file for another author.',
                },
            },
            form: {
                editButton: 'Update author',
                addButton: 'Save author',
                cancelButton: 'Cancel',
                deleteConfirmationLocale: {
                    confirmationTitle: 'Delete author',
                    confirmationMessage: 'Are you sure you want to delete this author?',
                    cancelButtonLabel: 'No',
                    confirmButtonLabel: 'Yes',
                },
                bulkDeleteConfirmationLocale: {
                    confirmationTitle: 'Delete selected authors',
                    confirmationMessage: 'Are you sure you want to delete selected authors?',
                    cancelButtonLabel: 'No',
                    confirmButtonLabel: 'Yes',
                },
                scopusIngestConfirmationLocale: {
                    confirmationTitle: 'Ingest from Scopus',
                    confirmationMessage:
                        'Are you sure you want to start the ingest process from Scopus for this author?',
                    cancelButtonLabel: 'No',
                    confirmButtonLabel: 'Yes',
                },
                locale: {
                    addButtonTooltip: 'Add new author',
                    bulkDeleteButtonTooltip: 'Delete selected authors',
                    editButtonTooltip: 'Edit this author',
                    deleteButtonTooltip: 'Delete this author',
                    notesButtonTooltip: 'View notes for this author',
                    updateNotesButton: 'Update notes',
                    scopusIngestButtonTooltip: 'Ingest from Scopus',
                    searchAriaLabel: 'Search authors',
                    searchPlaceholder: 'Search authors',
                },
            },
            row: {
                locale: {
                    editHint: 'Edit this item',
                },
            },
            listAuthorErrorAlert: {
                alertId: 'alert-error-author-list',
                allowDismiss: true,
                type: 'error',
                message: 'There was some error loading author list',
            },
            addAuthorSuccessAlert: {
                alertId: 'alert-done-author-add',
                allowDismiss: true,
                type: 'done',
                message: 'An author has been successfully added.',
            },
            updateAuthorSuccessAlert: {
                alertId: 'alert-done-author-update',
                allowDismiss: true,
                type: 'done',
                message: 'An author has been successfully updated.',
            },
            deleteAuthorSuccessAlert: {
                alertId: 'alert-done-author-delete',
                allowDismiss: true,
                type: 'done',
                message: 'An author has been successfully deleted.',
            },
            scopusIngestRequestingAlert: {
                alertId: 'alert-info-scopus-ingest-requesting',
                allowDismiss: true,
                type: 'info',
                message: 'Scopus ingest requesting',
            },
            scopusIngestSuccessAlert: {
                alertId: 'alert-done-scopus-ingest-requested',
                allowDismiss: true,
                type: 'done',
                message: 'Scopus ingest requested',
            },
            scopusIngestErrorAlert: {
                alertId: 'alert-error-scopus-ingest-requested',
                allowDismiss: true,
                type: 'error',
                message: 'Scopus ingest request failed',
            },
            addAuthorErrorAlert: {
                alertId: 'alert-error-author-add',
                allowDismiss: true,
                type: 'error',
                message: 'An author could not be added.',
            },
            updateAuthorErrorAlert: {
                alertId: 'alert-error-author-update',
                allowDismiss: true,
                type: 'error',
                message: 'An author could not be updated.',
            },
            deleteAuthorErrorAlert: {
                alertId: 'alert-error-author-delete',
                allowDismiss: true,
                type: 'error',
                message: 'Cannot delete author with linked works',
            },
            bulkAuthorDeleteAlert: {
                alertId: 'alert-info-author-bulk-delete',
                allowDismiss: true,
                type: 'info',
            },
        },
        manageUsers: {
            loadingText: 'Loading users',
            header: {
                columns: {
                    id: {
                        title: 'ID',
                    },
                    fullName: {
                        title: 'Full name',
                    },
                    username: {
                        title: 'Username',
                    },
                    email: {
                        title: 'Email',
                    },
                    status: {
                        title: 'Status',
                    },
                    isAdmin: {
                        title: 'Is admin?',
                    },
                    isSuperAdmin: {
                        title: 'Is superadmin?',
                    },
                },
            },
            editRow: {
                fields: {
                    username: {
                        label: 'Username',
                    },
                    email: {
                        label: 'Email',
                    },
                    fullName: {
                        label: 'Full name',
                    },
                    isAdmin: {
                        label: 'Administrator?',
                    },
                    isSuperAdmin: {
                        label: 'Super administrator?',
                        helperText: 'Only super admin users can update this flag',
                    },
                },
                validation: {
                    usr_username: 'The supplied username is already on file for another user.',
                },
            },
            form: {
                editButton: 'Update user',
                addButton: 'Save user',
                cancelButton: 'Cancel',
                deleteConfirmationLocale: {
                    confirmationTitle: 'Delete user',
                    confirmationMessage: 'Are you sure you want to delete this user?',
                    cancelButtonLabel: 'No',
                    confirmButtonLabel: 'Yes',
                },
                bulkDeleteConfirmationLocale: {
                    confirmationTitle: 'Delete selected users',
                    confirmationMessage: 'Are you sure you want to delete selected users?',
                    cancelButtonLabel: 'No',
                    confirmButtonLabel: 'Yes',
                },
                locale: {
                    addButtonTooltip: 'Add new user',
                    bulkDeleteButtonTooltip: 'Delete selected users',
                    deleteButtonTooltip: 'Delete this user',
                    editButtonTooltip: 'Edit this user',
                    searchAriaLabel: 'Search users',
                    searchPlaceholder: 'Search users',
                },
            },
            row: {
                locale: {
                    editHint: 'Edit this item',
                },
            },
            listUserErrorAlert: {
                alertId: 'alert-error-user-list',
                allowDismiss: true,
                type: 'error',
                message: 'There was some error loading user list',
            },
            addUserSuccessAlert: {
                alertId: 'alert-done-user-add',
                allowDismiss: true,
                type: 'done',
                message: 'A user has been successfully added.',
            },
            updateUserSuccessAlert: {
                alertId: 'alert-done-user-update',
                allowDismiss: true,
                type: 'done',
                message: 'A user has been successfully updated.',
            },
            deleteUserSuccessAlert: {
                alertId: 'alert-done-user-delete',
                allowDismiss: true,
                type: 'done',
                message: 'A user has been successfully deleted.',
            },
            addUserErrorAlert: {
                alertId: 'alert-error-user-add',
                allowDismiss: true,
                type: 'error',
                message: 'A user could not be added.',
            },
            updateUserErrorAlert: {
                alertId: 'alert-error-user-update',
                allowDismiss: true,
                type: 'error',
                message: 'A user could not be updated.',
            },
            deleteUserErrorAlert: {
                alertId: 'alert-error-user-delete',
                allowDismiss: true,
                type: 'error',
                message: 'A user could not be deleted.',
            },
        },
        favouriteJournals: {
            title: 'My Favourite Journals',
            buttons: {
                removeFromFavourites: {
                    title: 'REMOVE FROM FAVOURITES',
                    aria: 'Remove from favourites',
                },
                returnToSearch: {
                    title: 'RETURN TO JOURNAL SEARCH',
                    aria: 'Return to Journal Search',
                },
            },
            favouriteJournalsList: {
                loading: 'Loading ...',
                empty:
                    "You haven't added any journals to this list. Use the checkboxes on the results page to add favourites.",
            },
            sortingDefaults: {
                pageSize: 20,
                sortBy: 'score', // for future use
                sortDirection: 'Desc', // for future use
            },
        },
        journalComparison: {
            title: 'Journal comparison',
            buttons: {
                returnToSearch: {
                    title: 'RETURN TO SEARCH RESULTS',
                    aria: 'Return to search results',
                },
            },
            journalComparisonList: {
                empty: 'No journals were selected for comparison',
            },
        },
        searchJournals: {
            snackbar: {
                message: 'Search results updated',
            },
            partials: {
                FAQ: {
                    title: 'Learn more',
                    items: [
                        {
                            question: 'Get detailed journal info',
                            answer: (
                                <div>
                                    Click on the title of the journal to explore its details such as:
                                    <ul>
                                        <li>aims and scope of the journal</li>
                                        <li>journal quality</li>
                                        <li>peer review process</li>
                                        <li>publisher reputation and credibility</li>
                                        <li>promotion and availability of your article</li>
                                    </ul>
                                    <p>
                                        <a
                                            target="_blank"
                                            href="https://web.library.uq.edu.au/library-services/services-researchers/strategic-scholarly-publishing?p=1#1"
                                        >
                                            Read more about Strategic Publishing
                                        </a>
                                    </p>
                                </div>
                            ),
                        },
                        {
                            question: 'What are journal level metrics?',
                            answer: (
                                <div>
                                    <p>
                                        There are different indicators used to measure journal quality. These indicators
                                        are calculated by looking at the citations received in the most recent year for
                                        publications from the previous 2-5 years. There are slight variations in the
                                        methodology used to calculate these indicators, depending on the database
                                        provider e.g. Journal Citation Reports, Scopus.
                                    </p>
                                    <p>
                                        You can compare the different metrics for specific journals by selecting each
                                        and then clicking the <b>Compare selected</b> button. Learn more via the{' '}
                                        <a target="_blank" href="https://uq.libwizard.com/f/metrics">
                                            online metrics tutorial
                                        </a>
                                        .
                                    </p>
                                </div>
                            ),
                        },
                        {
                            question: 'What are published and accepted versions for publishing open access?',
                            answer: (
                                <div>
                                    <p>
                                        The published version (
                                        <a
                                            href="https://web.library.uq.edu.au/library-services/services-researchers/open-access?p=0#0"
                                            target="_blank"
                                        >
                                            also known as Gold open access
                                        </a>
                                        ) is where the free and permanently accessible final version of a publication,
                                        is available for everyone to read immediately after publication. Published
                                        versions can be made open access via Article process charges, without charges,
                                        or through the Library's{' '}
                                        <a
                                            href="https://web.library.uq.edu.au/library-services/researchers/publish-and-share/read-and-publish-agreements-2022"
                                            target="_blank"
                                        >
                                            agreements with some publishers
                                        </a>
                                        .
                                    </p>
                                    <p>
                                        The accepted version (also referred to as{' '}
                                        <a
                                            href="https://web.library.uq.edu.au/library-services/services-researchers/open-access?p=2#2"
                                            target="_blank"
                                        >
                                            self-archiving or Green open access
                                        </a>
                                        ) is the deposit of the author's version of the manuscript accepted for
                                        publication in a publicly accessible institutional repository, such as UQ
                                        eSpace. An author accepted manuscript (also referred to as a post-print) is the
                                        author's version of a manuscript that has undergone peer review and has been
                                        accepted by the publisher.{' '}
                                        <a href="https://www.youtube.com/watch?v=okLMBxRixFQ" target="_blank">
                                            View the Library's video guide
                                        </a>
                                        .
                                    </p>
                                    <p>
                                        <a
                                            target="_blank"
                                            href="https://web.library.uq.edu.au/library-services/services-researchers/open-access"
                                        >
                                            Read more about open access
                                        </a>
                                    </p>
                                </div>
                            ),
                        },
                        {
                            question: 'Open access and charges',
                            answer: (
                                <div>
                                    <p>
                                        There are different pathways to open access, include gold and green open access.
                                    </p>
                                    <p>
                                        Some publishers have{' '}
                                        <a href="https://web.library.uq.edu.au/node/4488/3" target="_blank">
                                            Article processing charges (APCs)
                                        </a>{' '}
                                        a fee paid to make an article immediately available and openly accessible. The
                                        Library has{' '}
                                        <a
                                            href="https://web.library.uq.edu.au/read-and-publish-agreements"
                                            target="_blank"
                                        >
                                            agreements with some publishers
                                        </a>{' '}
                                        where that APC is pre-paid or discounted for UQ corresponding authors.
                                    </p>
                                    <p>
                                        To find a journal which meets your requirements or funder mandate, refine your
                                        results by Open access: accepted version or Open access: published version.
                                    </p>
                                    <p>
                                        <a
                                            target="_blank"
                                            href="https://web.library.uq.edu.au/library-services/services-researchers/open-access"
                                        >
                                            Read more
                                        </a>
                                    </p>
                                </div>
                            ),
                        },
                        {
                            question: "Can't find a journal?",
                            answer: (
                                <p>
                                    Contact us for help at{' '}
                                    <a href="mailto:espace@.library.uq.edu.au">espace@library.uq.edu.au</a>
                                </p>
                            ),
                        },
                        {
                            question: 'More help',
                            answer: (
                                <ul>
                                    <li>
                                        <a target="_blank" href="https://web.library.uq.edu.au/contact-us">
                                            Contact us for help
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            target="_blank"
                                            href="https://web.library.uq.edu.au/library-services/services-researchers/publish-share"
                                        >
                                            Find out more about publishing at UQ Library
                                        </a>
                                    </li>
                                    <li>
                                        Contact <a href="mailto:espace@.library.uq.edu.au">espace@library.uq.edu.au</a>{' '}
                                        to let us know your feedback.
                                    </li>
                                </ul>
                            ),
                        },
                        {
                            question: 'Disclaimer',
                            answer: (
                                <p>
                                    The journal search brings together data from many sources and providers to help you
                                    make an evidenced based decision. Every effort is undertaken to make sure data is up
                                    to date, but you should confirm the latest information direct from sources e.g. the
                                    publisher's website.
                                </p>
                            ),
                        },
                    ],
                },
                keywordsList: {
                    noResultsFound: 'No matches found.',
                },
                keywordsBrowser: {
                    titlePrefix: 'Step 2.',
                    title: 'Select at least one of the following to narrow the scope before searching.',
                    aria_label:
                        'Suggested results available below. Tab out of this field and use arrow keys to move to item lists.',
                    exactMatch: {
                        title: 'Exact match',
                    },
                    titleMatch: {
                        title: 'Titles containing',
                        chipTitle: 'Title',
                    },
                    keywordMatch: {
                        title: 'Keyword matches',
                        chipTitle: 'Keyword',
                    },
                    forCodeMatch: {
                        title: 'Subjects & Field of research',
                        chipTitle: 'Subject',
                    },
                },
                selectedKeywords: {
                    title: 'Searching for journals containing:',
                    combiner: ' + ',
                },
                forCodeSearchKeywordsList: {
                    help: {
                        KeywordSearchFORSubject: {
                            tooltip: 'Click for more information',
                            title: 'Subjects & Fields of research',
                            text: (
                                <React.Fragment>
                                    <p>Search journals by their assigned:</p>
                                    <ul>
                                        <li>field of research code from the ERA process (ERA);</li>
                                        <li>
                                            subject areas from the All Science Journal Classification (CiteScore); or
                                        </li>
                                        <li>
                                            subjects from the Web of Science. For example: Science Citation Index
                                            Expanded (WOSSCIE) or Web of Science: Emerging Sources Citation Index
                                            (WOSESCI); Arts & Humanities Citation Index (WOSAHCI).
                                        </li>
                                    </ul>
                                </React.Fragment>
                            ),
                            buttonLabel: 'Close',
                        },
                    },
                },
            },
            journalSearchInput: {
                titlePrefix: 'Step 1.',
                title: 'Enter a journal title, keyword, subject or field of research code.',
            },
            journalSearchInterface: {
                title: 'Journal search',
                intro: (
                    <React.Fragment>
                        <p>
                            Search UQ's curated strategic publishing data as part of your critical tasks of publishing
                            and promotion:
                        </p>
                        <ul>
                            <li>Search journal titles, keywords and subject areas</li>
                            <li>Identify journals with open access or pre-paid charges</li>
                            <li>Understand, refine and rank results by indexing and a range of metrics</li>
                            <li>Create a list of favourite journals</li>
                            <li>Investigate journal scope, peer review processes and publisher details.</li>
                        </ul>
                    </React.Fragment>
                ),
                instructions: loremIpsum,
                buttons: {
                    myFavouriteJournals: {
                        title: 'My favourite journals',
                        aria: 'My favourite journals',
                    },
                    browseAllJournals: {
                        title: 'Browse all journals',
                        aria: 'Browse all journals',
                    },
                    searchJournals: {
                        title: 'Step 3. Search',
                        aria: 'Search',
                    },
                    compareJournals: {
                        title: 'COMPARE SELECTED',
                        aria: 'Compare Selected',
                    },
                    addToFavourites: {
                        title: 'ADD TO FAVOURITES',
                        aria: 'Add to favourites',
                    },
                },
                confirmations: {
                    addToFavourites: {
                        confirmationMessage: 'COUNT item(s) have been added.',
                    },
                },
            },
            input: {
                placeholder: 'Type at least 3 characters to start journal search',
                aria_label:
                    'This search application produces tabular results that may be problematic with a screen reader. Please contact your librarian for assistance if needed.',
            },
            journalSearchResult: {
                loadingMessage: 'Loading journals list',
                noResultsFound: {
                    title: 'No journals found',
                    text: <div>We were unable to find any results.</div>,
                },
            },
            export: {
                label: 'Export page results',
                format: [{ value: 'excel', label: 'Excel File' }],
            },
            sorting: {
                pageSize: 'Journals per page',
                sortLabel: 'Sort results by',
                sortDirectionLabel: 'Sort order',
                sortBy: [
                    { value: 'title', label: 'Title' },
                    { value: 'score', label: 'Search relevance' },
                    { value: 'highest_quartile', label: 'Highest quartile' },
                    { value: 'cite_score', label: 'CiteScore' },
                    { value: 'impact_factor', label: 'Impact factor' },
                    { value: 'sjr', label: 'SJR' },
                    { value: 'snip', label: 'SNIP' },
                ],
            },
            sortingDefaults: {
                pageSize: 10,
                sortBy: 'highest_quartile',
                sortDirection: 'Asc',
            },
            journalFacetsFilter: {
                title: 'Refine results',
                resetButtonText: 'Clear all filters',
                favoriteFilter: {
                    displayTitle: 'Favourite Journals',
                    activeFilter: 'Show journals favourited',
                },
                help: {
                    title: 'Refine results',
                    text: (
                        <React.Fragment>
                            <h3>Listed in</h3>
                            <p>
                                Indicates a journal has met the quality indicators/requirements for a list compiled by a
                                specific group.
                            </p>
                            <p>The following lists are available:</p>
                            <ul>
                                <li>ABDC (Australian Business Deans Council)</li>
                                <li>CWTS (Centre of Science and Technology Studies at Leiden University)</li>
                                <li>ERA (Excellence in Research Australia)</li>
                            </ul>
                            <h3>Indexed in</h3>
                            <p>Indicates database providers which index the journal.</p>
                            <h3>Open access: accepted version</h3>
                            <p>
                                Sort by length of time before an author accepted or self-archived version of an article
                                is open and freely available via UQ eSpace.
                            </p>
                            <h3>Journal impact factor highest quartile</h3>
                            <p>Sort by JIF Quartile, where Q1 is best.</p>
                            <h3>CiteScore highest quartile</h3>
                            <p>Sort by CiteScore Quartile, where Q1 is best.</p>
                            <h3>Highest quartile</h3>
                            <p>Sort by the highest quartile a journal reaches across systems and subject categories.</p>
                            <h3>Open access: published version</h3>
                            <p>
                                Sort by whether charges, such as Article Processing Charges (APCs), are paid to a
                                publisher to make a publication immediately available and openly accessible.
                            </p>
                            <h3>Evidence of Peer Review</h3>
                            <p>
                                Limit to peer reviewed or refereed journals. This data is provided via the Ulrichsweb.
                            </p>
                        </React.Fragment>
                    ),
                    testId: 'journal-search-facets',
                    buttonLabel: 'CLOSE',
                },
                renameFacetsList: {},
            },
        },
    },
};
