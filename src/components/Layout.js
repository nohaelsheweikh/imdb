import React , { Component } from 'react';
import { View, ScrollView} from 'react-native';



const Layout = (props) => {

  return (
    <View style={styles.containerStyle}>  
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
