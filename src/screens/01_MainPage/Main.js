import React from 'react';
import { connect} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  BackHandler,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { Layout } from '../../components';
import Loader from '../../components/Loader';
import MoviesList from './MoviesList'
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import{logout} from '../../actions/authenticate'
import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
import {searchMovie} from '../../actions/searchMovie';
import {addToFavorites} from '../../actions/addToFavorites'
import Share from 'react-native-share';
import Search from '../../components/search'
import { Button ,Icon} from 'react-native-elements';

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
        onPress={() => params._logout()}
        >
        <View style={{flexDirection:'row'}}>
        <Text style={{color:'#FFFFFF'}}>Logout</Text>   
        <Icon 
          name="arrow-back"
          size={15}
          color="white"/> 
           
        </View>
      </TouchableOpacity>),
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
  Share.open(shareOptions);

  }
  
  updateSearch = search => {
    this.setState({ search });
  };


  Search = () => {
    this.props.searchMovie(this.state.search)
  }
  addToFavorites = (movie) => {
    this.props.addToFavorites(movie)

  }

componentDidMount() {
  this.props.navigation.setParams({ _logout: this.props.logout });
  // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  Orientation.lockToPortrait();
  BackgroundColor.setColor('#EAE9EE');


}


 
  render = () => {
    
      const { search } = this.state;
      
      return (
        <Layout>
           <Search
              update={this.updateSearch}
              value={search}
              change={this.Search}
              isLoading={this.props.isLoading}
           />     
           <View style={{height:10}}/>
            <MoviesList
              onChange={this.Search}
              isLoading={this.props.isLoading}
              MoviesList={this.props.moviesList}
              search={search}
              updateSearch={this.updateSearch}
              share={this.share}
              addToFavorites={this.addToFavorites}

            />
        </Layout>
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
      logout:() => dispatch(logout()),
      addToFavorites:(movie) => dispatch(addToFavorites(movie))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

