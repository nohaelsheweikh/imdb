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
  import IconF from 'react-native-vector-icons/Feather'
export default class SucessModal extends Component {
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
                            <IconF
                                name='sun'
                                color='#FFFFFF'
                                size={24}
                            />
                            <RkText rkType='header primary' style={{left:10,color:'#FFFFFF',fontWeight:'bold'}}> Success !</RkText>
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
        backgroundColor: '#06c753',
        height:150,
        width:'100%',
        top:0
      },
});