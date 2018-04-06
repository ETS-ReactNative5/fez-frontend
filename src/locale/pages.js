import React from 'react';
import {StandardCard} from 'uqlibrary-react-toolbox/build/StandardCard';
/*

NOTE:
- text can be either plain text, eg text: 'Some text to display' or
- text can be formatted HTML text, eg text: (<div>Click here to search google: <a href='google.com'>search google</a></div>)
IMPORTANT: if currently text contains placeholders, eg any characters in square brackets, eg [noOfResults] it cannot be formatted with HTML tags’

- help objects have the following shape:
help: {
    title: 'About these metrics',
    text: (<div></div>),
    buttonLabel: 'OK'
}
- text can be plain or formatted HTML component with links/tags/etc
- if help is not required, delete help: {} fully (including closing '},')

*/

export default {
    pages: {
        contact: {
            title: 'Contact UQ eSpace',
            children: (
                <StandardCard>
                    UQ eSpace is the single authoritative source for the research outputs and research data of the
                    staff and students of the University of Queensland and is the archival home of UQ Research
                    Higher Degree digital theses. UQ eSpace raises the visibility and accessibility of UQ
                    publications to the wider world and provides data for mandatory Government reporting
                    requirements such as Excellence in Research for Australia (ERA), as well as for internal UQ
                    systems, including Academic Portal and the DataHub. It operates as an institutional repository
                    for open access publications, research datasets and other digitised materials created by staff
                    of the University such as print materials, photographs, audio materials, videos, manuscripts and
                    other original works. UQ eSpace provides metadata to UQ Researchers in order to raise the
                    publication profile of researchers at UQ.
                    <p>The University of Queensland has implemented an Open Access for UQ Research Outputs policy that
                        requires UQ researchers to make publications arising from their research openly available via UQ
                        eSpace. It has also implemented a Research Data Management policy that sets out the requirements
                        for University of Queensland researchers to ensure that their research data are managed
                        according to legal, statutory, ethical and funding body requirements.</p>
                    <h3>General Enquiries</h3>
                    <p>
                        Tel: 07 334 69775 <br/>
                        Email: espace@library.uq.edu.au <br/>
                    </p>
                    <h3>Staff contact</h3>
                    <p>
                        Andrew Heath <br/>
                        Manager, UQ eSpace<br/>
                        Tel: 07 334 69981<br/>
                        Email: a.heath@library.uq.edu.au<br/>
                    </p>
                    <p>
                        Mary-Anne Marrington<br/>
                        Senior Librarian, UQ eSpace<br/>
                        Tel: 07 334 69775<br/>
                        Email: m.marrington@library.uq.edu.au<br/>
                    </p>
                </StandardCard>
            )
        },
        browse: {
            title: 'Browse eSpace',
            text: (
                <div>
                    <p>Welcome to The University of Queensland's institutional digital repository</p>
                    <p>
                        Public browse is coming soon...
                    </p>
                </div>
            ),
            help: {
                title: 'Browse eSpace help',
                text: (
                    <div>
                        <h3>Browse</h3>
                        <p>
                            Latest articles....
                        </p>
                        <h3>Browse collections</h3>
                        <p>
                            Latest collections....
                        </p>
                    </div>
                ),
                buttonLabel: 'OK'
            }
        },
        notFound: {
            title: 'Page not found',
            children: (
                <StandardCard>
                    <p>The requested page could not be found.</p>
                    <p>Sorry about that, but here's what you can do next:</p>
                    <ul>
                        <li>Try re-typing the address, checking for spelling, capitalisation and/or punctuation.</li>
                        <li>Start again at the home page.</li>
                        <li>If you’re sure the page should be at this address, email us at webmaster@library.uq.edu.au.</li>
                    </ul>
                </StandardCard>
            )
        },
        authenticationRequired: {
            title: 'Authentication required',
            children: (
                <StandardCard>
                    <p>The requested page is available to authenticated users only.</p>
                    <p>Please login to continue</p>
                </StandardCard>
            )
        },
        permissionDenied: {
            title: 'Permissions denied',
            children: (
                <StandardCard>
                    <p>The requested page available to authorised users only.</p>
                </StandardCard>
            )
        },
        thesisSubmissionDenied: {
            title: 'Thesis deposit access denied',
            children: (
                <StandardCard>
                    <p>
                        Your account does not have rights for thesis deposit workflow.
                    </p>
                    <p>
                        For depositing your thesis you must login with your <b>student username</b> (you may have logged into eSpace with your staff username).
                    </p>
                    <p>
                        Please logout and login with the correct user account.
                    </p>
                </StandardCard>
            )
        },
        dashboard: {
            loading: 'Loading your dashboard...',
            header: {
                // help: {
                //     title: 'Your dashboard',
                //     text: 'Your profile help....',
                //     buttonLabel: 'OK'
                // },
                dashboardArticleCount: {
                    yearSeparator: ' to ',
                    countTitle: 'eSpace articles from'
                },
                dashboardAuthorAvatar: {
                    ariaPrefix: 'Photograph of '
                },
                dashboardResearcherIds: {
                    researcherIsLinked: 'Your [resource] ID is [id] - Click to review',
                    researcherIsNotLinked: 'You are not linked to [resource] - Click to amend',
                    orcidUrlPrefix: process.env.ORCID_URL ? `${process.env.ORCID_URL}/` : 'https://orcid.org/',
                    orcidLinkPrefix: 'orcid.org/',
                    orcidlinkLabel: 'Click to visit your ORCId profile',
                    titles: {
                        publons: 'Publons',
                        scopus: 'Scopus',
                        researcher: 'Researcher (ISI)',
                        google_scholar: 'Google Scholar',
                        orcid: 'ORCID'
                    },
                }
            },
            possiblePublicationsLure: {
                title: 'Claim now!',
                message: 'We have found [count] record(s) that could possibly be your work.',
                type: 'info_outline',
                actionButtonLabel: 'Claim your publications now'
            },
            nothingToClaimLure: {
                title: 'Add your work to eSpace',
                message: 'We found nothing new for you to claim, but you may add a publication any time.',
                type: 'info_outline',
                actionButtonLabel: 'Add a publication'
            },
            publicationsByYearChart: {
                title: 'eSpace publications per year',
                yAxisTitle: 'Total publications'
            },
            publicationTypesCountChart: {
                title: 'Publication types overview'
            },
            myPublications: {
                title: 'My publications',
                viewAllButtonLabel: 'View all'
            },
            myTrendingPublications: {
                title: 'My trending publications',
                metrics: {
                    altmetric: {
                        title: 'Altmetric score'
                    },
                    thomson: {
                        title: 'Web of Science citation count'
                    },
                    scopus: {
                        title: 'Scopus citation count'
                    }
                },
                viewFullCitationLinkTitle: 'View full citation',
                trendSharesThisMonth: 'Number of shares in the past month',
                trendDifferenceSharesThisMonth: 'Difference in shares since last month',
                help: {
                    title: 'About these metrics',
                    text: (
                        <div>
                            <p>
                                For the above metrics, the larger number is the total current citation count, and the +
                                (plus) value indicates how much the citation count has changed in the last month. The
                                Altmetric score plus value is slightly different, as it shows the 3 most recent
                                increases first, ranging from 1 day to 1 year.
                            </p>
                            <p>
                                You can click on the number as a link to see who is citing each publication, or in the
                                case of Altmetric who is referencing the publication in social media and news outlets.
                            </p>
                        </div>),
                    buttonLabel: 'OK'
                },
            },
        },
        myResearch: {
            pageTitle: 'My research',
            recordCount: 'Displaying records [recordsFrom] to [recordsTo] of [recordsTotal] total records. ',
            text: (
                <span>
                    Add to this list by <a href="/records/possible">claiming a publication</a> or <a href="/records/add/find">adding a missing publication</a>.
                </span>
            ),
            loadingMessage: 'Searching for your publications...',
            loadingPagingMessage: 'Retrieving your publications...',
            noResultsFound: {
                title: 'No publications found',
                text: (
                    <div>
                        We were unable to find any results. You may be able to <a href="/records/possible">claim
                        publications we think may be yours</a> or <a href="/records/add/find">add a
                        missing publication</a>
                    </div>
                ),
            },
            facetsFilter: {
                title: 'Refine results',
                // help: {
                //     title: 'Refining your results',
                //     text: 'Help about ....',
                //     buttonLabel: 'Ok'
                // },
                excludeFacetsList: ['Scopus document type', 'Subtype', 'Year published'],
                renameFacetsList: {'Display type': 'Publication type'}
            }
        },
        claimPublications: {
            title: 'Claim possible publications',
            loadingMessage: 'Searching for possibly your publications...',
            facetSearchMessage: 'Applying filters...',
            noResultsFound: {
                title: 'No matching publications found',
                text: (
                    <div>
                        <p>No publications were automatically matched for you to claim.</p>
                    </div>
                ),
                // help: {
                //     title: 'No matching records found',
                //     text: 'Why search didn\'t return any items....',
                //     buttonLabel: 'Ok'
                // }
            },
            searchResults: {
                title: 'Possibly your publications',
                text: '[resultsCount] out of [totalCount] potential match(es) displayed. Select any item to claim it as your work.',
                // help: {
                //     title: 'Possibly your publications',
                //     text: 'Help about ....',
                //     buttonLabel: 'Ok'
                // },
                hide: 'Not mine',
                claim: 'Claim this publication',
                inProgress: 'In progress'
            },
            hidePublicationConfirmation: {
                confirmationTitle: 'Hide publication',
                confirmationMessage: 'Are you sure you want to hide selected possibly your publication from this view?',
                cancelButtonLabel: 'No',
                confirmButtonLabel: 'Yes'
            },
            hidePublicationFailedAlert: {
                title: 'Error',
                message: (message) => (`Error has occurred during request and request cannot be processed. ${message} Please contact eSpace administrators or try again later.`),
                type: 'error'
            },
            hideAllPublicationsConfirmation: {
                confirmationTitle: 'Hide publications',
                confirmationMessage: 'Are you sure you want to hide all possibly your publications from this view?',
                cancelButtonLabel: 'No',
                confirmButtonLabel: 'Yes'
            },
            facetsFilter: {
                title: 'Refine results',
                // help: {
                //     title: 'Refining your results',
                //     text: 'Help about ....',
                //     buttonLabel: 'Ok'
                // },
                excludeFacetsList: ['Scopus document type', 'Subtype', 'Year published'],
                renameFacetsList: {'Display type': 'Publication type'}
            }
        },
        addRecord: {
            title: 'Add a missing record to eSpace',
            stepper: [
                {label: 'Search for your publication'},
                {label: 'Search results'},
                {label: 'Add your publication'}
            ],
            step1: {
                title: 'Search for your publication',
                text: 'Enter either the publication DOI (e.g. 10.1163/9789004326828), Pubmed Id (e.g. 28131963) or the title of the publication. This will allow us to check whether the record is already in eSpace or is available from another source.',
                // help: {
                //     title: 'Search for your publication',
                //     text: 'Help about search....',
                //     buttonLabel: 'Ok'
                // },
                fieldLabels: {
                    search: 'Enter DOI, Pubmed Id or Title'
                },
                submit: 'Search',
                skip: 'Skip search'
            },
            step2: {
                noResultsFound: {
                    title: 'No matching publications found',
                    text: 'We were unable to match any results to your search criteria. Please search again or create a new eSpace record.',
                    // help: {
                    //     title: 'No matching records found',
                    //     text: 'Why search didn\'t return any items....',
                    //     buttonLabel: 'Ok'
                    // }
                },
                searchResults: {
                    title: 'Possible matches found',
                    resultsText: 'Top [noOfResults] potential match(es) displayed for "[searchQuery]".',
                    text: 'Claim a matching publication below, refine your search or create a new eSpace record.',
                    // help: {
                    //     title: 'Possible matches found',
                    //     text: 'Why search displays these items....',
                    //     buttonLabel: 'Ok'
                    // },
                    searchDashboard: {
                        title: 'Repository search',
                        recordSuffix: ' record(s)',
                        ariaCircularProgressLabelSuffix: 'loading',
                        repositories: [
                            {
                                id: 'espace',
                                title: 'eSpace'
                            },
                            {
                                id: 'wos',
                                title: 'Web of science'
                            },
                            {
                                id: 'scopus',
                                title: 'Scopus'
                            },
                            {
                                id: 'pubmed',
                                title: 'PubMed'
                            },
                            {
                                id: 'crossref',
                                title: 'Crossref'
                            },
                        ]
                    }
                },
                loadingMessage: 'Searching for publications...',
                cancel: 'Abandon and search again',
                submit: 'Create a new eSpace record',
                claim: 'Claim this publication',
                unclaimable: 'All authors have been assigned'
            },
            step3: {
                // all text values come from forms.PublicationForm
            },
            successWorkflowConfirmation: {
                confirmationTitle: 'Your record has been submitted',
                recordSuccessConfirmationMessage: (
                    <p>
                        Your record has been saved.<br/><br/>
                        Your item will be published immediately and an UQ eSpace Research Outputs Officer will review the
                        record.
                    </p>),
                fileFailConfirmationAlert: {
                    title: 'File upload and/or notes post failed',
                    message: 'Retry uploading files and/or submitting publication notes via "Fix record" screen or contact eSpace administrators.',
                    type: 'warning'
                },
                cancelButtonLabel: 'Add another missing record',
                confirmButtonLabel: 'Go to my research'
            }
        },
        fixRecord: {
            loadingMessage: 'Loading record...',
            title: 'Request a correction or upload files',
            subTitle: 'Record to be amended',
            fieldLabels: {
                action: 'Select an action'
            },
            actionsOptions: [
                {
                    action: 'fix',
                    title: 'I am the author/editor/contributor of this record - I would like to make a correction, or upload files'
                },
                {
                    action: 'unclaim',
                    title: 'I am not the author/editor/contributor of this record - I would like this record removed from my profile'
                }
            ],
            cancel: 'Cancel',
            submit: 'Submit'
        },
        viewRecord: {
            loadingMessage: 'Loading record...'
        },
        masquerade: {
            title: 'Masquerade',
            help: {
                title: 'Masquerade',
                text: (
                    <div>
                        Masquerade as another user...
                    </div>
                ),
                buttonLabel: 'OK'
            },
            description: (<div>
                <strong>WARNING!!</strong> Masquerading as a user you will effectively become the user you enter here,
                and changes you make will apply to their account!
            </div>),
            labels: {
                submit: 'Masquerade',
                hint: 'Username or student username'
            }
        },
        googleScholarLink: {
            title: 'Google Scholar identifier',
            help: {
                title: 'About Google Scholar',
                text: (
                    <div>
                        <h3>How to create Google Scholar profile?</h3>
                        <ol>
                            <li>Sign to your Google account, or create one if you don't have one.</li>
                            <li>After you sign in, the Citations sign up form will ask you to confirm the spelling of
                                your name, to enter your affiliation, etc.
                            </li>
                            <li>On the next page, you will see a list of articles. Add the articles that are yours.</li>
                            <li>Once you're done with adding articles, it will ask you what to do when the article data
                                changes in Google Scholar. You can either have the updates applied to your profile
                                automatically or you can choose to review them beforehand.
                            </li>
                            <li>Finally, you will see your profile.Once you are satisfied with the results, make your
                                profile public.
                            </li>
                        </ol>
                    </div>
                ),
                buttonLabel: 'OK'
            },
            labels: {
                submit: 'Save Google Scholar ID',
                cancel: 'Cancel',
                googleScholarIdField: {
                    floatingLabelText: 'Google Scholar ID',
                    hintText: 'Enter your Google Scholar ID'
                }
            },
            add: {
                title: 'Add your Google Scholar identifier',
                description: (
                    <div>
                        <p>Creating your Google Scholar Citation profile will make sure that Google Scholar will easily and
                            accurately group all the citations of your publications into one pool. A profile generally lists
                            your name, chosen keywords of research interest, generated citation metrics, and citations
                            (including links to citing articles).</p>
                        <p>In order to create a Google Scholar Citation profile, you need a Google Account.</p>
                        <p>For more information see the <a
                            href="http://guides.library.uq.edu.au/researcher-identifiers/google-scholar-citations-profile"
                            target="_blank">Google Scholar Citations help page.</a></p>
                    </div>
                )
            },
            edit: {
                title: 'Update your Google Scholar identifier',
                description: (
                    <div>
                        <p>Update your Google Scholar ID below.</p>
                        <p>For more information see the <a
                            href="http://guides.library.uq.edu.au/researcher-identifiers/google-scholar-citations-profile"
                            target="_blank">Google Scholar Citations help page.</a></p>
                    </div>
                )
            },
            errorAlert: {
                type: 'error_outline',
                title: 'Error',
                message: (message) => (`Error has occurred during request and request cannot be processed. ${message} Please contact eSpace administrators or try again later.`)
            },
            progressAlert: {
                type: 'info_outline',
                title: 'Saving',
                message: 'Request is being processed.',
                showLoader: true
            },
            successAlert: {
                type: 'done',
                title: 'Google Scholar ID updated',
                message: 'Your Google Scholar ID has been updated in your eSpace profile.',
                allowDismiss: true
            }
        },
        orcidLink: {
            title: 'Link ORCID ID to UQ eSpace',
            grantAccessConfirmation: {
                confirmationTitle: 'ORCID Grant Access',
                confirmationMessage: (
                    <div>
                        <p>
                            In order to proceed you will now be directed to ORCID.org website.
                        </p>
                        <p>
                            You will be redirected back after you have granted UQ access.
                        </p>
                    </div>
                ),
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'OK'
            },
            help: {
                title: 'About ORCID',
                text: (
                    <div>
                        <p>
                            ORCID (Open Researcher Contributor ID) is an open, non-profit, community-based effort
                            endeavouring to provide a registry of unique researcher identifiers and a transparent method
                            of linking research activities and outputs to these identifiers.
                        </p>
                        <p>
                            An ORCID iD (often referred to as an ORCID) provides a persistent digital identifier that
                            distinguishes you from every other researcher and, through integration in key research
                            workflows such as manuscript and grant submission, supports automated linkages between you
                            and your professional activities ensuring that your work is recognised.
                        </p>
                        <p>
                            ORCID records hold only non-sensitive information such as name, email, organisation and
                            research activities. Plus, you can control who sees information in your ORCID iD via
                            <a href="http://support.orcid.org/knowledgebase/articles/124518-orcid-privacy-settings" target="_blank">privacy tools</a>.
                        </p>
                        <p>
                            Your ORCID iD will belong to you throughout your scholarly career as a persistent identifier
                            to distinguish you from other researchers ensuring you receive consistent and reliable
                            attribution of your work.
                        </p>
                        <h3>Adding information to your profile</h3>
                        <p>
                            Import your research outputs from your Scopus Author Identifier and ResearcherID – you can do
                            this on the ORCID site with the Search and Link tool under Add works. For more information
                            <a href="http://support.orcid.org/knowledgebase/articles/188278-link-works-website-user" target="_blank">click here</a>.
                        </p>
                        <p>
                            You can also import publications from your Google Scholar to your ORCID iD. <a href="http://support.orcid.org/knowledgebase/articles/390530-import-works-from-bibtex-files-website-user" target="_blank">Click here</a> for information
                        </p>
                        <p>
                            There are many other types of work that you may add to your ORCID including artistic
                            performances, stand-alone websites, licenses and datasets. For a full list of works that can
                            be added, <a href="http://members.orcid.org/api/supported-work-types" target="_blank">click here</a>.
                        </p>
                        <p>
                            More information about how to add details such as your employment, education, awards and
                            funding can be found <a href="http://support.orcid.org/knowledgebase/topics/32827-website-user" target="_blank">here</a>.
                        </p>
                        <h3>Peer review acknowledgement in ORCID</h3>
                        <p>Your ORCID record can acknowledge peer review assignments that you undertake.</p>
                        <p>Simply provide your ORCID iD when accepting a peer review assignment and upon completion the
                            organisation* you have done the peer review for will post an acknowledgement of this
                            activity to your ORCID record, if you have granted this permission.</p>
                        <p><em>* The organisation needs to be participating in the ORCID peer review program.</em></p>
                        <h3>Do you have more than one ORCID iD?</h3>
                        <p>If you have more than one ORCID, the <a href="http://about.orcid.org/help/contact-us" target="_blank">ORCID Support team</a> can help with
                            marking one ORCID iD as the primary identifier and deprecate the other ORCID iDs.</p>
                        <p>Because ORCID identifiers are designed to be persistent, obsolete iDs will be deprecated, not
                            deleted. The record associated with a deprecated iD will contain a pointer to the primary
                            record</p>
                    </div>
                ),
                buttonLabel: 'OK'
            },
            linkOrcid: {
                title: 'I already have an ORCID iD',
                description: (
                    <div>This option enables you to link your existing ORCID iD to UQ.</div>
                ),
                labels: {
                    submit: 'Link your existing ORCID iD'
                }
            },
            createOrcid: {
                title: 'I need an ORCID iD',
                description: (
                    <div>
                        <p>This option enables you to create a new ORCID iD and link it with UQ.</p>
                        <p>Use this option if you are unsure if you already have an ORCID iD. It will detect matches to
                            your name and email from the ORCID registry and prompt you to log in to avoid creating a new
                            ORCID iD.</p>
                    </div>
                ),
                labels: {
                    submit: 'Create a new ORCID iD',
                }
            },
            errorAlert: {
                type: 'error_outline',
                title: 'Error',
                message: (message) => (`Error has occurred during request and request cannot be processed. ${message} Please contact eSpace administrators or try again later.`),
                orcidStateError: 'Invalid authorisation state response from ORCID. '
            },
            successAlert: {
                type: 'done',
                title: 'ORCID linked',
                message: 'Your ORCID has been linked to your eSpace profile. Your publications will be synced within the next 24 hours',
                allowDismiss: true
            },
            progressAlert: {
                type: 'info_outline',
                title: 'Linking ORCID',
                message: 'Request is being processed.',
                showLoader: true
            }
        }
    }
};
