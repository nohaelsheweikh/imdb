import React, { Component } from "react";
import { View, Text, StatusBar, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Card,Input ,Button} from 'react-native-elements'

import CustomButton from "../components/button";
import CustomInput from "../components/input";
import CustomLoading from "../components/loading";
import Styles, { COLOR } from "../config/styles";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";
import styles from '../styles/login'
import Logo from '../components/Logo'
import {
    RkButton,
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkStyleSheet,
    RkTheme,
  } from 'react-native-ui-kitten';
  import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTintColor: COLOR.LIGHT,
        headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: COLOR.PRIMARY
        }
    }); // navigationOptions

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    renderError(error) {
        if (error) {
            return (
                <View
                    style={{
                        height: 40,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ffffff',
                        backgroundColor: COLOR.DANGER
                    }}
                >
                    <Text style={{ color: '#ffffff' }}>{error}</Text>
                </View>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{backgroundColor:COLOR.PRIMARY}}>

                    <View>
                        <StatusBar
                            backgroundColor={COLOR.PRIMARY}
                            barStyle="light-content"
                        />
                         <Logo/>
                         
                         <View style={styles.containerCard}>
                            {this.renderError(this.props.state.authError)}

                            <View style={{ height: 8, backgroundColor:COLOR.PRIMARY }} />

                            <Input
                                placeholderTextColor={"#FFFFFF"}
                                inputStyle={{color:"#FFFFFF"}}
                                shake={true}
                                value={this.state.email}
                                placeholder="Email"
                                onChangeText={v => this.setState({ email: v })}
                                leftIcon={
                                    <Icon
                                      name='envelope'
                                      size={20}
                                      color={COLOR.SECONDARY}
                                    />
                                }
                            />
                            <View style={{ height: 8 }} />
                            <Input
                                placeholderTextColor={"#FFFFFF"}
                                inputStyle={{color:"#FFFFFF"}}
                                shake={true}
                                value={this.state.password}
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={v => this.setState({ password: v })}
                                leftIcon={
                                    <Icon
                                      name='lock'
                                      size={24}
                                      color={COLOR.SECONDARY}
                                    />
                                  }
                            />
                             <View style={{ height: 16 }} />
                            <View style={{width:'90%'}}>
                            <RkButton  
                                    style={{ backgroundColor: '#B3D137',
                                    height: 55,
                                    borderRadius: 25}} 
                                    rkType='stretch' 
                                    onPress={() =>
                                        this.props.actions.login(this.state.email, this.state.password)
                                        }>
                                    LOGIN
                                </RkButton>
                                </View>
                          
                                
                           
                           
                        </View>
                        <View style={styles.footer}>     
                       <View style={styles.textRow}> 
                         
                         <RkText rkType='primary3' style={{color:'#FFFFFF'}}>Don’t have an account? </RkText>
                           
                           <RkButton rkType='clear'>
                                <RkText rkType='header6' onPress={this.onSignUpButtonPressed} style={{color: '#B3D137'}}>Sign up now</RkText>
                           </RkButton>    
                       </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                {/* <View> */}
                    <CustomLoading loading={this.props.state.requestingAuth} />
                {/* </View> */}
            </View>
        );
    }
}

export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(Login);
