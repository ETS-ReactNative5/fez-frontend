import {accounts, currentAuthor, authorDetails} from 'mock/data/account';

import * as actions from './actionTypes';
import * as repositories from 'repositories';
import * as accountActions from './account';

describe('Account action creators', () => {
    // extend expect to check actions
    expect.extend({toHaveDispatchedActions});

    beforeEach(() => {
        // Set a mock date for account API
        Date.now = jest.genMockFunction().mockReturnValue('2016-01-01T00:00:00.000Z');

        mockActionsStore = setupStoreForActions();
        mockApi = setupMockAdapter();
    });

    afterEach(() => {
        mockApi.reset();
    });

    it('should dispatch expected actions on successful fetch of user details', async () => {
        mockApi
            .onGet(repositories.routes.CURRENT_ACCOUNT_API().apiUrl)
            .reply(200, accounts.uqresearcher)
            .onGet(repositories.routes.CURRENT_AUTHOR_API().apiUrl)
            .reply(200, currentAuthor.uqresearcher)
            .onGet(repositories.routes.AUTHOR_DETAILS_API({userId: accounts.uqresearcher.id}).apiUrl)
            .reply(200, authorDetails.uqresearcher);

        const expectedActions = [
            actions.CURRENT_ACCOUNT_LOADING,
            actions.CURRENT_ACCOUNT_LOADED,
            actions.CURRENT_AUTHOR_LOADING,
            actions.CURRENT_AUTHOR_LOADED,
            actions.CURRENT_AUTHOR_DETAILS_LOADING,
            actions.CURRENT_AUTHOR_DETAILS_LOADED
        ];

        await mockActionsStore.dispatch(accountActions.loadCurrentAccount());
        expect(mockActionsStore.getActions()).toHaveDispatchedActions(expectedActions);
    });

    it('should dispatch expected actions if author returns 404', async () => {
        mockApi
            .onGet(repositories.routes.CURRENT_ACCOUNT_API().apiUrl)
            .reply(200, accounts.uqstaff)
            .onAny()
            .reply(404, {});

        const expectedActions = [
            actions.CURRENT_ACCOUNT_LOADING,
            actions.CURRENT_ACCOUNT_LOADED,
            actions.CURRENT_AUTHOR_LOADING,
            actions.CURRENT_AUTHOR_FAILED,
            actions.CURRENT_AUTHOR_DETAILS_FAILED
        ];

        await mockActionsStore.dispatch(accountActions.loadCurrentAccount());
        expect(mockActionsStore.getActions()).toHaveDispatchedActions(expectedActions);
    });

    it('should dispatch expected actions if author returns 403', async () => {
        mockApi
            .onGet(repositories.routes.CURRENT_ACCOUNT_API().apiUrl)
            .reply(200, accounts.uqstaff)
            .onAny()
            .reply(403, {});

        const expectedActions = [
            actions.CURRENT_ACCOUNT_LOADING,
            actions.CURRENT_ACCOUNT_LOADED,
            actions.CURRENT_AUTHOR_LOADING,
            actions.CURRENT_ACCOUNT_ANONYMOUS,
            actions.CURRENT_AUTHOR_FAILED,
            actions.CURRENT_AUTHOR_DETAILS_FAILED
        ];

        await mockActionsStore.dispatch(accountActions.loadCurrentAccount());
        expect(mockActionsStore.getActions()).toHaveDispatchedActions(expectedActions);
    });

    it('should dispatch expected actions if account session expired', async () => {
        mockApi
            .onGet(repositories.routes.CURRENT_ACCOUNT_API().apiUrl)
            .reply(200, accounts.uqexpired);

        const expectedActions = [
            actions.CURRENT_ACCOUNT_LOADING,
            actions.CURRENT_ACCOUNT_ANONYMOUS,
            actions.CURRENT_AUTHOR_FAILED,
            actions.CURRENT_AUTHOR_DETAILS_FAILED
        ];

        await mockActionsStore.dispatch(accountActions.loadCurrentAccount());
        expect(mockActionsStore.getActions()).toHaveDispatchedActions(expectedActions);
    });

    it('should dispatch expected actions if account, author loaded, but author details failed via loadCurrentAccount()', async () => {
        mockApi
            .onGet(repositories.routes.CURRENT_ACCOUNT_API().apiUrl)
            .reply(200, accounts.uqresearcher)
            .onGet(repositories.routes.CURRENT_AUTHOR_API().apiUrl)
            .reply(200, currentAuthor.uqresearcher)
            .onAny()
            .reply(404, {});

        const expectedActions = [
            actions.CURRENT_ACCOUNT_LOADING,
            actions.CURRENT_ACCOUNT_LOADED,
            actions.CURRENT_AUTHOR_LOADING,
            actions.CURRENT_AUTHOR_LOADED,
            actions.CURRENT_AUTHOR_DETAILS_LOADING,
            actions.CURRENT_AUTHOR_DETAILS_FAILED
        ];

        await mockActionsStore.dispatch(accountActions.loadCurrentAccount());
        expect(mockActionsStore.getActions()).toHaveDispatchedActions(expectedActions);
    });

    it('should dispatch expected action when user logs out', () => {
        const expectedActions = [actions.CURRENT_ACCOUNT_ANONYMOUS];
        mockActionsStore.dispatch(accountActions.logout());
        expect(mockActionsStore.getActions()).toHaveDispatchedActions(expectedActions);
    });

});
