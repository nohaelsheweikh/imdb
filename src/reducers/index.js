import { combineReducers } from 'redux';
import Login from "./Login";
import Register from "./Register"
import Dashboard from "./Dashboard"
import HealthReport from "./HealthReport"
import Trips from "./Trips"
import TripsDetails from "./TripsDetails"
import Profile from "./Profile"
import LocationReducer from "./LocationReducer"
import CreateVehicle from "./CreateVehicle"
import ManageVehicle from "./ManageVehicle"
import GetVehicles from "./GetVehicles"
import Notifications from "./Notifications"
import authenticate from "./authenticate";
import NavigationBottom from "./NavigationBottom"
import searchMovies from "./searchMovies"

export default combineReducers({
    login: Login,
    register: Register,
    dashboard:Dashboard,
    healthReport:HealthReport,
    trips:Trips,
    tripsDetails:TripsDetails,
    profile:Profile,
    location:LocationReducer,
    createVehicle:CreateVehicle,
    manageVehicle:ManageVehicle,
    getVehicles:GetVehicles,
    notifications:Notifications, 
    authenticate:authenticate,
    navigationBottom:NavigationBottom,

    searchMovies:searchMovies


})

