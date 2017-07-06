import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Immutable from 'immutable';

// forms & custom components
import {SearchResults} from 'modules/SearchResults';
import {NoMatchingRecords} from 'modules/NoMatchingRecords';
import {InlineLoader} from 'uqlibrary-react-toolbox';
import {locale} from 'config';
import {showDialogBox} from 'modules/App';

import './ClaimPublication.scss';

export default class ClaimPublication extends React.Component {

    static propTypes = {
        account: PropTypes.object,
        claimPublicationResults: PropTypes.object,
        dispatch: PropTypes.func,
        loadingSearch: PropTypes.bool,
        loadUsersPublications: PropTypes.func,
        markPublicationsNotMine: PropTypes.func
    };

    static defaultProps = {
        searchResultsList: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {account, loadUsersPublications} = this.props;
        loadUsersPublications(account.get('id'));
    }

    extractResultSet = () => {
        const {claimPublicationResults} = this.props;
        const claimPublicationsInformation = locale.pages.claimPublications;
        let resultSet = {};

        // limit the number of results
        if (claimPublicationResults.size > 0 && Immutable.fromJS(claimPublicationResults.get('rows').size > 0)) {
            resultSet = Immutable.fromJS(claimPublicationResults.get('rows'));

            if (resultSet.length > claimPublicationsInformation.maxSearchResults) {
                resultSet = resultSet.slice(0, claimPublicationsInformation.maxSearchResults);
            }
        }

        return resultSet;
    };

    confirmMarkPublicationsNotMine = () => {
        const dialogConfig = locale.pages.claimPublications.claimPublicationResults.dialog.markNotMine;
        const combinedConfig = Object.assign({}, dialogConfig, {primaryHandleFn: this.markPublicationsNotMine});
        this.props.dispatch(showDialogBox(combinedConfig));
    };

    markPublicationsNotMine = () => {
        const {account, markPublicationsNotMine} = this.props;
        const resultSet = this.extractResultSet();

        // retrieve the publication ids
        const pids = resultSet.map(result => {
            return {pid: result.get('rek_pid')};
        });

        markPublicationsNotMine(account.get('id'), pids.toJS());
    };

    render() {
        const claimPublicationsInformation = locale.pages.claimPublications;
        const resultsInformation = claimPublicationsInformation.claimPublicationResults;
        const noRecordsInformation = resultsInformation.noMatchingPublications;
        const noMatchingRecordsInformation = locale.pages.addRecord.noMatchingRecords;
        const {
            account,
            claimPublicationResults,
            loadingSearch
        } = this.props;

        console.log('account', account);

        const resultSet = this.extractResultSet();
        const noOfResults = claimPublicationResults.get('total') ? claimPublicationResults.get('total') : 0;

        const resultsCountText = `${resultSet.size} out of ${noOfResults} potential match(es) displayed. Select any item to claim it as your work.`;
        return (
            <div className="layout-fill">
                <h1 className="page-title display-1">{claimPublicationsInformation.title}</h1>

                {loadingSearch &&
                    <div className="is-centered">
                        <InlineLoader message="Searching for your publications..." />
                    </div>
                }

                {!loadingSearch && noOfResults > 0 &&
                    <div>
                        <SearchResults
                            dataSource={resultSet}
                            title={resultsInformation.title}
                            explanationText={resultsCountText}
                            claimRecordBtnLabel={resultsInformation.claimRecordBtnLabel}
                            help={resultsInformation.help}
                        />
                        <div className="layout-card">
                            <div className="columns">
                                <div className="column is-hidden-mobile" />
                                <div className="column is-narrow-desktop is-12-mobile is-pulled-right">
                                    <RaisedButton
                                        label={claimPublicationsInformation.formButtons.notMineLabel}
                                        secondary
                                        fullWidth
                                        onTouchTap={this.confirmMarkPublicationsNotMine}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {!loadingSearch && noOfResults === 0 &&
                    <NoMatchingRecords
                        title={noRecordsInformation.title}
                        explanationText={noRecordsInformation.explanationText.replace('[username]', account.get('id'))}
                        help={noMatchingRecordsInformation.help}
                    />
                }
            </div>
        );
    }
}

