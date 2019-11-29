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
import MoviesList from './MoviesList'

import LoginActions from '../../actions/Login';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import ErrorModal from '../../components/ErrorModal'


import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
import {searchMovie} from '../../actions/searchMovie';
import Share from 'react-native-share';
import Search from '../../components/search'

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
    headerRight:null,
    headerLeft:null
    
   
    
  }
  };
  

  
  state = {
    search:'',
  };

 


  share=(title,url)=>{
    const shareOptions = {
      title: title,
      message: title,
      url: url,
      social: Share.Social.WHATSAPP,
      whatsAppNumber: "9199999999", 
      email: 'email@example.com',
      social: Share.Social.EMAIL, 
      filename: 'test' ,  
      
  };
  console.log(title,url)
  Share.open(shareOptions);

  }
  
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


 
  render = () => {
    
      const { search } = this.state;
      
      return (
        <View>
           <Search
            update={this.updateSearch}
            value={search}
            change={this.Search}
        />   
          <MoviesList
          onChange={this.Search}
          isLoading={this.props.isLoading}
          MoviesList={this.props.moviesList}
          search={search}
          updateSearch={this.updateSearch}
          share={this.share}

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

