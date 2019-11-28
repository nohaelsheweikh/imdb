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
  StyleSheet,
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
import IconF from 'react-native-vector-icons/Foundation'
import { Layout, Gallery } from '../../../components';
import Loader from '../../../components/Loader';
import MaterialTabs from 'react-native-material-tabs';
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import { ActionButton , Badge, Icon, Avatar } from 'react-native-material-ui';
import { scaleModerate, scaleVertical } from '../../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import styles from '../../../styles/vehiclesList'



export class List extends RkComponent {
    state = {
      data:[],
      themeColor:''
    };
   

    componentWillReceiveProps(nextProps) {
      if (nextProps.vehicles !== this.props.vehicles) {
        this.setState({
          data: nextProps.vehicles
        });
      }
    }



componentWillMount(){

  
  }
   componentDidMount() {
     this.setState({data:this.props.vehicles})
   }


render = () => (
    this.state.data.map((item, index) => {
        return(
    <View key={item.id} style={styles.cardContainer}>
      <RkCard style={styles.Card}> 
            <View rkCardHeader>
              <TouchableOpacity style={{  flexDirection: 'row'}}>      
                <Image rkCardImg source={require('../../../assets/images/lamborghini.jpg')} 
                  style = {styles.image} />
                <View style={styles.Container}>
                  <View style={styles.content}> 
                      <Text style={styles.brand}>{item.brand}</Text>
                      <Text style={styles.year}>{item.year}</Text>
                  </View>
                    <Text style={styles.model}>{item.model}</Text>
                </View>
              </TouchableOpacity>    
            </View>
         <View style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor:'#d5d5d5',
          width:'90%',
          alignSelf:'center',top:5}}/>
        <View rkCardContent>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.joinDateTitle}>Join Date</Text>
              <Text style={styles.joinDateItem}>{item.join_date.slice(0,12)}</Text>
            </View>

            <View style={styles.verticalLine}/>

            <View>
              <Text style={styles.lastActiveTitle}>Last Active</Text>
              <Text style={styles.lastActiveItem}>{item.last_active.slice(0,12)}</Text>
           </View>
           
           <View style={styles.verticalLine}/>

            <View>
                <Text style={styles.scoreTitle}>SCORE</Text>
                <Text style={styles.scoreItem}>{item.score.toString()}</Text>
            </View>
          </View>
        </View>
          {/* <View rkCardFooter>
              <Text style={styles.dateHearderText}>16 Feb , 2019 11:30 pm</Text>
          </View> */}
      </RkCard>
    </View>  
   
    )}
    )
    )}
