import React from 'react';
import PropTypes from 'prop-types';
import { NewGenericSelectField } from 'modules/SharedComponents/GenericSelectField';
import {
    CONTENT_INDICATORS_DOCTYPE_BLACKLIST,
    CONTENT_INDICATORS_COLLECTIONS_BLACKLIST,
    CONTENT_INDICATORS_DOCTYPE_MAP,
} from 'config/general';

export const getSelected = props => {
    let selectedValues = (!!props.input && props.input.value) || [];
    if (selectedValues.toJS) {
        selectedValues = selectedValues.toJS();
    }
    return selectedValues;
};

export const showContentIndicatorsField = record => {
    const isBlacklistedType =
        record && record.rek_display_type && CONTENT_INDICATORS_DOCTYPE_BLACKLIST.includes(record.rek_display_type);

    const recordCollectionPids =
        (record &&
            record.fez_record_search_key_ismemberof &&
            record.fez_record_search_key_ismemberof.map(item => item.rek_ismemberof)) ||
        [];
    const inBlacklistedCollection =
        recordCollectionPids &&
        CONTENT_INDICATORS_COLLECTIONS_BLACKLIST.some(collectionPid => recordCollectionPids.includes(collectionPid));

    return !isBlacklistedType && !inBlacklistedCollection;
};

export const getContentIndicatorsListItems = displayType =>
    CONTENT_INDICATORS_DOCTYPE_MAP[displayType]
        ? CONTENT_INDICATORS_DOCTYPE_MAP[displayType]
        : CONTENT_INDICATORS_DOCTYPE_MAP.default;

export const getContentIndicators = props => {
    console.log(props.displayType, getContentIndicatorsListItems(props.displayType));
    return getContentIndicatorsListItems(props.displayType).map(item => ({
        ...item,
        disabled:
            !props.canUnselect &&
            !!props.meta &&
            !!props.meta.initial &&
            !!props.meta.initial.toJS &&
            props.meta.initial.toJS().includes(item.value),
    }));
};

export const ContentIndicatorsField = props => (
    <NewGenericSelectField
        itemsList={getContentIndicators(props)}
        locale={{ label: props.label }}
        value={getSelected(props)}
        onChange={(!!props.input && props.input.onChange) || undefined}
        errorText={(!!props.meta && props.meta.error) || ''}
        error={(!!props.meta && !!props.meta.error) || false}
        {...props}
        disabled={
            props.disabled ||
            (!props.canUnselect &&
                !!props.meta &&
                !!props.meta.initial &&
                !!props.meta.initial.toJS &&
                props.meta.initial.toJS().length === getContentIndicatorsListItems(props.displayType).length)
        }
        genericSelectFieldId="rek-content-indicator"
    />
);

ContentIndicatorsField.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    displayType: PropTypes.number,
    disabled: PropTypes.bool,
    canUnselect: PropTypes.bool,
};

export default ContentIndicatorsField;
