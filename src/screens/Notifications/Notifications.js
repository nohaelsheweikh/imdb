import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  AsyncStorage
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage'

import _ from 'lodash';
import {
  RkStyleSheet,
  RkText,
  RkTextInput
} from 'react-native-ui-kitten';
import { Avatar } from '../../components';
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import IconS from 'react-native-vector-icons/SimpleLineIcons'
import { Layout } from '../../components';
import Orientation from 'react-native-orientation';
import { Actions } from 'react-native-router-flux';
import NotificationsActions from '../../actions/Notifications';
import {List} from './list'
import { connect } from 'react-redux';
import NavigationBottomActions from '../../actions/NavigationBottom';

const moment = require('moment');

export class Notifications extends React.Component {
  
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
    title: 'Notifications'.toUpperCase(),
    headerMode: 'float',
    headerStyle: {
      backgroundColor: '#13161d',
    },
    headerTintColor: 'white',
    headerLeft:(
     
      <TouchableOpacity 
        style={{marginLeft:10}}
        onPress={() => {
        //  params.handleNave()
        //  Actions.Main()   
        navigation.navigate('Home')
         }
       }
       >
        <View style={{flexDirection:'row'}}>
          <IconI
              name='md-arrow-back'
              color='white'
              size={28}
              />
          {/* <RkText style={{fontSize:10,color:'white',top:7, left:5}}>Back</RkText> */}
       </View>
       </TouchableOpacity>
       )
      }
  };

  state = {
    page:0,
    isLoading:false
  };


  getData(){
    let page =0
    this.setState({
      page:page,
     })  
    var token   
    AsyncStorage.getItem('token').then((value) => {
      token=value  
   })
   .then(() => {
      this.props.getNotifications(token,page)
    }) 
  }

  

  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    Orientation.lockToPortrait();
    this.getData()
    this.props.navigation.setParams({ handleNave: this.selectedTabs });

  }

  componentWillUnmount() {
    // this.backHandler.remove()
    
  }
  
  // handleBackPress = () => {
  //   const { navigate } = this.props.navigation
  //   navigate('Home')
  //   return true;
  // }
handleLoadMore = ({ distanceFromEnd }) => {
  let i =this.state.page
  if (i >= 0 && i<this.props.notificationsData.length-1) {
    this.setState({
     page: i + 1,
     isLoading:true
    })    
    
    var token
    AsyncStorage.getItem('token').then((value) => {
      token=value       
   })
   .then(() => {
    this.props.getNotifications(token,this.state.page)
      }) .then(() => {
           this.setState({
           isLoading:false})
        })
}
}
  render = () => (
    <Layout>      
      {/* <FlatList
        style={styles.root}
        data={this.state.data.filtered}
        extraData={this.state}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this.extractItemKey}
        renderItem={this.renderItem}
      /> */}
      <List
       notifications = {this.props.notificationsData} 
       loadmoreFunction={this.handleLoadMore}
      />
    </Layout>
  );
}


const mapStateToProps = (state) => {
  // console.log(state);

  return {
      hasError:state.notifications.hasError,
      isLoading:state.notifications.isLoading,
      notificationsData:state.notifications.notificationsData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications:(token,page) => dispatch(NotificationsActions.getNotifications(token,page)),
    selected:(index) => dispatch(NavigationBottomActions.selected(index))

  };
};
export default connect(mapStateToProps, mapDispatchToProps)( Notifications);