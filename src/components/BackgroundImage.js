import { Text, View,ImageBackground,StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { scaleModerate, scaleVertical } from '../utils/scale';

export default class BackgroundImage extends Component {

    render() {
        return (
            <ImageBackground  style={styles.backgroundImage} source={require('../assets/images/splash.png')}>
                    
                    {this.props.children}
                    
           </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        resizeMode: 'cover'
    }
});