import Immutable from 'immutable';
import {
    ContentIndicatorsField,
    getContentIndicatorsItemsList,
    showContentIndicatorsField,
} from './ContentIndicatorsField';
import {
    CONTENT_INDICATORS_FOR_CONFERENCE_PAPER,
    CONTENT_INDICATORS,
    PUBLICATION_TYPE_CONFERENCE_PAPER,
    PUBLICATION_TYPE_THESIS,
    contentIndicators,
} from 'config/general';

function setup(testProps = {}) {
    const props = {
        ...testProps,
    };

    return getElement(ContentIndicatorsField, props);
}

describe('ContentIndicatorsField component', () => {
    it('should render default view', () => {
        const wrapper = setup();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with given field props', () => {
        const wrapper = setup({
            label: 'Test label',
            placeholder: 'Test placeholder',
            input: {
                value: [454079, 454080],
                onChange: jest.fn(),
            },
            meta: {
                error: 'Test error',
            },
        });
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.setProps({
            input: {
                value: Immutable.List([454079, 454080]),
            },
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should mark existing indicators as disabled', () => {
        const input = {
            meta: {
                initial: Immutable.List([CONTENT_INDICATORS[1].value, CONTENT_INDICATORS[2].value]),
            },
        };
        const expected = CONTENT_INDICATORS.map(item => ({
            ...item,
            disabled: false,
        }));
        expected[1].disabled = true;
        expected[2].disabled = true;
        expect(getContentIndicatorsItemsList(contentIndicators(), input)).toEqual(expected);
    });

    it('should not mark existing indicators as disabled for admins', () => {
        const input = {
            canUnselect: true,
            meta: {
                initial: Immutable.List([CONTENT_INDICATORS[1].value, CONTENT_INDICATORS[2].value]),
            },
        };
        const expected = CONTENT_INDICATORS.map(item => ({
            ...item,
            disabled: false,
        }));
        expected[1].disabled = false;
        expected[2].disabled = false;
        expect(getContentIndicatorsItemsList(contentIndicators(), input)).toEqual(expected);
    });

    it('should mark dropdown as disabled when all indicators have been selected', () => {
        const wrapper = setup({
            meta: {
                initial: Immutable.List(CONTENT_INDICATORS),
            },
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should return content indicators list items', () => {
        const wrapper = setup();
        const actual = wrapper.prop('itemsList');

        expect(actual).toEqual(getContentIndicatorsItemsList(contentIndicators()));
        expect(actual).toEqual(
            expect.arrayContaining(
                CONTENT_INDICATORS.map(item => ({
                    ...item,
                    disabled: false,
                })),
            ),
            expect.not.arrayContaining(
                CONTENT_INDICATORS_FOR_CONFERENCE_PAPER.map(item => ({
                    ...item,
                    disabled: false,
                })),
            ),
        );
    });

    it('should specific should return content indicators list items for conference paper', () => {
        const input = {
            displayType: PUBLICATION_TYPE_CONFERENCE_PAPER,
        };
        const wrapper = setup(input);
        const actual = wrapper.prop('itemsList');

        expect(actual).toEqual(
            getContentIndicatorsItemsList(contentIndicators(PUBLICATION_TYPE_CONFERENCE_PAPER), input),
        );
        expect(actual).toEqual(
            expect.arrayContaining(
                [...CONTENT_INDICATORS, ...CONTENT_INDICATORS_FOR_CONFERENCE_PAPER].map(item => ({
                    ...item,
                    disabled: false,
                })),
            ),
        );
    });

    it('should not mark dropdown as disabled when all indicators have been selected for admins', () => {
        const wrapper = setup({
            meta: {
                initial: Immutable.List(CONTENT_INDICATORS),
            },
            canUnselect: true,
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('should detect whether content indicator field should be shown', () => {
        it('when collection is blacklisted', () => {
            const record = {
                fez_record_search_key_ismemberof: [
                    {
                        rek_ismemberof: 'UQ:152694',
                    },
                ],
                rek_display_type: '',
            };
            expect(showContentIndicatorsField(record)).toBe(false);
        });

        it('when doctype is blacklisted', () => {
            const record = {
                fez_record_search_key_ismemberof: [],
                rek_display_type: PUBLICATION_TYPE_THESIS,
            };
            expect(showContentIndicatorsField(record)).toBe(false);
        });
    });
});
