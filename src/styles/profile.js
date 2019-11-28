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
      backgroundColor: theme.colors.screen.base,
    },
    header: {
      backgroundColor: theme.colors.screen.neutral,
      paddingVertical: 25,
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
  }));