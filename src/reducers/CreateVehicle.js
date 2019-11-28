import * as ActionTypes from '../constants/ActionTypes'
const initialState = {
    isLoading: false, 
    HasError: false,
    getisLoading: false, 
    getHasError: false,
    vehicleData:null,
    modelsData:null,
    isCreated:false,
    id:'',
    token:'',
    vehicle_model:'',
    car_board_number:'',
    model_year:'',
    current_kilometers:'',
    device_serial:'',
    vehicleMsg:''

    
    

   

};
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
                case ActionTypes.GET_VEHICLE_MODELS_HAS_ERROR:
                    return Object.assign({}, state, {
                        getHasError: action.getHasError,
                    });
            case ActionTypes.GET_VEHICLE_MODELS__LOADING:                
                return Object.assign({}, state, {
                        getisLoading: action.getisLoading,
                    });
            case ActionTypes.GET_VEHICLE_MODELS_SUCCESS:
                return { ...state,modelsData:payload.modelsData};


            case ActionTypes.CREATE_VEHICLE_HAS_ERROR:
                return Object.assign({}, state, {
                    HasError: action.HasError,
                });
            case ActionTypes.CREATE_VEHICLE_IS_LOADING:                
               return Object.assign({}, state, {
                    isLoading: action.isLoading,
                });

                case ActionTypes.CREATE_VEHICLE_HAS_ERROR:
                    return Object.assign({}, state, {
                        HasError: action.HasError,
                    });
                case ActionTypes.VEHICLE_CALLBACK_MSG:
                    return Object.assign({ ...state, vehicleMsg:action.vehicleMsg });
          
                case ActionTypes.createVehicle:
                    return Object.assign({}, state, {
                        isCreated:false,
                        token:payload.token,
                        vehicle_model:payload.vehicle_model,
                        car_board_number:payload.car_board_number,
                        model_year:payload.model_year,
                        current_kilometers:payload.current_kilometers,
                        device_serial:payload.device_serial
                    
                });
            case ActionTypes.CREATE_VEHICLE_SUCCESS:
                
                return { ...state,vehicleData:payload.vehicleData };
        
        default:
            return state
    }
}
