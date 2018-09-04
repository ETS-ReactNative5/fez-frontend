import React, {PureComponent} from 'react';
import {publicationTypes} from 'config';
import MenuItem from '@material-ui/core/MenuItem';
import {locale} from 'locale';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    title: {
        ...theme.typography.caption
    }
});

export class DocumentTypeField extends PureComponent {
    static propTypes = {
        docTypes: PropTypes.array,
        updateDocTypeValues: PropTypes.func,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        classes: PropTypes.object
    };

    static defaultProps = {
        value: [],
        disabled: false,
        className: 'displaytype menuitem'
    };

    constructor(props) {
        super(props);
        this.publicationTypes = publicationTypes();
    }

    _handleDocTypeChange = (event) => {
        this.props.updateDocTypeValues(event.target.value);
    };

    render() {
        const txt = locale.components.searchComponent;
        const docTypeItems = [
            <MenuItem key={0} disabled>{txt.advancedSearch.fieldTypes.rek_display_type.hint}</MenuItem>,
            ...this.publicationTypes.map((item, index) => {
                return (
                    <MenuItem
                        checked={this.props.docTypes && this.props.docTypes.length > 0 && this.props.docTypes.indexOf(item.id) > -1}
                        value={item.id}
                        children={item.name}
                        key={index + 1}
                    />
                );
            })
        ];
        // const {classes} = this.props;
        return (
            <FormControl fullWidth>
                <InputLabel>{txt.advancedSearch.fieldTypes.rek_display_type.title}</InputLabel>
                <Select
                    aria-label={txt.advancedSearch.fieldTypes.rek_display_type.ariaLabel}
                    value={this.props.docTypes || '0'}
                    onChange={this._handleDocTypeChange}
                    multiple
                    fullWidth
                    disabled={this.props.disabled}
                    children={docTypeItems} />
            </FormControl>
        );
    }
}
export default withStyles(styles, {withTheme: true})(DocumentTypeField);

