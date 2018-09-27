import React, {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import propFilter from '../../helpers/_filterProps';
import {HelpIcon} from '../../HelpDrawer';
import {withStyles} from '@material-ui/core/styles';

const styles = {};

const TextFieldWrapper = props => {
    const filteredProps = propFilter(props, TextField.propTypes);
    // Assign the redux validation error to the MUI input error prop and remove it from the prop payload
    const error = filteredProps.errorText;
    delete filteredProps.errorText;

    return (
        <Fragment>
            <TextField {...filteredProps}
                id={props.label || 'This is a test'}
                helperText={error}
                error={!!error}
                InputLabelProps={filteredProps.floatinglabelfixed ? {shrink: true} : null}
            />
            {props.help && props.help.text && (
                <HelpIcon {...props.help} />
            )}
        </Fragment>
    );
};

TextFieldWrapper.propTypes = {
    ...TextField.propTypes,
    help: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.any,
        buttonLabel: PropTypes.string
    }),
    classes: PropTypes.object
};

export default withStyles(styles, {withTheme: true})(TextFieldWrapper);
