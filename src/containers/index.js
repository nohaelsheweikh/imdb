import React, { Component } from 'react';
import { Router, Scene } from "react-native-router-flux";
import { connect } from "react-redux";
import { Text,AsyncStorage } from "react-native";
import Loader from './../components/Loader';
// import AsyncStorage from '@react-native-community/async-storage';

// import Login from './../scenes/Login';
// import Main from '../scenes/Main';

import SignUp from './../screens/00_SignUp_Page/SignUp';
import Login from './../screens/00_LoginPage/Login';
import Main from './../screens/01_MainPage/Main';
import HealthReport from './../screens/02_HealthReport_Page/HealthReport'
import Settings from './../screens/05_SettingsPage/Settings'
import Profile from './../screens/05_SettingsPage/Profile';
import TripsList from './../screens/03_TripsListPage/TripsList'
import TripsDetails from './../screens/04_TripsDetailsPage/TripsDetails'
import Test from './../screens/test'
import CreateVehicle from './../screens/00_CreateVehiclePage/CreateVehicle'
import ManageVehicle from './../screens/05_SettingsPage/ManageVehicle'
import Notifications from './../screens/Notifications/Notifications'
import VehiclesList from './../screens/05_SettingsPage/Vehicles/VehiclesList'

const RouterWithRedux = connect()(Router);

class Root extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: null,
            isStorageLoaded: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
            this.setState({
                token: token !== null,
                isStorageLoaded: true
            })
        });
    }

    render(){
        let { isLogged } = this.props.login;
        let { token, isStorageLoaded } = this.state;
        if(!isStorageLoaded){
            return (
                <Loader loading={true} />
            )
        }else{
            return(
                <RouterWithRedux>
                    <Scene key='root'>
                        <Scene
                            component={Login}
                            initial={!token}
                            hideNavBar={true}
                            key='Login'
                            title='Login'
                        />
                        <Scene
                            component={Main}
                            initial={token}
                            hideNavBar={false}
                            key='Main'
                            title='Main'
                        />
                       
                       <Scene
                            component={HealthReport}
                            hideNavBar={false}
                            key='HealthReport'
                            title='CarHealthReport'
                        />
                        <Scene
                            component={TripsList}
                            hideNavBar={false}
                            key='TripsList'
                            title='TripsList'
                        />
                        <Scene
                            component={TripsDetails}
                            hideNavBar={false}
                            key='TripsDetails'
                            title='TripsDetails'
                        />
                  
                        
                        <Scene
                            component={Settings}
                            hideNavBar={false}
                            key='Settings'
                            title='Settings'
                        />
                         <Scene
                            component={Profile}
                            hideNavBar={false}
                            key='Profile'
                            title='Profile'
                        />
                        <Scene
                            component={ManageVehicle}
                            hideNavBar={false}
                            key='ManageVehicle'
                            title='ManageVehicle'
                        />
                        <Scene
                            component={Notifications}
                            hideNavBar={false}
                            key='Notifications'
                            title='Notifications'
                        />
                         <Scene
                            component={SignUp}
                            hideNavBar={true}
                            key='SignUp'
                            title='SignUp'
                            />
                        <Scene
                            component={CreateVehicle}
                            hideNavBar={false}
                            key='CreateVehicle'
                            title='CreateVehicle'
                        />
                        <Scene
                            component={VehiclesList}
                            hideNavBar={false}
                            key='VehiclesList'
                            title='VehiclesList'
                        />
                        
                  
                  
                    </Scene>
                </RouterWithRedux>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

export default connect(mapStateToProps)(Root)
