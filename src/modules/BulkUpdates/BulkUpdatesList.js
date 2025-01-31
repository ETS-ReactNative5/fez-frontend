/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MaterialTable, { MTableBodyRow } from 'material-table';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { tableIcons } from './BulkUpdatesListIcons';

import componentsLocale from 'locale/components';

export const useStyles = makeStyles(() => ({
    text: {
        fontSize: 13,
    },
}));

export const getColumns = classes => {
    const {
        components: { bulkUpdatesList },
    } = componentsLocale;

    const getDateTime = date =>
        !!date
            ? moment
                  .utc(date, 'YYYY-MM-DD HH:mm:ss')
                  .local()
                  .format('YYYY-MM-DD HH:mm:ss')
            : '-';

    return [
        {
            title: bulkUpdatesList.columns.createdAt.title,
            field: 'buj_created_at',
            editable: 'never',
            render: rowData => (
                <Typography data-testid="buj-created-at" id="buj-created-at" className={classes.text}>
                    {getDateTime(rowData.buj_created_at)}
                </Typography>
            ),
        },
        {
            title: bulkUpdatesList.columns.startedAt.title,
            field: 'buj_started_at',
            editable: 'never',
            render: rowData => (
                <Typography data-testid="buj-started-at" id="buj-started-at" className={classes.text}>
                    {getDateTime(rowData.buj_started_at)}
                </Typography>
            ),
        },
        {
            title: bulkUpdatesList.columns.finishedAt.title,
            field: 'buj_finished_at',
            editable: 'never',
            render: rowData => (
                <Typography data-testid="buj-finished-at" id="buj-finished-at" className={classes.text}>
                    {getDateTime(rowData.buj_finished_at)}
                </Typography>
            ),
        },
        {
            title: bulkUpdatesList.columns.user.title,
            field: 'fez_user',
            editable: 'never',
            render: rowData => (
                <Typography data-testid="fez-user-username" id="fez-user-username" className={classes.text}>
                    {rowData.fez_user.usr_username}
                </Typography>
            ),
        },
        {
            title: bulkUpdatesList.columns.name.title,
            field: 'fez_user',
            editable: 'never',
            render: rowData => (
                <Typography data-testid="fez-user-fullname" id="fez-user-fullname" className={classes.text}>
                    {rowData.fez_user.usr_full_name}
                </Typography>
            ),
        },
        {
            title: bulkUpdatesList.columns.status.title,
            field: 'buj_status',
            editable: 'never',
            render: rowData => (
                <Typography data-testid="buj-status" id="buj-status" className={classes.text}>
                    {rowData.buj_status}
                </Typography>
            ),
        },
        {
            title: bulkUpdatesList.columns.failedRecords.title,
            field: 'buj_failed_records',
            editable: 'never',
            render: rowData => (
                <Typography data-testid="buj-failed-records" id="buj-failed-records" className={classes.text}>
                    {rowData.buj_failed_records}
                </Typography>
            ),
        },
        {
            title: bulkUpdatesList.columns.processedCount.title,
            field: 'buj_processed_count',
            editable: 'never',
            render: rowData => (
                <Typography data-testid="buj-processed-count" id="buj-processed-count" className={classes.text}>
                    {rowData.buj_processed_count}
                </Typography>
            ),
        },
        {
            title: bulkUpdatesList.columns.totalCount.title,
            field: 'buj_total_count',
            editable: 'never',
            render: rowData => (
                <Typography data-testid="buj-total-count" id="buj-total-count" className={classes.text}>
                    {rowData.buj_total_count}
                </Typography>
            ),
        },
    ];
};

export const BulkUpdatesList = ({ list }) => {
    const classes = useStyles();
    const {
        components: { bulkUpdatesList },
    } = componentsLocale;

    const materialTableRef = React.createRef();
    const columns = React.createRef();
    columns.current = getColumns(classes);

    const [data] = React.useState(list);

    return (
        <div id="bulk-updates-list" data-testid="bulk-updates-list">
            <MaterialTable
                tableRef={materialTableRef}
                columns={columns.current}
                components={{
                    Container: props => <Paper {...props} style={{ padding: 16 }} />,
                    Row: props => (
                        <MTableBodyRow
                            {...props}
                            className={classes.text}
                            id={`bulk-updates-list-item-${props.index}`}
                            data-testid={`bulk-updates-list-item-${props.index}`}
                        />
                    ),
                }}
                data={data}
                icons={tableIcons}
                title={bulkUpdatesList.tableTitle}
                options={{
                    actionsColumnIndex: -1,
                    grouping: false,
                    draggable: false,
                    paging: false,
                    search: false,
                    toolbar: false,
                }}
            />
        </div>
    );
};

BulkUpdatesList.propTypes = {
    list: PropTypes.array,
};

export default React.memo(BulkUpdatesList);
