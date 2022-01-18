import React from 'react';
import NewViewRecord from './NewViewRecord';
import { render, WithRouter, WithReduxStore, act, fireEvent, screen } from 'test-utils';
import * as ViewRecordActions from 'actions/viewRecord';
import mediaQuery from 'css-mediaquery';
import { userIsAdmin, userIsAuthor } from 'hooks';
import { ntro } from 'mock/data/testing/records';
import { default as record } from 'mock/data/records/record';
import { default as recordWithNotes } from 'mock/data/records/recordWithNotes';
// import { default as recordWithAuthorAffiliates } from 'mock/data/records/recordWithAuthorAffiliates';
import { accounts } from 'mock/data/account';
import { useParams } from 'react-router';

jest.mock('../../../hooks');
jest.mock('react-router', () => ({
    useParams: jest.fn(() => ({ pid: 'UQ:123456' })),
    useHistory: jest.fn(() => ({ push: jest.fn() })),
    useLocation: jest.fn(() => ({})),
}));

function createMatchMedia(width) {
    return query => ({
        matches: mediaQuery.match(query, { width }),
        addListener: () => {},
        removeListener: () => {},
    });
}

const setup = (testProps = {}, renderer = render) => {
    const props = {
        account: accounts.uqresearcher,
        author: null,
        hideCulturalSensitivityStatement: true,
        isDeleted: false,
        loadingRecordToView: false,
        recordToViewError: null,
        recordToView: null,
        ...testProps,
    };
    return renderer(
        <WithRouter>
            <WithReduxStore>
                <NewViewRecord {...props} />
            </WithReduxStore>
        </WithRouter>,
    );
};

describe('NewViewRecord', () => {
    beforeAll(() => {
        window.matchMedia = createMatchMedia(window.innerWidth);
    });

    beforeEach(() => {
        userIsAdmin.mockImplementation(() => false);
        userIsAuthor.mockImplementation(() => true);
    });

    it('should render default empty view', () => {
        const { asFragment } = setup({});
        expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <div
                class="empty"
              />
            </DocumentFragment>
        `);
    });

    it('should not render components for empty record', () => {
        const { asFragment } = setup({ recordToView: {} });
        expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <div
                class="empty"
              />
            </DocumentFragment>
        `);
    });

    it('should render default view with admin menu', () => {
        userIsAdmin.mockImplementation(() => true);
        const { getByTestId } = setup({ recordToView: record });
        expect(getByTestId('admin-actions-button')).toBeInTheDocument();
    });

    it('should render deleted record correctly', () => {
        const { getByText } = setup({ isDeleted: true, recordToView: record });
        expect(getByText('This work has been deleted.')).toBeInTheDocument();
        expect(
            getByText(
                'Long-range regulators of the lncRNA HOTAIR enhance its prognostic potential in breast cancer (default record)',
            ),
        ).toBeInTheDocument();
    });

    it('should render loader', () => {
        const { getByText } = setup({ loadingRecordToView: true });
        expect(getByText('Loading work')).toBeInTheDocument();
    });

    it('should render error', () => {
        const { getByText } = setup({ recordToViewError: { message: 'PID not found', status: 403 } });
        expect(getByText('You are not logged in -')).toBeInTheDocument();
        expect(getByText('Login to UQ eSpace for full search results and more services.')).toBeInTheDocument();
    });

    it('should render human readable message record not found', () => {
        const { getByText } = setup({ recordToViewError: { message: 'PID not found', status: 404 } });
        expect(getByText('Work not found')).toBeInTheDocument();
        expect(getByText('(404 - PID not found)')).toBeInTheDocument();
    });

    it('should have status prop in the header for admins', () => {
        userIsAdmin.mockImplementation(() => true);
        const { getByText } = setup({
            recordToView: { ...record, rek_status: 1, rek_status_lookup: 'Unpublished' },
        });
        expect(getByText('Unpublished')).toBeInTheDocument();
    });

    it('should load record to view', () => {
        const loadRecordToViewFn = jest.spyOn(ViewRecordActions, 'loadRecordToView');
        useParams.mockImplementation(() => ({ pid: 'UQ:111111' }));
        setup({});
        expect(loadRecordToViewFn).toHaveBeenCalledWith('UQ:111111');
    });

    it('should reset store when component is unmounted', () => {
        const clearRecordToViewFn = jest.spyOn(ViewRecordActions, 'clearRecordToView');
        const { unmount } = setup({ recordToView: record });
        unmount();
        expect(clearRecordToViewFn).toHaveBeenCalled();
    });

    it('should render NTRO Details', () => {
        const { getAllByText } = setup({
            recordToView: ntro,
            account: {
                canMasquerade: true,
            },
        });
        expect(getAllByText('Scale/Significance of work').length).toBe(2);
    });

    it('should dismiss cultural sensitivity statement alert', () => {
        window.matchMedia = createMatchMedia(2056);
        const setHideCulturalSensitivityStatementFn = jest.spyOn(
            ViewRecordActions,
            'setHideCulturalSensitivityStatement',
        );
        const { getByTestId } = setup({
            recordToView: {
                ...record,
                fez_record_search_key_advisory_statement: { rek_advisory_statement: 'Test advisory statement' },
            },
            hideCulturalSensitivityStatement: false,
        });
        fireEvent.click(getByTestId('dismiss'));
        expect(setHideCulturalSensitivityStatementFn).toHaveBeenCalled();
    });

    it('should rerender component on props change', () => {
        const { getByText, queryByText, rerender } = setup({ loadingRecordToView: true });
        expect(getByText('Loading work')).toBeInTheDocument();

        setup({ loadingRecordToView: false, recordToView: record }, rerender);
        expect(queryByText('Loading work')).not.toBeInTheDocument();
    });

    it('redirects user to login if not Authorized', () => {
        const { location } = window;
        delete window.location;

        const assignFn = jest.fn();
        window.location = {
            assign: assignFn,
        };

        const { getByTestId } = setup({
            recordToViewError: { message: 'Your session has expired', status: 403 },
        });

        fireEvent.click(getByTestId('action-button'));

        expect(assignFn).toHaveBeenCalledWith('https://fez-staging.library.uq.edu.au/login.php?url=dW5kZWZpbmVk');

        window.location = location;
    });
    describe('Admin record drawer', () => {
        it('should not render for researcher', () => {
            const { queryByTestId } = setup({
                recordToView: record,
                account: accounts.uqresearcher,
            });
            expect(queryByTestId('adminViewRecordDrawerDesktop')).not.toBeInTheDocument();
            expect(queryByTestId('adminViewRecordDrawerMobile')).not.toBeInTheDocument();
            expect(queryByTestId('adminDrawerButton')).not.toBeInTheDocument();
        });
        it('should not render for student user', () => {
            const { queryByTestId } = setup({
                recordToView: record,
                account: accounts.s1111111,
            });
            expect(queryByTestId('adminViewRecordDrawerDesktop')).not.toBeInTheDocument();
            expect(queryByTestId('adminViewRecordDrawerMobile')).not.toBeInTheDocument();
            expect(queryByTestId('adminDrawerButton')).not.toBeInTheDocument();
        });
        it('should render for Admin user', () => {
            const { getByTestId } = setup({
                recordToView: record,
                account: accounts.uqstaff,
            });
            expect(getByTestId('adminViewRecordDrawerDesktop')).toBeInTheDocument();
            expect(getByTestId('adminViewRecordDrawerMobile')).toBeInTheDocument();
            expect(getByTestId('adminViewRecordDrawerDesktop')).not.toBeVisible();
            expect(getByTestId('adminViewRecordDrawerMobile')).not.toBeVisible();
        });

        it('should render notes in admin drawer', () => {
            const { getByTestId } = setup({
                recordToView: recordWithNotes,
                account: accounts.uqstaff,
            });
            // screen.debug(undefined, 40000);
            act(() => {
                fireEvent.click(getByTestId('adminDrawerButton'));
            });
            expect(getByTestId('adminViewRecordDrawerDesktop')).toBeVisible();
            expect(getByTestId('drawer-content-scrollable-0-1')).toContain(
                'The tourism industry is a key sector that generates millions of jobs worldwide.',
            );
        });
    });
});
