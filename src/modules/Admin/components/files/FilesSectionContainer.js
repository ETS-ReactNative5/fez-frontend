import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form/immutable';

import { FORM_NAME } from '../../constants';
import { FormValuesContext } from 'context';
import AuthorsSection from './AuthorsSection';

export const FilesSectionContainer = ({ disabled, formValues }) => {
    return (
        <FormValuesContext.Provider value={{ formValues: formValues.toJS() }}>
            <AuthorsSection disabled={disabled} />
        </FormValuesContext.Provider>
    );
};

FilesSectionContainer.propTypes = {
    disabled: PropTypes.bool,
    formValues: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
    const formValues = getFormValues(FORM_NAME)(state) || Immutable.Map({});
    return {
        disabled: ownProps.disabled,
        formValues: formValues.get('filesSection') || Immutable.Map({}),
    };
};

export default connect(mapStateToProps)(React.memo(FilesSectionContainer));
