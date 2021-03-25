import React from 'react';
import FavouriteSearch from './FavouriteSearch';
import { render, WithReduxStore, fireEvent, waitFor, act } from 'test-utils';
import * as FavouriteSearchActions from 'actions/favouriteSearch';
import * as repository from 'repositories';

const setup = (testProps = {}) => {
    return render(
        <WithReduxStore>
            <FavouriteSearch {...testProps} />
        </WithReduxStore>,
    );
};

describe('FavouriteSearch', () => {
    beforeEach(() => {
        mockApi.onGet(repository.routes.FAVOURITE_SEARCH_LIST_API().apiUrl).replyOnce(200, {
            data: [
                {
                    fvs_id: 1,
                    fvs_description: 'test',
                    fvs_alias: 'test',
                    fvs_search_parameters: 'test',
                },
                {
                    fvs_id: 2,
                    fvs_description: 'testing',
                    fvs_alias: 'testing',
                    fvs_search_parameters: 'testing',
                },
            ],
        });
        mockApi.onGet(new RegExp(repository.routes.FAVOURITE_SEARCH_LIST_API({ id: '.*' }).apiUrl)).replyOnce(200, {
            data: {
                fvs_id: 2,
                fvs_description: 'testing',
                fvs_alias: 'testing',
                fvs_search_parameters: 'testing',
            },
        });
        mockApi.onPut(new RegExp(repository.routes.FAVOURITE_SEARCH_LIST_API({ id: '.*' }).apiUrl)).replyOnce(200, {
            data: {
                fvs_id: 1,
                fvs_description: 'test',
                fvs_alias: 'test',
                fvs_search_parameters: 'test',
            },
        });
        mockApi
            .onDelete(new RegExp(repository.routes.FAVOURITE_SEARCH_LIST_API({ id: '.*' }).apiUrl))
            .replyOnce(200, { data: {} });

        /**
         * Suppressing below warning message from material-table library
         * Warning: React does not recognize the `scrollWidth` prop on a DOM element. If you intentionally
         * want it to appear in the DOM as a custom attribute, spell it as lowercase `scrollwidth` instead.
         * If you accidentally passed it from a parent component, remove it from the DOM element.
         */
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    afterEach(() => {
        mockApi.reset();
        jest.clearAllMocks();
    });

    it('should render default view', async () => {
        const loadFavouriteSearchListFn = jest.spyOn(FavouriteSearchActions, 'loadFavouriteSearchList');

        const { getByText } = setup({});
        expect(getByText('Loading list of favourite searches')).toBeInTheDocument();
        expect(loadFavouriteSearchListFn).toBeCalled();

        await waitFor(() => getByText('Favourite searches'));
        expect(getByText('Favourite searches')).toBeInTheDocument();

        // Expect table column titles
        expect(getByText('Real link')).toBeInTheDocument();
        expect(getByText('Description')).toBeInTheDocument();
        expect(getByText('Aliased link')).toBeInTheDocument();
        expect(getByText('Alias')).toBeInTheDocument();
    });

    it('should handle row update', async done => {
        const { getByText, getByTestId, getAllByTestId } = setup({});
        const updateFavouriteSearchListItemFn = jest.spyOn(FavouriteSearchActions, 'updateFavouriteSearchListItem');

        await waitFor(() => getByText('Favourite searches'));
        fireEvent.click(getAllByTestId('favourite-search-list-item-edit')[0]);

        act(() => {
            fireEvent.click(getByTestId('favourite-search-list-item-save'));
        });
        expect(updateFavouriteSearchListItemFn).toBeCalled();

        done();
    });

    it('should not update row if alias has found', async () => {
        const { getByText, getByTestId, getAllByTestId } = setup({});

        await waitFor(() => getByText('Favourite searches'));

        fireEvent.click(getAllByTestId('favourite-search-list-item-edit')[0]);

        fireEvent.change(getByTestId('fvs-alias-input'), { target: { value: 'testing' } });

        act(() => {
            fireEvent.click(getByTestId('favourite-search-list-item-save'));
        });
        await waitFor(() => getByTestId('favourite-search-list-item-0'));

        expect(getByTestId('fvs-alias-0')).toHaveTextContent('test');
        expect(getByText('Alias "testing" has been taken')).toBeInTheDocument();
    });

    it('should handle row delete', async done => {
        const { getByText, getByTestId, getAllByTestId } = setup({});
        const deleteFavouriteSearchListItemFn = jest.spyOn(FavouriteSearchActions, 'deleteFavouriteSearchListItem');

        await waitFor(() => getByText('Favourite searches'));
        fireEvent.click(getAllByTestId('favourite-search-list-item-delete')[0]);

        act(() => {
            fireEvent.click(getByTestId('favourite-search-list-item-save'));
        });
        expect(deleteFavouriteSearchListItemFn).toBeCalled();

        done();
    });
});
