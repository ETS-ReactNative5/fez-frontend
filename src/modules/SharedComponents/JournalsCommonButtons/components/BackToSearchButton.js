import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import { pathConfig } from 'config';
const BackToSearchButton = props => {
    const history = useHistory();
    const { prevLocation, ...otherProps } = props;
    const handleReturnToSearchClick = () =>
        prevLocation ? history.replace(prevLocation) : history.push(pathConfig.journals.search);
    return (
        <Button
            variant="contained"
            type="submit"
            color="primary"
            id="return-to-search-results-button"
            data-testid="return-to-search-results-button"
            onClick={handleReturnToSearchClick}
            {...otherProps}
        />
    );
};

BackToSearchButton.propTypes = {
    prevLocation: PropTypes.object,
};

export default React.memo(BackToSearchButton);
