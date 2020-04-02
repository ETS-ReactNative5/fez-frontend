import React from 'react';
import Async from 'modules/SharedComponents/Async';

// lazy loaded components
export const FixRecord = React.lazy(() => import('modules/FixRecord/containers/FixRecord'));
export const ClaimRecord = React.lazy(() => import('modules/ClaimRecord/containers/ClaimRecord'));
export const PossiblyMyRecords = React.lazy(() => import('modules/PossiblyMyRecords/containers/PossiblyMyRecords'));
export const MyIncompleteRecord = React.lazy(() => import('modules/MyIncompleteRecords/containers/MyIncompleteRecord'));
export const Dashboard = React.lazy(() => import('modules/Dashboard/containers/Dashboard'));
export const Orcid = React.lazy(() => import('modules/AuthorIdentifiers/containers/Orcid'));
export const GoogleScholar = React.lazy(() => import('modules/AuthorIdentifiers/containers/GoogleScholar'));
export const ThesisSubmission = React.lazy(() => import('modules/ThesisSubmission/containers/ThesisSubmission'));
export const SbsSubmission = React.lazy(() => import('modules/SbsSubmission/containers/SbsSubmission'));
export const ViewRecord = React.lazy(() => import('modules/ViewRecord/containers/ViewRecord'));
export const AddDataCollection = React.lazy(() => import('modules/AddDataCollection/containers/AddDataCollection'));
export const CollectionForm = () => <Async load={import('modules/Admin/CollectionForm/containers/CollectionForm')} />;
export const CommunityForm = () => <Async load={import('modules/Admin/CommunityForm/containers/CommunityForm')} />;
export const ThirdPartyLookupTool = () => (
    <Async load={import('modules/ThirdPartyLookupTool/containers/ThirdPartyLookupTool')} />
);
export const BatchImport = () => <Async load={import('modules/BatchImport/containers/BatchImport')} />;
export const Prototype = () => <Async load={import('modules/Admin/containers/Admin')} />;
export const Admin = componentProps => (
    <Async load={import('modules/Admin/containers/Admin')} componentProps={componentProps} />
);

// always load components
export { AddMissingRecord, FindRecords, RecordsSearchResults, NewRecord } from 'modules/AddMissingRecord';
export { Index } from 'modules/Index';
export { Masquerade } from 'modules/Masquerade';
export { StandardPage } from 'modules/SharedComponents/Toolbox/StandardPage';
export { SearchRecords } from 'modules/SearchRecords';
export { MyRecords, MyDataCollections, MyIncompleteRecords } from 'modules/MyRecords';
