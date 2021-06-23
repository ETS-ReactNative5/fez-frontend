import React from 'react';
import PropTypes from 'prop-types';

import DefaultTemplate from './DefaultTemplate';

const WosCategoriesTemplate = ({ data, templateProps, fieldId }) => {
    const { filterFn } = templateProps;

    return data.filter(filterFn).map((categoryItem, index) => {
        const categoryNames = (categoryItem.jnl_wos_category_lookup || '').split('|');
        const categoryIssns = (categoryItem.jnl_wos_category_issn || '').split('|');
        return categoryNames.map((categoryName, categoryIndex) => (
            <DefaultTemplate
                key={`${fieldId}${categoryName}`}
                data={`${categoryName.trim()}${(!!categoryIssns[categoryIndex] &&
                    ' (' + categoryIssns[categoryIndex] + ')') ||
                    ''}`}
                fieldId={`${fieldId}-${index}`}
            />
        ));
    });
};

WosCategoriesTemplate.propTypes = {
    data: PropTypes.array,
    fieldId: PropTypes.string,
    templateProps: PropTypes.object,
};

export default WosCategoriesTemplate;
