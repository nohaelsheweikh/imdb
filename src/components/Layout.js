import React , { Component } from 'react';
import { View, ScrollView} from 'react-native';

import Footer from './Footer'


const Layout = (props) => {

  return (
    <View style={styles.containerStyle}>  
      <View style={styles.content}>
        {props.children}
      </View>
      {/* <Footer active={global.active} style={styles.bottom}/> */}
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
