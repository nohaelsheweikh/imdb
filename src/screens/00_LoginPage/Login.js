import React, { Component } from "react";
import { View, Text, StatusBar, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Card,Input ,Button} from 'react-native-elements'
import CustomLoading from "../../components/loading";
import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import { connect } from "react-redux";
import styles from '../../styles/login'
import Logo from '../../components/Logo'

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
            user: "nohahamdy",
            password: "k73iyDje7AMaVBe"
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


                    <View>
                        <StatusBar
                            backgroundColor={COLOR.PRIMARY}
                            barStyle="light-content"
                        />
                         <Logo/>
                         
                         <View style={styles.containerCard}>
                            {this.renderError(this.props.state.authError)}

                            <View style={{ height: 8, backgroundColor:COLOR.PRIMARY }} />

                             <View style={{ height: 16 }} />
                                <View style={{width:'90%'}}>
                                    <Button  
                                        buttonStyle={{ backgroundColor: COLOR.SECONDARY,
                                        height: 55,
                                        borderRadius: 25}} 
                                        onPress={() =>
                                        this.props.actions.login(this.state.user, this.state.password)
                                        }
                                        title={'LOGIN'}
                                    />   
                                </View>
                          
                             
                        </View>
                      
                </View>
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
