import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";
import { View, 
        Text,
        TextInput,
        Button,
        StyleSheet,
        Image,
        Dimensions,
        Keyboard,
        ScrollView
      
 } from 'react-native';
import LoginActions from '../../actions/Login';
import RegisterActions from '../../actions/Register';
import { Layout } from '../../components';
import Loader from '../../components/Loader';
import OfflineNotice from '../../components/OfflineNotice'

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
  import styles from '../../styles/signup'
  import Logo from '../../components/Logo'
  import Orientation from 'react-native-orientation';


 
  
class SignUp extends Component {
    constructor(props){
        super(props);

        this.state = {
          email: '',
          first_name: '',
          last_name: '',
          password: '12345678',
          confirmPassword: '12345678',
          validated : true,
          passowrdValidated:true,
          disable:false

          
      }
      this.doRegister = this.doRegister.bind(this)
      this.emailValidate = this.emailValidate.bind(this)
      this.passwordValidate = this.passwordValidate.bind(this)
      
    }
    
    getThemeImageSource = (theme) => (
        
          require('../../assets/images/Hood.png') 
      );
    
      renderImage = () =>
       (
        <Image style={styles.image} source={this.getThemeImageSource(RkTheme.current)} />
      );
     
      errorHandler=(text)=>{
      this.setState({disable:true})
      return(
        <Text>Please enter</Text>,text
      )
      }

      

      passwordValidate = (text) => {     
         if(this.state.password.length<8){
           this.setState({password:text})
            this.setState({passowrdValidated:false,disable:true})
            return false
          }
        else {
          this.setState({password:text})
          this.setState({ passowrdValidated:true})
        }
        }

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
        
      doRegister() {
        let { first_name, last_name,email,password } = this.state;
        this.props.register( first_name, last_name,email, password);
    }
    
  onSignInButtonPressed = () => {
    Actions.Login();
  };
  
  componentDidMount(){
    Orientation.lockToPortrait();

  }
    render(){
        let { hasError, isLogged, isLoading } = this.props;
        return (
        
          <ScrollView style={{backgroundColor: '#13161d'}}>   
            <RkAvoidKeyboard
              style={styles.screen}
              onStartShouldSetResponder={() => true}
              onResponderRelease={() => Keyboard.dismiss()}>
            <View style={{ alignItems: 'center', }}>
              {this.renderImage()}
              <Loader loading={isLoading} />
              <OfflineNotice/>
            </View>
            <View style={styles.content}>
             
              <Text style={{ marginTop: 0, color: "red" }}>{(hasError && !this.state.first_name) ? "pleaase, enter your First Name" : null}</Text>
              <Text style={{ marginTop: 0, color: "red" }}>{(this.state.first_name.length>15) ? "your First Name shouldn't contain more than 15 characters ! " : null}</Text>
                <RkTextInput
                  // rkType='rounded'
                  placeholder='First Name'
                  onChangeText={(first_name) => this.setState({ first_name })}
                  style={{  backgroundColor: 'white'}}
                  />
              <Text style={{ marginTop: 0, color: "red" }}>{(hasError && !this.state.last_name) ? "pleaase, enter your Last Name" : null}</Text>
              <Text style={{ marginTop: 0, color: "red" }}>{(this.state.last_name.length>15) ? "your Last Name shouldn't contain more than 15 characters ! " : null}</Text>

                <RkTextInput
                  // rkType='rounded'
                  placeholder='Last Name'
                  style={{  backgroundColor: 'white'}}
                  onChangeText={(last_name) => this.setState({ last_name })}
                   />
              <Text style={{ marginTop: 0, color: "red" }}>{(hasError && !this.state.email) ? "please, enter your Email" : null}</Text>
              <Text style={{ marginTop: 0, color: "red" }}>{(this.state.validated==false) ? "please, enter valid Email" : null}</Text>
                <RkTextInput
                //  rkType='rounded'
                  style={{  backgroundColor: 'white'}}
                  placeholder='Email'
                  onChangeText={(text) => this.emailValidate(text)}
                  />
              <Text style={{ marginTop: 0, color: "red" }}>{(hasError && !this.state.password) ? "pleaase, enter your Password" : null}</Text>
              <Text style={{ marginTop: 0, color: "red" }}>{(this.state.password.length<8) ? "passowrd is too short" : null}</Text>

                <RkTextInput
                //  rkType='rounded'
                 style={{  backgroundColor: 'white'}}
                  placeholder='Password'
                  onChangeText={(text) => this.passwordValidate(text)}
                  secureTextEntry />
              <Text style={{ marginTop: 0, color: "red" }}>{(hasError && !this.state.confirmPassword) ? "pleaase, Confirm your Password" : ""}</Text>
              <Text style={{ marginTop: 0, color: "red" }}>{(this.state.password!==this.state.confirmPassword) ? "doesn't match your password" : ""}</Text>

                <RkTextInput 
                //  rkType='rounded'
                 style={{  backgroundColor: 'white'}}
                 placeholder='Confirm Password'
                 onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                 secureTextEntry />
          
       {(this.state.first_name.length>15 || this.state.last_name.length>15 || this.state.validated==false || this.state.password.length<8 || this.state.password!==this.state.confirmPassword ) ? 
          null:

                <RkButton  
                      style={{ backgroundColor: '#B3D137',
                      height: 55,
                      borderRadius: 25,top:10}} 
                      rkType='stretch' 
                      onPress={this.doRegister}>
                      SIGN UP
              </RkButton>
       }
              <View style={styles.footer}>
              {hasError?
                <View style={styles.textRow}>
                   <RkText rkType='primary3' style={{color:'red'}}>{this.props.msg} </RkText>    
                </View>
                    :  
                 <View style={styles.textRow}>           
                    <RkText rkType='primary3' style={{color:'#FFFFFF'}}>Already have an account? </RkText>  
                    <RkButton rkType='clear' onPress={this.onSignInButtonPressed}>
                      <RkText rkType='header6' style={{color: '#B3D137'}}>Sign in now</RkText>
                    </RkButton>
                 </View>
              }
              <View style={{height:60}}></View>
              </View>
            </View>
          </RkAvoidKeyboard>
          </ScrollView> 
        )
    }
}

const mapStateToProps = (state) => {
  const { isLoading, hasError, isRegistered,  msg } = state.register;
  return {
      isRegistered: isRegistered,
      hasError: hasError,
      isLoading: isLoading,
      msg: msg
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      register: (first_name, last_name,email,password) => dispatch(RegisterActions.register(first_name, last_name,email, password)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
