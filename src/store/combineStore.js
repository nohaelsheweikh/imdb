import { combineReducers } from 'redux';
import Login from "./../reducers/Login";
import dashboard from "./Dashboard"
import HealthReport from "./../reducers/HealthReport"
import Trips from "./../reducers/Trips"
import TripsDetails from "./../reducers/TripsDetails"
import Profile from "./../reducers/Profile"
import * as ActionTypes from '../constants/ActionTypes';

export default combineReducers({
    login: Login,
    register: Register,
    dashboard:Dashboard,
    healthReport:HealthReport,
    profile:Profile
})

const rootReducer = (state, action) => {

    if (ActionTypes.LOGOUT) {
      state = undefined;
    }
}