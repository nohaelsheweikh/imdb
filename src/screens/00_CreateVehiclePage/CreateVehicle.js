import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";
import VehicleActions from '../../actions/CreateVehicle'

import Loader from '../../components/Loader';
  import {
    RkButton,
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkStyleSheet,
    RkTheme,
    RkPicker
  } from 'react-native-ui-kitten';
  import IconI from 'react-native-vector-icons/Ionicons'
  import { FontAwesome } from '../../assets/icons';
  import { scaleModerate, scaleVertical } from '../../utils/scale';
  import { View,
     Text,
     TextInput,
     Picker, 
     ScrollView,
     TouchableOpacity ,
     StyleSheet,
     AsyncStorage
    } from 'react-native';
    import ProfileActions from '../../actions/Profile'
    import DashboardActions from '../../actions/Dashboard';
    // import AsyncStorage from '@react-native-community/async-storage';


 class CreateVehicle extends Component {
    constructor(props){
        super(props);

        this.state = {
            token:'',
            pikerVisible:false,
            number:"455 ",
            year:'2016',
            kilometers:'50 ',
            serial:'123524',
            models:[],
            model_id:1,
            isLoading:true
        }
        // this.open = this.open.bind(this)
    }
    static navigationOptions = {
        title: 'Create Vehicle'.toUpperCase(),
        headerMode: 'float',
        headerStyle: {
          backgroundColor: '#13161d',
        },
        headerTintColor: 'white',
      };

      componentWillMount() {
        this.props.getVehicleModels()
        setTimeout(() => {
            
               this.setState({
                 models:this.props.modelsData,
                 isLoading:false
              })
        
            //  console.log('models',this.state.modelsData)
          }, 2000)
    }
    
    componentDidMount() {

      }
      componentWillUnmount() {
    }
    onNumberInputChanged = (text) => {
        this.setState({ number: text });
      };
    onYearInputChanged = (text) => {
        this.setState({ year: text });
      };
    onKilometersInputChanged = (text) => {
        this.setState({ kilometers: text });
      };
    onSerialInputChanged = (text) => {
        this.setState({ serial: text });
      };
     
      doCreate=()=> {
        var token
        let {model_id,number,year,kilometers,serial} = this.state;
        AsyncStorage.getItem('token').then((value) => {
          token = value
          })
        .then(() => {  
        this.props.createVehicle(token,model_id,number,year,kilometers,serial);
        // console.log('serial',serial)
        })
      }
    render(){
        const models = this.state.models.map((model, i) => <Picker.Item key={i} label={model.name} value={model.id} />)
        
        return(
            
            <View style={{padding:'3%',}}>
                <Loader loading={this.props.isLoading}/>
                <Loader loading={this.state.isLoading}/>

                <View style={{flexDirection:'row',paddingHorizontal: 18.5,
                alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth,
                 borderColor:'#ccc'}}>
                <RkText> Select Car Model </RkText>
                    <Picker
                         selectedValue={this.state.model_id}
                         onValueChange={model_id => this.setState({ model_id })}
                        style={{height: 50, width: 190,left:5

                        }}
                        >
                     {models}
                    </Picker>
                    
                </View>
                <RkText style={{ left: 10,color: "red" }}>{(this.state.year.length>4 ) ? "Model Year shouldn't be more than 4 numbers" : null}</RkText> 
                <View style={{ flexDirection: 'row',
                    paddingHorizontal: 17.5,
                    alignItems: 'center',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor:'#ccc'}}>
                    <RkTextInput
                        keyboardType="numeric"
                        label='Model Year'
                        placeholder='ex:2016' 
                        inputStyle={{
                        textAlign:'right'
                        }}
                        value={this.state.year}
                        onChangeText={this.onYearInputChanged}
                        rkType='right clear'
                    />
                </View>
                <RkText style={{ left: 10,color: "red" }}>{(this.state.number.length>20 ) ? "car board number shouldn't be more than 20 characters" : null}</RkText> 
                <View style={{ flexDirection: 'row',
                    paddingHorizontal: 17.5,
                    alignItems: 'center',
                     borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor:'#ccc'}}>
                    <RkTextInput
                        label=' Car Board Number'
                        inputStyle={{
                        textAlign:'right',
                        }}
                        value={this.state.number}
                        onChangeText={this.onNumberInputChanged}
                        rkType='right clear'
                    />
                </View>
                <RkText style={{ left: 10,top:5,color: "red" }}>{(!this.state.kilometers.length ) ? "kilometers shouldn't be empty" : null}</RkText> 
                <View style={{ flexDirection: 'row',
                    paddingHorizontal: 17.5,
                    alignItems: 'center',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor:'#ccc'}}>
                    <RkTextInput
                        keyboardType="numeric"
                        label='Current Kilometers'
                        inputStyle={{
                        textAlign:'right'
                        }}
                        value={this.state.kilometers}
                        onChangeText={this.onKilometersInputChanged}
                        rkType='right clear'
                    />
                </View>
                <RkText style={{ left: 10,top:5,color: "red" }}>{(this.state.serial.length>20 ) ? "Device Serial shouldn't be more than 20 numbers" : null}</RkText> 
                <View style={{ flexDirection: 'row',
                    paddingHorizontal: 17.5,
                    alignItems: 'center',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor:'#ccc'}}>
                    <RkTextInput
                        label='Device Serial'
                        inputStyle={{
                        textAlign:'right'
                        }}
                        keyboardType="numeric"
                        value={this.state.serial}
                        onChangeText={this.onSerialInputChanged}
                        rkType='right clear'
                    />
                </View>
                {(!this.state.number|| !this.state.serial||!this.state.year||!this.state.kilometers ) ? 
                <RkText style={{  alignItems: 'center',top:5,color: "red" }}> all fileds are required</RkText> 
                :(this.state.number.length>20 || this.state.serial.length>20||this.state.year.length>4)?
                null          
                :
                <View style={{alignItems:'center',top:15}}>
                  <RkButton
                    onPress={this.doCreate}
                    style={{backgroundColor: '#B3D137'}}
                    contentStyle={{color: 'white'}}>SAVE</RkButton>
                     <RkText rkType='primary3' style={{color:'red'}}>{this.props.msg} </RkText>   
                </View>
                }
            </View>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        hasError : state.createVehicle.HasError,
        isLoading: state.createVehicle.isLoading,
        vehicleData:state.createVehicle.vehicleData,
        getHasError:state.createVehicle.getHasError,
        getisLoading:state.createVehicle.getisLoading,
        isCreated:state.createVehicle.isCreated,
        modelsData:state.createVehicle.modelsData,
        msg:state.createVehicle.vehicleMsg

    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
  
        getVehicleModels: () => dispatch(VehicleActions.getVehicleModels()),
        createVehicle: (token,model_id,number,year,kilometers,serial) => dispatch(VehicleActions.createVehicle(token,model_id,number,year,kilometers,serial)),
        getDashboard:(token) => dispatch(DashboardActions.getDashboard(token)),
        getProfile: (token) => dispatch(ProfileActions.getProfile(token)),

    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(CreateVehicle);