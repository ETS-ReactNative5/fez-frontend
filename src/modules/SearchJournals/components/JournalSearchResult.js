import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { Alert } from 'modules/SharedComponents/Toolbox/Alert';
import { InlineLoader } from 'modules/SharedComponents/Toolbox/Loaders';
import { StandardCard } from 'modules/SharedComponents/Toolbox/StandardCard';
import { PublicationsListPaging, PublicationsListSorting } from 'modules/SharedComponents/PublicationsList';

import { JournalsList } from 'modules/SharedComponents/JournalsList';
import locale from 'locale/components';
import JournalSearchFacetsFilter from './JournalSearchFacetsFilter';
import { pathConfig } from 'config/pathConfig';
import { useJournalSearch, useJournalSearchControls, useSelectedJournals } from '../hooks';
import { useHistory, useLocation } from 'react-router';
import { FAQ } from './partials/FAQ';
import { CommonButtons } from 'modules/SharedComponents/JournalsCommonButtons';
import { AddToFavouritesButton } from './partials/AddToFavouritesButton';
import { makeStyles } from '@material-ui/styles';

import { ScrollToPos as ScrollToTop } from 'modules/SharedComponents/Toolbox/ScrollToPos';

export const id = 'journal-search-results';

export const getSearchResultSortingParams = (journalSearchQueryParams, journalsListPerPage, sortingDefaults) => {
    const { sortBy = 'score', sortDirection = 'Desc' } = {
        ...sortingDefaults,
        ...journalSearchQueryParams,
    };
    const pageSize = journalSearchQueryParams?.pageSize
        ? Number(journalSearchQueryParams.pageSize)
        : journalsListPerPage ?? sortingDefaults?.pageSize ?? 20;
    return { sortBy, sortDirection, pageSize };
};

const useStyles = makeStyles(theme => ({
    buttonContainer: {
        [theme.breakpoints.up('md')]: {
            display: 'inline-flex',
        },
    },
}));

export const JournalSearchResult = ({ onSearch, onSearchAll, browseAllJournals = false }) => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const txt = locale.components.searchJournals;

    const journalsListLoading = useSelector(state => state.get('searchJournalsReducer').journalsListLoading);
    const journalsList = useSelector(state => state.get('searchJournalsReducer').journalsList);
    const journalsListLoaded = useSelector(state => state.get('searchJournalsReducer').journalsListLoaded);
    const journalsListError = useSelector(state => state.get('searchJournalsReducer').journalsListError);

    const {
        selectedJournals,
        isAllSelected,
        handleSelectedJournalsChange,
        clearSelectedJournals,
        countSelectedJournals,
        handleToggleSelectAllJournals,
    } = useSelectedJournals({ available: journalsList?.data });
    const { journalSearchQueryParams } = useJournalSearch();
    /* istanbul ignore next */
    const { handleExport, pageSizeChanged, pageChanged, sortByChanged, facetsChanged } = useJournalSearchControls(
        params => {
            onSearch(params);
            clearSelectedJournals();
        },
        journalSearchQueryParams,
        false,
        browseAllJournals,
    );

    const handleJournalsComparisonClick = () =>
        history.push({
            pathname: pathConfig.journals.compare,
            state: {
                prevLocation: location,
                journals: journalsList.data?.filter(journal => journal && selectedJournals[journal.jnl_jid]),
            },
        });

    if (
        !browseAllJournals &&
        !journalsListLoading &&
        (!journalsListLoaded ||
            !journalSearchQueryParams?.keywords ||
            Object.values(journalSearchQueryParams?.keywords).length === 0)
    ) {
        return <div id="journal-search-results-no-keywords" />;
    }

    if (
        !browseAllJournals &&
        journalsListLoaded &&
        !journalsListLoading &&
        (!journalsList || (!!journalsList && journalsList.data.length === 0))
    ) {
        return 'No journals found';
    }

    /* istanbul ignore next */
    const sortingDefaults = locale.components.searchJournals.sortingDefaults ?? {};

    const { sortBy, sortDirection, pageSize } = journalsListLoading
        ? { ...sortingDefaults }
        : getSearchResultSortingParams(
              journalSearchQueryParams,
              // eslint-disable-next-line camelcase
              journalsList?.per_page,
              sortingDefaults,
          );

    return (
        <Grid container spacing={2} id={`${id}-container`} data-testid={`${id}-container`}>
            <Grid item xs sm md={9}>
                <StandardCard noHeader>
                    <Grid container spacing={2}>
                        {!!journalsListLoading && (
                            <Grid item xs={12}>
                                <InlineLoader message={txt.journalSearchResult.loadingMessage} />
                            </Grid>
                        )}
                        {!!journalsListError && (
                            <Grid item xs={12}>
                                <Alert {...journalsListError} />
                            </Grid>
                        )}
                        {!!journalsList && (
                            <>
                                <Grid item xs={12}>
                                    <PublicationsListSorting
                                        canUseExport
                                        exportData={txt.export}
                                        pagingData={journalsList}
                                        sortingData={txt.sorting}
                                        sortBy={sortBy}
                                        sortDirection={sortDirection}
                                        onExportPublications={handleExport}
                                        onSortByChanged={sortByChanged}
                                        onPageSizeChanged={pageSizeChanged}
                                        pageSize={pageSize}
                                        sortingDefaults={sortingDefaults}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PublicationsListPaging
                                        disabled={!journalsListLoaded}
                                        loading={!journalsListLoaded}
                                        pagingData={journalsList}
                                        onPageChanged={pageChanged}
                                        pagingId="search-journals-paging-top"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <JournalsList
                                        journals={journalsList.data}
                                        selected={selectedJournals}
                                        isAllSelected={isAllSelected}
                                        onSelectionChange={handleSelectedJournalsChange}
                                        onToggleSelectAll={handleToggleSelectAllJournals}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PublicationsListPaging
                                        pagingData={journalsList}
                                        onPageChanged={pageChanged}
                                        pagingId="search-journals-paging-bottom"
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                    {!!journalsList && (
                        <Grid style={{ paddingTop: 20 }} item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3} className={classes.buttonContainer}>
                                    <AddToFavouritesButton
                                        disabled={countSelectedJournals() < 1}
                                        clearSelectedJournals={clearSelectedJournals}
                                        selectedJournals={selectedJournals}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} className={classes.buttonContainer}>
                                    <Button
                                        disabled={countSelectedJournals() < 2}
                                        onClick={handleJournalsComparisonClick}
                                        variant="contained"
                                        children={txt.journalSearchInterface.buttons.compareJournals.title}
                                        aria-label={txt.journalSearchInterface.buttons.compareJournals.aria}
                                        color="primary"
                                        id="journal-comparison-button"
                                        data-testid="journal-comparison-button"
                                        fullWidth
                                    />
                                </Grid>
                                <CommonButtons onSearchAll={onSearchAll} browseAllJournals={browseAllJournals} />
                            </Grid>
                        </Grid>
                    )}
                </StandardCard>
            </Grid>
            {!!journalsList && (
                <Grid item xs={12} md={3}>
                    <Hidden smDown>
                        <JournalSearchFacetsFilter
                            key={'journal-search-facets-filter'}
                            facetsData={journalsList.filters?.facets}
                            onFacetsChanged={facetsChanged}
                            disabled={!journalsListLoaded}
                        />
                    </Hidden>
                    <FAQ />
                </Grid>
            )}
            <ScrollToTop selector={'#content-container'} />
        </Grid>
    );
};

JournalSearchResult.propTypes = {
    onSearch: PropTypes.func,
    onSearchAll: PropTypes.func,
    browseAllJournals: PropTypes.bool,
};

export default React.memo(JournalSearchResult);
