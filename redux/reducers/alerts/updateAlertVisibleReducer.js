import * as actionTypes from '../../actions/actionTypes';
import initialState from '../initialState';

export default function updateAlertVisibleReducer(state=initialState.updateAlertVisible, action){
    switch (action.type) {
        case actionTypes.SHOW_UPDATE_ALERT:
            return action.payload;
        default:
            return state;
    }
}