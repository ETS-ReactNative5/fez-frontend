import React from 'react';
import NotFound from './NotFound';

import * as routes from 'config/routes';

import { accounts } from 'mock/data/account';

import { render, WithReduxStore, WithRouter, act } from 'test-utils';
import Immutable from 'immutable';
import * as ReactRouterHooks from 'react-router';
import * as Context from 'context';
import * as FavouriteSearchAction from 'actions/favouriteSearch';

import * as repositories from 'repositories';
import { waitForElementToBeRemoved, waitFor } from '@testing-library/dom';

jest.mock('react-router');

function setup(state = {}, renderer = render) {
    return renderer(
        <WithReduxStore initialState={Immutable.Map(state)}>
            <WithRouter>
                <NotFound />
            </WithRouter>
        </WithReduxStore>,
    );
}

describe('NotFound page component', () => {
    let useLocationHook;
    let useHistoryHook;
    let useAccountContext;
    let getFavouriteSearchAlias;

    const historyPushFn = jest.fn();

    beforeEach(() => {
        useLocationHook = jest.spyOn(ReactRouterHooks, 'useLocation');
        useHistoryHook = jest.spyOn(ReactRouterHooks, 'useHistory');
        useAccountContext = jest.spyOn(Context, 'useAccountContext');
        getFavouriteSearchAlias = jest.spyOn(FavouriteSearchAction, 'getFavouriteSearchAlias');

        useHistoryHook.mockImplementation(() => ({ push: historyPushFn }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render auth required page', () => {
        useLocationHook.mockImplementation(() => ({ pathname: routes.pathConfig.contact }));
        useAccountContext.mockImplementation(() => ({ account: null }));

        const { getByText } = setup();

        expect(getByText('Authentication required')).toBeInTheDocument();
        expect(getByText('The requested page is available to authenticated users only.')).toBeInTheDocument();
        expect(getByText('Please login to continue')).toBeInTheDocument();
    });

    it('should render permissions denied page', () => {
        useLocationHook.mockImplementation(() => ({ pathname: routes.pathConfig.admin.masquerade }));
        useAccountContext.mockImplementation(() => ({ account: accounts.uqresearcher }));

        const { getByText } = setup();

        expect(getByText('Permissions denied')).toBeInTheDocument();
        expect(getByText('The requested page is available to authorised users only.')).toBeInTheDocument();
    });

    it('should render permissions denied or not found page', () => {
        useLocationHook.mockImplementation(() => ({ pathname: '/view/UQ:1/test.pdf' }));
        useAccountContext.mockImplementation(() => ({ account: accounts.uqresearcher }));

        const { getByText } = setup();

        expect(getByText('Permissions denied')).toBeInTheDocument();
        expect(getByText('The requested page is available to authorised users only.')).toBeInTheDocument();
    });

    it('should render not found page', async done => {
        useLocationHook.mockImplementation(() => ({ pathname: '/abcd' }));
        useAccountContext.mockImplementation(() => ({ account: accounts.uqresearcher }));

        const { getByText, getByTestId } = setup();

        await waitForElementToBeRemoved(() => getByTestId('empty'));

        await waitFor(() => getByText('Page not found'));

        expect(getByText('Page not found')).toBeInTheDocument();
        expect(getByText('The requested page could not be found.')).toBeInTheDocument();
        expect(getByText("Sorry about that, but here's what you can do next:")).toBeInTheDocument();
        expect(
            getByText('Try re-typing the address, checking for spelling, capitalisation and/or punctuation.'),
        ).toBeInTheDocument();
        expect(getByText('Start again at the home page.')).toBeInTheDocument();
        expect(
            getByText('If you’re sure the page should be at this address, email us at webmaster@library.uq.edu.au.'),
        ).toBeInTheDocument();

        done();
    });

    it('should redirect to records search page if alias found', async done => {
        mockApi.onGet(repositories.routes.FAVOURITE_SEARCH_LIST_API({ id: 'abcd' }).apiUrl).reply(200, {
            data: { fvs_id: 1, fvs_alias: 'abcd', fvs_search_parameters: '/records/search?test=parameters' },
        });
        useLocationHook.mockImplementation(() => ({ pathname: '/abcd' }));
        useAccountContext.mockImplementation(() => ({ account: accounts.uqstaff }));

        const { getByTestId } = setup({
            favouriteSearchReducer: {
                existingAliasChecking: false,
                existingAlias: null,
            },
        });

        act(() => {
            expect(getFavouriteSearchAlias).toHaveBeenCalledWith({ fvs_alias: 'abcd' });
        });

        await waitForElementToBeRemoved(() => getByTestId('empty'));

        expect(historyPushFn).toHaveBeenCalledWith('/records/search?test=parameters');

        done();
    });
});
