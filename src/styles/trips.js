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



const screenSize = Dimensions.get('window');
const { width } = Dimensions.get('window');
var Width = width-200
var smallWidth = width-160
const size = 120;
const fontSize = 25;
export default styles = MediaQueryStyleSheet.create({

    Card:{
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
      },
      cardContainer:{
        padding:'2%',
       },
       overlay:{
        height:80
       },
       overlayContent:{
        flexDirection:'row',
        justifyContent:'space-between',
        bottom:2
       },
       headerDate:{
        color:'#FFFFFF',
        fontSize:20,
        fontWeight:'bold',
        bottom:5
      },
      headerIcons:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        top:5
      },
      kmIcon:{
          paddingHorizontal:scale(20),
          flexDirection:'row'
        },
      footerVerticalLine:{ 
        borderLeftWidth: 2,
        height:20,
        borderLeftColor: '#d5d5d5'

      },
      dot:{
        backgroundColor:"#555" ,
        width:15,
        height:15,
        borderRadius:30,
        right:'40%'
      },
      footerSquareIcon:{
      backgroundColor:"#555" ,
      width:15,
      height:15,
      right:'40%'
      },
      iconContainer:{
       paddingHorizontal:'3%'
      },
      icon:{
        backgroundColor:"#B3D137" ,
        width:40,
        height:40,
        borderRadius:50
      },
      iconTopText:{
       lineHeight:25,
       color:'grey',
       textAlign:'center',
       fontSize:10
      },
      iconRightText:{
        left:5,
        top:'10%',
        fontSize:12,
        fontWeight:'bold'
      },
      verticalLine:{
        borderLeftWidth: 2,
        height:280,
        borderLeftColor: '#d5d5d5',
      },
      headerContainer:{
      top:'3%'
      },
      textHeader:{
        color:'black',
        textAlign:'left',
          
      },
      addressText:{
       flex:1,
       color:'black',
       lineHeight: 22,
       textAlign:'left',
       width:smallWidth
       
      },
      dateText:{
        color:'#b3d137',
        lineHeight: 22,
       },
       iconRow:{
        flexDirection:'flex-end',
        flexDirection:'row',
        padding:5,
        left:'10%',
        bottom:5
       }
      },
       //Media Queries styles:
    {
      "@media (min-device-width: 540) and (max-device-height: 1280)": {
        addressText:{
          fontSize:scale(9),
          color:'black',
          lineHeight: 22,
          width:Width
          
         },
         iconRow:{
          flexDirection:'flex-end',
          flexDirection:'row',
          padding:5,
          left:'30%',
          bottom:15

         },
         iconContainer:{
          top:30,
          paddingHorizontal:'5%'
         },
        },

//Media Queries styles:
 
"@media (max-device-width: 320) and (max-device-height: 720)": {

  iconRow:{
    flexDirection:'flex-end',
    flexDirection:'row',
    padding:5,
    left:'7%',
    bottom:5
   },
   verticalLine:{
    borderLeftWidth: 2,
    height:350,
    borderLeftColor: '#d5d5d5',
  },

   
}

}

);