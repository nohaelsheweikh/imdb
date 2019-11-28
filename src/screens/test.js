import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  BackHandler,
  AsyncStorage
} from 'react-native';

import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkTabSet,
  RkTab,
  RkButton,
  RkCard
} from 'react-native-ui-kitten';
import { Layout } from '../components';
import Loader from '../components/Loader';
import Indicator from '../components/Indicator';


import { FontAwesome } from '../assets/icons';

import IconF from 'react-native-vector-icons/Foundation'
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import { ActionButton , Badge, Avatar } from 'react-native-material-ui';
import TripsActions from '../actions/Trips';
import LoginActions from '../actions/Login';
import { scaleModerate, scaleVertical } from '../utils/scale';
// import RNSpeedometer from 'react-native-speedometer'
import { Actions } from 'react-native-router-flux';
import styles from '../styles/trips'
import { VictoryChart,VictoryTheme,VictoryBar, VictoryGroup, VictoryStack,VictoryLabel } from "victory-native";
import OfflineNotice from '../components/OfflineNotice'
import Orientation from 'react-native-orientation';
import { scale } from '../utils/scale';
import { SocialBar } from '../components';

const screenSize = Dimensions.get('window');
const { width,height } = Dimensions.get('window');
const size = 120;
const fontSize = 25;


 class Test extends React.Component {
   
  constructor() {
    super();
    this.state = {
      token: null,
      isStorageLoaded: false,
      isUserLogin:global.isLogged
    }

}

async componentWillMount() {
    await AsyncStorage.getItem("token", (err, result) => {
      if (result) {
        this.setState({
            token:result,
            isStorageLoaded: true,
            isUserLogin:true
        })
        Actions.Main()

    }else{
        this.setState({
            token: null,
            isStorageLoaded: true,
            isUserLogin:false
        })
        Actions.Login()
    
        }
        // console.log('isLogged',this.state.isUserLogin)
    });
  }


  

  render = () => { 
    let { token, isStorageLoaded } = this.state;
    if(!isStorageLoaded){
        return (
            <Loader loading={true} />
        )
    }else{
       
      return(
     null
    );
  } }}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    hasError : state.trips.hasError,
    isLoading: state.trips.isLoading,
    tripsData:state.trips.tripsData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
     getTripsList:(token,page) => dispatch(TripsActions.getTripsList(token,page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);

