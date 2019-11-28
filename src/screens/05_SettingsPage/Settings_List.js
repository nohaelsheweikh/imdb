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
import * as authActions from "../../actions/authenticate";


export class SettingsList extends React.Component {
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
    data:{}


    };
 
  
    componentWillReceiveProps(nextProps) {
        if (nextProps.settings !== this.props.settings) {
          this.setState({
            data: nextProps.settings
          });
        }
      }
 



  render = () => {
      var username =this.props.settings.first_name + " "+ this.props.settings.last_name
      if(!this.state.data){
          return(<Loader loading={true} />)
      }
    return(
    
          <RkAvoidKeyboard>          
              <View style={styles.section}>
                <View style={[styles.row, styles.heading]}>     
              </View>
              <TouchableOpacity onPress={ () => { this.props.navigation.navigate('Profile') }}style={[styles.row,{justifyContent:'space-between'}]}>
                   <View>
                      <RkText >Edit Profile</RkText>
                   </View>         
                   <View style={{flexDirection:'row'}}>
                     <RkText style={{color:'grey'}}>{username}</RkText>
                     <View style={{top:5,left:2}}>
                      <IconS
                          name='arrow-right'
                          color='#A9A9A9'
                          size={14}
                        />
                    </View>
                   </View> 
              </TouchableOpacity>
              
              <TouchableOpacity onPress={ () => {  this.props.navigation.navigate('Vehicle');}}style={[styles.row,{justifyContent:'space-between'}]}>
                   <View>
                      <RkText >Manage Vehicle</RkText>
                   </View>      
                   <View style={{flexDirection:'row'}}>
                     <View style={{top:5,left:2}}>
                      <IconS
                          name='arrow-right'
                          color='#A9A9A9'
                          size={14}
                        />
                    </View>
                   </View>       
              </TouchableOpacity>  
              <View style={[styles.row, styles.heading]}>     
              </View>     
              </View>
              
              <View style={styles.section}>
                  <TouchableOpacity onPress={ () => { this.props.logout() } }>
                    <RkText  style={{textAlign:'center'}} rkType='danger header6'>Sign Out of HOOD</RkText>
                  </TouchableOpacity>
                  {/* <Button
                    onPress={ () => { this.props.logout() } }
                    title={"Sair"}
                /> */}
               <View style={{height:30}}></View>
              </View>
         </RkAvoidKeyboard>
    
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
export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
