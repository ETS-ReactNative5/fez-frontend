import React from 'react';
import { GenericSelectField } from 'modules/SharedComponents/GenericSelectField';
import { BULK_UPDATE_SEARCH_KEYS } from 'config/bulkUpdates';

export const SearchKeyField = fieldProps => {
    return (
        <GenericSelectField
            error={!!fieldProps.meta.error}
            errorText={fieldProps.meta.error}
            itemsList={Object.values(BULK_UPDATE_SEARCH_KEYS)}
            onChange={fieldProps.input.onChange}
            value={fieldProps.input.value}
            {...fieldProps}
        />
    );
};

export default React.memo(SearchKeyField);
