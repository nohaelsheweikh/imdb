import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Modal,
  Text,
  TextInput,
  Alert,
  Platform,
  Image,
  BackHandler,
  RefreshControl,
  processColor,
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkTabSet,
  RkTab,
  RkButton,
  RkComponent,

} from 'react-native-ui-kitten';

import { FontAwesome } from '../../assets/icons';
import IconF from 'react-native-vector-icons/Foundation'
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import IconM from 'react-native-vector-icons/MaterialIcons'
import { ActionButton , Badge, Icon, Avatar } from 'react-native-material-ui';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import styles from '../../styles/dashboard'
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';

const chartBackgroundStyle = { backgroundColor: "white"};


export class Battery extends React.PureComponent {
    state = {
      data:[],
      themeColor:''
    };
   

    componentWillReceiveProps(nextProps) {
      // console.log('batterynextprops',nextProps)

      if (nextProps.battery !== this.props.battery) {
        this.setState({
          data: nextProps.battery
        });
      }
    }

    
  

componentWillMount(){
    this.setState({data:this.props.battery})
  }
   componentDidMount() {
     //this.setStateInterval = setInterval(this.updatePercent, 1500);
   }


render = () => (

    <View style={[styles.batteryBlock,chartBackgroundStyle]}>
        <View style={{flexDirection: 'row'}}>
          <RkText rkType='header4' style={styles.batteryTitle}>BATTERY STATUS</RkText>
        </View>
      <View style={styles.chartBlock}>
        <RkText style={{top:10}}>
          {this.state.data.battery.status=1 ?
              <IconF
                name='battery-full'
                color='#D4E157'
                size={scale(122)}
              />
            :
            <IconF
                name='battery-empty' 
                color='red'
                size={scale(122)}
              />
          }
        </RkText>
      {this.state.data.battery.status=1 ?
      <View>
        <RkText rkType='header4' style={{fontWeight:'bold'}}>{this.state.data.battery.voltage} V</RkText>
        <RkText style={{color:'#B3D137',fontWeight:'bold'}}rkType='header4'>GOOD</RkText>
      </View>
        :
      <View>
        <RkText rkType='header4'>{this.state.data.battery.voltage} V</RkText>
        <RkText  style={{color:'red',fontWeight:'bold'}}rkType='header4'>Critical</RkText>   
      </View>
    }
  </View>
</View>
  );
}
