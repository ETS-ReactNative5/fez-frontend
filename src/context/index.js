import { useContext } from 'react';

import TabbedContext from './createTabbedContext';
import FormValuesContext from './createFormValuesContext';
import RecordContext from './createRecordContext';

export const useTabbedContext = () => useContext(TabbedContext);
export const useFormValuesContext = () => useContext(FormValuesContext);
export const useRecordContext = () => useContext(RecordContext);

// Tabbed context for Admin form view (can be used for any other component)
const TabbedContextProvider = TabbedContext.Provider;
const TabbedContextConsumer = TabbedContext.Consumer;

// form values context to provide formValues to the components deep inside the DOM tree
const FormValuesContextProvider = FormValuesContext.Provider;
const FormValuesContextConsumer = FormValuesContext.Consumer;

// record context to provide formValues to the components deep inside the DOM tree
const RecordContextProvider = RecordContext.Provider;
const RecordContextConsumer = RecordContext.Consumer;


export {
    RecordContext, FormValuesContext,
    TabbedContextProvider, TabbedContextConsumer,
    FormValuesContextProvider, FormValuesContextConsumer,
    RecordContextProvider, RecordContextConsumer,
};
