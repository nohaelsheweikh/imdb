import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  RefreshControl,
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
import LoginActions from '../../actions/Login';
import ProfileActions from '../../actions/Profile'
import { connect } from 'react-redux';
import { Layout } from '../../components';
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import Loader from '../../components/Loader';
import SuccessModal from '../../components/SuccessModal'
import ErrorModal from '../../components/ErrorModal'
import Orientation from 'react-native-orientation';
import NavigationBottomActions from '../../actions/NavigationBottom';


export class Profile extends React.Component {

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
    title: 'Profile'.toUpperCase(),
    headerMode: 'float',
    headerStyle: {
      backgroundColor: '#13161d',
    },
    headerTintColor: 'white',
    headerLeft:(
     
      <TouchableOpacity 
        style={{marginLeft:10}}
        onPress={() => {
        //  params.handleNave()
        //  Actions.reset('Settings')
        //  Actions.Settings()
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


  

  profile = this.props.userData
  
  state = {
    // img: this.user.photo,
    first_name:this.props.profileData.first_name,
    last_name:this.props.profileData.last_name,
    email:this.props.profileData.email,
    phone:this.props.profileData.phone,
    emergency_phone:this.props.profileData.emergency_phone,
    user_id:'',
    token:'',
    isLoading:true,
    isUpdated:false,
    value: false,
    notConnected:global.notConnected,
    refreshing: false,


    };
   
    onSwitchValueChange = (value) => {
      this.setState({value: value});
    };
  
  onFirstNameInputChanged = (text) => {
    this.setState({ first_name: text });
  };

  onLastNameInputChanged = (text) => {
    this.setState({ last_name: text });
  };

  onEmailInputChanged = (text) => {
    this.setState({ email: text });
  };

  onEmergencyInputChanged = (text) => {
    this.setState({ emergency_phone: text });
  };

  onPhoneInputChanged = (text) => {
    this.setState({ phone: text });
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
    })
   .then(() => {  
      this.props.getProfile(token)
     
      this.setState({  
        first_name: this.props.profileData.first_name,
        last_name:this.props.profileData.last_name,
        email:this.props.profileData.email,
        phone:this.props.profileData.phone,
        emergency_phone:this.props.profileData.emergency_phone,
        user_id:this.props.profileData.user_id,
        token:token,
        ImageSource: null,
       
      })
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
     this.setState({  
        first_name: this.props.profileData.first_name,
        last_name:this.props.profileData.last_name,
        email:this.props.profileData.email,
        phone:this.props.profileData.phone,
        emergency_phone:this.props.profileData.emergency_phone,
        user_id:this.props.profileData.user_id,
        token:token,
        ImageSource:'image',  
      })      
    }).then(() => {
      this.setState({refreshing: false});
    });
  }

  selectedTabs=()=>{
    this.props.selected(3)
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
  //   const { goBack } = this.props.navigation
  //   goBack()
  //   return true;
  // }
  
doUpdate=()=> {
  let {token,user_id,first_name,last_name,phone,emergency_phone} = this.state;
  this.props.updateProfile(token,user_id,first_name,last_name,phone,emergency_phone);
  this.setState({refreshing:true})
  global.profileUpdateTimer = setTimeout(() => {
    if (this.props.isUpdated){
       this.setState({
         isUpdated:true,
         refreshing:false
      })
    }    
  }, 3000)

  
}

selectPhotoTapped() {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
    skipBackup: true
    }
  };


  //launchImageLibrary launch gallery directly
  ImagePicker.showImagePicker(options, (response) => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      // console.log('User cancelled photo picker');
    }
    else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
    }
    else {
      // You can also display the image using data:
      let source = { uri: 'data:image/jpeg;base64,' + response.data };
       //console.log('image',response.data)
      this.setState({
        data:response.data,
        ImageSource: source

      });
    }
  });
}

  render = () => {
    return(
    <Layout>      
      <ErrorModal loading={this.state.notConnected}> 
        <View style={{justifyContent:'center',top:10}}>
          <RkText rkType='header primary' style={{color:'#FFFFFF',left:10}}>No Internet Connection !</RkText> 
            <TouchableOpacity onPress={ () => { [this.getData(),this.setState({notConnected:false})]}}>            
              <RkText  style={{textAlign:'center',color:'#FFFFFF'}} rkType='header6'>Try Again</RkText>   
            </TouchableOpacity>    
          </View>      
        </ErrorModal>
        <SuccessModal loading={this.state.isUpdated}>   
            <View style={{justifyContent:'center',top:10}}>
              <RkText rkType='header primary' style={{left:10,color:'#FFFFFF'}}> Updated Successfully !</RkText> 
              <RkButton
                onPress={() => {
                  this.setState({isUpdated:false})
                }}
                style={{backgroundColor:"transparent",left:'40%'}}
                >
                  OK
            </RkButton> 
          </View>   
        </SuccessModal>

        <ScrollView style={styles.root}
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
          }    
        >
        <Loader loading={this.props.updateisLoading} /> 
          <RkAvoidKeyboard>
              <View style={styles.header}>
              { this.state.ImageSource == null ? 
            <View>    
               {/* <TouchableOpacity style={{alignSelf:'flex-end',right:'25%',top:'10%'}} onPress={this.selectPhotoTapped.bind(this)} >
                  <IconM
                    name='edit'
                    color='black'
                    size={24}
                  />                              
              </TouchableOpacity>  */}
                <Avatar source={require('../../assets/images/avatar.jpg')}
                rkType='round'
                name={this.state.first_name}/>
                
              </View>
              :
              <View>
                {/* <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
                    
                </TouchableOpacity> */}
                <Avatar source={this.state.ImageSource}
                rkType='round'
                name={this.state.first_name}/>
              </View>
              }
              </View>
              {/* handle error messsages */}
                  
              <View style={styles.section}>
                <View style={[styles.row, styles.heading]}>
                  <RkText rkType='header6 primary'>INFO</RkText>
              </View>

              <RkText style={{left:10,color: "red" }}>{(this.props.updateHasError && !this.state.first_name) ? "please, enter your First Name" : null}</RkText>
                <View style={styles.row}>   
                    <RkTextInput
                      label='First Name'
                      value={this.state.first_name}
                      inputStyle={{
                        textAlign:'right'
                      }}
                      rkType='right clear'
                      onChangeText={this.onFirstNameInputChanged}
                    />   
                </View>

                <RkText style={{ left:10,color: "red" }}>{(this.props.updateHasError&& !this.state.last_name) ? "pleaase, enter your Last Name" : null}</RkText>  
                  <View style={styles.row}> 
                      <RkTextInput
                        label='Last Name'
                        value={this.state.last_name}
                        inputStyle={{
                          textAlign:'right'
                        }}
                        onChangeText={this.onLastNameInputChanged}
                        rkType='right clear'
                      />
                  </View>

                  <View style={styles.row}>
                    <RkTextInput
                    labelStyle={{color:'#CCCCCC'}}
                      label='Email'
                      value={this.state.email}
                      inputStyle={{
                        textAlign:'right',
                        color:'#CCCCCC'
                      }}
                      editable={false}
                      rkType='right clear'
                    />
                  </View>

                <RkText style={{ left: 10,color: "red" }}>{(this.props.updateHasError || !this.state.emergency_phone) ? "pleaase, enter your Emergency Phone Number" : null}</RkText> 
                <View style={styles.row}>
                  <RkTextInput
                    keyboardType="numeric"
                    label='Emergency Phone'
                    inputStyle={{
                      textAlign:'right'
                    }}
                    value={this.state.emergency_phone}
                    onChangeText={this.onEmergencyInputChanged}
                    rkType='right clear'
                  />
                </View>

              <RkText style={{ left: 10,color: "red" }}>{(this.props.updateHasError || !this.state.phone) ? "pleaase, enter your Phone Number" : null}</RkText> 
                <View style={styles.row}>
                  <RkTextInput
                    keyboardType="numeric"
                    label='Phone'
                    inputStyle={{
                      textAlign:'right'
                    }}
                    value={this.state.phone}
                    onChangeText={this.onPhoneInputChanged}
                    rkType='right clear'
                  />
                </View>
              </View>
            
                {(this.state.first_name.length>15 || this.state.last_name.length>15||!this.state.phone||!this.state.emergency_phone ) ? 
                <View style={{alignItems:'center',top:5}}>
                  <RkButton
                    style={{backgroundColor: '#B3D137'}}
                    >SAVE</RkButton>
                </View>
                :
                <View style={{alignItems:'center',top:5}}>
                  <RkButton
                    onPress={this.doUpdate}
                    style={{backgroundColor: '#B3D137'}}
                   >SAVE</RkButton>
                </View>
                }
              <View style={styles.section}>
                <View style={[styles.row, styles.heading]}>

                </View>
               <View style={{height:30}}></View>
              </View>
              {/* <GradientButton rkType='large' style={styles.button} text='SAVE' /> */}
         </RkAvoidKeyboard>
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
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 12.5,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
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

      logout:() => dispatch(LoginActions.logout()),
      // Reset:() => dispatch(DashboardActions.Reset()),
      // Reset:() => dispatch(HealthReportActions.Reset()),
      // Reset:() => dispatch(TripsActions.Reset()),
      // Reset:() => dispatch(ProfileActions.Reset()),
      getProfile: (token) => dispatch(ProfileActions.getProfile(token)),
      updateProfile: (token,user_id,first_name,last_name,phone,emergency_phone) => dispatch(ProfileActions.updateProfile(token,user_id,first_name,last_name,phone,emergency_phone)),
      selected:(index) => dispatch(NavigationBottomActions.selected(index))


  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
