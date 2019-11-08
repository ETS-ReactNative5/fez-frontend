import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import FileUploadAccessSelector from './FileUploadAccessSelector';
import FileUploadEmbargoDate from './FileUploadEmbargoDate';
import FileUploadRowStatus from './FileUploadRowStatus';

import * as config from '../config';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Attachment from '@material-ui/icons/Attachment';
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';

export class FileUploadRowMobileView extends PureComponent {
    static propTypes = {
        index: PropTypes.number.isRequired,
        name: PropTypes.string,
        size: PropTypes.string,
        accessConditionId: PropTypes.number,
        embargoDate: PropTypes.string,
        requireOpenAccessStatus: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        locale: PropTypes.object,
        classes: PropTypes.object,
        onDelete: PropTypes.func.isRequired,
        onEmbargoDateChange: PropTypes.func.isRequired,
        onAccessConditionChange: PropTypes.func.isRequired,
        focusOnIndex: PropTypes.number,
        accessConditionLocale: PropTypes.object,
    };

    static defaultProps = {
        locale: {
            filenameColumn: 'File name',
            fileAccessColumn: 'File access',
            embargoDateColumn: 'Embargo date',
            embargoDateClosedAccess: 'No date required',
        },
    };

    render() {
        const { filenameColumn, fileAccessColumn, embargoDateColumn, embargoDateClosedAccess } = this.props.locale;
        const {
            index,
            requireOpenAccessStatus,
            disabled,
            accessConditionId,
            embargoDate,
            name,
            size,
            focusOnIndex,
            classes,
        } = this.props;

        return (
            <List classes={{ root: classes.root }}>
                <ListItem classes={{ root: classes.listItem }}>
                    <ListItemIcon>
                        <Attachment />
                    </ListItemIcon>
                    <ListItemText
                        primary={`${name} (${size})`}
                        secondary={filenameColumn}
                        primaryTypographyProps={{ variant: 'body1', noWrap: true }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                    />
                </ListItem>
                {requireOpenAccessStatus && (
                    <Fragment>
                        <ListItem classes={{ root: classes.listItem }}>
                            <ListItemIcon>
                                <LockOutlined />
                            </ListItemIcon>
                            <ListItemText
                                secondary={fileAccessColumn}
                                secondaryTypographyProps={{ variant: 'caption' }}
                            >
                                <FileUploadAccessSelector
                                    value={accessConditionId}
                                    onChange={this.props.onAccessConditionChange}
                                    disabled={disabled}
                                    ref={`accessConditionSelector${index}`}
                                    autoFocus={index === focusOnIndex}
                                    locale={this.props.accessConditionLocale}
                                />
                            </ListItemText>
                        </ListItem>
                        <ListItem classes={{ root: classes.listItem }}>
                            <ListItemIcon>
                                <CalendarTodayOutlined />
                            </ListItemIcon>
                            <ListItemText
                                secondary={embargoDateColumn}
                                primaryTypographyProps={{ variant: 'body1' }}
                                secondaryTypographyProps={{ variant: 'caption' }}
                            >
                                {requireOpenAccessStatus && accessConditionId !== config.OPEN_ACCESS_ID && (
                                    <Typography variant="body2" gutterBottom>
                                        {embargoDateClosedAccess}
                                    </Typography>
                                )}
                                {requireOpenAccessStatus && accessConditionId === config.OPEN_ACCESS_ID && (
                                    <FileUploadEmbargoDate
                                        value={embargoDate}
                                        onChange={this.props.onEmbargoDateChange}
                                        disabled={disabled}
                                    />
                                )}
                            </ListItemText>
                            <ListItemSecondaryAction classes={{ root: classes.secondaryAction }}>
                                <FileUploadRowStatus
                                    disabled={this.props.disabled}
                                    onDelete={this.props.onDelete}
                                    name={name}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Fragment>
                )}
            </List>
        );
    }
}

const styles = theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.secondary.light}`,
    },
    listItem: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    secondaryAction: {
        textAlign: 'center',
    },
});

export default withStyles(styles)(FileUploadRowMobileView);
