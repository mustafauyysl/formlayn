import * as actionTypes from '../../actions/actionTypes';
import initialState from '../initialState';

export default function selectUserReducer(state=initialState.selectedUser, action) {
    switch (action.type) {
        case actionTypes.SELECT_USER:
            return action.payload;
        default:
            return state;
    } 
}