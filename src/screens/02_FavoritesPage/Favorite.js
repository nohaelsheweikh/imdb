import React from 'react';
import { connect} from 'react-redux';
import {
  View,
  Text,
  BackHandler,
  RefreshControl,
  Dimensions,
  ScrollView
} from 'react-native';
import { Layout } from '../../components';
import Loader from '../../components/Loader';
import Orientation from 'react-native-orientation';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import Share from 'react-native-share';

import FavoritesList from './FavoritesList'
import {getFavorites} from '../../actions/getFavorites'
import favorites from '../../reducers/favorites';

const { width,height } = Dimensions.get('window');

 

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
}

_onRefresh =() =>{
  this.props.getFavorites()

}
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
Share.open(shareOptions);

}
 
  render = () => {
  if(!this.props.favoriteMovies){
        return(
          <ScrollView 
              refreshControl={
                <RefreshControl
                  onRefresh={this._onRefresh}
                  refreshing={this.props.isLoading}
                />
              }
              >
            <Text style={{textAlign:'center',padding:'2%'}}>
              No Favorite Movies !
            </Text>
          </ScrollView>
        )
      }
      return (
        <Layout>
         
            <ScrollView 
              refreshControl={
                <RefreshControl
                  onRefresh={this._onRefresh}
                  refreshing={this.props.isLoading}
                 
                />
              }
              >

          <FavoritesList
            favoriteMovies={this.props.favoriteMovies}
            isLoading={this.props.isLoading}   
            share={this.share}

          />
          </ScrollView>
          <View style={{height:70}}/>
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

