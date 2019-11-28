import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet,NetInfo } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ErrorModal from '../components/ErrorModal'
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
  RkSwitch,
  RkButton, 
} from 'react-native-ui-kitten';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    notConnected:global.notConnected
  };

  componentDidMount() {
    // console.log(' NetInfo.isConnected',this.state.isConnected)
   
  }

  componentWillUnmount() {
  }

  

  render() {
   
      return (
        <ErrorModal loading={this.state.notConnected}>   
        <View style={{justifyContent:'center',top:10}}>
          <RkText rkType='header primary' style={{color:'#FFFFFF',left:10}}>No Internet Connection !</RkText> 
      </View>   
     </ErrorModal>
      )
    
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;