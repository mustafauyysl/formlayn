import {combineReducers} from 'redux';
import usersListReducer from './users/usersListReducer';
import addAlertVisibleReducer from './alerts/addAlertVisibleReducer';
import selectUserReducer from './users/selectUserReducer';
import updateAlertVisibleReducer from './alerts/updateAlertVisibleReducer';

const rootReducer = combineReducers({
    usersListReducer,
    addAlertVisibleReducer,
    updateAlertVisibleReducer,
    selectUserReducer,
});

export default rootReducer;