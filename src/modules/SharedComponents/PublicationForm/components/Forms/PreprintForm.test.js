jest.dontMock('./PreprintForm');

import PreprintForm from './PreprintForm';

function setup(testProps, isShallow = true){
    const props = {
        ...testProps,
        submitting: testProps.submitting || false // : PropTypes.bool,
    };
    return getElement(PreprintForm, props, isShallow);
}

describe('PreprintForm renders ', () => {
    it('component', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component with 5 input fields', () => {
        const wrapper = setup({});
        expect(wrapper.find('Field').length).toEqual(5);
    });

    it('component with 3 required input fields', () => {
        const wrapper = setup({});
        expect(wrapper.find('Field .requiredHintField').length).toEqual(1);
    });

    it('component with all fields disabled', () => {
        const wrapper = setup({submitting: true});
        wrapper.find('Field').forEach(field => {
            expect(field.props().disabled).toEqual(true);
        })
    });
});
