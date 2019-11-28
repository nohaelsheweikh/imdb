import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import { NavigationActions } from 'react-navigation';

export const Mainselected = (bool) => {
    return {
        type: ActionTypes.MAIN_SELECTED,
        Mainselected: bool
    }
};

export const tripsSelected = (bool) => {
  return {
      type: ActionTypes.TRIPS_SELECTED,
      tripsSelected: bool
  }
};
export const reportselected = (bool) => {
    return {
        type: ActionTypes.REPORT_SELECTED,
        reportselected: bool
    }
};


export const settingsSelected = (bool) => {
    return {
        type: ActionTypes.SETTINGS_SELECTED,
        settingsSelected: bool
    }
};

export const notificationsSelected = (bool) => {
    return {
        type: ActionTypes.NOTIFICATIONS_SELECTED,
        notificationsSelected:bool
    }
};

export const selected=(index)=>{
    // console.log('page index',index)
    return (dispatch) => {
    dispatch(Mainselected(true));
    dispatch(reportselected(false));
    dispatch(tripsSelected(false));
    dispatch(settingsSelected(false));
    dispatch(notificationsSelected(false));


    
    if (index===0){
        dispatch(Mainselected(true));
        dispatch(reportselected(false));
        dispatch(tripsSelected(false));
        dispatch(settingsSelected(false));
        dispatch(notificationsSelected(false));

      // Actions.Main()
      this.props.navigation.navigate('Home')
            
    }
    else if(index===1){
    //   this.setState({ active: 1,isSelected:false})
        dispatch(Mainselected(false));
        dispatch(reportselected(true));
        dispatch(tripsSelected(false));
        dispatch(settingsSelected(false));
        dispatch(notificationsSelected(false));
        this.props.navigation.navigate('HealthReport')
      // Actions.HealthReport({ type:'reset' })
      // this.props.navigation.navigate('Home');
     

    }
    else if(index===2){
    //   this.setState({ active: 2 ,isSelected:false})
        dispatch(Mainselected(false));
        dispatch(reportselected(false));
        dispatch(tripsSelected(true));
        dispatch(settingsSelected(false));
        dispatch(notificationsSelected(false));

      Actions.TripsList({ type:'reset' })   
    }
    else if(index===3){
    //   this.setState({ active: 3,isSelected:false })
    dispatch(Mainselected(false));
    dispatch(reportselected(false));
    dispatch(tripsSelected(false));
    dispatch(settingsSelected(true));
    dispatch(notificationsSelected(false));
   
      Actions.Settings({ type:'reset' })

     
    }
    else if(index===4){
        dispatch(Mainselected(false));
        dispatch(reportselected(false));
        dispatch(tripsSelected(false));
        dispatch(settingsSelected(false));
        dispatch(notificationsSelected(true));
        
      Actions.Notifications({ type:'reset' })

      
    }
    }
  }
  
 
  export default {
    Mainselected,
    reportselected,
    settingsSelected,
    notificationsSelected,
    selected
    
}