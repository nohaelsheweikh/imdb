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
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Layout } from '../../components';
import Loader from '../../components/Loader';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import{logout} from '../../actions/authenticate'
import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
import Share from 'react-native-share';
import Search from '../../components/search'
import { Button ,Icon} from 'react-native-elements';
import FavoritesList from './FavoritesList'
import {getFavorites} from '../../actions/getFavorites'
import favorites from '../../reducers/favorites';

const screenSize = Dimensions.get('window');
const { width,height } = Dimensions.get('window');
const size = 120;
const fontSize = 25;
const chartBackgroundStyle = { backgroundColor: "#FFFFFF"};
 

 class FavoriteScreen extends React.PureComponent {  
   

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
    title: 'Favorites'.toUpperCase(),
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
    movies:[],
  };

  
 componentDidMount() {
     this.props.getFavorites()
     var movies
     AsyncStorage.getItem('MOVIES').then((value) => {
         
        movies = JSON.parse(value)  
        console.log('movies',movies)

      })
     .then(() => {  
         this.setState({
             movies:movies
         },
         console.log('state',movies)
         
         )
    })
  Orientation.lockToPortrait();
  BackgroundColor.setColor('#EAE9EE');


}

_onRefresh =() =>{
  this.props.getFavorites()

}
 
  render = () => {
    
     
      return (
        <Layout>
          <FavoritesList
            favoriteMovies={this.props.favoriteMovies}
            isLoading={this.props.isLoading}   
            onRefresh={this._onRefresh} 
            />
        </Layout>
      );
}}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    isLoading:state.favorites.requestingRestore,
    favoriteMovies:state.favorites.favoriteMovies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      searchMovie:(query) => dispatch(searchMovie(query)),
      logout:()=> dispatch(logout()),
      getFavorites:()=> dispatch(getFavorites())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);

