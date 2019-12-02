import React , { Component } from 'react';
import { View, ScrollView,StatusBar} from 'react-native';
import Styles, { COLOR } from "../config/styles";



const Layout = (props) => {

  return (
    <View style={styles.containerStyle}> 
      <StatusBar
        backgroundColor={COLOR.PRIMARY}
        barStyle="light-content"
        /> 
      <View style={styles.content}>
        {props.children}
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex:7,
    elevation: 3,
   
  },
  bottom: {
    flex: 1,
  },
  content: {
    flex: 1,
  },

  header: {
    flex: 1,
  }
};

export { Layout };
