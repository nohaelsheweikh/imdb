import React from 'react';
import { connect} from 'react-redux';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  RefreshControl,
} from 'react-native';
import Styles, { COLOR } from "../../config/styles";
import Loader from '../../components/Loader';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
import { Button,Icon,ListItem,Card,Image,Divider} from 'react-native-elements';
import MoviesCard from '../../components/MovieCardDetails'

const { width,height } = Dimensions.get('window');


export default class MoviesList extends React.PureComponent {  

  state = {
        search:'',
        movies: []
      
      };
      componentWillReceiveProps(nextProps) {
       
        if(nextProps.favoriteMovies !== this.props.favoriteMovies){
  
           this.setState({
               movies:nextProps.favoriteMovies,    
  
          });
          console.log('data',nextProps.favoriteMovies)
        }
      }
  

  render = () => {   
   if (this.props.isLoading) {  
     return( 
       <Loader loading={true} />
     )
    }
      return (
        <View  style={{height:height+scaleVertical(-150, 15)}}>   
          <ScrollView 
            refreshControl={
              <RefreshControl
                onRefresh={this.props.onRefresh.bind(this)}
              />
            }
          >
          {this.state.movies.map((movie, i) => {
              return (
                <MoviesCard
                    title={movie.title} key={i}
                    source={{ uri:"https://image.tmdb.org/t/p/w500/"+movie.path }}
                    releaseDate={movie.release}
                    rating={movie.rate}
                    overview={movie.overview}
                  />
                
                );
              })
          }
     
        </ScrollView>
      </View>
      );
}}


