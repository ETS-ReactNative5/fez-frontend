import React from 'react';
import Box from '@material-ui/core/Box';
import * as actions from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { pathConfig } from 'config';
import ReactHtmlParser from 'react-html-parser';
import AdminActions from './AdminActions';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import { InlineLoader } from 'modules/SharedComponents/Toolbox/Loaders';
import CommunityCollectionsPaging from './CommunityCollectionsPaging';
import CommunityCollectionsSorting from './CommunityCollectionsSorting';
import Button from '@material-ui/core/Button';
import { communityCollectionsConfig } from 'config';
import Checkbox from '@material-ui/core/Checkbox';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ccBulkActions } from 'config/communityCollections';
// import { debounce } from 'throttle-debounce';
import { useHistory } from 'react-router-dom';

const moment = require('moment');

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    dateCell: {
        minWidth: 120,
    },
    disabledButton: {
        backgroundColor: 'grey',
    },
    enabledButton: {
        backgroundColor: '#51247A',
        '&:hover': {
            backgroundColor: '#71449A',
        },
    },
});

export const CollectionsListEmbedded = ({ title, pid, labels, conf, adminUser, open }) => {
    const history = useHistory();
    const collectionList = useSelector(state => state.get('viewCollectionsReducer').collectionList);
    const collectionListLoading = useSelector(state => state.get('viewCollectionsReducer').loadingCollections);
    const loadingCollectionsPid = useSelector(state => state.get('viewCollectionsReducer').loadingCollectionsPid);

    const collectionsSelected = useSelector(state => state.get('viewCollectionsReducer').collectionsSelected);
    // const collectionsSelectedTitles = useSelector(
    //     state => state.get('viewCollectionsReducer').collectionsSelectedTitles,
    // );

    const dispatch = useDispatch();

    const [sortDirection, setSortDirection] = React.useState('Asc');
    const [sortBy, setSortBy] = React.useState('title');
    // const [collectionsSelected, setCollectionsSelected] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const bulkOpen = Boolean(anchorEl);

    const menuOptions = ccBulkActions.map(action => {
        // const linkTarget = action.inApp ? '_self' : '_blank';
        // const options = action.options || null;
        const url = action.url(pid);
        // const api = action.api(pid);
        const clickHandler = () => {
            // console.log('IS URL', url);
            // if (url) {

            history.push(url);
            // navigateToUrl(url + '&user=uqstaff', '_self', options);

            // } else {
            // dispatch here
            // console.log(api);
            // }
        };

        const label = action.label;
        return {
            label,
            clickHandler,
        };
    });

    React.useEffect(() => {
        /* istanbul ignore else */
        if (open) {
            dispatch(
                actions.loadCCCollectionsList({
                    pid: pid,
                    pageSize: 10,
                    page: 1,
                    direction: 'Asc',
                    sortBy: 'title',
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const classes = useStyles();

    const filteredData = collectionList.filter(obj => obj.parent === pid);
    const finalList = filteredData.length > 0 ? filteredData[0].data : { data: [] };

    const PagingData = {
        from: finalList.from,
        to: finalList.to,
        total: finalList.total,
        per_page: finalList.per_page,
        current_page: finalList.current_page,
    };

    const sortByChanged = (sortby, direction) => {
        setSortDirection(direction);
        setSortBy(sortby);
        dispatch(
            actions.loadCCCollectionsList({
                pid: pid,
                pageSize: PagingData.per_page,
                page: PagingData.current_page,
                direction: direction,
                sortBy: sortby,
            }),
        );
    };

    const pageSizeChanged = pageSize => {
        dispatch(
            actions.loadCCCollectionsList({
                pid: pid,
                pageSize: pageSize,
                page: 1,
                direction: 'Asc',
                sortBy: 'title',
            }),
        );
    };
    const pageChanged = page => {
        dispatch(
            actions.loadCCCollectionsList({
                pid: pid,
                pageSize: PagingData.per_page,
                page: page,
                direction: 'Asc',
                sortBy: 'title',
            }),
        );
    };

    const onSelectRowChange = e => {
        // let selectedArray = [...collectionsSelected];
        // if (selectedArray.indexOf(e.target.value) === -1) {
        //     selectedArray.push(e.target.value);
        // } else {
        //     selectedArray = selectedArray.filter(val => val !== e.target.value);
        // }
        // setCollectionsSelected(selectedArray);
        dispatch(
            actions.setCollectionsSelected({
                parent: pid,
                pid: e.target.value,
                title: e.target.getAttribute('data-title'),
            }),
        );
    };

    const onSelectAllChange = e => {
        if (!e.target.checked) {
            // setCollectionsSelected([]);
            dispatch(actions.setAllCollectionsSelected({ parent: pid, pids: [] }));
        } else {
            const allRecords = [];
            // const allRecordsTitles = [];
            finalList.data.map(record => {
                allRecords.push({ pid: record.rek_pid, title: record.rek_title });
                //    allRecordsTitles.push(record.rek_title);
            });
            // setCollectionsSelected(allRecords);
            dispatch(actions.setAllCollectionsSelected({ parent: pid, pids: allRecords }));
        }
    };
    const encodeLink = pid => {
        return `searchQueryParams${encodeURIComponent('[rek_ismemberof][value][]')}=${encodeURIComponent(
            pid,
        )}&searchMode=advanced&commColl=true`;
    };

    const handleBulkClick = event => {
        setAnchorEl(event.currentTarget);
    };

    /* istanbul ignore next */
    const handleBulkClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {collectionListLoading && loadingCollectionsPid === pid && (
                <div data-testid="collections-page-loading">
                    <InlineLoader loaderId="collections-page-loading" message={conf.loading.message} />
                </div>
            )}
            {loadingCollectionsPid !== pid && (
                <div
                    style={{ backgroundColor: '#eee', padding: 20, boxShadow: 'inset 0px 2px 4px 0px rgba(0,0,0,0.2)' }}
                    data-testid={`collection-records-${pid}`}
                    id={`collection-records-${pid}`}
                >
                    {!!adminUser && (
                        <Button
                            style={{ marginBottom: 10, backgroundColor: '#51247A', color: 'white' }}
                            component={Link}
                            variant="outlined"
                            to={`${pathConfig.admin.collection}?pid=${pid}&name=${title}`}
                            data-test-id="admin-add-community-button"
                        >
                            {communityCollectionsConfig.addNewCollectionText}
                        </Button>
                    )}
                    {finalList.data.length > 0 && (
                        <Collapse in={open} timeout={200} unmountOnExit>
                            <Box style={{ minHeight: 200, backgroundColor: 'white', padding: 10 }}>
                                <Typography variant="caption" style={{ fontWeight: 600 }}>
                                    {`Displaying ${PagingData.from} to ${PagingData.to} of ${PagingData.total} collections for '${title}'`}
                                </Typography>
                                <CommunityCollectionsSorting
                                    data-testid="embedded-collections-sorting-top"
                                    // canUseExport
                                    exportData={conf.export}
                                    pagingData={PagingData}
                                    sortingData={conf.sorting}
                                    sortBy={sortBy}
                                    sortDirection={sortDirection}
                                    // onExportPublications={handleExport}
                                    onSortByChanged={sortByChanged}
                                    onPageSizeChanged={pageSizeChanged}
                                    pageSize={PagingData.per_page}
                                    // sortingDefaults={sortingDefaults}
                                />

                                <CommunityCollectionsPaging
                                    loading={false}
                                    pagingData={PagingData}
                                    onPageChanged={pageChanged}
                                    disabled={false}
                                    pagingId="embedded-collections-paging-top"
                                    data-testid="embedded-collections-paging-top"
                                />
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow data-testid="embedded-collections-primary-header">
                                            {!!adminUser && (
                                                <TableCell>
                                                    <Checkbox
                                                        color="primary"
                                                        indeterminate={
                                                            collectionsSelected.length > 0 &&
                                                            collectionsSelected.length < finalList.data.length
                                                        }
                                                        checked={
                                                            finalList.data.length > 0 &&
                                                            collectionsSelected.length === finalList.data.length
                                                        }
                                                        onChange={onSelectAllChange}
                                                        // inputProps={{
                                                        //     'aria-label': 'select all rows',
                                                        // }}
                                                    />
                                                </TableCell>
                                            )}
                                            <TableCell>{labels.title}</TableCell>
                                            <TableCell className={classes.dateCell} align="right">
                                                {labels.creation_date}
                                            </TableCell>
                                            <TableCell className={classes.dateCell} align="right">
                                                {labels.updated_date}
                                            </TableCell>
                                            <TableCell className={classes.dateCell} align="right">
                                                Explore
                                            </TableCell>
                                            {!!adminUser && <TableCell align="right">{labels.actions}</TableCell>}
                                        </TableRow>
                                    </TableHead>

                                    <TableBody data-testid="embedded-collections-primary-body">
                                        {finalList.data.map(row => (
                                            <TableRow key={row.rek_pid} data-testid={`row-${row.rek_pid}`}>
                                                {!!adminUser && (
                                                    <TableCell>
                                                        <Checkbox
                                                            color="primary"
                                                            value={row.rek_pid}
                                                            // indeterminate={
                                                            //     communitiesSelected.length > 0 &&
                                                            //     communitiesSelected.length < records.length
                                                            // } findIndex(object => object.pid === action.payload.pid)
                                                            // >= 0)
                                                            checked={
                                                                collectionsSelected.findIndex(
                                                                    object => row.rek_pid === object.pid,
                                                                ) >= 0
                                                            }
                                                            onChange={onSelectRowChange}
                                                            inputProps={{
                                                                'aria-label': 'select all rows',
                                                                'data-title': row.rek_title,
                                                            }}
                                                        />
                                                    </TableCell>
                                                )}
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        <Link to={pathConfig.records.view(row.rek_pid)}>
                                                            {ReactHtmlParser(row.rek_title)}
                                                        </Link>
                                                    </Typography>
                                                    {!!row.rek_description && (
                                                        <Typography variant="caption">{row.rek_description}</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell align="right" className={classes.dateCell}>
                                                    {moment(row.rek_created_date)
                                                        .local()
                                                        .format(conf.dateFormat)}
                                                </TableCell>
                                                <TableCell align="right" className={classes.dateCell}>
                                                    {moment(row.rek_updated_date)
                                                        .local()
                                                        .format(conf.dateFormat)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Link to={`/records/search?${encodeLink(row.rek_pid)}`}>View</Link>
                                                </TableCell>
                                                {!!adminUser && (
                                                    <TableCell align="right">
                                                        <AdminActions record={row.rek_pid} />
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <CommunityCollectionsPaging
                                    loading={false}
                                    pagingData={PagingData}
                                    onPageChanged={pageChanged}
                                    disabled={false}
                                    pagingId="embedded-collections-paging-bottom"
                                    data-testid="embedded-collections-paging-bottom"
                                />
                                {/* This is where the bulk actions button will go */}
                            </Box>
                            {!!adminUser && (
                                <React.Fragment>
                                    <Button
                                        id={`bulk-actions-button-${pid}`}
                                        style={{ marginTop: 10, color: 'white' }}
                                        // aria-controls={open ? 'demo-customized-menu' : undefined}
                                        // aria-haspopup="true"
                                        // aria-expanded={open ? 'true' : undefined}
                                        variant="contained"
                                        disableElevation
                                        disabled={!!collectionsSelected?.length < 1}
                                        onClick={handleBulkClick}
                                        classes={{
                                            root: classes.enabledButton,
                                            disabled: classes.disabledButton,
                                        }}
                                        endIcon={<KeyboardArrowDownIcon />}
                                    >
                                        {conf.bulkActionsText}
                                    </Button>
                                    <Menu
                                        id="admin-actions-menu"
                                        anchorEl={anchorEl}
                                        open={bulkOpen}
                                        onClose={handleBulkClose}
                                    >
                                        {menuOptions.map((option, index) => (
                                            <MenuItem
                                                key={index}
                                                onClick={() => {
                                                    setAnchorEl(false);
                                                    option.clickHandler();
                                                }}
                                                onContextMenu={() => {
                                                    setAnchorEl(false);
                                                    option.clickHandler(true);
                                                }}
                                                onAuxClick={() => {
                                                    setAnchorEl(false);
                                                    option.clickHandler(true);
                                                }}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </React.Fragment>
                            )}
                        </Collapse>
                    )}
                    {!finalList.data.length > 0 && (
                        <div>
                            <Typography variant="caption">{conf.loading.noCollections}</Typography>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
CollectionsListEmbedded.propTypes = {
    title: PropTypes.string,
    records: PropTypes.array,
    labels: PropTypes.object,
    conf: PropTypes.object,
    adminUser: PropTypes.bool,
    pid: PropTypes.string,
    open: PropTypes.bool,
};
export default CollectionsListEmbedded;
