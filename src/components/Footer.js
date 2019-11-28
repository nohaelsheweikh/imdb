// Import libraries for making a component
import { Text, View,SafeAreaView,AsyncStorage} from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
// import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import OIcon from 'react-native-vector-icons/Octicons'
import FIcon from 'react-native-vector-icons/Octicons'
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
  
} from 'react-native-ui-kitten';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import NotificationsActions from '../actions/Notifications';
import NavigationBottomActions from '../actions/NavigationBottom';

// import AsyncStorage from '@react-native-community/async-storage'


_isMounted = false;


RkTheme.setType('RkTabView', 'light', {
  backgroundColor: 'transparent',
  color: 'white',
  borderColor: '#13161d',
  tabContainer: {
    borderColor:'#13161d',
    overflow: 'hidden' ,
    color:'grey'
  },
  content: {
    padding: 7
  },
  container: {
    backgroundColor: '#13161d',
    borderColor:'#13161d'
  },
  
});

 RkTheme.setType('RkTabView', 'lightSelected', {
  backgroundColor: '#13161d',
  color:'#b3d137',
});
// Make a component
export  class Footer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeName:'Main',
      BadgeCount:this.props.notificationsCount
    };
    this.componentDidMount=()=>{
      this._isMounted = true;

    //   selectedTabs=(index)=>{
    //     if (this._isMounted) {
    //       this.setState({ active:index })
    //     }
    //     if (index===0&&this._isMounted){
    //       this.setState({ active: 0 ,isSelected:true})
    //       Actions.Main({ type:'reset' })
          
    //       global.Mainselected = true
    //       global.reportselected = false
    //       global.tripsSelected = false
    //       global.settingsSelected = false
    //       global.notificationsSelected = false
  
    //     }
    //     else if(index===1&&this._isMounted){
    //       this.setState({ active: 1,isSelected:false})
    //       Actions.HealthReport({ type:'reset' })
  
    //       global.reportselected = true
    //       global.Mainselected = false
    //       global.tripsSelected = false
    //       global.settingsSelected = false
    //       global.notificationsSelected = false
  
    //     }
    //     else if(index===2&&this._isMounted){
    //       this.setState({ active: 2 ,isSelected:false})
    //       Actions.TripsList({ type:'reset' })
  
    //       global.tripsSelected = true
    //       global.reportselected = false
    //       global.Mainselected = false
    //       global.settingsSelected = false
    //       global.notificationsSelected = false
    //     }
    //     else if(index===3&&this._isMounted){
    //       this.setState({ active: 3,isSelected:false })
    //       Actions.Settings({ type:'reset' })
  
    //       global.settingsSelected = true
    //       global.tripsSelected = false
    //       global.reportselected = false
    //       global.Mainselected = false
    //       global.notificationsSelected = false
    //     }
    //     else if(index===4){
    //       Actions.Notifications({ type:'reset' })
  
    //       global.notificationsSelected =true
    //       global.settingsSelected = false
    //       global.tripsSelected = false
    //       global.reportselected = false
    //       global.Mainselected = false
    //     }
        
    //   }
    selectedTabs=(index)=>{
        let Index = index
        this.props.selected(Index)
      }
    }
    
   this.componentWillUnmount=()=>{
    // this._isMounted = false;
   }
    
     renderTab = (isSelected, title, icon) => {
      let backgroundColor = isSelected ? '#13161d' : '#13161d';
      let color = (!isSelected) ? 'white' : '#b3d137';
      
      return (
        <View
          style={{
            backgroundColor,
            justifyContent: 'center',
            alignItems: 'center', 
            padding:7  
              
          }}>
          {title =='Notifications'?
          <IconBadge
          BadgeElement={
            <Text style={{color:'#FFFFFF'}}>{this.state.BadgeCount}</Text>
          }
          IconBadgeStyle={
            {
            zIndex:9999999,
            width:20,
            height:20,
            backgroundColor: '#ff0000',
            left:8,
            bottom:16,
          }
          }
          Hidden={this.state.BadgeCount==0}
          />
          
          :null
          }
          <Icon name={icon} style={{color, fontSize:26}}/>
          <RkText style={{color,fontSize:10}}>{title}</RkText>

        </View>);
     };
     
  }
  
  render() {
    const { viewStyle } = styles;
    return (      
      <View style={viewStyle}>
      <SafeAreaView style={{flex:1, backgroundColor: '#13161d'}}>

        <RkTabView 
          index = {-1}
          rkType='light'
          onTabChanged={(index,selected) => selectedTabs(index)}
        >  
        <RkTabView.Tab 
            title={(selected) => {
            selected=this.props.Mainselected
            return renderTab(this.props.Mainselected, 'Home', 'home');
          }}>
         </RkTabView.Tab>

        <RkTabView.Tab title={(selected) => {
            selected= this.props.reportselected 
            return renderTab(this.props.reportselected, 'Report', 'alert');
          }}>
        </RkTabView.Tab>

        <RkTabView.Tab title={(selected) => {
            selected = this.props.tripsSelected

          return renderTab(this.props.tripsSelected , 'Trips', 'map');
        }}>
        </RkTabView.Tab>

        <RkTabView.Tab title={(selected) => {
          selected = this.props.settingsSelected
          return renderTab(this.props.settingsSelected, 'Settings', 'settings');
        }}>
        </RkTabView.Tab>

        <RkTabView.Tab title={(selected) => {
          selected = this.props.notificationsSelected
          
          return renderTab(selected, 'Notifications', 'bell');
        }}>
        
        </RkTabView.Tab>
    </RkTabView>
    </SafeAreaView>
   </View>
      
   
    );
  }
};

const styles = {
  viewStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
   

  },

  textStyle: {
    fontSize: 20
  },
};

const mapStateToProps = (state) => {
  return {
      hasError:state.notifications.hasError,
      isLoading:state.notifications.isLoading,
      notificationsCount:state.notifications.notificationsCount,
      Mainselected:state.navigationBottom.Mainselected,
      reportselected:state.navigationBottom.reportselected,
      tripsSelected :state.navigationBottom.tripsSelected ,
      settingsSelected:state.navigationBottom.settingsSelected,
      notificationsSelected:state.navigationBottom.notificationsSelected

    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications:(token,page) => dispatch(NotificationsActions.getNotifications(token,page)),
    selected:(index) => dispatch(NavigationBottomActions.selected(index))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);