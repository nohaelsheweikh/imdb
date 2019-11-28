import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
  TextInput,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  BackHandler,
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
import {
  ProgressChart,
  FaultProgressChart,
  DoughnutChart,
  AreaChart,
  AreaSmoothedChart,
} from '../../components/charts';
import { Layout } from '../../components';
import Loader from '../../components/Loader';

import { FontAwesome } from '../../assets/icons';

import IconF from 'react-native-vector-icons/Foundation'
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import IconI from 'react-native-vector-icons/Ionicons'

import { ActionButton , Badge, Icon, Avatar } from 'react-native-material-ui';
import TripDetailsActions from '../../actions/TripsDetails';
import LoginActions from '../../actions/Login';
import { scaleModerate, scaleVertical } from '../../utils/scale';
// import RNSpeedometer from 'react-native-speedometer'
import { Actions } from 'react-native-router-flux';
import Svg from 'react-native-svg';
import styles from '../../styles/tripsDetails'
import ErrorModal from '../../components/ErrorModal'
import { VictoryChart,VictoryTheme,VictoryBar, VictoryGroup, VictoryStack,VictoryLabel } from "victory-native";
import Orientation from 'react-native-orientation';
import NavigationBottomActions from '../../actions/NavigationBottom';
import TripsDetailsCard from './TripsDetails_Card'

global.visible=false

const screenSize = Dimensions.get('window');
 class TripsDetailsScreen extends React.Component {
   
  constructor() {
    super();
    this.state = {
      isLoading:true,
      data:[],
      notConnected:global.notConnected

  }
}

static navigationOptions = ({navigation}) => {
  const { params = {} } = navigation.state;

  return{
    title: 'TripDetails'.toUpperCase(),
    headerMode: 'float',
    headerStyle: {
      backgroundColor: '#13161d',
    },
  
    headerTintColor: 'white',
   
    headerLeft:(
     
      <TouchableOpacity 
        style={{marginLeft:10}}
        onPress={() => {
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
  
  
  getData(){
    let ID = this.props.data
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value       
   })
   .then(() => {
    this.props.getTripsDetails(token,ID)
      
  })
  }
  
 
componentWillMount(){
  this.getData()
}


componentDidMount() {
  // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  Orientation.lockToPortrait();
  this.props.navigation.setParams({ handleNave: this.selectedTabs });
  // this.getData()
}

componentWillUnmount() {
  // this.backHandler.remove()
}
// handleBackPress = () => {
//   const { goBack } = this.props.navigation
//   goBack()
//   return true;
// }

  render = () => {
    if(!this.props.tripDetails){
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
      <ScrollView>
        <TripsDetailsCard TripsDet = {this.props.tripDetails}/>
       <View style={{height:60}}></View>  
       </ScrollView>        
     </Layout>
    );
  };
}
}
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    hasError : state.tripsDetails.hasError,
    isLoading: state.tripsDetails.isLoading,
    tripDetails:state.tripsDetails.tripDetails
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTripsDetails:(token,id) => dispatch(TripDetailsActions.getTripsDetails(token,id)),
    selected:(index) => dispatch(NavigationBottomActions.selected(index))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsDetailsScreen);


  