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
  AsyncStorage
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage'
import {
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkTheme,
    RkStyleSheet,
    RkSwitch,
    RkButton,
    RkTabSet,
    RkTabSetItem,
    RkTabView,
    RkCard,
    RkComponent
  } from 'react-native-ui-kitten';
  import { FontAwesome } from '../../assets/icons';
import IconF from 'react-native-vector-icons/Foundation'
import { Layout, Gallery } from '../../components';
import Loader from '../../components/Loader';
import MaterialTabs from 'react-native-material-tabs';
import styles from '../../styles/healthReport'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import { ActionButton , Badge, Icon, Avatar } from 'react-native-material-ui';
import { scaleModerate, scaleVertical } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';


export class Moderate extends React.PureComponent {
    state = {
      data:[],
      themeColor:''
    };
   

    componentWillReceiveProps(nextProps) {
      if (nextProps.moderate !== this.props.moderate) {
        this.setState({
          data: nextProps.moderate
        });
      }
    }



componentWillMount(){

  
  }
   componentDidMount() {
     this.setState({data:this.props.moderate})
   }


render = () => (
    this.state.data.map((item, index) => {
        return(
       <View key = {item.id} style={styles.cardContainer}>
       <RkCard style={styles.Card}> 
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <View rkCardHeader>
               <Text style={styles.ModerateHearderText}>{item.code}</Text>
           </View>     
           <View rkCardHeader style={styles.date}>
             <Text style={styles.dateHearderText}>{item.date}</Text>
           </View>
       </View>
           <View rkCardContent>
           <TouchableOpacity style={{flexDirection:'row'}}>      
             <View style={styles.moderateIcon}>
                 <Text style={styles.iconText}>{item.code.charAt(0)}</Text>
             </View>
             <View style={styles.description}>
                 <Text style={styles.details}>{item.description}</Text>
             </View>
           </TouchableOpacity>    
       </View>
           {/* <View rkCardFooter>
               <Text style={styles.dateHearderText}>16 Feb , 2019 11:30 pm</Text>
           </View> */}
       </RkCard>
       </View>
    )}
    )
    )}
