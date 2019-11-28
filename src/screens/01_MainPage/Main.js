import React from 'react';
import { connect} from 'react-redux';
import {
  View,
  ScrollView,
  FlatList,
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
  processColor,
  AsyncStorage,

} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
import { Layout } from '../../components';
import Loader from '../../components/Loader';
import List from './List'

import DashboardActions from '../../actions/Dashboard';
import LoginActions from '../../actions/Login';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import ErrorModal from '../../components/ErrorModal'
import update from 'immutability-helper';
import ProfileActions from '../../actions/Profile'
// import RNExitApp from 'react-native-exit-app';
import {Blocks} from './Blocks'
import {Battery} from './Battery'
import ProgressChart from './progessChart';
import NotificationsActions from '../../actions/Notifications';
import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
import styles from '../../styles/profile'
import {searchMovie} from '../../actions/searchMovie';
import { SearchBar, Button,Icon,ListItem,Card} from 'react-native-elements';

const screenSize = Dimensions.get('window');
const { width,height } = Dimensions.get('window');
const size = 120;
const fontSize = 25;
const chartBackgroundStyle = { backgroundColor: "#FFFFFF"};
 

 class HomeScreen extends React.PureComponent {  
   

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
    title: 'Home'.toUpperCase(),
    headerMode: 'float',
    headerStyle: {
      backgroundColor: '#13161d',
    },
    headerTintColor: '#FFFFFF',
    headerRight: (
    <TouchableOpacity 
      style={{marginRight:10}}
      onPress={() => params._setModal(true)}
      >
      <View style={{flexDirection:'row'}}>
       <Image style={{tintColor:'white',width:32,height:32}} source={require('../../assets/images/car.png')}/>
      </View>
    </TouchableOpacity>
  
   
   ),
    headerLeft:null
    
   
    
  }
  };
  

  
  state = {
    search:'',
    movies: [
    
    ]
  
  };

  //to check if the user has_vehicle
 

  

  


  
  
  updateSearch = search => {
    this.setState({ search });
    console.log('search',this.state.search)
  };

Search=()=>{
  this.props.searchMovie(this.state.search)
}

componentDidMount() {
  this.props.navigation.setParams({ _setModal: this.setModalVisible });
  // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  Orientation.lockToPortrait();
  BackgroundColor.setColor('#EAE9EE');


}


// let image base= https://image.tmdb.org/t/p/w500/
 



  

  

  render = () => {
    
      const { search } = this.state;
      
      return (
        <View>
          <List
          onChange={this.Search}
          isLoading={this.props.isLoading}
          MoviesList={this.props.moviesList}
          search={search}
          updateSearch={this.updateSearch}

          />
          
        </View>
      );
}}
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    moviesList:state.searchMovies.Movies,
    isLoading:state.searchMovies.isLoading
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      searchMovie:(query) => dispatch(searchMovie(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

