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
import { scale } from '.././utils/scale';

const size = 120;
const fontSize = 25;

const screenSize = Dimensions.get('window');
const { width,height } = Dimensions.get('window');
var Height =height+100
var Padding = width-550
batteryHeight=height-300
export default Styles = 
MediaQueryStyleSheet.create({
    screen: {
        backgroundColor: 'grey',
        paddingHorizontal: 15,
        zIndex:999999999

      },
      statItems: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
      },
      items:{
        paddingHorizontal:'8%'
      },
      
      statItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 3,
        paddingHorizontal: '3.6%',
        paddingVertical: 11,
      },
      cardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'center',
      },
      statItemIcon: {
        alignSelf: 'center',
        marginLeft: '6%',
        color: '#FFFFFF',
      },
      statItemValue: {
        color: '#FFFFFF',
        
      },
      statItemName: {
        color: '#FFFFFF',
        fontWeight:'bold'
      },
      chartBlock: {
        padding: 10,    
        justifyContent: 'center',
        
      },
      progressChartBlock:{
        padding: 15,
        marginBottom: 15,
        justifyContent: 'center',
        width:'50%',
      },
      batteryBlock:{
        left: 3,
        marginBottom:15,
        padding:'3%',
        width:'50%',

      },
      layer:{
        backgroundColor:'#00000080',
        height:'100%'
      },
      modalContainer:{
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height:350,
        width:'100%',
        top:'30%'
      },
      buttonContainer:{
        backgroundColor:'#F44336',
        borderRadius:50,
        borderWidth: 1,
        width:65,
        height:65,
        borderColor:'#e0dede',
        alignSelf:'flex-end',
        right:5,
        zIndex:999999,
        // transform: [{ rotate: "350deg"}]  
      },
     
    footer: {
      justifyContent: 'flex-end',
      flex: 1,
      
    },
    batteryTitle:{
      fontSize:20,
      fontWeight:'bold',
      top:scale(23)
    }
   
    
    
},
    //Media Queries styles:
    {
        "@media (min-device-width: 540) and (max-device-height: 1280)": {
          statItemContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 3,
            paddingHorizontal:'7%',
            paddingVertical: 11,
          },
          batteryTitle:{top:scale(19)},
    
        chartBlock: {
          padding: 15,
          justifyContent: 'center',
          
        },
  },

 //Media Queries styles:
 
    "@media (max-device-width: 320) and (max-device-height: 720)": {

      statItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 3,
        paddingHorizontal: '2%',
        paddingVertical: 11,
      },
      cardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'center',
      },
      statItemIcon: {
        alignSelf: 'center',
        marginLeft: '4%',
        color: '#FFFFFF',
      },

       
}
}

);
