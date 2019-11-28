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
    root: {
      backgroundColor: "transparent",
    },
    header: {
      backgroundColor: theme.colors.screen.neutral,
      paddingVertical: 25,
    },
    cardContainer:{
     padding:'2%',
  
    },
    Card:{
      borderRadius: 7,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    ServicetHearderText:{
     color:'red',
     fontSize:20,
    },
    ModerateHearderText:{
      color:'#FDC107',
      fontSize:20,
     },
    LowHearderText:{
      color:'#06c753',
      fontSize:20,
     },
    details:{
      color:'#000000',
      fontSize:16
    },
    dateHearderText:{
      color:'grey',
      fontSize:12,
      top:7,
      justifyContent: 'flex-end',
      right:0
  
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
      borderColor: theme.colors.border.base,
      alignItems: 'center',
    },
    button: {
      marginHorizontal: 16,
      marginBottom: 32,
    },
    serviceIcon:{
        backgroundColor:'red',
        width:80,
        height:80,
        borderRadius:50
    },
    moderateIcon:{
        backgroundColor:'#FDC107',
        width:80,
        height:80,
        borderRadius:50
    },
    lowIcon:{
        backgroundColor:'#06c753',
        width:80,
        height:80,
        borderRadius:50
    },
    iconText:{
        color:'white',
        fontWeight:'bold',
        fontSize:22,
        left:32,
        top:25
    },
    description:{
        flexDirection:'column',
        padding:'3%',
        top:'2%',
        width:'80%'
    },
    brand:{color:'#000000',alignSelf:'flex-start',fontSize:16}
  }));