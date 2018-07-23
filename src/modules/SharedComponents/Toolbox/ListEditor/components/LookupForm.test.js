import LookupForm from './LookupForm';

function setup(testProps, isShallow = true) {
    const props = {
        ...testProps,
        inputField: () => (<span />),
        onAdd: testProps.onAdd || jest.fn(), // : PropTypes.func.isRequired,
        isValid: testProps.isValid || jest.fn(() => ('')), // PropTypes.func,
        disabled: testProps.disabled
    };
    return getElement(LookupForm, props, isShallow);
}

describe('LookupForm tests ', () => {
    it('should render lookup form', () => {
        const wrapper = setup({ });
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
