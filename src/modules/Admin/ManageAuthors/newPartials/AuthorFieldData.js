import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TextField } from 'modules/SharedComponents/Toolbox/TextField';
import ColumnTitle from '../partials/ColumnTitle';

export const AuthorFieldData = ({ authorFieldDataId, data, label, helperText, ...props }) => {
    return (
        <React.Fragment>
            <Grid item xs={2}>
                <Grid container justify="flex-end">
                    <Grid item>
                        <ColumnTitle title={label} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={7}>
                <TextField
                    {...props}
                    label={label}
                    textFieldId={authorFieldDataId}
                    fullWidth
                    InputProps={{
                        style: {
                            fontSize: 14,
                            fontWeight: 400,
                        },
                        ...props.InputProps,
                    }}
                    InputLabelProps={{
                        style: {
                            color: '#4085C6',
                            fontWeight: 400,
                        },
                    }}
                    value={data || ''}
                    onChange={e => props.onChange(e.target.name, e.target.value)}
                />
            </Grid>
            <Grid item xs={3}>
                <FormHelperText variant="outlined">{helperText}</FormHelperText>
            </Grid>
        </React.Fragment>
    );
};

AuthorFieldData.propTypes = {
    authorFieldDataId: PropTypes.string,
    data: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.string,
    InputProps: PropTypes.object,
    onChange: PropTypes.func,
};

export default React.memo(AuthorFieldData);
