import React, { Component } from "react";
import { MainStack, LoginStack,AppNavigator } from "../config/router";
import Splash from "./splash";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";
import {StackNavigator,withNavigation} from 'react-navigation';
import Loader from './../components/Loader';

class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
          };
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.props.actions.restoreSession();
        // }, 2000);
        
        this.props.actions.restoreSession()
        .then(res => this.setState({ signedIn: this.props.state.isAuth, checkedSignIn: true }))
        .catch(err => alert("An error occurred"));

        // _bootstrapAsync = () => {
        //     this.props.actions.restoreSession().then(() => {
        //         this.props.navigation.navigate(this.props.state.isAuth !== null ? 'MainStack' : 'LoginStack');
        //     })
        //         .catch(error => {
        //             this.setState({ error })
        //         })
    
        // };
    }

    render() {
        
        if (this.props.state.requestingRestore) {
            return <Loader loading={true} />;
        }

        if (this.props.state.isAuth) {
            
                // let routes = this.props.navigation.state.routes;
                // console.log('route',routes)
            
            return <MainStack navigation={this.props.navigation} />;
        } else {
            return <LoginStack />;
        }
    }
}

export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(Root);
