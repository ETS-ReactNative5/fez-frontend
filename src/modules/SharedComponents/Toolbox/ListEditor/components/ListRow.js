import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ConfirmationBox } from 'modules/SharedComponents/Toolbox/ConfirmDialogBox';
import { useConfirmationState } from 'hooks';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { GenericTemplate } from './GenericTemplate';

const useStyles = makeStyles(() => ({
    center: {
        textAlign: 'center',
    },
    row: {
        marginLeft: 0,
        marginRight: 0,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },
}));

export const ListRow = ({
    canEdit,
    canMoveDown,
    canMoveUp,
    disabled,
    hideReorder,
    index,
    item,
    itemTemplate: ItemTemplate,
    locale,
    onDelete,
    onEdit,
    onMoveDown,
    onMoveUp,
    listRowId,
}) => {
    const classes = useStyles();
    const { moveDownHint, moveUpHint, deleteHint, deleteRecordConfirmation, editHint } = locale;
    const [isOpen, showConfirmation, hideConfirmation] = useConfirmationState();

    const deleteRecord = useCallback(() => {
        !disabled && !!onDelete && onDelete(item, index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const _handleEdit = useCallback(() => {
        !!onEdit && onEdit(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const _handleMoveUp = useCallback(() => {
        !disabled && !!onMoveUp && onMoveUp(item, index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const _handleMoveDown = useCallback(() => {
        !disabled && !!onMoveDown && onMoveDown(item, index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    return (
        <div style={{ flexGrow: 1, padding: 8 }} id={`${listRowId}`} data-testid={`${listRowId}`}>
            <ConfirmationBox
                onAction={deleteRecord}
                onClose={hideConfirmation}
                isOpen={isOpen}
                locale={deleteRecordConfirmation}
                confirmationBoxId={`${listRowId}-delete`}
            />
            <Grid container alignItems="center" spacing={1} className={classes.row}>
                <Grid item xs={hideReorder ? 10 : 5} sm={hideReorder ? 11 : 6} md={hideReorder ? 11 : 9}>
                    <ItemTemplate item={item} />
                </Grid>
                {!hideReorder && (
                    <Grid item xs={5} sm={5} md={2} className={classes.center}>
                        <Grid container justifyContent="flex-end">
                            {canMoveUp && (
                                <Grid item>
                                    <Tooltip title={moveUpHint}>
                                        <span>
                                            <IconButton
                                                onClick={_handleMoveUp}
                                                disabled={disabled}
                                                id={`${listRowId}-move-up`}
                                                data-testid={`${listRowId}-move-up`}
                                            >
                                                <KeyboardArrowUp />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Grid>
                            )}
                            {canMoveDown && (
                                <Grid item>
                                    <Tooltip title={moveDownHint}>
                                        <span>
                                            <IconButton
                                                onClick={_handleMoveDown}
                                                disabled={disabled}
                                                id={`${listRowId}-move-down`}
                                                data-testid={`${listRowId}-move-down`}
                                            >
                                                <KeyboardArrowDown />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Grid>
                            )}
                            {canEdit && (
                                <Tooltip
                                    title={editHint}
                                    disableFocusListener={disabled}
                                    disableHoverListener={disabled}
                                    disableTouchListener={disabled}
                                >
                                    <span>
                                        <IconButton
                                            aria-label={editHint}
                                            onClick={_handleEdit}
                                            disabled={disabled}
                                            id={`${listRowId}-edit`}
                                            data-testid={`${listRowId}-edit`}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            )}
                        </Grid>
                    </Grid>
                )}
                <Grid item xs={2} sm={1} className={classes.center}>
                    <Tooltip title={deleteHint}>
                        <span>
                            <IconButton
                                onClick={showConfirmation}
                                disabled={disabled}
                                id={`${listRowId}-delete`}
                                data-testid={`${listRowId}-delete`}
                            >
                                <Delete />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>
            </Grid>
        </div>
    );
};

ListRow.propTypes = {
    canEdit: PropTypes.bool,
    canMoveDown: PropTypes.bool,
    canMoveUp: PropTypes.bool,
    disabled: PropTypes.bool,
    hideReorder: PropTypes.bool,
    index: PropTypes.number.isRequired,
    item: PropTypes.any.isRequired,
    itemTemplate: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    locale: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onMoveDown: PropTypes.func,
    onMoveUp: PropTypes.func,
    listRowId: PropTypes.string.isRequired,
};

ListRow.defaultProps = {
    locale: {
        moveUpHint: 'Move item up the order',
        moveDownHint: 'Move item down the order',
        deleteHint: 'Remove this item',
        editHint: 'Edit this item',
        deleteRecordConfirmation: {
            confirmationTitle: 'Delete item',
            confirmationMessage: 'Are you sure you want to delete this item?',
            cancelButtonLabel: 'No',
            confirmButtonLabel: 'Yes',
        },
    },
    itemTemplate: GenericTemplate,
    form: 'Form',
};

export default React.memo(ListRow);
