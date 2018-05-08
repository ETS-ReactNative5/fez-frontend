import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import MyLatestPublications from '../components/MyLatestPublications';
import * as actions from 'actions';

const mapStateToProps = (state) => {
    return {
        ...state.get('myLatestPublicationsReducer'),
        accountAuthorDetailsLoading: state.get('accountReducer').accountAuthorDetailsLoading
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

const MyTrendingPublicationsContainer = connect(mapStateToProps, mapDispatchToProps)(MyLatestPublications);

export default withRouter(MyTrendingPublicationsContainer);
