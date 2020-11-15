import * as actionTypes from '../../actions/actionTypes';
import initialState from '../initialState';

export default function addAlertVisibleReducer(state=initialState.addAlertVisible, action) {
    switch (action.type) {
        case actionTypes.SHOW_ADD_ALERT:
            return action.payload;
        default:
            return state;
    }
}