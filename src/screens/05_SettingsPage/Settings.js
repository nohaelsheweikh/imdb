import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  RefreshControl,
  Button,
  Platform,
  AsyncStorage
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
  RkSwitch,
  RkButton, 
} from 'react-native-ui-kitten';
import {
  Avatar,
  SocialSetting,
  GradientButton,
} from '../../components';
import { FontAwesome } from '../../assets/icons';
// import LoginActions from '../../actions/Login';
import ProfileActions from '../../actions/Profile'
import { connect } from 'react-redux';
import { Layout } from '../../components';
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import IconS from 'react-native-vector-icons/SimpleLineIcons'
import { Actions } from 'react-native-router-flux';
import Loader from '../../components/Loader';
import SuccessModal from '../../components/SuccessModal'
import ErrorModal from '../../components/ErrorModal'
import Orientation from 'react-native-orientation';
import { DarkKittenTheme } from '../../config/darkTheme';
import { KittenTheme } from '../../config/theme';
import { scale, scaleVertical } from '../../utils/scale';
import NavigationBottomActions from '../../actions/NavigationBottom';
import SettingsList from './Settings_List'
import * as authActions from "../../actions/authenticate";

export class SettingsScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
    title: 'Settings'.toUpperCase(),
    headerMode: 'float',
    headerStyle: {
      backgroundColor: '#13161d',
    },
    headerTintColor: 'white',
    headerLeft:(
     
      <TouchableOpacity 
        style={{marginLeft:10}}
        onPress={() => {
          // Actions.Main()
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


  

  profile = this.props.userData
  
  state = {
    // img: this.user.photo,
    first_name:this.props.profileData.first_name,
    last_name:this.props.profileData.last_name,
    email: 'user@gmail.com',
    phone: '+212345678',
    emergency_phone:'+212345678',
    user_id:'',
    isLoading:true,
    isUpdated:false,
    value: false,
    notConnected:global.notConnected,
    refreshing: false,


    };
   


 
  getData(){
   
    var first_name
    var last_name
    var email
    var phone
    var emergency_phone
    var ID
    var token

    AsyncStorage.getItem('token').then((value) => {
      token=value  
      //  console.log(token)
    })

   .then(() => {  
      this.props.getProfile(token)
  })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    var first_name
    var last_name
    var email
    var phone
    var emergency_phone
    var ID
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value  
      //  console.log(token)
    })

   .then(() => {  
    this.props.getProfile(token)
    }).then(() => {
      this.setState({refreshing: false});
    });
  }

  selectedTabs=()=>{
    this.props.selected(0)
  }

  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.setState({isUpdated:false})
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

  render = () => {
    return(
    <Layout>      
      {/* <ErrorModal loading={this.state.notConnected}> 
        <View style={{justifyContent:'center',top:10}}>
          <RkText rkType='header primary' style={{color:'#FFFFFF',left:10}}>No Internet Connection !</RkText> 
            <TouchableOpacity onPress={ () => { this.getData()}}>            
              <RkText  style={{textAlign:'center',color:'#FFFFFF'}} rkType='header6'>Try Again</RkText>   
            </TouchableOpacity>    
          </View>      
        </ErrorModal> */}
        <ScrollView style={styles.root}
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
          }    
        >
      <SettingsList 
      settings = {this.props.profileData}
      navigation={this.props.navigation}
      />
     </ScrollView>
   </Layout>
  )}
}


const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 45,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 12.5,
    backgroundColor:'#00000009',
    height:30,
    left:2

  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
    right:6,
    height:40
    
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
}));
const mapStateToProps = (state) => {
  // console.log(state)
  return {
      isLogged: state.login.isLogged,
      hasError : state.login.hasError,
      isLoading: state.login.isLoading,
      getisLoading:state.profile.getisLoading,
      profileData:state.profile.profileData,
      updateHasError:state.profile.updateHasError,
      updateisLoading:state.profile.updateisLoading,
      isUpdated:state.profile.isUpdated,
      newProfileData:state.profile.newProfileData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

      logout: () => dispatch(authActions.logout()),
      getProfile: (token) => dispatch(ProfileActions.getProfile(token)),
      updateProfile: (token,user_id,first_name,last_name,phone,emergency_phone) => dispatch(ProfileActions.updateProfile(token,user_id,first_name,last_name,phone,emergency_phone)),
      selected:(index) => dispatch(NavigationBottomActions.selected(index))


  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
