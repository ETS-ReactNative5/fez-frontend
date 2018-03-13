import * as records from 'mock/data/testing/records';
import AdditionalInformation from "./AdditionalInformation";

function setup(testProps, isShallow = true){
    const props = {
        ...testProps,
        publication: testProps.publication || records.journalArticle
    };
    return getElement(AdditionalInformation, props, isShallow);
}

describe('Additional Information Component ', () => {
    it('should render component with empty publication', () => {
        const wrapper = setup({publication: {}});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with journal article', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with journal', () => {
        const wrapper = setup({publication: records.journal});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with data collection', () => {
        const wrapper = setup({publication: records.dataCollection});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with audio document', () => {
        const wrapper = setup({publication: records.audioDocument});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with book', () => {
        const wrapper = setup({publication: records.book});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with book chapter', () => {
        const wrapper = setup({publication: records.bookChapter});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with conference paper', () => {
        const wrapper = setup({publication: records.conferencePaper});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with conference proceedings', () => {
        const wrapper = setup({publication: records.conferenceProceedings});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with creative work', () => {
        const wrapper = setup({publication: records.creativeWork});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with design document', () => {
        const wrapper = setup({publication: records.design});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with digilib image', () => {
        const wrapper = setup({publication: records.digilibImage});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with image', () => {
        const wrapper = setup({publication: records.imageDocument});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with generic document', () => {
        const wrapper = setup({publication: records.generic});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with manuscript', () => {
        const wrapper = setup({publication: records.manuscript});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with newspaper', () => {
        const wrapper = setup({publication: records.newspaper});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with patent', () => {
        const wrapper = setup({publication: records.patent});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with preprint', () => {
        const wrapper = setup({publication: records.preprint});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with reference entry', () => {
        const wrapper = setup({publication: records.referenceEntry});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with research report', () => {
        const wrapper = setup({publication: records.researchReport});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with thesis', () => {
        const wrapper = setup({publication: records.thesis});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with working paper', () => {
        const wrapper = setup({publication: records.workingPaper});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with video document', () => {
        const wrapper = setup({publication: records.videoDocument});
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
