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
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
import { Button,Icon,ListItem,Card,Image,Divider} from 'react-native-elements';
import MoviesCard from '../../components/MovieCard'

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
      <View style={{height:height+scaleVertical(50, 1)}}>
        
       <ScrollView >
        {this.props.isLoading?     
            <Loader loading={true} />
            :null
        }
        {
        this.state.movies.map((movie, i) => {
            return (
                <MoviesCard
                  title={movie.title} key={i}
                  source={{ uri:"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path }}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  share={this.props.share.bind(this,movie.title,"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path)}

                
                />
              );
            })
        }
     
      </ScrollView>
    </View>
      );
}}


