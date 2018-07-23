import AuthButton from '../components/AuthButton';

function setup(testProps, isShallow = true) {
    const props = {
        ...testProps,
    };
    return getElement(AuthButton, props, isShallow);
}

describe('AuthButton snapshots test', () => {
    it('renders logged out status', () => {
        const wrapper = setup({isAuthorizedUser : false});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders logged in user status', () => {
        const wrapper = setup({isAuthorizedUser : true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
