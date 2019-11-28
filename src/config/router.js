
import React from 'react';

import { COLOR } from './styles'
import {
  BackHandler,
} from 'react-native';

import Login from "../screens/login";
import HomeScreen from "../screens/01_MainPage/Main";
import HealthReportScreen from "../screens/02_HealthReport_Page/HealthReport"
import TripsListScreen from "../screens/03_TripsListPage/TripsList"
import SettingsScreen from "../screens/05_SettingsPage/Settings"
import VehicleScreen from "../screens/05_SettingsPage/Vehicles/VehiclesList"
import ProfileScreen from "../screens/05_SettingsPage/Profile"

import NotificationsScreen from "../screens/Notifications/Notifications"
import TripsDetailsScreen from "../screens/04_TripsDetailsPage/TripsDetails"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import OIcon from 'react-native-vector-icons/Octicons'
import FIcon from 'react-native-vector-icons/Octicons'
import DrawerComponent from "../components/drawer"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, 
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  StackNavigator,NavigationActions } from 'react-navigation';

// export const MainStack = createDrawerNavigator({
//     Home: HomeScreen,
//     HealthReport:HealthReportScreen,
//     HealthReport: {screen: HealthReportScreen},
//     Trips:TripsListScreen,
//     // TripsDetails:{screen:TripsDetailsScreen},
//     Settings:SettingsScreen,
//     Notifications:NotificationsScreen
// }, {
//         initialRouteName: 'Home',
//         contentComponent: DrawerComponent,
//         contentOptions: {
//             activeTintColor: COLOR.PRIMARY
//         }
// });

const HomeStack = createStackNavigator({
  Home: HomeScreen
});
const HealthReportStack = createStackNavigator ({
  HealthReport:HealthReportScreen

})
const TripsStack = createStackNavigator({
  Trips: TripsListScreen,
  TripsDetails:TripsDetailsScreen,

})
const SettingsStack = createStackNavigator({
  Settings:SettingsScreen,
  Vehicle:VehicleScreen,
  Profile:ProfileScreen

})
const NotificationsStack = createStackNavigator({
  Notifications:NotificationsScreen

})

export const MainStack = 
      createBottomTabNavigator({
      Home: {screen: HomeStack,
        navigationOptions:{
          title: 'Home',
          headerBackTitle: 'A much too long text for back button from B to A',
          tabBarVisible: true,
          tabBarOptions: {
            activeTintColor: '#b3d137',
            inactiveTintColor: '#FFFFFF',
            showIcon: true,
            style: {
                backgroundColor: '#13161d',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
              }
          }
        }
      
      
      },
      HealthReport: {screen: HealthReportStack,
        navigationOptions:{
          title: 'HealthReport',
          tabBarVisible: true,
          tabBarOptions: {
            activeTintColor: '#b3d137',
            inactiveTintColor: '#FFFFFF',
            showIcon: true,
            style: {
                backgroundColor: '#13161d',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
              }
          }
        }
      
      
      
      
      },
      Trips: {screen:TripsStack,
        navigationOptions:{
          title: 'Trips',
          tabBarVisible: true,
          tabBarOptions: {
            activeTintColor: '#b3d137',
            inactiveTintColor: '#FFFFFF',
            showIcon: true,
            style: {
                backgroundColor: '#13161d',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
              }
          }
        }
      
      
      
      },
      Settings:{screen:SettingsStack,
        navigationOptions:{
          title: 'Settings',
          tabBarVisible: true,
          tabBarOptions: {
            activeTintColor: '#b3d137',
            inactiveTintColor: '#FFFFFF',
            showIcon: true,
            style: {
                backgroundColor: '#13161d',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
              }
          }
        }
      
      },
      Notifications:{screen:NotificationsStack,
        navigationOptions:{
          title: 'Notifications',
          tabBarVisible: true,
          tabBarOptions: {
            activeTintColor: '#b3d137',
            inactiveTintColor: '#FFFFFF',
            showIcon: true,
            style: {
                backgroundColor: '#13161d',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
              }
          }
        }
      
      },

    });

HomeStack.navigationOptions = ({ navigation }) => {
 
  return {
    tabBarLabel: "Home",
     
    tabBarBackgroundColor:  '#13161d',
       
    tabBarIcon: ({ focused, tintColor }) => (
         <Icon name="home" size={27} color={focused ? '#b3d137' : '#FFFFFF'} />
    )

  };
  };
  HealthReportStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: "Report",
    tabBarIcon: ({ focused, tintColor }) => (
         <Icon name="alert" size={27} color={focused ? '#b3d137' : '#FFFFFF'} backgroundColor={'#13161d'} />
    )
  };
  };
  
  TripsStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: "Trips",
    style:{
      backgroundColor: '#13161d',
     },
    tabBarIcon: ({ focused, tintColor }) => (
         <Icon name="map" size={27} color={focused ? '#b3d137' : '#FFFFFF'} />
    )
  };
  };  

  SettingsStack.navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Settings",
      style:{
        backgroundColor: '#13161d',
       },
      tabBarIcon: ({ focused, tintColor }) => (
           <Icon name="settings" size={27} color={focused ? '#b3d137' : '#FFFFFF'} />
      )
    };
    };
  

    NotificationsStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarLabel: "Notifications",
        style:{
          backgroundColor: '#13161d',
         },
        tabBarIcon: ({ focused, tintColor }) => (
             <Icon name="bell" size={27} color={focused ? '#b3d137' : '#FFFFFF'} />
        )
      };
      };
export const LoginStack = createStackNavigator({
  Login: {
      screen: Login
  }
  
});


export const AppNavigator = createStackNavigator({
  Home: {
      screen: HomeScreen
  },
  HealthReport: {screen: HealthReportScreen},
  Trips: {screen:TripsListScreen},
  TripsDetails:{screen:TripsDetailsScreen},
  Settings:{screen:SettingsScreen},
  Notifications:{screen:NotificationsScreen}

  
});


