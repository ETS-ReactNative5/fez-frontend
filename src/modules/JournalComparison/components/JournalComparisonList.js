import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { JournalsList } from 'modules/SharedComponents/JournalsList';
import { locale } from '../../../locale';

export const JournalComparisonList = ({ journals }) => {
    const txt = locale.components.journalComparison.journalComparisonList;
    if (!journals || (!!journals && journals.length === 0)) {
        return (
            <Grid id="journal-comparison-list-empty" item xs={12}>
                {txt.empty}
            </Grid>
        );
    }
    return (
        <Grid item xs={12}>
            <JournalsList journals={journals} isSelectable={false} />
        </Grid>
    );
};

JournalComparisonList.propTypes = {
    journals: PropTypes.array,
};

export default React.memo(JournalComparisonList);
