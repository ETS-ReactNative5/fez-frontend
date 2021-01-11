import React from 'react';
import NewListEditorField from './NewListEditorField';
import { List } from 'immutable';
import { render, AllTheProviders } from 'test-utils';

describe('NewListEditorField component', () => {
    it('should render new list editor component with the given array', () => {
        const props = {
            meta: {
                error: 'test1',
            },
            input: {
                onChange: jest.fn(),
                value: [
                    { rek_keywords: 'test', rek_keywords_order: 1 },
                    { rek_keywords: 'testing', rek_keywords_order: 2 },
                ],
            },
            remindToAdd: 'test2',
            maxInputLength: 100,
            searchKey: {
                value: 'rek_keywords',
                order: 'rek_keywords_order',
            },
            listEditorId: 'test',
        };
        const { asFragment } = render(
            <AllTheProviders>
                <NewListEditorField {...props} />
            </AllTheProviders>,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render new list editor component with the given List', () => {
        const props = {
            meta: {
                error: 'test1',
            },
            input: {
                onChange: jest.fn(),
                value: new List([
                    { rek_keywords: 'test', rek_keywords_order: 1 },
                    { rek_keywords: 'testing', rek_keywords_order: 2 },
                ]),
            },
            remindToAdd: 'test2',
            maxInputLength: 100,
            searchKey: {
                value: 'rek_keywords',
                order: 'rek_keywords_order',
            },
            listEditorId: 'test',
        };
        const { asFragment } = render(
            <AllTheProviders>
                <NewListEditorField {...props} />
            </AllTheProviders>,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render new list editor component without any list items', () => {
        const props = {
            meta: {
                error: 'test1',
            },
            input: {
                onChange: jest.fn(),
            },
            remindToAdd: 'test2',
            maxInputLength: 100,
            searchKey: {
                value: 'rek_keywords',
                order: 'rek_keywords_order',
            },
            listEditorId: 'test',
        };
        const { asFragment } = render(
            <AllTheProviders>
                <NewListEditorField {...props} />
            </AllTheProviders>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
