import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkTheme,
    RkStyleSheet,
    RkSwitch,
    RkButton, 
  } from 'react-native-ui-kitten';
  import IconM from 'react-native-vector-icons/MaterialIcons'
export default class ErrorModal extends Component {
    render(){
        const {
            loading,
            ...attributes
        } = this.props;
        return (
            <Modal
                transparent={true}
                animationType="slide"
                visible={loading}>
                 <View style={styles.layer}>
                    <View style={styles.modalContainer}>
                        <View style={{flexDirection:'row'}}>
                            <IconM
                                name='error-outline'
                                color='#FFFFFF'
                                size={24}
                            />
                            <RkText rkType='header primary' style={{left:10,color:'#FFFFFF',fontWeight:'bold'}}>Error !</RkText>
                        </View>
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    layer:{
        backgroundColor:'#00000080',
        height:'100%'
      },
      modalContainer:{
        flex: 0,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'column',
        backgroundColor: '#b52424',
        height:120,
        width:'100%',
        top:0
      },
});