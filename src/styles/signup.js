import { MediaQuery, MediaQueryStyleSheet } from "react-native-responsive";
import {StyleSheet,Dimensions} from "react-native";
import { scaleModerate, scaleVertical } from '../utils/scale';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';
const screenSize = Dimensions.get('window');

export default styles = RkStyleSheet.create(theme => ({
    screen: {
      padding: 16,
      flex: 1,
     
      

    },
    image: {
      marginTop: 10,
      height: scaleVertical(60),
      resizeMode: 'contain',
    },
    
    content: {
      justifyContent: 'space-between',
      marginTop:10,
      
      
    },
    save: {
      marginVertical: 20,
    },
    buttons: {
      flexDirection: 'row',
      marginBottom: 24,
      marginHorizontal: 24,
      justifyContent: 'space-around',
    },
    footer: {
      justifyContent: 'flex-end',
      marginTop:10
    },
    textRow: {
      flexDirection: 'row',
      top:10,
      justifyContent: 'center',
    },
  }));
  