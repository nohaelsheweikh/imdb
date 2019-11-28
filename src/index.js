import React, { Component } from 'react';
import { StyleSheet,
    Platform,
    Image,
    Text,
    View, 
    ScrollView,
    Alert,
    AppState,
    Dimensions,
    BackHandler,
    AsyncStorage,
    NetInfo
   } from 'react-native';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import cfgStore, { persistor } from './store/configureStore';
// import Root from './containers'
import Root from "./screens/root";

import { Actions } from 'react-native-router-flux';
import {measureConnectionSpeed} from '../src/utils/NetworkBandwidth';
import WarningModal from '../src/components/WarningModal'



const store = cfgStore();
const { width } = Dimensions.get('window');
global.notConnected=false

//PackageName Must Be String For example "com.domain.application"

// global.HAS_LAUNCHED = 'hasLaunched';
global.token = null
console.disableYellowBox = true;

export  default class App extends Component {

    constructor() {
        super();
        this.state = {
          jsonDebugText:'',
          isConnected:true,
          token: null,
          isStorageLoaded: false,
          firstLaunch: null,
          appState: AppState.currentState,
          networkSpeed : ''
        };
      
        

       
          
        
    }
 
    componentWillMount() {
       

        AsyncStorage.getItem('token').then((token) => {
        global.token !== null
        });

        NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);
        NetInfo.getConnectionInfo().then((connectionInfo) => {
          // console.log(
          //   'Initial, type: ' +
          //     connectionInfo.type +
          //     ',info: ' +        
          //     JSON.stringify( connectionInfo),
          // );
        });  
            

    }

    
    
    
    
      
    componentDidMount(){
        AppState.addEventListener('change', this._handleAppStateChange);
        this.measureNetworkBandwith("http://chandra.harvard.edu/graphics/resources/desktops/2006/1e0657_1680.jpg");
       }
       measureNetworkBandwith = async (imageURI) => {
        try {
          const networkSpeed = await measureConnectionSpeed(imageURI);
          this.setState({
            networkSpeed,
          });
        } catch (error) {
          // handle error
        }
      }
      
    componentWillUnmount() {
        
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange)
        AppState.removeEventListener('change', this._handleAppStateChange);    
       }

       handleFirstConnectivityChange(connectionInfo) {
        NetInfo.isConnected.fetch().then(isConnected => {
          // console.log('First, is ' + (isConnected ? 'online' : 'offline'));
          
          if (!isConnected) {
            global.notConnected=true
            // console.log('globalNOtConnected',global.notConnected)
            
          } 
          else{
            global.notConnected=false
            // setTimeout(() => {
              
              
            // }, 5000)
            return
          }
    
        });
       }

     

 
    
    render() {
      const {networkSpeed: {speed}} = this.state;
      const content = speed<1? (<WarningModal> 
        <View style={{justifyContent:'center',top:10}}>
          <Text rkType='header primary' style={{color:'#FFFFFF',left:10}}>Slow Internet Connection !</Text> 
                    
          <Text  style={{textAlign:'center',color:'#FFFFFF'}} rkType='header6'>{speed}</Text>   
        </View>      
      </WarningModal>):null;
      // console.log('speed',speed)

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                
                <View>{content}</View>
                    <Root/>
                </PersistGate>
            </Provider>
        )
    }
}
