import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import locale from 'locale/global';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Person from '@material-ui/icons/Person';
import PersonOutlined from '@material-ui/icons/PersonOutlined';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import Lock from '@material-ui/icons/Lock';
import { ContributorRowText } from './ContributorRowText';
import { useWidth, useConfirmationState } from 'hooks';
import { ConfirmationBox } from 'modules/SharedComponents/Toolbox/ConfirmDialogBox';

export const useStyles = makeStyles(theme => ({
    listContainer: {
        padding: '0',
    },
    listItem: {
        borderLeft: '5px solid transparent',
        cursor: 'pointer',
        width: '100%',
        margin: '0',
    },
    disabledListItem: {
        width: '100%',
        margin: '0',
        outline: 'none !important',
        '&:focus': {
            outline: 'none !important',
        },
    },
    highlighted: {
        borderLeft: '5px solid red',
    },
    rowSelected: {
        backgroundColor: (theme.palette.accent || {}).main,
    },
    selected: {
        color: 'white !important',
        fontWeight: theme.typography.fontWeightMedium,
    },
    hideIcon: {
        display: 'none',
    },
    primary: {
        fontSize: theme.typography.body2.fontSize,
    },
    identifierName: {
        fontSize: theme.typography.caption.fontSize,
        marginTop: 8,
    },
    identifierSubtitle: {
        fontSize: theme.typography.caption.fontSize,
    },
}));

export const ContributorRow = ({
    canEdit,
    canMoveDown,
    canMoveUp,
    contributor,
    contributorRowId,
    disabled,
    hideDelete,
    hideReorder,
    index,
    locale: { deleteRecordConfirmation, moveUpHint, moveDownHint, deleteHint, editHint, selectHint, lockedTooltip },
    onSelect,
    onDelete,
    onEdit,
    onMoveDown,
    onMoveUp,
    required,
    enableSelect,
    showRoleInput,
}) => {
    const classes = useStyles();
    const width = useWidth();
    const [isOpen, showConfirmation, hideConfirmation] = useConfirmationState();

    const _onDelete = () => {
        if (!disabled && onDelete) {
            onDelete(contributor, index);
        }
    };

    const _onMoveUp = () => {
        if (!disabled && onMoveUp) {
            onMoveUp(contributor, index);
        }
    };

    const _onMoveDown = () => {
        if (!disabled && onMoveDown) {
            onMoveDown(contributor, index);
        }
    };

    const _select = () => {
        if (!disabled && !!onSelect && enableSelect) {
            onSelect(index);
        }
    };

    const _onSelectKeyboard = event => {
        if (event.key === 'Enter') {
            _select();
        }
    };

    const _onSelect = event => {
        _select();
        event && event.currentTarget.blur();
    };

    const _handleEdit = () => {
        canEdit && !!onEdit && onEdit(index);
    };

    const getRowIcon = () => {
        if (parseInt(contributor.uqIdentifier, 10)) {
            return <HowToRegIcon />;
        } else if (contributor.selected) {
            return <Person />;
        } else if ((disabled || contributor.disabled) && !enableSelect) {
            return lockedTooltip ? (
                <Tooltip title={lockedTooltip}>
                    <Lock />
                </Tooltip>
            ) : (
                <Lock />
            );
        } else {
            return <PersonOutlined />;
        }
    };

    const selectedClass = contributor.selected ? classes.selected : '';

    const ariaLabel =
        (!disabled &&
            `${selectHint.replace('[name]', contributor.nameAsPublished)} ${(required && locale.requiredLabel) ||
                ''}`.trim()) ||
        '';

    return (
        <Fragment>
            <ConfirmationBox
                onAction={_onDelete}
                onClose={hideConfirmation}
                isOpen={isOpen}
                locale={deleteRecordConfirmation}
            />
            <ListItem
                divider
                classes={{
                    root: `${classes.listItem} ${(required && classes.highlighted) || ''} ${(contributor.selected &&
                        classes.rowSelected) ||
                        ''} ${(!contributor.disabled && classes.disabledListItem) || ''}`.trim(),
                }}
                onClick={_onSelect}
                tabIndex={contributor.disabled || disabled ? -1 : 0}
                onKeyDown={!contributor.disabled ? _onSelectKeyboard : () => {}}
                aria-label={ariaLabel}
                id={`${contributorRowId}-${index}`}
            >
                <Hidden xsDown>
                    <ListItemIcon classes={{ root: selectedClass }}>{getRowIcon()}</ListItemIcon>
                </Hidden>
                <ContributorRowText
                    index={index}
                    canEdit={canEdit}
                    contributor={contributor}
                    classes={classes}
                    width={width}
                    showRoleInput={showRoleInput}
                    selectedClass={selectedClass}
                    suffix={locale.suffix}
                    contributorRowId={`${contributorRowId}-${index}`}
                />
                <ListItemSecondaryAction>
                    {canMoveUp && (
                        <Tooltip
                            title={moveUpHint}
                            disableFocusListener={disabled || hideReorder}
                            disableHoverListener={disabled || hideReorder}
                            disableTouchListener={disabled || hideReorder}
                        >
                            <span>
                                <IconButton
                                    id={`${contributorRowId}-move-up-${index}`}
                                    onClick={_onMoveUp}
                                    disabled={disabled || hideReorder}
                                    aria-label={moveUpHint}
                                >
                                    <KeyboardArrowUp classes={{ root: `${selectedClass}` }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}
                    {canMoveDown && (
                        <Tooltip
                            title={moveDownHint}
                            disableFocusListener={disabled || hideReorder}
                            disableHoverListener={disabled || hideReorder}
                            disableTouchListener={disabled || hideReorder}
                        >
                            <span>
                                <IconButton
                                    id={`${contributorRowId}-move-down-${index}`}
                                    onClick={_onMoveDown}
                                    disabled={disabled || hideReorder}
                                    aria-label={moveDownHint}
                                >
                                    <KeyboardArrowDown classes={{ root: `${selectedClass}` }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}
                    {canEdit && (
                        <Tooltip
                            title={editHint}
                            disableFocusListener={disabled || !!contributor.disabled}
                            disableHoverListener={disabled || !!contributor.disabled}
                            disableTouchListener={disabled || !!contributor.disabled}
                        >
                            <span>
                                <IconButton
                                    aria-label={editHint}
                                    onClick={_handleEdit}
                                    disabled={disabled || !!contributor.disabled}
                                    id={`${contributorRowId}-edit-${index}`}
                                >
                                    <Edit classes={{ root: `${selectedClass}` }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}
                    <Tooltip
                        title={deleteHint}
                        disableFocusListener={disabled || hideDelete}
                        disableHoverListener={disabled || hideDelete}
                        disableTouchListener={disabled || hideDelete}
                    >
                        <span>
                            <IconButton
                                aria-label={deleteHint}
                                onClick={showConfirmation}
                                disabled={disabled || hideDelete}
                                id={`${contributorRowId}-delete-${index}`}
                            >
                                <Delete classes={{ root: `${selectedClass}` }} />
                            </IconButton>
                        </span>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        </Fragment>
    );
};

ContributorRow.propTypes = {
    canEdit: PropTypes.bool,
    canMoveDown: PropTypes.bool,
    canMoveUp: PropTypes.bool,
    contributor: PropTypes.object.isRequired,
    contributorRowId: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    hideDelete: PropTypes.bool,
    hideReorder: PropTypes.bool,
    index: PropTypes.number.isRequired,
    locale: PropTypes.object,
    onSelect: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onMoveDown: PropTypes.func,
    onMoveUp: PropTypes.func,
    required: PropTypes.bool,
    enableSelect: PropTypes.bool,
    showRoleInput: PropTypes.bool,
};

ContributorRow.defaultProps = {
    canEdit: false,
    locale: {
        suffix: ' listed contributor',
        moveUpHint: 'Move record up the order',
        moveDownHint: 'Move record down the order',
        deleteHint: 'Remove this record',
        editHint: 'Edit this record',
        selectHint: 'Select this record ([name]) to assign it to you',
        lockedTooltip: 'You are not able to edit this row',
        deleteRecordConfirmation: {
            confirmationTitle: 'Delete record',
            confirmationMessage: 'Are you sure you want to delete this record?',
            cancelButtonLabel: 'No',
            confirmButtonLabel: 'Yes',
        },
    },
    hideReorder: false,
    hideDelete: false,
    required: false,
    enableSelect: false,
};
export default React.memo(ContributorRow);
