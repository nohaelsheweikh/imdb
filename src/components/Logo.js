import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
 } from "react-native";
 import { MediaQuery,MediaQueryStyleSheet  } from "react-native-responsive";
 import { scaleModerate, scaleVertical } from '../utils/scale';

 const screenSize = Dimensions.get('window');

  export default class Logo extends React.Component {
  render() {
    return (

        <View style={styles.container}>
          <Image style={styles.logo}
            source={require('../assets/images/logo-V.png')}/>
          <Text style={styles.logoText}> </Text>
        </View>

  

    );
  }
}



 const styles = MediaQueryStyleSheet.create(
  //Base styles:
  {
    container: {
      flex:1,
      marginTop:20,
      backgroundColor:'#13161d',
      justifyContent:'center',
      alignItems: 'center'
    },
    logo:{width: screenSize.width+scaleModerate(50, 1), height:200}
  },
  //Media Queries styles:
  {
      "@media (min-device-width: 320) and (max-device-height:720)": {
          container: {
             flex:2,
             backgroundColor:'#13161d',
             justifyContent:'center',
             alignItems: 'center',
             marginTop:20
            },
          logo:{width: screenSize.width+scaleModerate(50, 1), height:150}
      }
  },


);


