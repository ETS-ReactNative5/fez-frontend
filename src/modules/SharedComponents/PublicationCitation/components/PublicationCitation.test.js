import PublicationCitation from './PublicationCitation';
import {mockRecordToFix} from 'mock/data/testing/records';

function setup(testProps, isShallow = true){
    const props = {
        ...testProps,
        publication: testProps.publication || mockRecordToFix,
        // showDefaultActions: PropTypes.bool,
        // showSources: PropTypes.bool,
        // customActions: PropTypes.array,
        // className: PropTypes.string,
        history: testProps.history || {push: jest.fn()},
        actions: testProps.actions || {
            setFixRecord: jest.fn(),
            setRecordToView: jest.fn()
        }
    };
    return getElement(PublicationCitation, props, isShallow);
}

describe('PublicationCitation ', () => {
    it('should render component with default item', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with default list hiding the difference count', () => {
        const wrapper = setup({hideCountDiff: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with default list hiding the total count', () => {
        const wrapper = setup({hideCountTotal: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with default list hiding the citation content', () => {
        const wrapper = setup({hideCitationContent: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with default actions', () => {
        const wrapper = setup({showDefaultActions: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with custom actions', () => {
        const wrapper = setup({
            customActions: [
                {
                    label: 'Claim now',
                    handleAction: jest.fn()
                },
                {
                    label: 'Not mine',
                    handleAction: jest.fn()
                },
                {
                    label: 'View stats',
                    handleAction: jest.fn()
                }
            ]});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with publication from multiple sources', () => {
        const publicationWithSources = {...mockRecordToFix, "sources": [{source: "espace", id: "UQ:224457"}]};
        const wrapper = setup({publication: publicationWithSources, showSources: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component without a title', () => {
        const publicationWithSources = {...mockRecordToFix, "sources": [{source: "espace", id: "UQ:224457"}]};
        const wrapper = setup({publication: publicationWithSources, showSources: true, hideTitle: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should handle view record link', () => {
        const wrapper = setup({});
        wrapper.instance().viewRecord();
        expect(wrapper.instance().props.actions.setRecordToView).toHaveBeenCalled();
    });

    it('should handle default actions', () => {
        const wrapper = setup({showDefaultActions: true});
        wrapper.instance()._handleDefaultActions('fixRecord');
        expect(wrapper.instance().props.history.push).toHaveBeenCalled();
        expect(wrapper.instance().props.actions.setFixRecord).toHaveBeenCalled();

        wrapper.instance()._handleDefaultActions('shareRecord');
        // TODO
        wrapper.instance()._handleDefaultActions('NAN');
        // TODO
    });

    it('should render publication with citation metric', () => {
        const publicationWithMetricData = {...mockRecordToFix, metricData: {count: 23, difference: 5, citation_url: 'http://www.test.com', source: 'altmetric'}};
        const wrapper = setup({publication: publicationWithMetricData, showMetrics: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
