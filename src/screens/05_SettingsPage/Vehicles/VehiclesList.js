import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  BackHandler,
  RefreshControl,
  AsyncStorage
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage'

import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
  RkSwitch,
  RkButton,
  RkTabSet,
  RkTabSetItem,
  RkTabView,
  RkCard
} from 'react-native-ui-kitten';
import GetVehiclesActions from '../../../actions/GetVehicles';

import { connect } from 'react-redux';
import { Layout, Gallery } from '../../../components';
import Loader from '../../../components/Loader';
import MaterialTabs from 'react-native-material-tabs';
import styles from '../../../styles/vehiclesList'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import ErrorModal from '../../../components/ErrorModal'
import Orientation from 'react-native-orientation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {List} from './List'
import NavigationBottomActions from '../../../actions/NavigationBottom';


global.reportData 
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};
export class VehiclesList extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
    title: 'My Cars'.toUpperCase(),
    headerMode: 'float',
    headerStyle: {
      backgroundColor: '#13161d',
    },
    headerTintColor: 'white',
    headerLeft:(
     
      <TouchableOpacity 
        style={{marginLeft:10}}
        onPress={() => {
          // Actions.reset('Settings')
          // Actions.Settings()
          navigation.goBack()
       }
       }
       >
        <View style={{flexDirection:'row'}}>
          <IconI
              name='md-arrow-back'
              color='white'
              size={28}
              />
          {/* <RkText style={{fontSize:10,color:'white',top:7, left:5}}>Back</RkText> */}
       </View>
       </TouchableOpacity>
    )
  }
};
  state = {
    selectedTab: 0,
    notConnected:global.notConnected,
    isLoading:false,
    refreshing: false,   
  };
 
  setTab = selectedTab => {
    this.setState({ selectedTab });
  };
  onSwipeRight(gestureState) {
    if(this.state.selectedTab == 2){
      this.setState({selectedTab:1});
      }
      else if(this.state.selectedTab == 1){
        this.setState({selectedTab:0});
      }
  }
  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_LEFT:
      
      if(this.state.selectedTab == 0){
        this.setState({selectedTab:1});
        }
        else if(this.state.selectedTab == 1){
          this.setState({selectedTab:2});
        }  
        break;
      case SWIPE_RIGHT:
        if(this.state.selectedTab == 2){
          this.setState({selectedTab:1});
          }
          else if(this.state.selectedTab == 1){
            this.setState({selectedTab:0});
          }
        break;
    }
  }
  getData(){
    // this.setState({refreshing: true});
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value       
   })
   .then(() => {
    this.props.getVehicles(token)
  })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value       
   })
   .then(() => {
    this.props.getVehicles(token)
    }).then(() => {
      this.setState({refreshing: false});
    });
  }

  selectedTabs=()=>{
    this.props.selected(3)
    Actions.Settings();
  }

  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
 
    Orientation.lockToPortrait();
    this.getData()  
  }

  componentWillUnmount() {
    // this.backHandler.remove()
    // clearTimeout(global.healthReportTimer)
    // clearTimeout(global.healthReportRefreshTimer)
  } 

  // handleBackPress = () => {
  //   const { goBack } = this.props.navigation
  //   goBack()
  //   return true;
  // }
  
  render = () => {

    if(!this.props.vehiclesData){
      return (
        <View>      
          <Loader loading={true} />
            <ErrorModal loading={this.state.notConnected}> 
              <View style={{justifyContent:'center',top:10}}>
                <RkText rkType='header primary' style={{color:'#FFFFFF',left:10}}>No Internet Connection !</RkText> 
                <TouchableOpacity onPress={ () => { this.getData() }}>            
                <RkText  style={{textAlign:'center',color:'#FFFFFF'}} rkType='header6'>Try Again</RkText>   
                </TouchableOpacity>    
            </View>      
          </ErrorModal>
        </View>
        )
      }else{
        return (
        <Layout>

          <ScrollView 
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
            }    
            >
      
          {/* service tab content */}
          <View style={styles.root}>
            <List vehicles = {this.props.vehiclesData}/> 
          </View>
          </ScrollView>
          <View style={{height:50}}></View>
        </Layout>
        );
        };
      }}


const mapStateToProps = (state) => {
  return {
      hasError : state.getVehicles.hasError,
      isLoading: state.getVehicles.isLoading,
      vehiclesData:state.getVehicles.vehiclesData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getVehicles:(token) => dispatch(GetVehiclesActions.getVehicles(token)),
    selected:(index) => dispatch(NavigationBottomActions.selected(index))

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VehiclesList);
