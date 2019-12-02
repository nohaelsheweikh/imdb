import React, { Component } from 'react';
import { 
    Platform,
    Image,
    Text,
    View, 
   } from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import cfgStore, { persistor } from './store/configureStore';
import Root from "./screens/root";

const store = cfgStore();

console.disableYellowBox = true;

export  default class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <Root/>
            </Provider>
        )
    }
}
