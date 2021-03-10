/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { MTableAction, MTableBodyRow, MTableEditRow } from 'material-table';

import { tableIcons } from './ManageAuthorsListIcons';
import Button from '@material-ui/core/Button';
import ColumnTitle from './partials/ColumnTitle';
import ColumnData from './partials/ColumnData';
import NameColumnData from './partials/NameColumnData';
import UsernameIdColumnData from './partials/UsernameIdColumnData';
import ResearcherIdentifierColumnData from './partials/ResearcherIdentifierColumnData';

import { default as locale } from 'locale/components';
import { EditableContext } from 'context';

export const getColumns = () => {
    const {
        header: {
            columns: { id },
        },
    } = locale.components.manageAuthors;
    return [
        {
            title: <ColumnTitle title={id.title} />,
            field: 'aut_id',
            render: rowData => <ColumnData data={rowData.aut_id} columnDataId={`aut-id-${rowData.tableData.id}`} />,
            cellStyle: {
                width: '6%',
                maxWidth: '6%',
            },
            headerStyle: {
                width: '6%',
                maxWidth: '6%',
            },
        },
        {
            title: <ColumnTitle title="Name" />,
            field: 'name',
            render: rowData => <NameColumnData rowData={rowData} key="viewable-name-column-data" />,
            editComponent: ({ onRowDataChange, rowData, ...props }) => {
                const handleChange = e => {
                    onRowDataChange({
                        ...rowData,
                        [e.target.name]: e.target.value,
                    });
                };
                return (
                    <EditableContext.Provider value={{ editable: true }}>
                        <NameColumnData
                            {...props}
                            rowData={rowData}
                            onChange={handleChange}
                            key="editable-name-column-data"
                        />
                    </EditableContext.Provider>
                );
            },
            cellStyle: {
                width: '30%',
                maxWidth: '30%',
            },
            headerStyle: {
                width: '30%',
                maxWidth: '30%',
            },
        },
        {
            title: <ColumnTitle title="Username & IDs" />,
            field: 'identifiers-usernames',
            render: rowData => (
                <UsernameIdColumnData rowData={rowData} key="viewable-identifiers-usernames-column-data" />
            ),
            editComponent: ({ onRowDataChange, rowData, ...props }) => {
                const handleChange = e => {
                    onRowDataChange({
                        ...rowData,
                        [e.target.name]: e.target.value,
                    });
                };
                return (
                    <EditableContext.Provider value={{ editable: true }}>
                        <UsernameIdColumnData
                            {...props}
                            rowData={rowData}
                            onChange={handleChange}
                            key="editable-identifiers-usernames-column-data"
                        />
                    </EditableContext.Provider>
                );
            },
            cellStyle: {
                width: '25%',
                maxWidth: '25%',
            },
            headerStyle: {
                width: '25%',
                maxWidth: '25%',
            },
        },

        {
            title: <ColumnTitle title="Researcher Identifiers" />,
            field: 'researcher-identifiers',
            render: rowData => (
                <ResearcherIdentifierColumnData rowData={rowData} key="viewable-researcher-identifiers-column-data" />
            ),
            editComponent: ({ onRowDataChange, rowData, ...props }) => {
                const handleChange = e => {
                    onRowDataChange({
                        ...rowData,
                        [e.target.name]: e.target.value,
                    });
                };
                return (
                    <EditableContext.Provider value={{ editable: true }}>
                        <ResearcherIdentifierColumnData
                            {...props}
                            rowData={rowData}
                            onChange={handleChange}
                            key="editable-researcher-identifiers-column-data"
                        />
                    </EditableContext.Provider>
                );
            },
        },
        // {
        //     title: <ColumnTitle title={notes.title} />,
        //     field: 'aut_description',
        //     render: rowData => (
        //         <ColumnData columnDataId={`aut-discription-${rowData.tableData.id}`}
        // data={rowData.aut_description} />
        //     ),
        //     cellStyle: {
        //         width: '12%',
        //         maxWidth: '12%',
        //     },
        //     headerStyle: {
        //         width: '12%',
        //         maxWidth: '12%',
        //     },
        // },
        // {
        //     title: <ColumnTitle title={createdDate.title} />,
        //     field: 'aut_created_date',
        //     render: rowData => (
        //         <ColumnData data={rowData.aut_created_date}
        // columnDataId={`aut-created-date-${rowData.tableData.id}`} />
        //     ),
        //     cellStyle: {
        //         width: '10%',
        //         maxWidth: '10%',
        //     },
        //     headerStyle: {
        //         width: '10%',
        //         maxWidth: '10%',
        //     },
        // },
    ];
};

export const ManageAuthorsList = ({
    disabled,
    onChangePage,
    onRowAdd,
    onRowDelete,
    onRowUpdate,
    list,
    page,
    totalCount,
}) => {
    const materialTableRef = React.createRef();
    const columns = React.createRef();
    columns.current = getColumns();

    const {
        form: {
            locale: { addButtonTooltip, editButtonTooltip, deleteButtonTooltip },
        },
    } = locale.components.manageAuthors;

    const [data, setData] = React.useState(list);

    return (
        <MaterialTable
            tableRef={materialTableRef}
            columns={columns.current}
            components={{
                Container: props => <div {...props} id="authors-list" data-testid="authors-list" />,
                Row: props => (
                    <MTableBodyRow
                        {...props}
                        id={`authors-list-row-${props.index}`}
                        data-testid={`authors-list-row-${props.index}`}
                    />
                ),
                EditRow: props => (
                    <MTableEditRow
                        {...props}
                        id={`authors-list-edit-row-${props.index}`}
                        data-testid={`authors-list-edit-row-${props.index}`}
                    />
                ),
                Action: props => {
                    if (
                        typeof props.action !== 'function' &&
                        !props.action.action &&
                        props.action.position !== 'toolbar'
                    ) {
                        //  Save or Cancel actions for Add/Edit/Delete actions
                        const { icon: Icon, tooltip, ...restAction } = props.action;
                        return (
                            <MTableAction
                                {...props}
                                action={{
                                    ...restAction,
                                    icon: () => (
                                        <Icon
                                            id={`authors-${(!!props.data.tableData && props.data.tableData.editing) ||
                                                'add'}-${tooltip.toLowerCase().replace(/ /g, '-')}`}
                                            data-testid={`authors-${(!!props.data.tableData &&
                                                props.data.tableData.editing) ||
                                                'add'}-${tooltip.toLowerCase().replace(/ /g, '-')}`}
                                        />
                                    ),
                                }}
                            />
                        );
                    } else if (typeof props.action === 'function') {
                        const { icon: Icon, tooltip, ...restAction } = props.action(props.data);
                        return (
                            <MTableAction
                                {...props}
                                action={{
                                    ...restAction,
                                    tooltip,
                                    icon: () => (
                                        <Icon
                                            disabled={disabled}
                                            id={`authors-list-row-${
                                                props.data.tableData.id
                                            }-${tooltip.toLowerCase().replace(/ /g, '-')}`}
                                            data-testid={`authors-list-row-${
                                                props.data.tableData.id
                                            }-${tooltip.toLowerCase().replace(/ /g, '-')}`}
                                        />
                                    ),
                                }}
                            />
                        );
                    } else {
                        //  Add action
                        const { tooltip } = props.action;
                        return (
                            <Button
                                id={`authors-${tooltip.toLowerCase().replace(/ /g, '-')}`}
                                data-testid={`authors-${tooltip.toLowerCase().replace(/ /g, '-')}`}
                                disabled={props.disabled}
                                variant="contained"
                                color="primary"
                                children={tooltip}
                                onClick={event => props.action.onClick(event, props.data)}
                            />
                        );
                    }
                },
            }}
            data={data}
            page={page}
            totalCount={totalCount}
            icons={tableIcons}
            title=""
            onChangePage={onChangePage}
            localization={{
                body: {
                    addTooltip: addButtonTooltip,
                    editTooltip: editButtonTooltip,
                    deleteTooltip: deleteButtonTooltip,
                },
            }}
            editable={{
                onRowUpdateCancelled: () => {},
                onRowAdd: newData => {
                    return onRowAdd(newData)
                        .then(data => {
                            setData(prevState => {
                                return [...prevState, data];
                            });
                        })
                        .catch(() => setData(prevState => prevState));
                },
                onRowUpdate: (newData, oldData) => {
                    return onRowUpdate(newData, oldData)
                        .then(data => {
                            setData(prevState => {
                                const list = [...prevState];
                                list[list.indexOf(oldData)] = data;
                                return list;
                            });
                        })
                        .catch(() => setData(prevState => prevState));
                },
                onRowDelete: oldData => {
                    return onRowDelete(oldData).then(() => {
                        setData(prevState => {
                            const data = [...prevState];
                            data.splice(data.indexOf(oldData), 1);
                            return data;
                        });
                    });
                },
            }}
            options={{
                actionsColumnIndex: -1,
                addRowPosition: 'first',
                grouping: false,
                draggable: false,
                search: data.length > 10,
                emptyRowsWhenPaging: true,
                // ...(data.length > 10 ? { maxBodyHeight: 550 } : {}),
                ...(data.length > 10 ? { paging: true } : { paging: false }),
                pageSize: 20,
                pageSizeOptions: [5, 50, 100, 200, 500],
                padding: 'dense',
                overflowY: list.length > 10 ? 'auto' : 'hidden',

                rowStyle: () => ({
                    borderTop: '1px solid',
                }),
            }}
        />
    );
};

ManageAuthorsList.propTypes = {
    disabled: PropTypes.bool,
    onChangePage: PropTypes.func,
    onRowAdd: PropTypes.func,
    onRowUpdate: PropTypes.func,
    onRowDelete: PropTypes.func,
    list: PropTypes.array,
    page: PropTypes.number,
    totalCount: PropTypes.number,
};

export default React.memo(ManageAuthorsList);
