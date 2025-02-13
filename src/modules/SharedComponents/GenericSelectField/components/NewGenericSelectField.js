import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    theme => ({
        selectedMenuItem: {
            backgroundColor: `${theme.palette.accent.main} !important`,
            color: theme.palette.white.main,
        },
    }),
    { withTheme: true },
);

/**
 * 'canUnselect' prop allows the editing user to 'unselect' the entry in the dropdown
 * Requires a transformer to cover the key in question
 * (At time of writing, rek_herdc_code, rek_herdc_status, and rek_institutional_status have transformers)
 */

export const NewGenericSelectField = ({
    canUnselect,
    disabled,
    displayEmpty,
    error,
    errorText,
    formHelperTextProps,
    genericSelectFieldId,
    hideLabel,
    input,
    itemsList,
    itemsLoading,
    label,
    loadItemsList,
    loadingHint,
    meta,
    multiple,
    onChange,
    required,
    selectPrompt,
    selectProps,
    style,
    value,
}) => {
    const classes = useStyles();
    const [selectValue, setSelectValue] = React.useState(multiple ? [] : '');
    const [inputError, setInputError] = React.useState(!!error);
    const [inputErrorText, setInputErrorText] = React.useState(errorText || error || null);

    const promptMenuItem = {
        value: '',
        text: selectPrompt,
        disabled: true,
    };

    const loadingMenuItem = {
        value: '',
        text: loadingHint,
        disabled: true,
    };

    /* Run this effect if items list are needed to be loaded from api */
    React.useEffect(() => {
        if (itemsList.length === 0 && loadItemsList) {
            loadItemsList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Run this effect to set value from redux-form field */
    React.useEffect(() => {
        if (!!input && !!input.value) {
            setSelectValue(!!input.value.toJS ? input.value.toJS() : input.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    /* Run this effect to set value for non redux-form field */
    React.useEffect(() => {
        if (!input) {
            if (multiple) {
                value.length > 0 ? setSelectValue(value) : setSelectValue([]);
            } else {
                !!value ? setSelectValue(value) : setSelectValue('');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    /* Run this effect to set error state for redux-form field */
    React.useEffect(() => {
        if (!!meta) {
            setInputError(!!meta.error);
            setInputErrorText(meta.error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meta]);

    /* Run this effect to set error state for non redux-form field */
    React.useEffect(() => {
        if (!meta) {
            setInputError(!!error);
            setInputErrorText(!!error ? errorText || error : null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const handleChange = React.useCallback(
        event => (!!input ? input.onChange(event.target.value) : onChange(event.target.value)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const renderMenuItems = itemsList => {
        return [
            itemsList.map((item, index) => {
                return (
                    <MenuItem
                        classes={{ selected: classes.selectedMenuItem }}
                        style={{ display: 'block' }}
                        selected={(multiple && selectValue.includes(item.value)) || undefined}
                        value={item.value}
                        key={index + 1}
                        disabled={item && ((!canUnselect && !item.value) || !!item.disabled)}
                        aria-label={item.text}
                        data-testid={`${genericSelectFieldId}-option-${index}`}
                    >
                        {item.text}
                    </MenuItem>
                );
            }),
        ];
    };

    return (
        <FormControl fullWidth required={required} error={!!inputError}>
            {!hideLabel && (
                <InputLabel
                    hidden={hideLabel}
                    data-testid={`${genericSelectFieldId}-label`}
                    id={`${genericSelectFieldId}-label`}
                >
                    {label}
                </InputLabel>
            )}
            <Select
                disabled={disabled}
                displayEmpty={displayEmpty}
                inputProps={{
                    'aria-labelledby': `${genericSelectFieldId}-label`,
                    'data-testid': `${genericSelectFieldId}-input`,
                    id: `${genericSelectFieldId}-input`,
                }}
                multiple={multiple}
                MenuProps={{
                    id: `${genericSelectFieldId}-options`,
                    'data-testid': `${genericSelectFieldId}-options`,
                }}
                onChange={handleChange}
                style={style}
                SelectDisplayProps={{
                    id: `${genericSelectFieldId}-select`,
                    'data-testid': `${genericSelectFieldId}-select`,
                }}
                value={selectValue}
                {...(hideLabel && multiple ? { renderValue: /* istanbul ignore next */ () => selectPrompt } : {})}
                {...(!!selectProps ? { ...selectProps } : {})}
            >
                {itemsLoading ? renderMenuItems([loadingMenuItem]) : renderMenuItems([promptMenuItem, ...itemsList])}
            </Select>
            {!!inputError && (
                <FormHelperText
                    error={!!inputError}
                    data-testid={`${genericSelectFieldId}-helper-text`}
                    id={`${genericSelectFieldId}-helper-text`}
                    {...(!!formHelperTextProps ? { ...formHelperTextProps } : {})}
                >
                    {inputErrorText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

NewGenericSelectField.propTypes = {
    canUnselect: PropTypes.bool,
    disabled: PropTypes.bool,
    displayEmpty: PropTypes.bool,
    error: PropTypes.any,
    errorText: PropTypes.string,
    formHelperTextProps: PropTypes.object,
    genericSelectFieldId: PropTypes.string.isRequired,
    hideLabel: PropTypes.bool,
    input: PropTypes.object,
    meta: PropTypes.object,
    itemsList: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            disabled: PropTypes.bool,
        }),
    ),
    itemsLoading: PropTypes.bool,
    label: PropTypes.string,
    loadingHint: PropTypes.string,
    loadItemsList: PropTypes.func,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    selectPrompt: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.any,
    selectProps: PropTypes.object,
};

NewGenericSelectField.defaultProps = {
    itemsList: [],
    canUnselect: false,
    multiple: false,
    selectPrompt: 'Please select an option',
    loadingHint: 'Loading items...',
};

NewGenericSelectField.displayName = 'NewGenericSelectField';

export default React.memo(NewGenericSelectField);
