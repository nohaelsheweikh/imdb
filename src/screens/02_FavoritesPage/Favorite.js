import React from 'react';
import { connect} from 'react-redux';
import {
  View,
  Text,
  BackHandler,
  RefreshControl,
} from 'react-native';
import { Layout } from '../../components';
import Loader from '../../components/Loader';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
import Share from 'react-native-share';
import Search from '../../components/search'
import { Button ,Icon} from 'react-native-elements';
import FavoritesList from './FavoritesList'
import {getFavorites} from '../../actions/getFavorites'
import favorites from '../../reducers/favorites';


 

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
     
  Orientation.lockToPortrait();
  BackgroundColor.setColor('#EAE9EE');


}

_onRefresh =() =>{
  this.props.getFavorites()

}
 
  render = () => {
  if(!this.props.favoriteMovies){
        return(
          <Text>No Favorite Movies !</Text>
        )
      }
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

