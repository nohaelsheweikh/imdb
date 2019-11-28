import React from "react";
import { View, Text, StatusBar,Image,Dimensions} from "react-native";
import Styles, { COLOR } from "../config/styles";
const { width,height } = Dimensions.get('window');

const Splash = () => (
    <View
        style={[
            Styles.container,
            { justifyContent: "center", alignItems: "center", backgroundColor: COLOR.DARK }
        ]}
    >
        <StatusBar backgroundColor={COLOR.PRIMARY} barStyle="light-content" />
        <Image rkCardImg source={require('../assets/splash.png')} style={{width:width,height:height}}/>
    </View>
);

export default Splash;
