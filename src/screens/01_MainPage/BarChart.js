import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Modal,
  Text,
  TextInput,
  Alert,
  Platform,
  Image,
  BackHandler,
  RefreshControl,
  processColor
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
  RkTabSet,
  RkTab,
  RkButton,
  RkComponent,

} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import IconF from 'react-native-vector-icons/Foundation'
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import IconM from 'react-native-vector-icons/MaterialIcons'
import { ActionButton , Badge, Icon, Avatar } from 'react-native-material-ui';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import styles from '../../styles/dashboard'
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import Svg from 'react-native-svg';
import {BarChart} from 'react-native-charts-wrapper';
import update from 'immutability-helper';
import Loader from '../../components/Loader';

const chartBackgroundStyle = { backgroundColor: "white"};
const { width,height } = Dimensions.get('window');

var mounted
export class BarCharts extends React.PureComponent {
    state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 12,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.2
      },
      data: {
        dataSets: [{
          values:[],
          label: '',
          config: {
            color: processColor('#B3D137'),
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
          }
        }],
  
        config: {
          barWidth: 0.6,
        }
      },
      highlights: [{x: 3}, {x: 6}],
      xAxis: {
        valueFormatter:['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri'],
        granularityEnabled: true,
        granularity : 1,
      },
      themeColor:''
    };
   

  async  componentWillReceiveProps(nextProps) {
      // console.log('bar nextprops',nextProps)
      if (nextProps.barchart !== this.props.barchart) {
          if(nextProps.barchart[1].length<1){
        this.setState(
            update(this.state, {
              data: {
                $set: {
                  dataSets: [{
                    values:nextProps.barchart[1],
                     label: 'Minutes',
                     config: {
                      color: processColor('#B3D137'),
                      barShadowColor: processColor('lightgrey'),
                      highlightAlpha: 90,
                      highlightColor: processColor('red'),
                    }           
                  }],
                  config: {
                    barWidth: 0.6,  
                }
                }
              }
            }),  
          );
        }

          this.setState(
            
            update(this.state, {
              xAxis: {
                $set: {
                    valueFormatter:nextProps.barchart[0],
                    granularityEnabled: true,
                    granularity : 1,
                }
              }
            }),  
          );
       

      }
    }

    

componentDidMount(){
  this.mounted = true;
    this.setState(
        update(this.state, {
          data: {
            $set: {
              dataSets: [{
                values:this.props.barchart[1],
                 label: 'Minutes',
                 config: {
                  color: processColor('#B3D137'),
                  barShadowColor: processColor('lightgrey'),
                  highlightAlpha: 90,
                  highlightColor: processColor('red'),
                }           
              }],
              config: {
                barWidth: 0.6,  
            }
            }
          }
        }), 
      );
    
    if(this.props.barchart[0].length<1){
      this.setState(
        update(this.state, {
          xAxis: {
            $set: {
                valueFormatter:this.props.barchart[0],
                granularityEnabled: true,
                granularity : 1,
            }
          }
        }),  
      );
    }
  }
  componentWillUnmount = () => {
    this.mounted = false;
   
  };
   

   handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }
  }

  
render = () => {
  return(
    
    <View style={[styles.chartBlock, chartBackgroundStyle]}>
        <RkText rkType='header4'style={{fontSize:20,fontWeight:'bold'}}>Previous Week Activity (Mins/Day)</RkText>
        <BarChart
                style={{top:10,width:width-scale(30) ,height:height-300}}
                data={this.state.data}
                xAxis={this.state.xAxis}
                animation={{durationX: 2000}}
                legend={this.state.legend}
                gridBackgroundColor={processColor('#ffffff')}
                visibleRange={{x: { min: 5, max: 5 }}}
                drawBarShadow={false}
                drawValueAboveBar={true}
                drawHighlightArrow={true}
                onSelect={this.handleSelect.bind(this)}
                highlights={this.state.highlights}
                // onChange={(event) => console.log(event.nativeEvent)}
                />   
    </View>
  )}
}
const mapStateToProps = (state) => {
  // console.log(state)
  return {
      
      isLoading: state.dashboard.isLoading,
     
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      getDashboard:(token) => dispatch(DashboardActions.getDashboard(token)),
      


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarCharts);
