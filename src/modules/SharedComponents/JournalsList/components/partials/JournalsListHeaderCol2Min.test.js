import React from 'react';
import JournalsListHeaderCol2Min from './JournalsListHeaderCol2Min';
import { render, WithReduxStore } from 'test-utils';
import Immutable from 'immutable';

const testProps = {
    journal: {
        key: 'test_record',
        size: 20,
        titleHelp: {
            title: 'test',
            text: <p>test paragraph</p>,
        },
    },
};
const setup = (props = {}, state = {}) => {
    return render(
        <WithReduxStore initialState={Immutable.Map({ searchJournalsReducer: state })}>
            <JournalsListHeaderCol2Min {...props} />
        </WithReduxStore>,
    );
};

describe('JournalsListHeaderCol2 Min', () => {
    it('Should show a title help if one provided, with margin', () => {
        const { queryByTestId } = setup({
            ...testProps,
        });
        expect(queryByTestId('help-icon-test-record')).toBeInTheDocument();
        const dataElement = queryByTestId('journal-list-header-min-test-record');
        expect(dataElement.querySelector('div.MuiGrid-grid-xs-2').style.marginRight).toEqual('10px');
    });
    it('Should show a title help if one provided, no margin', () => {
        const { queryByTestId } = setup({
            ...testProps,
            journal: {
                ...testProps.journal,
                size: 260,
            },
        });
        expect(queryByTestId('help-icon-test-record')).toBeInTheDocument();
        const dataElement = queryByTestId('journal-list-header-min-test-record');
        expect(dataElement.querySelector('div.MuiGrid-grid-xs-2').style.marginRight).toEqual('0px');
    });

    it('Should not show a title help if none provided', () => {
        const { queryByTestId } = setup({
            journal: {
                key: 'test_record',
                size: 255,
            },
        });
        expect(queryByTestId('help-icon-test-record')).not.toBeInTheDocument();
    });
});
