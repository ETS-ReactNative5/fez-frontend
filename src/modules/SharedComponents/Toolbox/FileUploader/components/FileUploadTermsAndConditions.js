import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export class FileUploadTermsAndConditions extends PureComponent {
    static propTypes = {
        isTermsAndConditionsAccepted: PropTypes.bool,
        onAcceptTermsAndConditions: PropTypes.func,
        classes: PropTypes.object,
        accessTermsAndConditions: PropTypes.string,
        disabled: PropTypes.bool,
    };

    _handleChange = (event) => {
        this.props.onAcceptTermsAndConditions(event.target.checked);
    };

    render() {
        const { isTermsAndConditionsAccepted, classes, accessTermsAndConditions, disabled } = this.props;

        return (
            <FormControlLabel
                classes={{
                    root: classes.root,
                }}
                disabled={disabled}
                control={
                    <Checkbox
                        checked={isTermsAndConditionsAccepted}
                        onChange={this._handleChange}
                        classes={{ root: classes.checkboxRoot, checked: classes.checkboxChecked }}
                    />
                }
                label={
                    <Typography
                        classes={{
                            root: classes.label,
                        }}
                        color={!isTermsAndConditionsAccepted ? 'error' : 'secondary'}
                    >
                        {accessTermsAndConditions}
                    </Typography>
                }
            />
        );
    }
}

const styles = (theme) => ({
    root: {
        alignItems: 'flex-start',
        margin: 0,
    },
    label: {
        textAlign: 'justify',
        fontSize: 16,
        fontWeight: 300,
        lineHeight: '24px',
        paddingTop: 10,
    },
    checkboxRoot: {
        color: (theme.status || {}).danger,
    },
    checkboxChecked: {
        color: `${theme.palette.primary.main} !important`,
    },
});

export default withStyles(styles)(FileUploadTermsAndConditions);
