import Immutable from 'immutable';

const initialState = Immutable.fromJS({
});

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default dashboard;
