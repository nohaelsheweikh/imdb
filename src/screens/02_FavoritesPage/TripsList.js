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
  RefreshControl,
  AsyncStorage
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkTabSet,
  RkTab,
  RkButton,
  RkCard
} from 'react-native-ui-kitten';
import { Layout } from '../../components';
import Loader from '../../components/Loader';
import Indicator from '../../components/Indicator';
import IconI from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialIcons'
import { ActionButton , Badge, Avatar } from 'react-native-material-ui';
import TripsActions from '../../actions/Trips';
import LoginActions from '../../actions/Login';
import { scaleModerate, scaleVertical } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import styles from '../../styles/trips'
import ErrorModal from '../../components/ErrorModal'
import Orientation from 'react-native-orientation';
import { scale } from '../../utils/scale';
import {NormalList} from './NormalList'
import {WarningList} from './WarningList'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import MaterialTabs from 'react-native-material-tabs';
import NavigationBottomActions from '../../actions/NavigationBottom';
import TripDetailsActions from '../../actions/TripsDetails';
import {StackNavigator,withNavigation,DrawerItems, DrawerActions,createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,} from 'react-navigation';
const screenSize = Dimensions.get('window');
const { width,height } = Dimensions.get('window');
const size = 120;
const fontSize = 25;

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

RkTheme.setType('RkTabView', 'tab', {
  backgroundColor: 'transparent',
  color: 'white',
  borderColor: '#4a636d',
  tabContainer: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  content: {
    padding: 7
  },
  container: {
    backgroundColor: '#a6bfcc',
    borderRadius: 20
  }
});

 RkTheme.setType('RkTabView', 'tabSelected', {
  backgroundColor: '#4a636d',
  borderColor: '#4a636d'
});

 class TripsListScreen extends React.Component {
   
  constructor() {
    super();
    this.state = {
      hasScrolled: false,
      page:0,
      WarningPage:0,
      activeId: null,
      activeItem: null,
      getisLoading:false,
      NormalisLoading:false,
      WarningisLoading:false,
      notConnected:global.notConnected,
      refreshing: false,

  }
  this.onEndReachedCalledDuringMomentum = true;

}

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
    title: 'Trips'.toUpperCase(),
    headerMode: 'float',
    headerStyle: {
      backgroundColor: '#13161d',
    },
  
    headerTintColor: 'white',
   
    headerLeft:(
     
      <TouchableOpacity 
        style={{marginLeft:10}}
        onPress={() => {
          // params.handleNave()
          navigation.navigate('Home')          
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
    switch (gestureName) {
      case SWIPE_LEFT:   
      if(this.state.selectedTab == 0){
        this.setState({selectedTab:1});
        }
        
        break;
      case SWIPE_RIGHT:
        
          if(this.state.selectedTab == 1){
            this.setState({selectedTab:0});
          }
        break;
    }
  }
  getData(){
    let page =0
    this.setState({
      page:page,
      selectedTab: 0,
     })  
    var token   
    AsyncStorage.getItem('token').then((value) => {
      token=value  
   })
   .then(() => {
      this.props.getTripsNormal(token,page)
      this.props.getTripsWarning(token,page)
    }) 
  }
  

  _onRefresh = () => {
    this.setState({refreshing: true});
    let page =0
    this.setState({
      page:page,
     })    
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value  
   })
    .then(() => {
      this.props.getTripsNormal(token,page)
      this.props.getTripsWarning(token,page)
    })
      .then(() => {
        this.setState({  
         refreshing:false
        })    
    })
  }
  
  
  
componentDidMount() {
  // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  Orientation.lockToPortrait();
  this.getData()
  this.props.navigation.setParams({ handleNave: this.selectedTabs });

}

componentWillUnmount() {
  // this.backHandler.remove()

}

// handleBackPress = () => {
//   const { navigate } = this.props.navigation
//   navigate('Home')
//   return true;
// }

handleLoadMoreNormal = ({ distanceFromEnd }) => {
  let i =this.state.page
  if (i >= 0 && i< this.props.tripsNormalData.length-1) {
    this.setState({
     page: i + 1,
     NormalisLoading:true
    })    
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value       
   })
   .then(() => {
    this.props.getTripsNormal(token,this.state.page)
      }) .then(() => {
           this.setState({
          NormalisLoading:false})
        })
    }
}

handleLoadMoreWarning = ({ distanceFromEnd }) => {
  let i =this.state.WarningPage
  if (i >= 0 && i<this.props.tripsNormalData.length-1) {
    this.setState({
     WarningPage: i + 1,
     WarningisLoading:true
    })    
    
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value       
   })
   .then(() => {
    this.props.getTripsWarning(token,this.state.WarningPage)
      }) .then(() => {
           this.setState({
          WarningisLoading:false})
        })
    }
  }
  render = () => { 

    if(this.props.tripsNormalData.length<1&&this.props.NormalisLoading||this.props.tripsWarningData.length<1&&this.props.WarningisLoading){
      return(
        <Layout>          
          <MaterialTabs
                items={[
                  <View key={0} style={{flexDirection:'row'}}>
                    <RkText style={{color:'#FFFFFF'}}>NORMAL</RkText>
                    <View style={{paddingHorizontal:7,bottom:5}}>
                      <IconM
                      name='done'
                      color='green'
                      size={28}
                      />
                    </View>
                  </View>
                ,  
                <View key={1} style={{flexDirection:'row'}}>
                    <RkText style={{color:'#FFFFFF'}}>WARNING</RkText>
                    <View style={{paddingHorizontal:7,bottom:3}}>
                      <IconM
                      name='error-outline'
                      color='red'
                      size={28}
                      />
                    </View>
                </View>
              ]}
                selectedIndex={this.state.selectedTab}
                onChange={this.setTab}
                inactiveTextColor	="#FFFFFF"
                barColor="#13161d"
                indicatorColor="#B3D137"
                activeTextColor="#FFFFFF"
               
              />
            
          <Loader loading={true} />
          <ErrorModal loading={this.state.notConnected}> 
              <View style={{justifyContent:'center',top:10}}>
                <RkText rkType='header primary' style={{color:'#FFFFFF',left:10}}>No Internet Connection !</RkText> 
                <TouchableOpacity onPress={ () => { this.getData() }}>            
                  <RkText  style={{textAlign:'center',color:'#FFFFFF'}} rkType='header6'>Try Again</RkText>   
                </TouchableOpacity>    
            </View>      
          </ErrorModal>
        </Layout>
      )
    }else{
    return (
      
      <Layout>          
        {/* <GestureRecognizer
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              onSwipeRight={(state) => this.onSwipeRight(state)}
              config={config}
              style={{
                flex: 1,
              }}
          >   */}
          <MaterialTabs
                items={[
                  <View key={0} style={{flexDirection:'row'}}>
                    <RkText style={{color:'#FFFFFF'}}>NORMAL</RkText>
                    <View style={{paddingHorizontal:7,bottom:5}}>
                      <IconM
                      name='done'
                      color='green'
                      size={28}
                      />
                    </View>
                  </View>
                ,  
                <View key={1} style={{flexDirection:'row'}}>
                    <RkText style={{color:'#FFFFFF'}}>WARNING</RkText>
                    <View style={{paddingHorizontal:7,bottom:3}}>
                      <IconM
                      name='error-outline'
                      color='red'
                      size={28}
                      />
                    </View>
                </View>
              ]}
                selectedIndex={this.state.selectedTab}
                onChange={this.setTab}
                inactiveTextColor	="#FFFFFF"
                barColor="#13161d"
                indicatorColor="#B3D137"
                activeTextColor="#FFFFFF"
               
              />
            
            {
            this.state.selectedTab==0?
              // <GestureRecognizer
              //   onSwipe={(direction, state) => this.onSwipe(direction, state)}
              //   onSwipeRight={(state) => this.onSwipeRight(state)}
              //   config={config}
              //   style={{
              //     flex: 1,
              //   }}
              // >
              <NormalList 
                Normaltrips = {this.props.tripsNormalData} 
                NormalmoreFunction={this.handleLoadMoreNormal}
                refreshFunction={this._onRefresh}
                refresh={this.state.refreshing}
                getTripsDetails = {this.props.getTripsDetails}
                navigation={this.props.navigation}
              />
            // </GestureRecognizer>
           :
           null}
           {this.state.selectedTab==1?   
           <WarningList 
            Warningtrips = {this.props.tripsWarningData} 
            WarningmoreFunction={this.handleLoadMoreWarning}
            refreshFunction={this._onRefresh}
            refresh={this.state.refreshing}
            getTripsDetails = {this.props.getTripsDetails}
            navigation={this.props.navigation}
            />
           :
           null}
          {this.state.NormalisLoading||this.props.NormalisLoading||this.state.WarningisLoading||this.props.WarningisLoading ?  
          <Indicator
           loading={this.props.NormalisLoading||this.props.WarningisLoading} /> 
          :
          null
          }
          <View style={{height:50}}></View>
        {/* </GestureRecognizer> */}
      </Layout>
    );
    }
   }
  };

const mapStateToProps = (state) => {
  return {
    NormalhasError : state.trips.NormalHasError,
    NormalisLoading: state.trips.NormalisLoading,
    tripsNormalData:state.trips.tripsNormalData,
    WarninghasError : state.trips.WarningHasError,
    WarningisLoading: state.trips.WarningisLoading,
    tripsWarningData:state.trips.tripsWarningData,
    profileData:state.profile.profileData,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTripsNormal:(token,page) => dispatch(TripsActions.getTripsNormal(token,page)),
    getTripsWarning:(token,page) => dispatch(TripsActions.getTripsWarning(token,page)),
    selected:(index) => dispatch(NavigationBottomActions.selected(index)),
    getTripsDetails:(token,id) => dispatch(TripDetailsActions.getTripsDetails(token,id)),


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsListScreen);

