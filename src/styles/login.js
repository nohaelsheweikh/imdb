import { MediaQuery, MediaQueryStyleSheet } from "react-native-responsive";
import {StyleSheet} from "react-native";
import { scaleModerate, scaleVertical } from '../utils/scale';

export default loginStyles = 

MediaQueryStyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#13161d',
  },
  
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
    tintColor:'#8BC34A'
  },
  container: {
    paddingHorizontal: 17,
    flex: 1,
    height:'100%',
    backgroundColor: '#13161d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCard: {
    paddingHorizontal: 22,
    flex: 1,
    height:'100%',
    backgroundColor: '#13161d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    paddingHorizontal: 12,
    flex: 1,
    backgroundColor: '#13161d',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
    
   
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
  },
  button: {
    marginHorizontal: 14,
  },
  save: {
    marginVertical: 9,
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
},
//Media Queries styles:
{
  "@media (min-device-width: 320) and (max-device-height: 720)": {
      
        
        container: {
          paddingHorizontal: 17,
          flex: 3,
          backgroundColor: '#13161d',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        },
        containerCard: {
          paddingHorizontal: 22,
          flex: 3,
          backgroundColor: '#13161d',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        },
        containerButton: {
          paddingHorizontal: 12,
          flex: 1,
          backgroundColor: '#13161d',
          alignItems: 'center',
          justifyContent: 'center',
          
        },
      }
    }

);

