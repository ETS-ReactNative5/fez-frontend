import { LinksClass } from './Links';
import Links from './Links';
import { recordLinks } from 'mock/data/testing/records';
import { openAccessConfig } from 'config';
import { calculateOpenAccess } from 'middleware/publicationEnhancer';

function setup(testProps, isShallow = true) {
    const props = {
        classes: { header: 'header', link: 'link' },
        publication: testProps.publication || recordLinks,
    };
    return getElement(LinksClass, props, isShallow);
}

describe('Component Links ', () => {
    const getPublication = (embargoDays = 0, oaStatus = openAccessConfig.OPEN_ACCESS_ID_LINK_NO_DOI) => ({
        fez_record_search_key_oa_embargo_days: {
            rek_oa_embargo_days: embargoDays,
        },
        rek_date: '2019-12-25T00:00:00Z',
        fez_record_search_key_oa_status: {
            rek_oa_status_id: 281706,
            rek_oa_status_pid: 'UQ:396321',
            rek_oa_status_xsdmf_id: 16607,
            rek_oa_status: oaStatus,
        },
        ...(oaStatus === openAccessConfig.OPEN_ACCESS_ID_DOI
            ? {
                fez_record_search_key_doi: {
                    rek_doi_id: 1706266,
                    rek_doi_pid: 'UQ:795721',
                    rek_doi_xsdmf_id: 16514,
                    rek_doi: '10.1016/j.pnsc.2012.12.004',
                },
            }
            : {}),
        fez_record_search_key_link: [
            {
                rek_link_id: 3240198,
                rek_link_pid: 'UQ:795347',
                rek_link_xsdmf_id: null,
                rek_link: 'http://www.thisisatest.com',
                rek_link_order: 1,
            },
            {
                rek_link_id: 3240199,
                rek_link_pid: 'UQ:795347',
                rek_link_xsdmf_id: null,
                rek_link: 'http://www.thisisanothertest.com',
                rek_link_order: 2,
            },
            {
                rek_link_id: 3240200,
                rek_link_pid: 'UQ:795347',
                rek_link_xsdmf_id: null,
                rek_link: 'http://www.nodescription.com',
                rek_link_order: 2,
            },
        ],
        fez_record_search_key_link_description: [
            {
                rek_link_description_id: 3240198,
                rek_link_description_pid: 'UQ:795347',
                rek_link_description_xsdmf_id: null,
                rek_link_description: 'Link to publication',
                rek_link_description_order: 1,
            },
            {
                rek_link_description_id: 3240199,
                rek_link_description_pid: 'UQ:795347',
                rek_link_description_xsdmf_id: null,
                rek_link_description: 'Another link to publication',
                rek_link_description_order: 1,
            },
            {
                rek_link_description_id: 3240200,
                rek_link_description_pid: 'UQ:795347',
                rek_link_description_xsdmf_id: null,
                rek_link_description: null,
                rek_link_description_order: 1,
            },
        ],
        calculateOpenAccess() {
            return calculateOpenAccess(this);
        },
    });

    const MockDate = require('mockdate');
    beforeEach(() => {
        MockDate.set('2020-01-01T00:00:00.000Z', 10);
    });

    afterEach(() => {
        MockDate.reset();
    });

    it('should not render component for empty publication', () => {
        const wrapper = setup({ publication: {} });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Rendering due to a pubmed central id', () => {
        const wrapper = setup({
            publication: {
                fez_record_search_key_pubmed_central_id: { rek_pubmed_central_id: '12345' },
            },
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Rendering due to a doi', () => {
        const wrapper = setup({
            publication: {
                fez_record_search_key_doi: { rek_doi: '12345' },
            },
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Rendering due to being open access link no doi', () => {
        const wrapper = setup({
            publication: {
                fez_record_search_key_oa_status: { rek_oa_status: 'Link (no DOI)' },
            },
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Full mount render', () => {
        const wrapper = getElement(Links, { publication: recordLinks }, false);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render 3 not OA links and OA google scholar link for OPEN_ACCESS_ID_LINK_NO_DOI', () => {
        const wrapper = setup({ publication: getPublication() });
        expect(toJson(wrapper)).toMatchSnapshot();
        // expect(wrapper.find('.openAccess').length).toEqual(1);
        // expect(wrapper.find('.noOaIcon').length).toEqual(3);
    });

    it('should render list of 3 not OA links and DOI link with OA Embargo date set for OPEN_ACCESS_ID_DOI', () => {
        const wrapper = setup({ publication: getPublication(365, openAccessConfig.OPEN_ACCESS_ID_DOI) }, false);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('.noOaIcon').length).toEqual(3);
        expect(wrapper.find('.openAccessEmbargoed').length).toEqual(1);
    });

    it('should render 3 not OA links and DOI and PMC links with OA for OPEN_ACCESS_ID_DOI', () => {
        const pmcProps = {
            ...getPublication(0, openAccessConfig.OPEN_ACCESS_ID_DOI),
            fez_record_search_key_pubmed_central_id: {
                rek_pubmed_central_id_id: 12345678901,
                rek_pubmed_central_id_pid: 'UQ:1234',
                rek_pubmed_central_id_xsdmf_id: 1234,
                rek_pubmed_central_id: 'PMC5179926',
            },
        };

        const wrapper = setup({ publication: pmcProps }, false);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('.noOaIcon').length).toEqual(3);
        expect(wrapper.find('.openAccess').length).toEqual(2);
    });

    it('should render 3 not OA links and PMC link with OA for OPEN_ACCESS_ID_PMC', () => {
        const pmcProps = {
            ...getPublication(0, openAccessConfig.OPEN_ACCESS_ID_PMC),
            fez_record_search_key_pubmed_central_id: {
                rek_pubmed_central_id_id: 12345678901,
                rek_pubmed_central_id_pid: 'UQ:1234',
                rek_pubmed_central_id_xsdmf_id: 1234,
                rek_pubmed_central_id: 'PMC5179926',
            },
        };

        const wrapper = setup({ publication: pmcProps }, false);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('.noOaIcon').length).toEqual(3);
        expect(wrapper.find('.openAccess').length).toEqual(1);
    });

    it('should render 3 not OA links and PMC with OA and DOI link no OA for OPEN_ACCESS_ID_PMC', () => {
        const pmcProps = {
            ...getPublication(0, openAccessConfig.OPEN_ACCESS_ID_PMC),
            fez_record_search_key_pubmed_central_id: {
                rek_pubmed_central_id_id: 12345678901,
                rek_pubmed_central_id_pid: 'UQ:1234',
                rek_pubmed_central_id_xsdmf_id: 1234,
                rek_pubmed_central_id: 'PMC5179926',
            },
            fez_record_search_key_doi: {
                rek_doi_id: 1706266,
                rek_doi_pid: 'UQ:795721',
                rek_doi_xsdmf_id: 16514,
                rek_doi: '10.1016/j.pnsc.2012.12.004',
            },
        };

        const wrapper = setup({ publication: pmcProps }, false);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('.noOaIcon').length).toEqual(4);
        expect(wrapper.find('.openAccess').length).toEqual(1);
    });

    it(
        'should render 3 not OA links and DOI not OA and PMC always ' +
            'OA link for OPEN_ACCESS_ID_FILE_AUTHOR_POSTPRINT',
        () => {
            const pmcProps = {
                ...getPublication(0, openAccessConfig.OPEN_ACCESS_ID_FILE_AUTHOR_POSTPRINT),
                fez_record_search_key_pubmed_central_id: {
                    rek_pubmed_central_id_id: 12345678901,
                    rek_pubmed_central_id_pid: 'UQ:1234',
                    rek_pubmed_central_id_xsdmf_id: 1234,
                    rek_pubmed_central_id: 'PMC5179926',
                },
                fez_record_search_key_doi: {
                    rek_doi_id: 1706266,
                    rek_doi_pid: 'UQ:795721',
                    rek_doi_xsdmf_id: 16514,
                    rek_doi: '10.1016/j.pnsc.2012.12.004',
                },
            };

            const wrapper = setup({ publication: pmcProps });
            expect(toJson(wrapper)).toMatchSnapshot();
            // expect(wrapper.find('.noOaIcon').length).toEqual(4);
            // expect(wrapper.find('.openAccess').length).toEqual(1);
        },
    );
});
