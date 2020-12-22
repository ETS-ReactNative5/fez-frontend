import React from 'react';
import { connect } from 'react-redux';

import { AutoCompleteAsynchronousField } from 'modules/SharedComponents/Toolbox/AutoSuggestField';
import { ExternalLink } from 'modules/SharedComponents/ExternalLink';
import { JournalTemplate } from 'modules/SharedComponents/LookupFields';

import * as actions from 'actions';

import { APP_URL, PATH_PREFIX } from 'config';
import locale from 'locale/components';

const mapStateToProps = (state, props) => {
    const { itemsList = [], itemsLoading = false } = state.get('journalReducer');
    const selectedItem =
        itemsList.find(item => item.jnl_jid === props.input.value.jnl_jid) ||
        (!!props.input.value && !!props.input.value.toJS && props.input.value.toJS());
    return {
        allowFreeText: false,
        autoCompleteAsynchronousFieldId: props.JournalIdFieldId || 'fez-matched-journals',
        error: props.meta ? !!props.meta.error : null,
        errorText: props.meta ? props.meta.error : null,
        filterOptions: options => options,
        floatingLabelText: props.floatingLabelText || 'Journal Id',
        getOptionLabel: item => String((item || {}).jnl_jid || ''),
        itemsList,
        itemsLoading,
        OptionTemplate: JournalTemplate,
        placeholder: locale.components.JournalIdField.placeholder,
        supplemental: !!selectedItem && (
            <ExternalLink
                id={`journal-${selectedItem.jnl_jid}-details`}
                data-testid={`journal-${selectedItem.jnl_jid}-details`}
                href={`${APP_URL}${PATH_PREFIX}journal/view/${selectedItem.jnl_jid}`}
                title={locale.components.JournalIdField.detailsLink.title}
                rel=""
            >
                {locale.components.JournalIdField.detailsLink.linkText}
            </ExternalLink>
        ),
        ...(!!((props || {}).meta || {}).form
            ? {
                  defaultValue:
                      (!!props.input.value && !!props.input.value.toJS && props.input.value.toJS()) ||
                      (!!props.input.value && props.input.value) ||
                      [],
                  error: !!props.meta.error,
                  errorText: props.meta.error || '',
              }
            : {
                  defaultValue: itemsList.filter(journal => (props.value || []).jnl_jid === journal.jnl_jid),
                  error: props.error,
                  errorText: props.errorText || '',
              }),
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    loadSuggestions: (searchQuery = ' ') => dispatch(actions.loadJournalLookup(searchQuery)),
    onChange: item => props.input.onChange(item),
    onClear: () => props.input.onChange(null),
});

export const JournalIdField = connect(mapStateToProps, mapDispatchToProps)(AutoCompleteAsynchronousField);
