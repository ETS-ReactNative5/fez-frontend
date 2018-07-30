import {AutoSuggestField} from 'modules/SharedComponents/Toolbox/AutoSuggestField';
import {connect} from 'react-redux';
import * as actions from 'actions';

const mapStateToProps = (state, props) => {
    const category = 'series';
    return {
        category: category,
        itemsList: state.get('searchKeysReducer') && state.get('searchKeysReducer')[category]
            ? state.get('searchKeysReducer')[category].itemsList : [],
        allowFreeText: true,
        onChange: (item) => props.input.onChange(item.value),
        dataSourceConfig: { text: 'value', value: 'value'},
        async: true,
        errorText: props.meta ? props.meta.error : null,
        selectedValue: props.input ? props.input.value : null
    };
};

const mapDispatchToProps = (dispatch) => (
    {
        loadSuggestions: (searchKey, searchQuery = ' ') => dispatch(actions.loadSearchKeyList(searchKey, searchQuery))
    }
);

export const SeriesField = connect(mapStateToProps, mapDispatchToProps)(AutoSuggestField);

