import CitationView from './CitationView';
import {researchReport} from 'mock/data/testing/records';

function setup(testProps, isShallow = true) {
    const props = {
        ...testProps,
        prefix: testProps.prefix || ' ',
        suffix: testProps.suffix || '.',
        value: testProps.value,
        className: testProps.className || ''
    };
    return getElement(CitationView, props, isShallow);
}

describe('CitationView test ', () => {
    it('should render component with empty span', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with correct props', () => {
        const wrapper = setup({prefix: ' ', suffix: ':', className: 'citationClassName', value: 'Some text' });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with correct suffix', () => {
        const wrapper = setup({prefix: ' ', suffix: '.', className: 'citationClassName', value: 'Some text.' });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with no prefix or suffix', () => {
        const wrapper = setup({prefix: ' ', suffix: '.', className: 'citationClassName' });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component with no className', () => {
        const wrapper = setup({value: 'Some text.'});
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});
