import AdvancedSearchRow from './AdvancedSearchRow';
import * as constants from 'config/general';

function setup(testProps, isShallow = true){
    const props = {
        searchField: '0',
        value: '',
        disabledFields: [],
        rowIndex: 0,
        onSearchRowChange: jest.fn(),
        onSearchRowDelete: jest.fn(),
        ...testProps
    };

    return getElement(AdvancedSearchRow, props, isShallow);
}

describe('AdvancedSearchRow', () => {
    it('should render default view', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render search field row with select field and search text', () => {
        const wrapper = setup({searchField: 'all', value: 'i feel lucky'});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render search field row with given disabled options', () => {
        const wrapper = setup({searchField: 'all', value: 'i feel lucky', disabledFields: ['all', 0]});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should handle search field dropdown change', () => {
        const testFn = jest.fn();
        const wrapper = setup({rowIndex: 1, onSearchRowChange: testFn});
        wrapper.instance()._handleSearchFieldChange({}, 2, 'rek_title');
        expect(testFn).toHaveBeenCalledWith(1, {searchField: 'rek_title', value: '', label: ''});
    });

    it('should handle search field text change', () => {
        const testFn = jest.fn();
        const wrapper = setup({rowIndex: 1, onSearchRowChange: testFn});
        wrapper.instance()._handleTextChange('i feel lucky');
        expect(testFn).toHaveBeenCalledWith(1, {searchField: '0', value: 'i feel lucky', label: ''});
    });

    it('should handle delete row', () => {
        const testFn = jest.fn();
        const wrapper = setup({rowIndex: 3, onSearchRowDelete: testFn});
        wrapper.instance()._deleteRow();
        expect(testFn).toHaveBeenCalledWith(3);
    });
});
