import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
    UIActivityIndicator,  
  } from 'react-native-indicators';
export default class indicator extends Component {
    render(){
        const {
            loading,
            ...attributes
        } = this.props;
        return (
            <View>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <UIActivityIndicator
                            size={28} color="#13161d"
                            animating={loading} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor: '#00000040',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        bottom:0


    },
    activityIndicatorWrapper: {
       // backgroundColor: '#FFFFFF',
       backgroundColor:'transparent',
        height: 50,
        width:50,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});