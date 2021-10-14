import React from 'react';
import { fireEvent, render, WithReduxStore, WithRouter } from 'test-utils';
import { JournalComparison } from '../index';
import Immutable from 'immutable';
import { createMemoryHistory } from 'history';
import { pathConfig } from '../../../config';

function setup(testProps = Immutable.Map({})) {
    return render(
        <WithRouter history={testProps.history}>
            <WithReduxStore>
                <JournalComparison />
            </WithReduxStore>
        </WithRouter>,
    );
}

describe('JournalComparison', () => {
    it('should navigate to journal search page', () => {
        const history = createMemoryHistory({ initialEntries: [pathConfig.journals.compare] });
        history.push({
            pathname: pathConfig.journals.search,
        });
        const { getByTestId } = setup(Immutable.Map({ history: history }));
        fireEvent.click(getByTestId('return-to-search-results-button'));
        expect(history.location.pathname).toBe(pathConfig.journals.search);
    });
});
