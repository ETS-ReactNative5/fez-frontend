import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default class GenericSelectField extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        itemsList: PropTypes.array,
        itemsLoading: PropTypes.bool,
        loadItemsList: PropTypes.func,
        itemsLoadingHint: PropTypes.string,
        selectedValue: PropTypes.any,
        parentItemsId: PropTypes.number,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        menuItemClassName: PropTypes.string,
        fullWidth: PropTypes.bool,
        autoWidth: PropTypes.bool,
        errorText: PropTypes.string,
        hintText: PropTypes.string,
        multiple: PropTypes.bool,
        required: PropTypes.bool,
        error: PropTypes.any,
        ariaLabel: PropTypes.string,
        loadingHint: PropTypes.string,
        label: PropTypes.string,
        locale: PropTypes.object,
        hideLabel: PropTypes.bool
    };

    static defaultProps = {
        itemsList: [],
        locale: {
            label: 'Select item',
            loading: 'loading...'
        },
        menuItemClassName: '',
        fullWidth: false,
        autoWidth: false,
        hintText: null,
        multiple: false
    };

    componentDidMount() {
        if (this.props.itemsList.length === 0 && this.props.loadItemsList) {
            this.props.loadItemsList(this.props.parentItemsId);
        }
    }

    _itemSelected = (event) => {
        let value = event.target.value;
        if(value[0] === -1 && value.length > 1) {
            value.shift();
        } else if (value === [-1]) {
            value = '';
        }
        this.props.onChange(value);
    };

    getMenuItemProps = (item, selectedValue, multiple) => {
        if (multiple) {
            return {
                selected: selectedValue.indexOf(item.value || item) > -1,
                value: item.value || item,
            };
        } else {
            return {
                value: item.value || item,
            };
        }
    };

    render() {
        const loadingIndicationText = !!this.props.locale.label && `${this.props.locale.label} ${this.props.itemsLoading ? this.props.loadingHint : ''}`;
        const renderMenuItems = [
            this.props.hideLabel && <MenuItem value={-1} key={0} disabled>{loadingIndicationText}</MenuItem>,
            ...this.props.itemsList.map((item, index) => {
                return (<MenuItem
                    {...(this.getMenuItemProps(item, this.props.selectedValue, this.props.multiple))}
                    key={index + 1}>
                    {item.text || item.value || item}
                </MenuItem>);
            })
        ];
        const newValue = () => {
            if(this.props.multiple) {
                if(this.props.hideLabel) {
                    return this.props.selectedValue && this.props.selectedValue.length > 0 && this.props.selectedValue || [-1];
                } else {
                    return this.props.selectedValue && this.props.selectedValue.length > 0 && this.props.selectedValue || [];
                }
            } else {
                if(this.props.hideLabel) {
                    return this.props.selectedValue && this.props.selectedValue.length > 0 && this.props.selectedValue || '-1';
                } else{
                    return this.props.selectedValue && this.props.selectedValue.length > 0 && this.props.selectedValue || '';
                }
            }
        };

        return (
            <FormControl fullWidth>
                {
                    this.props.locale.label && !this.props.hideLabel &&
                    <InputLabel>{this.props.locale.label}</InputLabel>
                }
                <Select
                    value={newValue()}
                    displayEmpty
                    onChange={this._itemSelected}
                    disabled={this.props.disabled || this.props.itemsLoading}
                    aria-label={this.props.ariaLabel}
                    autoWidth={this.props.autoWidth}
                    error={!!this.props.error}
                    multiple={this.props.multiple}>
                    {renderMenuItems}
                </Select>
                {
                    !!this.props.error &&
                    <FormHelperText error={!!this.props.error}>{this.props.errorText}</FormHelperText>
                }
            </FormControl>
        );
    }
}
