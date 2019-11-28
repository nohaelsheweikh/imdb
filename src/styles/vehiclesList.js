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
          backgroundColor: "transparent",
          padding:'2%'
        },
        image:{width:65,height:65,borderRadius:65,top:10},
        Container:{
            flexDirection:'column',
            padding:'3%',
            top:'2%',
            width:'80%'
        },
        Card:{
          borderRadius: 7,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
        },
        content:{flexDirection:'row',justifyContent:'space-between'},
        year:{color:'#B4D237',fontWeight:'bold',fontSize:16},
        model:{color:'#A9A9A9',fontSize:14,padding:2},
        subContainer:{justifyContent:'space-between',flexDirection:'row',alignContent:'center'},
        joinDateTitle:{color:'#B4D237',alignSelf:'center',fontSize:12},
        joinDateItem:{color:'black',alignSelf:'center',top:5},
        lastActiveTitle:{color:'#B4D237',fontSize:12,alignSelf:'center'},
        lastActiveItem:{color:'black',alignSelf:'center',top:5},
        verticalLine:{ borderLeftWidth:1,height:60,borderLeftColor: '#d5d5d5'},
        scoreTitle:{color:'#B4D237',alignSelf:'center',fontSize:12},
        scoreItem:{color:'black',alignSelf:'center',top:5}
      },
       //Media Queries styles:
    {
      "@media (min-device-width: 540) and (max-device-height: 1280)": {
       
  }
},     
);