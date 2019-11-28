import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";
import { View, 
        Text,
        TextInput,
        Button,
        StyleSheet,
        Image,
        ImageBackground,
        Dimensions,
        Keyboard,
        TouchableOpacity,
        BackHandler,
        BackAndroid,
        SafeAreaView,
        AsyncStorage
 } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistCombineReducers } from "redux-persist";
import LoginActions from '../../actions/Login';
import TripsActions from '../../actions/Trips';
import HealthReportActions from '../../actions/HealthReport';
import DashboardActions from '../../actions/Dashboard';
import ProfileActions from '../../actions/Profile'

import Loader from '../../components/Loader';
  import {
    RkButton,
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkStyleSheet,
    RkTheme,
  } from 'react-native-ui-kitten';
  import { FontAwesome } from '../../assets/icons';
  import { scaleModerate, scaleVertical } from '../../utils/scale';
 
  //import anim from '../../assets/anim/blue_car.json';
  import BackgroundImage from '../../components/BackgroundImage'
  import styles from '../../styles/login'
  import Logo from '../../components/Logo'
  import OfflineNotice from '../../components/OfflineNotice'
  import Orientation from 'react-native-orientation';
  import {persistor} from '../../store/configureStore'
 

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: " ",
            pass: " ",
            open:false,
            validated:true
            // email: "ashraf@hoodeg.com",
            // pass: "!Computer",
        }
        this.doLogin = this.doLogin.bind(this)
    }
    // {
    //   "username": "nohahamdy",
    //   "password": "k73iyDje7AMaVBe",
    //   "request_token": "03262f29490e40d26af351113227fc53239f571e"
    // }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        Orientation.lockToPortrait();

      }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        this.keyboardDidShowListener = Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
    }
   
      _keyboardDidShow = () => {
        this.setState({open: true});
       
      }
    
      _keyboardDidHide = () => {
        this.setState({open: false});
      }
    
    getThemeImageSource = (theme) => (
       
          require('../../assets/images/logo-V.png')
      ); 
      
    emailValidate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
          this.setState({validated:false,disable:true})
          this.setState({email:text})
        return false;
          }
         
        else {
          this.setState({email:text})
          this.setState({validated:true})
        }
        }
    handleBackButton() {
    //    Actions.Login()
    BackHandler.exitApp()
    // RNExitApp.exitApp()
    return true;
    } 
    
     renderImage = () => {
        const screenSize = Dimensions.get('window');
        const imageSize = {
          width: screenSize.width+scaleModerate(50, 1),
          height: screenSize.height - scaleModerate(375, 1),
        };
        return (
          < ImageBackground
            style={[styles.image, imageSize]}
            source={this.getThemeImageSource(RkTheme.current)}
          />
        );
      };
      doLogin(){
       
        global.isLogged = false
        let { email, pass } = this.state;
        this.props.login(email, pass);   

 
    }

    onSignUpButtonPressed = () => {
        Actions.SignUp();
     };
     render(){
        let { hasError, isLogged, isLoading } = this.props;
        const screenSize = Dimensions.get('window');
        return (
            
            <RkAvoidKeyboard
                    onStartShouldSetResponder={() => true}
                    onResponderRelease={() => Keyboard.dismiss()}
                    style={styles.screen}>
                     <Logo/>
                    <View style={styles.container}>
                     <Loader loading={isLoading} />   
                     <Text style={{ marginTop: 0, color: "red" }}>{(!this.state.email) ? "please, enter your Email" : null}</Text>
                     <Text style={{ marginTop: 0, color: "red" }}>{(this.state.validated==false) ? "please, enter valid Email" : null}</Text>

                    <RkTextInput 
                        // rkType='rounded'
                        placeholder='Email'
                        style={{  backgroundColor: 'white'}}
                        returnKeyType={'next'}
                        labelStyle={{color: 'gray'}}       
                        onChangeText={(text) => this.emailValidate(text)}
                    />
          
                    <RkTextInput 
                        // rkType='rounded'
                        style={{  backgroundColor: 'white'}}
                        placeholder='Password' 
                        secureTextEntry 
                        placeholderTextColor={'rgba(54, 173, 164, .2)'}
                        returnKeyType={'next'}
                        autoCapitalize={'none'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(pass) => this.setState({pass})} 
                    />
                    

                   <Text style={{ marginTop: 0, color: "red" }}>{(!this.state.pass) ? "please, enter your Password" : null}</Text>

                    {this.state.email.length <= 1||this.state.pass.length <= 1||this.state.validated==false?
                      <RkButton  
                      style={{ backgroundColor: '#B3D137',
                      height: 55,
                      borderRadius: 25}} 
                      rkType='stretch' 
                      onPress={this.error}
                     >
                     LOGIN
                    </RkButton>
                    :
                    <RkButton  
                       style={{ backgroundColor: '#B3D137',
                       height: 55,
                       borderRadius: 25,}} 
                       rkType='stretch' 
                      onPress={this.doLogin}>
                      LOGIN
                    </RkButton>
                    }
                 {this.state.email.length>1||this.state.pass.length>1 ?
                 null
                 :
                <RkAvoidKeyboard
                onStartShouldSetResponder={() => true}
                onResponderRelease={() => Keyboard.dismiss()}
                style={styles.screen}
                >
                {this.state.open ?
                 null
                 :   
                    <View style={styles.footer}>
                       
                    {hasError?
                    <View style={styles.textRow}>
                        
                        <RkText rkType='primary3' style={{color:'red'}}>Please check Email/Password </RkText>
                    </View>
                    :
                    <SafeAreaView >
                     
                    <View style={styles.textRow}> 
                      
                        <RkText rkType='primary3' style={{color:'#FFFFFF'}}>Don’t have an account? </RkText>
                        <RkButton rkType='clear'>
                        <RkText rkType='header6' onPress={this.onSignUpButtonPressed} style={{color: '#B3D137'}}>Sign up now</RkText>
                        </RkButton>    
                    </View>
                </SafeAreaView>
                    }
                    </View>
                
                    }
             </RkAvoidKeyboard>
                    }
                </View>
            </RkAvoidKeyboard>
                
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        isLogged: state.login.isLogged,
        hasError : state.login.hasError,
        isLoading: state.login.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(LoginActions.login(email, password)),
        getDashboard:(token) => dispatch(DashboardActions.getDashboard(token)),
        getProfile: (token) => dispatch(ProfileActions.getProfile(token)),
        getHealthReport:(token) => dispatch(HealthReportActions.getHealthReport(token)),
        getTripsList:(token,page) => dispatch(TripsActions.getTripsList(token,page)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
