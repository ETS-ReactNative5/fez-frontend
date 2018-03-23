jest.dontMock('./VideoDocumentForm');

import VideoDocumentForm from './VideoDocumentForm';

function setup(testProps, isShallow = true){
    const props = {
        ...testProps,
        submitting: testProps.submitting || false // : PropTypes.bool,
    };
    return getElement(VideoDocumentForm, props, isShallow);
}

describe('VideoDocumentForm renders ', () => {
    it('component', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component with 9 input fields', () => {
        const wrapper = setup({});
        expect(wrapper.find('Field').length).toEqual(9);
    });

    it('component with 3 required input fields', () => {
        const wrapper = setup({});
        expect(wrapper.find('Field .requiredField').length).toEqual(2);
        expect(wrapper.find('Field .requiredHintField').length).toEqual(1);
    });

    it('component with all fields disabled', () => {
        const wrapper = setup({submitting: true});
        wrapper.find('Field').forEach(field => {
            expect(field.props().disabled).toEqual(true);
        })
    });
});
