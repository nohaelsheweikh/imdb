import React from 'react';
import { connect} from 'react-redux';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import Styles, { COLOR } from "../../config/styles";
import Loader from '../../components/Loader';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import Orientation from 'react-native-orientation';
import MoviesCard from '../../components/MovieCard'
import { Layout } from '../../components';

const { width,height } = Dimensions.get('window');


export default class MoviesList extends React.PureComponent {  

  state = {
        search:'',
        movies: []
      
      };

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.MoviesList !== prevState.MoviesList){
      return {  movies: nextProps.MoviesList};
    }
    else return null;
    }

  render = () => {   
      return (
      <Layout >   
        <ScrollView >
          {this.props.isLoading?     
              <Loader loading={true} />
              :null
          }
        
          {this.state.movies.map((movie, i) => {
              return (
                  <MoviesCard
                    title={movie.title} key={i}
                    source={{ uri:"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path }}
                    releaseDate={movie.release_date}
                    rating={movie.vote_average}
                    share={this.props.share.bind(this,movie.title,"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path)} 
                    addToFavorites={this.props.addToFavorites.bind(this,movie)}
                  />
                );
              })
          }
     
        </ScrollView>
        <View style={{height:70}}/>
      </Layout>
      );
}}


