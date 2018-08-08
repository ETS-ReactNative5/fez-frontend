import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {documentTypesLookup} from 'config/general';
import {locale} from 'locale';

export default class AdvancedSearchCaption extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        fieldRows: PropTypes.array,
        docTypes: PropTypes.array,
        yearFilter: PropTypes.object,
        isOpenAccess: PropTypes.bool,
    };

    static defaultProps = {
        fieldRows: [{
            searchField: '0',
            value: '',
            label: ''
        }],
        yearFilter: {
            from: null,
            to: null,
            invalid: true
        },
        isOpenAccess: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            captionData: []
        };
    }

    componentDidMount() {
        this.updateStateData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateStateData(nextProps);
    }

    getCleanValue = (item) => {
        // Receives an object in format {title: string, combiner: string, value: string||array}
        if(Array.isArray(item.value)) {
            const values = [...item.value];
            const lastValue = values.pop();
            return {...item, value: values.length > 0 ? `${values.join(', ')} or ${lastValue}` : lastValue};
        }
        if(item.title === 'Any field' && item.value === '') {
            return {...item, value: 'anything'};
        } else {
            return item;
        }
    };

    getSearchFieldData = (fieldRows) => {
        const txt = locale.components.searchComponent.advancedSearch.fieldTypes;
        return fieldRows
            .filter((item) => item.searchField !== 'rek_display_type')
            .map((item) => (
                this.getCleanValue({
                    title: txt[item.searchField].title,
                    combiner: txt[item.searchField].combiner,
                    value: item.value
                })
            ));
    };

    getDocTypeData = (docTypes) => {
        const txt = locale.components.searchComponent.advancedSearch.fieldTypes;
        const converteddocTypes = docTypes.map((item) => documentTypesLookup[item]);
        const lastItem = converteddocTypes.pop();
        const docsString = converteddocTypes.length > 0 ? converteddocTypes.join(', ') + ' or ' + lastItem : lastItem;
        return this.getCleanValue({
            title: txt.rek_display_type.title,
            combiner: txt.rek_display_type.combiner,
            value: docsString
        });
    };

    getOpenAccessData = (isOpenAccess) => {
        const txt = locale.components.searchComponent.advancedSearch.openAccess;
        return isOpenAccess ? {title: '', combiner: txt.combiner, value: txt.captionText} : null;
    };

    getYearFilterData = (yearFilter) => {
        const txt = locale.components.searchComponent.advancedSearch.fieldTypes;
        return yearFilter.from &&  yearFilter.to ? {title: txt.facet_year_range.captionTitle, combiner: txt.facet_year_range.combiner, value: yearFilter.from + ' to ' + yearFilter.to} : null;
    };

    updateStateData = (props) => {
        this.setState({
            captionData: [
                ...this.getSearchFieldData(props.fieldRows),
                this.getDocTypeData(props.docTypes),
                this.getOpenAccessData(props.isOpenAccess),
                this.getYearFilterData(props.yearFilter)
            ]});
    };

    renderCaptions = (items) => {
        return items
            .filter((item) => item !== null) // Dont render nulls
            .filter((item) => item.title !== 'Select a field') // Dont render caption for select a field
            .filter((item) => !!item.value) // Dont render caption until it has a value
            .map((item, index) => {
                return (
                    <span key={index}>
                        <span className="and"> {index !== 0 && ' AND '}</span>
                        <span className="title">{item.title} </span>
                        <span className="combiner"> {item.combiner} </span>
                        <span className="value"> {item.value}</span>
                    </span>
                );
            });
    };

    render() {
        return (
            <div className={`${this.props.className} searchQueryCaption`}>
                {this.renderCaptions(this.state.captionData)}
            </div>
        );
    }
}
