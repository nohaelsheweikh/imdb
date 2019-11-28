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
import { scaleModerate, scaleVertical } from '../../utils/scale';
import styles from '../../styles/dashboard'
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';



export class Blocks extends React.PureComponent {
    state = {
      data:[],
      themeColor:''
    };
   

    componentWillReceiveProps(nextProps) {
      if (nextProps.block !== this.props.block) {
        this.setState({
          data: nextProps.block
        });
      }
    }


   componentDidMount() {
     this.setState({data:this.props.block})
   }

   

render = () => (

    <View style={styles.cardContainer}>
     <View >
     <TouchableOpacity
        onPress={() => {
        Actions.TripsList()
        global.active = 'TripsList';
        }
        }
        >
      {/* trips */}
      <View style={[styles.statItemContainer, { backgroundColor:'#B3D137' }]} >
        <View>
          <RkText rkType='header6' style={styles.statItemValue}>Trips</RkText>
          <RkText rkType='secondary7' style={styles.statItemName}>{this.state.data.num_of_trips}</RkText>
        </View>
        <RkText rkType='awesome hero' style={styles.statItemIcon}>
        <IconF5
          name='car'
          color='#FFFFFF'
          size={24}
        />
        </RkText>
      </View>
   </TouchableOpacity>
</View>
  
{/* kilometers */}
<View style={{paddingHorizontal:'2%'}}>
  <View style={[styles.statItemContainer, { backgroundColor:'#B3D137' }]} >
    <View>
      <RkText rkType='header6' style={styles.statItemValue}>Kilometers</RkText>
      <RkText rkType='secondary7' style={styles.statItemName}>{this.state.data.kilometers} </RkText>
    </View>
    <RkText rkType='awesome hero' style={styles.statItemIcon}>
      <IconF5
        name='tachometer-alt'
        color='#FFFFFF'
        size={24}
      />
    </RkText>
  </View>
</View>

 {/* faults */}
<View>
  <View style={[styles.statItemContainer, { backgroundColor:'#B3D137' }]} >
    <View>
      <RkText rkType='header6' style={styles.statItemValue}>Faults</RkText>
      <RkText rkType='secondary7' style={styles.statItemName}>{this.state.data.num_of_faults}</RkText>
        </View>
        <RkText rkType='awesome hero' style={styles.statItemIcon}>
        <IconM
          name='error-outline'
          color='#FFFFFF'
          size={24}
        />
     </RkText>
    </View>
  </View>
</View>
  );
}
