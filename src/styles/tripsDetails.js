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
      dot:{
        backgroundColor:"#B3D137" ,
        width:25,
        height:25,
        borderRadius:30,
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
       //textAlign:'center',
       fontSize:10
      },
      iconRightText:{
        left:5,
        top:'10%',
        fontSize:10
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
          color:'#CCCCCC',
          fontWeight:'bold'
      },
      addressText:{
       color:'black',
       lineHeight: 22,
       width:'40%'
       
      },
      dateText:{
        color:'#b3d137',
        lineHeight: 22,
       },
       Date:{
           flexDirection:'row',
           justifyContent:'flex-start',
           backgroundColor:'#B3D137',
           color:'white'
        },
        rowDetails:{
            flexDirection:'row',
            left:'5%',
            flex:1,
            
        },
        iconRow:{
            flexDirection:'row', 
            flex: 1,
            paddingHorizontal:'6%',
            justifyContent:'flex-start',
            left:'3%'
        },
        column:{
            flexDirection:'column',
            width:'50%'
        },
        text:{
            color:'#b3d137',
            fontWeight:'bold',
            fontSize:22,
            bottom:7
        }
      },
       //Media Queries styles:
    {
      "@media (min-device-width: 540) and (max-device-height: 1280)": {
        rowDetails:{
            flexDirection:'row',
            left:'10%'
        },
        iconRow:{
            flexDirection:'row', 
            justifyContent: 'flex-start',
            padding:'3%',
            left:'10%'
        },
  }
},     
);