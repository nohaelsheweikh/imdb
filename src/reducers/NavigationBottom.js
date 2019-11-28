import * as ActionTypes from '../constants/ActionTypes'
const initialState = {
    Mainselected : true,
    reportselected: false,
    tripsSelected : false,
    settingsSelected :false,
    notificationsSelected :false ,
   
};
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
           case ActionTypes.MAIN_SELECTED:
                return Object.assign({}, state, {
                    Mainselected :action.Mainselected,
                });

                case ActionTypes.REPORT_SELECTED:
                    return Object.assign({}, state, {
                        reportselected :action.reportselected,
                    });

                case ActionTypes.TRIPS_SELECTED:
                        return Object.assign({}, state, {
                            tripsSelected : action.tripsSelected,
                        });
                case ActionTypes.SETTINGS_SELECTED:
                            return Object.assign({}, state, {
                                settingsSelected :action.settingsSelected,
                                
                            });
                case ActionTypes.NOTIFICATIONS_SELECTED:
                    return Object.assign({}, state, {
                            notificationsSelected :action.notificationsSelected,
                                    
                             });
                case ActionTypes.LOGOUT:
                    return Object.assign({}, state, {
                        Mainselected : true,
                        reportselected: false,
                        tripsSelected : false,
                        settingsSelected :false,
                        notificationsSelected :false
                                   
                    });
                
            
        
        default:
            return state
    }
}
