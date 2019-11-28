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

export default styles = MediaQueryStyleSheet.create({

    root: {
        backgroundColor: "#FFFFFF",
      },
      header: {
        backgroundColor:"#FFFFFF",
        paddingVertical: 12,
      },
      section: {
        marginVertical: 25,
      },
      heading: {
        paddingBottom: 12.5,
      },
      row: {
        flexDirection: 'row',
        paddingHorizontal: 17.5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#CCC",
        alignItems:'center',
      },
      button: {
        marginHorizontal: 16,
        marginBottom: 32,
      },
      column:{flexDirection:'column',width:'50%'},
      title:{color:'#CCC',padding:13},
      Mainrow:{
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:20,
          padding:10,
          alignItems:'center',
          left:'3%'},
          subTitle:{padding:20,color:"#595d5e"},         
      },
       //Media Queries styles:
    {
      "@media (min-device-width: 540) and (max-device-height: 1280)": {
        Mainrow:{
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:20,
          padding:10,
          alignItems:'center',
          left:'6%'},
          
               
  }
},     
);