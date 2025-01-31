import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingButton = props => {
    return (
        <Button {...{ ...props, children: undefined, error: undefined, loading: undefined }}>
            {!props.error && props.loading && <CircularProgress size={16} style={{ marginRight: 8 }} />}
            {props.children}
        </Button>
    );
};

LoadingButton.propTypes = {
    ...Button.propTypes,
    loading: PropTypes.bool,
    error: PropTypes.bool,
};

export default React.memo(LoadingButton);
