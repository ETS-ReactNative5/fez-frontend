import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const OverrideSecurity = ({ label, input, disabled }) => (
    <FormControlLabel
        control={<Checkbox
            disabled={disabled}
            onChange={input.onChange}
            checked={input.value === 0}
        />}
        {...{ label }}
    />
);

OverrideSecurity.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object,
    disabled: PropTypes.bool,
};

export default React.memo(OverrideSecurity);
