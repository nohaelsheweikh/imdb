import React from 'react';
import { connect } from 'react-redux';
import {
    View,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Image,
    BackHandler,
    RefreshControl,
    AsyncStorage,
    Button
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
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import { Layout, Gallery } from '../../components';
import Loader from '../../components/Loader';
import MaterialTabs from 'react-native-material-tabs';
import styles from '../../styles/trips'
import { ActionButton , Badge, Icon, Avatar } from 'react-native-material-ui';
import { scaleModerate, scaleVertical } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import Indicator from '../../components/Indicator';
import TripsActions from '../../actions/Trips';
import TripDetailsActions from '../../actions/TripsDetails';
import {StackNavigator,withNavigation,DrawerItems, DrawerActions,createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,} from 'react-navigation';

import _ from 'lodash'
// const{navigate}= this.props.navigation
const screenSize = Dimensions.get('window');
const { width,height } = Dimensions.get('window');
const size = 120;
const fontSize = 25;
// global.tripsData = null
export class NormalList extends RkComponent {
    state = {
      data:null,
      themeColor:'',
      hasScrolled:false,
      page:0,
      activeId: null,
      activeItem: null,
      isLoading:false,
      getisLoading:false,
      notConnected:global.notConnected,
      refreshing: false,
    };
   

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.trips !== this.props.trips) {
    //       this.setState({
    //         data: nextProps.trips
    //       });
    //     }
    //   }

    componentWillReceiveProps(nextProps) {
            // console.log(nextProps)
        if(!_.isEqual(nextProps.Normaltrips,this.props.Normaltrips)){ 
          //user scrolled, call next offset using the API   
            this.setState({
                data: [...this.state.data,...nextProps.Normaltrips]
            })
          
        }
    }

   componentDidMount() {
     this.setState({data:this.props.Normaltrips})
   }
 componentWillUnmount(){
  //  this.setState({data:null})
 }

   onItemPressed = (item) => {
    // this.props.navigation.navigate(item.id);
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value       
   })
   .then(() => {
    this.props.getTripsDetails(token,item)
    console.log('item',item)
    this.props.navigation.navigate('TripsDetails',{item});
    // console.log('nav',this.props.navigation.navigate('TripsDetails', {item:item})
    // )
    // Actions.TripsDetails(item);
    })
  };

renderItem = ({item,o}) => (

  <View key={item.id} style={{width: width}}>
    <View  style={styles.cardContainer}>
   
      <TouchableOpacity
        onPress={() => {
        
        this.onItemPressed(item.id)
          }
          }
       >
        <RkCard rkType='imgBlock' style={{ marginVertical: 8}}>   
            <Image rkCardImg source={{uri:item.static_map_url}} />     
            <View rkCardImgOverlay rkCardContent style={styles.overlay}>
              <View style={styles.overlayContent}>
                <RkText rkType='header4'
                  style={styles.headerDate}>
                  {item.start_datetime}
                </RkText>
                <RkText
                  style={{marginTop: 5}}
                  rkType='secondary2' style={{color:'#FFFFFF'}}>{item.start_time}
                </RkText>            
              </View>
              <View style={styles.headerIcons}>    
                <View style={{flexDirection:'row'}}>  
                  <View style={styles.kmIcon}> 
                      <IconF5
                          name='tachometer-alt'
                          color='#FFFFFF'
                          size={20}
                        />
                      <View style={{flexDirection:'row'}}>
                        <RkText rkType='primary primary4' style={{color:'#FFFFFF',fontWeight:'bold'}}> {item.kilometers.toString()} </RkText> 
                        <RkText rkType='secondary' style={{color:'#FFFFFF90',fontSize:14}} >KM</RkText>
                      </View>
                  </View>          
                  <View style={{flexDirection:'row'}}> 
                    <IconM
                      name='error-outline'
                      color='#FFFFFF'
                      size={22}
                      />
                    <View style={{flexDirection:'row'}}>
                      <RkText rkType='primary primary4' style={{color:'#FFFFFF',fontWeight:'bold'}}>{item.harsh_count.toString()} </RkText>
                      <RkText rkType='secondary' style={{color:'#FFFFFF90',fontSize:14}} >Issues</RkText>   
                    </View>
                  </View>
                </View>
             </View>
            </View>
            <View rkCardFooter>
              <View  style={{flexDirection:"row"}}>
               <View style={{flexDirection:'column'}}>
                 <TouchableOpacity style={styles.dot}> 
                 </TouchableOpacity>
                 <View style={styles.footerVerticalLine}/>
                  <TouchableOpacity style={styles.footerSquareIcon}> 
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:"column"}}>
                 <View style={{bottom:2}}>
                   <RkText style={styles.textHeader} >{item.start_address.split(/[,،]/)[1]}</RkText>
                  </View>
                  <View style={{top:11}}>
                   <RkText style={styles.textHeader} >{item.end_address.split(/[,،]/)[1]}</RkText>
                  </View>
                </View>
              </View>
             </View >
          </RkCard>  
        </TouchableOpacity>     
     </View>
  </View>
);

  
  

render = () => (
  
  // console.log('normal',this.state.data),
         <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            ref={r => (this.refs = r)}
            keyExtractor={this._keyExtractor} 
            keyExtractor = { (item, index) => index.toString() }
            onEndReached={this.props.NormalmoreFunction.bind(this)}
            onEndReachedThreshold={0.1}
            refreshControl={
          <RefreshControl
            refreshing={this.props.refresh}
            onRefresh={this.props.refreshFunction.bind(this)}
          />
          }
        />
       
    )};
     
  
    
    export default withNavigation(NormalList);    