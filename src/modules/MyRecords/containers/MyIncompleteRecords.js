import { connect } from 'react-redux';
import { locale } from 'locale';
import MyRecords from '../components/MyRecords';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from 'actions';
import { routes } from 'config';

const mapStateToProps = (state, ownProps) => {
    return {
        accountLoading: state.get('accountReducer').accountLoading,
        ...state.get('accountReducer'),
        ...state.get('publicationsReducer').incomplete,
        localePages: locale.pages.incompletePublications,
        thisUrl: routes.pathConfig.records.incomplete,
        publicationsListCustomActions: [
            {
                label: locale.pages.incompletePublications.publicationsList.complete,
                handleAction: item => ownProps.history.push(routes.pathConfig.records.incompleteFix(item.rek_pid)),
                primary: true,
            },
        ],
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(actions, dispatch),
            loadAuthorPublications: state => dispatch(actions.searchAuthorPublications(state, 'incomplete')),
        },
    };
}

const incompleteResearchContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MyRecords));

export default incompleteResearchContainer;
