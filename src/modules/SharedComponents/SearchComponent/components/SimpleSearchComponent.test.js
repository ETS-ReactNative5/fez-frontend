import SimpleSearchComponent from './SimpleSearchComponent';
import * as constants from 'config/general';

function setup(testProps, isShallow = true){
    const props = {
        searchText: '',
        className: 'simple-search',

        showSearchButton: false,
        showMobileSearchButton: false,
        showAdvancedSearchButton: false,
        showPrefixIcon: false,

        isInHeader: false,

        onSearch: jest.fn(),
        onInvalidSearch: jest.fn(),
        onToggle: jest.fn(),
        onSearchTextChange: jest.fn(),

        ...testProps
    };

    return getElement(SimpleSearchComponent, props, isShallow);
}

describe('SimpleSearchComponent', () => {
    it('should render default view', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render show mobile button', () => {
        const wrapper = setup({showMobileSearchButton: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render show prefix icon in the search box', () => {
        const wrapper = setup({showPrefixIcon: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with a class "header" for use in AppBar', () => {
        const wrapper = setup({isInHeader: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should set search value from prop', () => {
        const wrapper = setup({showAdvancedSearchButton: true, searchText: 'i feel lucky'});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should update search text field', () => {
        const testFn = jest.fn();
        const wrapper = setup({onSearchTextChange: testFn});

        wrapper.instance().handleSearchTextChange({}, 'new search value');

        expect(testFn).toHaveBeenCalledWith('new search value');
    });

    it('should not submit search if ENTER wasn\'t pressed', () => {
        const testMethod = jest.fn();
        const wrapper = setup({onSearch: testMethod});

        wrapper.instance().handleSearch({key: 'a'});
        wrapper.update();

        expect(testMethod).not.toHaveBeenCalled();
    });

    it('should submit search if search text is not null and ENTER is pressed', () => {
        const testMethod = jest.fn();
        const wrapper = setup({searchText: 'i feel lucky', onSearch: testMethod});

        wrapper.instance().handleSearch({key: 'Enter'});
        wrapper.update();

        expect(testMethod).toHaveBeenCalled();
    });

    it('should toggle search mode', () => {
        const testToggleFn = jest.fn();
        const wrapper = setup({showAdvancedSearchButton: true, onToggleSearchMode: testToggleFn});
        wrapper.instance().handleSearchMode();
        expect(testToggleFn).toHaveBeenCalled();
    });

    it('should toggle mobile search', () => {
        const wrapper = setup({});
        wrapper.instance().handleToggleMobile();
        expect(wrapper.state().showMobile).toBe(true);
    });

    it('should handle search and notify with error message for max length for search text', () => {
        const testOnInvalidSearchFn = jest.fn();
        const wrapper = setup({searchText: 'this is way too long', onInvalidSearch: testOnInvalidSearchFn});

        constants.MAX_PUBLIC_SEARCH_TEXT_LENGTH = 5;

        wrapper.instance().handleSearch();
        expect(testOnInvalidSearchFn).toHaveBeenCalledWith('Must be 5 characters or less');
    });

    it('_searchTextValidationMessage() should return a message for being too long', () => {
        const wrapper = setup({});
        wrapper.setState({searchText: 'this is way too long'});
        constants.MAX_PUBLIC_SEARCH_TEXT_LENGTH = 5;
        wrapper.update();
        expect(wrapper.instance()._searchTextValidationMessage(wrapper.state().searchText)).toEqual('Must be 5 characters or less');
    });

    it('_searchTextValidationMessage() should return false for being fine', () => {
        const wrapper = setup({});
        constants.MAX_PUBLIC_SEARCH_TEXT_LENGTH = 20;
        wrapper.setState({searchText: 'this is fine'});
        wrapper.update();
        expect(wrapper.instance()._searchTextValidationMessage(wrapper.state().searchText)).toEqual(null);
    });
});
