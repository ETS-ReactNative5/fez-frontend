import React from 'react';
import {locale, PATHS} from 'config';

/**
 * Pages
 */
import {StandardPage} from 'uqlibrary-react-toolbox';
import {
    App,
    Browse,
    Dashboard,
    Research,
    ClaimPublication,
    ClaimPublicationForm,
    AddRecordPage,
    SearchRecord,
    SearchRecordResults,
    AddNewRecord
} from '../modules';

/**
 * Used for static components
 * @param RoutedComponent
 */
const routedComponent = (RoutedComponent) => (route) => (<RoutedComponent {...route.route}/>);
const routeKey = (path) => (path.replace('/', '').replace(/\//g, '-'));

const route = (path, component, extraProps = {}) => ({
    path: path,
    component: component,
    key: routeKey(path),
    ...extraProps
});

const exactRoute = (path, component, exactProps = {}) => ({
    ...route(path, component, exactProps),
    exact: true
});

const indexRoute = (isAuthorised) => (exactRoute(
    PATHS.index,
    (isAuthorised ? Dashboard : routedComponent(Browse)),
    (isAuthorised ? {} : locale.pages.browse)
));

export default [
    {
        component: App,
        routes: (isAuthorised) => ([
            indexRoute(isAuthorised),
            route(PATHS.browse, routedComponent(Browse), locale.pages.browse),
            route(PATHS.about, routedComponent(StandardPage), locale.pages.about),
            route(PATHS.dashboard, Dashboard),
            route(PATHS.records.mine, Research),
            route(PATHS.records.possible, ClaimPublication),
            route(PATHS.records.claim, ClaimPublicationForm),
            {
                path: PATHS.records.add.index,
                component: AddRecordPage,
                routes: [
                    route(PATHS.records.add.find, SearchRecord),
                    route(PATHS.records.add.searchResults, SearchRecordResults),
                    route(PATHS.records.add.addNew, AddNewRecord)
                ]
            }
        ])
    }
];
