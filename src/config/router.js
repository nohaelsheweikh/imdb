
import React from 'react';

import { COLOR } from './styles'
import {
  BackHandler,
} from 'react-native';

import Login from "../screens/00_LoginPage/login";
import HomeScreen from "../screens/01_MainPage/Main";
import FavoritesScreen from "../screens/02_FavoritesPage/Favorite"


import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator, 
  createAppContainer,
  createStackNavigator,
  StackNavigator,NavigationActions } from 'react-navigation';


const HomeStack = createStackNavigator({
  Home: HomeScreen
});

const FavoriteStack = createStackNavigator({
  Favorites: FavoritesScreen,

})



export const MainStack = 
      createBottomTabNavigator({
      Home: {screen: HomeStack,
        navigationOptions:{
          title: 'Home',
          headerBackTitle: 'A much too long text for back button from B to A',
          tabBarVisible: true,
          tabBarOptions: {
            activeTintColor: COLOR.SECONDARY,
            inactiveTintColor: '#FFFFFF',
            showIcon: true,
            style: {
                backgroundColor: COLOR.PRIMARY,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
              }
          }
        } 
      },
      Favorites: {screen:FavoriteStack,
        navigationOptions:{
          title: 'Favorites',
          tabBarVisible: true,
          tabBarOptions: {
            activeTintColor: COLOR.SECONDARY,
            inactiveTintColor: '#FFFFFF',
            showIcon: true,
            style: {
                backgroundColor: COLOR.PRIMARY,
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
     
    tabBarBackgroundColor: COLOR.PRIMARY,
       
    tabBarIcon: ({ focused, tintColor }) => (
         <Icon name="home" size={27} color={focused ? COLOR.SECONDARY: '#FFFFFF'} />
    )

  };
  };
  
  
  FavoriteStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: "Favorites",
    style:{
      backgroundColor: COLOR.PRIMARY,
     },
    tabBarIcon: ({ focused, tintColor }) => (
         <Icon name="star" size={27} color={focused ? COLOR.SECONDARY : '#FFFFFF'} />
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
  Favorites: {screen:FavoritesScreen},
  

  
});


