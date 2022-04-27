import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { NewGenericSelectField } from 'modules/SharedComponents/GenericSelectField';
import RichEditor from 'modules/SharedComponents/RichEditor/components/RichEditor';
import { Alert } from 'modules/SharedComponents/Toolbox/Alert';
import { SIGNIFICANCE } from 'config/general';

export const handleContributionStatementCallbackFactory = setContributionStatement => {
    const callback = value => setContributionStatement(value);
    return [callback, [setContributionStatement]];
};

export const handleSignificanceCallbackFactory = setSignificance => {
    const callback = value => setSignificance(value);
    return [callback, [setSignificance]];
};

export const resetFormCallbackFactory = (contributionStatementEditor, setSignificance) => {
    const callback = () => {
        setSignificance(null);
        contributionStatementEditor.current.setData(null);
    };
    return [callback, [contributionStatementEditor, setSignificance]];
};

export const addItemCallbackFactory = (disabled, significance, contributionStatement, onAdd, resetForm) => {
    const callback = event => {
        // add item if user hits 'enter' key on input field
        if (disabled || !significance || !contributionStatement || (event && event.key && event.key !== 'Enter')) {
            return;
        }
        // pass on the selected item
        onAdd({ key: significance, value: contributionStatement });
        resetForm();
        // move focus to name as published text field after item was added
    };
    return [callback, [disabled, significance, contributionStatement, onAdd, resetForm]];
};

export const ScaleOfSignificanceForm = ({ disabled, locale, errorText, onAdd, itemSelectedToEdit }) => {
    const [significance, setSignificance] = useState(null);
    const [contributionStatement, setContributionStatement] = useState(null);
    const contributionStatementInput = useRef(null);
    const contributionStatementEditor = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleContributionStatement = useCallback(
        ...handleContributionStatementCallbackFactory(setContributionStatement),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSignificance = useCallback(...handleSignificanceCallbackFactory(setSignificance));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resetForm = useCallback(...resetFormCallbackFactory(contributionStatementEditor, setSignificance));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const addItem = useCallback(
        ...addItemCallbackFactory(disabled, significance, contributionStatement, onAdd, resetForm),
    );

    const {
        significanceInputFieldLabel,
        significanceInputFieldHint,
        contributionStatementInputFieldLabel,
        addButtonLabel,
        updateButtonLabel,
        id,
        authorOrderAlert,
    } = locale;

    // Effect to fill up form fields with the selected item
    React.useEffect(() => {
        if (itemSelectedToEdit?.key && itemSelectedToEdit?.value) {
            setSignificance(itemSelectedToEdit.key);
            handleContributionStatement(itemSelectedToEdit.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemSelectedToEdit?.key, itemSelectedToEdit?.value]);

    return (
        <Grid container spacing={2} display="row" alignItems="center">
            <Grid item xs={12}>
                <Alert {...authorOrderAlert} />
            </Grid>
            <Grid item style={{ flexGrow: 1 }} xs={12}>
                <NewGenericSelectField
                    fullWidth
                    name="key"
                    genericSelectFieldId="rek-significance"
                    label={significanceInputFieldLabel}
                    placeholder={significanceInputFieldHint}
                    onChange={handleSignificance}
                    error={!!errorText}
                    disabled={disabled}
                    value={significance}
                    itemsList={SIGNIFICANCE}
                />
            </Grid>
            <Grid item xs={12}>
                <RichEditor
                    fullWidth
                    richEditorId="rek-creator-contribution-statement"
                    name="value"
                    id={(!!id && id) || ''}
                    onChange={handleContributionStatement}
                    onKeyPress={addItem}
                    error={!!errorText}
                    disabled={disabled}
                    inputRef={contributionStatementInput}
                    instanceRef={contributionStatementEditor}
                    title={contributionStatementInputFieldLabel}
                    titleProps={{
                        variant: 'caption',
                        style: {
                            opacity: 0.666,
                        },
                    }}
                    value={itemSelectedToEdit?.value}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    id="add-update-items"
                    data-testid="rek-significance-add"
                    color="primary"
                    variant="contained"
                    children={itemSelectedToEdit ? updateButtonLabel : addButtonLabel}
                    disabled={disabled}
                    onClick={addItem}
                />
            </Grid>
        </Grid>
    );
};

ScaleOfSignificanceForm.propTypes = {
    onAdd: PropTypes.func.isRequired,
    locale: PropTypes.object,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    itemSelectedToEdit: PropTypes.object,
};

export default React.memo(ScaleOfSignificanceForm);
