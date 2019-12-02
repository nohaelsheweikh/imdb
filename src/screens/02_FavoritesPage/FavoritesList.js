import React from 'react';
import { connect} from 'react-redux';
import {
  View,
  Text,
} from 'react-native';
import Loader from '../../components/Loader';
import Orientation from 'react-native-orientation';
import MoviesCard from '../../components/MovieCardDetails'
import _ from 'lodash';



export default class MoviesList extends React.PureComponent {  

  state = {
        search:'',
        movies: []
      
      };

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.favoriteMovies !== prevState.favoriteMovies){
          return {   movies:nextProps.favoriteMovies};
    }
      else return null;
    }
      
  

  render = () => {   
   if (this.props.isLoading) {  
     return( 
       <Loader loading={true} />
     )
    }
      return (
        <View  >   
          
          {_.uniqBy(this.state.movies,'id').map((movie, i) => {
              return (
                <MoviesCard
                    title={movie.title} key={movie.i}
                    source={{ uri:"https://image.tmdb.org/t/p/w500/"+movie.path }}
                    releaseDate={movie.release}
                    rating={movie.rate}
                    overview={movie.overview}
                    share={this.props.share.bind(this,movie.title,"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path)} 
                  />
                
                );
              })
          }
     
       
      </View>
      );
}}


