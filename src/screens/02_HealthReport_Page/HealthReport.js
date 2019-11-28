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
// import AsyncStorage from '@react-native-community/async-storage';
import HealthReportActions from '../../actions/HealthReport';
import { connect } from 'react-redux';
import { Layout, Gallery } from '../../components';
import Loader from '../../components/Loader';
import MaterialTabs from 'react-native-material-tabs';
import styles from '../../styles/healthReport'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import ErrorModal from '../../components/ErrorModal'
import Orientation from 'react-native-orientation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Service} from './Service'
import {Moderate} from './Moderate'
import {Low} from './Low'
import NavigationBottomActions from '../../actions/NavigationBottom';
import BackgroundColor from 'react-native-background-color';
import { NavigationActions } from "react-navigation";


global.reportData 
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};
export class HealthReportScreen extends React.PureComponent {
  // static whyDidYouRender = true

  static navigationOptions = ({navigation}) => {
    
    const { params = {} } = navigation.state;

    return{
      title: 'Report'.toUpperCase(),
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
          // Actions.Main()
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
   ),
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
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value       
   })
   .then(() => {
    this.props.getHealthReport(token)
  })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value       
   })
   .then(() => {
    this.props.getHealthReport(token)
    // global.healthReportRefreshTimer = setTimeout(() => { 
  //  }, 2000)
    }).then(() => {
      this.setState({refreshing: false});
    });
  }
  selectedTabs=()=>{
    this.props.navigation.popToTop();
  }

  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    Orientation.lockToPortrait();
    this.getData() 
    this.props.navigation.setParams({ handleNave: this.selectedTabs });
    BackgroundColor.setColor('#EAE9EE');
  }
  componentWillUnmount() {
    // this.backHandler.remove()
  
}

// handleBackPress = () => {
//   const { navigate } = this.props.navigation
//     console.log('navigation',this.props.navigation)

//   navigate('Home')
//   return true;
// }
  render = () => {

    if(!this.props.reportData){
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
          <GestureRecognizer
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              onSwipeRight={(state) => this.onSwipeRight(state)}
              config={config}
              style={{
                flex: 1,
              }}
              >
          <ScrollView style={styles.root}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
            }    
            >
          <MaterialTabs
                items={['SERVICE', 'MODERATE', 'LOW']}
                selectedIndex={this.state.selectedTab}
                onChange={this.setTab}
                inactiveTextColor	="#FFFFFF"
                barColor="#13161d"
                indicatorColor="#B3D137"
                activeTextColor="#FFFFFF"
              />
      
          {/* service tab content */}
          {

          this.state.selectedTab==0?
              <Service service = {this.props.reportData.severe}/>
            :null
            }
              {/* moderate tab content */}
              {this.state.selectedTab==1?
                  <Moderate moderate = {this.props.reportData.moderate}/>
              :null
              }

            {/* low tab content */}
            {this.state.selectedTab==2?
                <Low low = {this.props.reportData.low}/> 
            :null
            }
          </ScrollView>
          </GestureRecognizer>
          <View style={{height:50}}></View>
        </Layout>
        );
        };
      }}


const mapStateToProps = (state) => {
  return {
      hasError : state.healthReport.hasError,
      isLoading: state.healthReport.isLoading,
      reportData:state.healthReport.reportData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getHealthReport:(token) => dispatch(HealthReportActions.getHealthReport(token)),
    selected:(index) => dispatch(NavigationBottomActions.selected(index))

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HealthReportScreen);
