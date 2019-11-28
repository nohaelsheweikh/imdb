import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
  TextInput,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  BackHandler,
  AsyncStorage
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkTabSet,
  RkTab,
  RkButton,
  RkCard 
} from 'react-native-ui-kitten';
import {
  ProgressChart,
  FaultProgressChart,
  DoughnutChart,
  AreaChart,
  AreaSmoothedChart,
} from '../../components/charts';
import { Layout } from '../../components';
import Loader from '../../components/Loader';

import { FontAwesome } from '../../assets/icons';

import IconF from 'react-native-vector-icons/Foundation'
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import IconI from 'react-native-vector-icons/Ionicons'

import { ActionButton , Badge, Icon, Avatar } from 'react-native-material-ui';
import TripDetailsActions from '../../actions/TripsDetails';
import LoginActions from '../../actions/Login';
import { scaleModerate, scaleVertical } from '../../utils/scale';
// import RNSpeedometer from 'react-native-speedometer'
import { Actions } from 'react-native-router-flux';
import Svg from 'react-native-svg';
import styles from '../../styles/tripsDetails'
import ErrorModal from '../../components/ErrorModal'
import { VictoryChart,VictoryTheme,VictoryBar, VictoryGroup, VictoryStack,VictoryLabel } from "victory-native";
import Orientation from 'react-native-orientation';
import NavigationBottomActions from '../../actions/NavigationBottom';

global.visible=false

const screenSize = Dimensions.get('window');
 class TripsDetailsCard extends React.Component {
   
  constructor() {
    super();
    this.state = {
      isLoading:true,
      data:{},
      notConnected:global.notConnected

  }
}
componentWillReceiveProps(nextProps) {
    if (nextProps.TripsDet !== this.props.TripsDet) {
      this.setState({
        data: nextProps.TripsDet
      });
    }
  }


  render = () => {
    if(!this.state.data){
        return(<Loader loading={true} />)
    }
    return (
        <RkCard style={styles.Card} rkType='story'>
          <Image rkCardImg source={{uri:this.props.TripsDet.static_map_url}}/>
           <View style={{flexDirection:'column',justifyContent:'center'}}>

                     {/* Date */}
                <View style={styles.Date} rkCardContent>
                    {/* <RkText rkType='header' style={{color:'white',fontWeight:'bold'}}>
                     Trip :   
                    </RkText> */}
                    <RkText rkType='header' style={{color:'white',left:5,fontWeight:'bold'}}>
                     {this.props.TripsDet.start_datetime}
                    </RkText>
                </View>
                
              
                    {/* column */}
                    
                    <View style={styles.rowDetails} rkCardContent>
                      <View style={styles.column}>
                        <RkText style={{color:'black',}}>
                         Start
                        </RkText>

                        <View style={{flexDirection:'row'}} rkCardContent>
                          <RkText style={{color:'#b3d137',fontSize:22,fontWeight:'bold',bottom:7,right:17}}>
                          {this.props.TripsDet.start_time}
                          </RkText>            
                      </View>
                  </View>

                  <View style={styles.column}>      
                    <RkText style={{color:'black'}}>
                    End
                    </RkText>
                    <View style={{flexDirection:'row'}} rkCardContent>
                    <RkText style={{color:'#b3d137',fontSize:22,fontWeight:'bold',bottom:7, right:17}}>
                    {this.props.TripsDet.end_time}
                    </RkText>      
                  </View>
                </View>
                </View>

                    {/* column */}
                    <View style={styles.rowDetails} rkCardContent>
                      <View style={styles.column}>
                        <RkText style={{color:'black'}}>
                         Duration
                        </RkText>

                        <View style={{flexDirection:'row',width:'50%',right:15}} rkCardContent>
                          <RkText style={styles.text}>
                          {this.props.TripsDet.duration.toString()}
                          </RkText>  
                          <RkText style={{fontSize:14,left:5,color:'#cccccc'}}>
                          mins
                         </RkText>          
                      </View>
                  </View>

                  <View style={styles.column}>      
                    <RkText style={{color:'black'}}>
                    Max Speed
                    </RkText>
                    <View style={{flexDirection:'row',right:15}} rkCardContent>
                    <RkText style={styles.text}>
                    {this.props.TripsDet.max_speed.toString()}
                    </RkText>
                    <RkText style={{fontSize:14,left:5,color:'#cccccc'}}>
                      kms/hr
                    </RkText>
                  
                  </View>
                </View>
                </View>
                <View
                style={{ borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: '#CCC',}}
                />
                {/* column */}
                <View style={styles.rowDetails} rkCardContent>
                  <View style={styles.column}>
                    <RkText style={{color:'black'}}>
                     Average Speed
                    </RkText>
                    <View style={{flexDirection:'row',right:15}} rkCardContent>
                    <RkText style={styles.text}>
                    {this.props.TripsDet.avg_speed.toString()}
                    </RkText>
                    <RkText style={{fontSize:14,left:5,color:'#cccccc'}}>
                     kms/hr
                    </RkText>
                  </View>
              </View>

              <View
                style={{ borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: '#CCC',}}
              />
              <View style={styles.column}>      
                <RkText style={{color:'black'}}>
                 Max.RPM
                </RkText>
                <View style={{flexDirection:'row',right:15}} rkCardContent>
                <RkText style={styles.text}>
                {this.props.TripsDet.max_rpm.toString()} 
                </RkText>    
              </View>
             </View>
            </View>

            <View
                style={{ borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: '#cccccc',}}
            />

             {/* column */}
             <View style={styles.rowDetails} rkCardContent>
              <View style={styles.column}>
                <RkText style={{color:'black'}}>
                 Over Speeding
                </RkText>
                <View style={{flexDirection:'row',right:15}} rkCardContent>
                  <RkText style={styles.text}>
                  {this.props.TripsDet.over_speeding.toString()}
                  </RkText>
                 
                </View>
              </View>

              <View style={styles.column}>
                <RkText style={{color:'black'}}>
                  Kilometers
                </RkText>
                <View style={{flexDirection:'row',right:15}} rkCardContent>

                <RkText style={styles.text}>
                {this.props.TripsDet.kilometers.toString()}
                </RkText>
                <RkText style={{fontSize:14,left:5,color:'#cccccc'}}>
                 km/hr
                </RkText>
              </View>
              </View>
            </View>

            <View
                style={{ borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: '#cccccc',}}
            />

            {/* column */}
            <View style={styles.rowDetails} rkCardContent>
              <View style={styles.column}>
                <RkText style={{color:'black'}}>
                 Fuel Efficency
                </RkText>
                <View style={{flexDirection:'row',right:15}} rkCardContent>
                <RkText style={styles.text}>
                {this.props.tripDetails.fuel_efficiency}
                </RkText>
                <RkText style={{fontSize:14,left:5,color:'#cccccc'}}>
                km/litre
                </RkText>
               </View>
              </View>

              <View style={styles.column}>
                <RkText style={{color:'black'}}>
                  Fuel Usage
                </RkText>
                <View style={{flexDirection:'row',right:15}} rkCardContent>

                <RkText style={styles.text}>
                {this.props.TripsDet.fuel_usage.toString()}
                </RkText>
                <RkText style={{fontSize:14,left:5,color:'#cccccc'}}>
                 Litre
                </RkText>
               </View>
               </View>
              </View>
              
              <View
                style={{ borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: '#cccccc',}}
            />

            {/* column */}
            <View style={styles.rowDetails} rkCardContent>
              <View style={styles.column}>
                <RkText style={{color:'black'}}>
                 Idle Times
                </RkText>
                <View style={{flexDirection:'row',right:15}} rkCardContent>

                <RkText style={styles.text}>
                {this.props.TripsDet.idle_time}
                </RkText>
                <RkText style={{fontSize:14,left:5,color:'#cccccc'}}>
                 mins
                </RkText>
               </View>
              </View>

              <View style={styles.column}>
                <RkText style={{color:'black'}}>
                  Score
                </RkText>
                <View style={{flexDirection:'row', right:15}} rkCardContent>

                <RkText style={styles.text}>
                {this.props.TripsDet.score.toString()}
                </RkText>
                
               </View>
               </View>
              </View>
              
              <View
                style={{ borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: '#cccccc',}}
              />
            </View>

            {/* icons */}
            
         
            {/* <View style={styles.iconRow}>  */}
              {/* {this.props.tripDetails.issues.map((icon, index) => { */}
                  {/* {this.props.tripDetails.issues[0] ?             
                  <View style={styles.iconContainer} >
                    <RkText style={styles.iconTopText}>{this.props.tripDetails.issues[0].name}</RkText>
                  <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={styles.icon}>
                          <View>
                              <Image  style={{width:35,height:35}} source={require('../../assets/images/Harsh_Breaking_IC.png')}/>
                          </View>
                      </TouchableOpacity>
                        <RkText style={styles.iconRightText}>{this.props.tripDetails.issues[0].count.toString()}</RkText>
                    </View>
                </View>
             
                :null}  */}

{/*                 
             {this.props.tripDetails.issues[1] ?             
              <View style={styles.iconContainer}>
                  <RkText style={styles.iconTopText}> {this.props.tripDetails.issues[1].name}</RkText>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.icon}>
                        <View>
                            <Image  style={{width:35,height:35}} source={require('../../assets/images/Rapid_Accel_IC.png')}/>
                        </View>
                    </TouchableOpacity>
                      <RkText style={styles.iconRightText}>{this.props.tripDetails.issues[1].count.toString()}</RkText>
                 </View>
              </View> 
             :null} */}

             {/* {this.props.tripDetails.issues[2] ?             
              <View style={styles.iconContainer}>
                  <RkText style={styles.iconTopText}>{this.props.tripDetails.issues[2].name}</RkText>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.icon}>
                        <View>
                            <Image  style={{width:40,height:40}} source={require('../../assets/images/Idling_IC.png')}/>
                        </View>
                    </TouchableOpacity>
                      <RkText style={styles.iconRightText}>{this.props.tripDetails.issues[2].count.toString}</RkText>
                 </View>
              </View> 
            :null}   */}
        {/* </View> */}
        

        {/* second row */}

        <View style={styles.iconRow}> 
              {/* {this.props.tripDetails.issues.map((icon, index) => { */}
              {/* {this.props.tripDetails.issues[3] ?                            
                  <View style={styles.iconContainer} >
                    <RkText style={styles.iconTopText}>{this.props.tripDetails.issues[3].name}</RkText>
                  <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={styles.icon}>
                          <View>
                              <Image  style={{width:35,height:35}} source={require('../../assets/images/Harsh_Breaking_IC.png')}/>
                          </View>
                      </TouchableOpacity>
                        <RkText style={styles.iconRightText}>{this.props.tripDetails.issues[3].count.toString()}</RkText>
                    </View>
                </View>
                :null} */}
              {/* )})} */}
                

                
              {/* {this.props.tripDetails.issues[4] ?             
              <View style={styles.iconContainer}>
                  <RkText style={styles.iconTopText}> {this.props.tripDetails.issues[4].name}</RkText>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.icon}>
                        <View>
                            <Image  style={{width:35,height:35}} source={require('../../assets/images/Rapid_Accel_IC.png')}/>
                        </View>
                    </TouchableOpacity>
                      <RkText style={styles.iconRightText}>{this.props.tripDetails.issues[4].count.toString()}</RkText>
                 </View>
              </View> 
              :null} */}

            {/* {this.props.tripDetails.issues[5] ? 
              <View style={styles.iconContainer}>
                  <RkText style={styles.iconTopText}>{this.props.tripDetails.issues[5].name}</RkText>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.icon}>
                        <View>
                            <Image  style={{width:40,height:40}} source={require('../../assets/images/Idling_IC.png')}/>
                        </View>
                    </TouchableOpacity>
                      <RkText style={styles.iconRightText}>{this.props.tripDetails.issues[5].count.toString}</RkText>
                 </View>
              </View> 
            :null}   */}
        </View>
      {/* 3rd row */}
        <View style={styles.iconRow}> 
              {/* {this.props.tripDetails.issues.map((icon, index) => { */}

              {/* {this.props.tripDetails.issues[6] ?        
                  <View style={styles.iconContainer} >
                    <RkText style={styles.iconTopText}>{this.props.tripDetails.issues[6].name}</RkText>
                  <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={styles.icon}>
                          <View>
                              <Image  style={{width:35,height:35}} source={require('../../assets/images/Harsh_Breaking_IC.png')}/>
                          </View>
                      </TouchableOpacity>
                        <RkText style={styles.iconRightText}>{this.props.tripDetails.issues[6].count.toString()}</RkText>
                    </View>
                </View>
               :null} */}
                      
             {/* {this.props.tripDetails.issues[7] ? 
              <View style={styles.iconContainer}>
                  <RkText style={styles.iconTopText}> {this.props.tripDetails.issues[7].name}</RkText>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.icon}>
                        <View>
                            <Image  style={{width:35,height:35}} source={require('../../assets/images/Rapid_Accel_IC.png')}/>
                        </View>
                    </TouchableOpacity>
                      <RkText style={styles.iconRightText}>{this.props.tripDetails.issues[7].count.toString()}</RkText>
                 </View>
              </View> 
             :null}          */}
        </View> 

       </RkCard>   
      
    );
  };
}
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    hasError : state.tripsDetails.hasError,
    isLoading: state.tripsDetails.isLoading,
    tripDetails:state.tripsDetails.tripDetails
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTripsDetails:(token,id) => dispatch(TripDetailsActions.getTripsDetails(token,id)),
    selected:(index) => dispatch(NavigationBottomActions.selected(index))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsDetailsCard);


  