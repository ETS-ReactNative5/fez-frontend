import {NewsFeed} from './NewsFeed';

function setup(testProps, isShallow = true){
    const props = {
        classes: {},
        actions: {
            loadNewsFeed: jest.fn()
        },
        loadingNewsFeedList: false,
        newsFeedList: [
            {
                'nws_usr_id': 1,
                'nws_created_date': '2006-12-15 02:59:07',
                'nws_updated_date': '2018-12-15 02:59:07',
                'nws_title': 'Outage',
                'nws_status': 'active',
                'nws_message': 'There will be a 30 minute outage from 12:00-12:30pm on Wednesday 22/8/17 to upgrade the eSpace database. Apologies for this inconvenience.',
                'nws_admin_only': 0
            },
            {
                'nws_usr_id': 1,
                'nws_created_date': '2006-12-15 02:59:07',
                'nws_updated_date': '2017-12-15 02:59:07',
                'nws_title': 'Statistics',
                'nws_status': 'active',
                'nws_message': 'The file download and page view statistics for publications in eSpace currently may not be accurate and are being reviewed by our development team. Until this issue is resolved eSpace statistics should not be considered reliable.',
                'nws_admin_only': 0
            },
            {
                'nws_usr_id': 1,
                'nws_created_date': '2006-12-15 02:59:07',
                'nws_updated_date': '2016-12-15 02:59:07',
                'nws_title': 'PREFS - Account Preferences',
                'nws_status': 'active',
                'nws_message': 'When you set \'Remember search parameters\' to \'Yes\' via the PREFS tab, date filters applied to searches will now be remembered between searches',
                'nws_admin_only': 0
            },
        ],
        ...testProps
    };
    return getElement(NewsFeed, props, isShallow);
}

describe('Component NewsFeed', () => {
    it('should not render anything while loading', () => {
        const wrapper = setup({loadingNewsFeedList: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not render anything if there are no news', () => {
        const wrapper = setup({newsFeedList: []});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render news feed', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it.skip('should call action to load news feed', () => {
        const loadFn = jest.fn();
        const wrapper = setup({actions: { loadNewsFeed: loadFn}});
        wrapper.instance().componentDidMount();
        expect(loadFn).toHaveBeenCalled();
    });
});
