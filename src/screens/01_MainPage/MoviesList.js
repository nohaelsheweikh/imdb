import React from 'react';
import { connect} from 'react-redux';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TexInput,
} from 'react-native';
import Styles, { COLOR } from "../../config/styles";

import { Layout } from '../../components';
import Loader from '../../components/Loader';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
// import styles from '../../styles/profile'
import styles from '../../styles/healthReport'
import { Button,Icon,ListItem,Card,Image,Divider} from 'react-native-elements';


const { width,height } = Dimensions.get('window');


export default class MoviesList extends React.PureComponent {  

    state = {
        search:'',
        movies: []
      
      };

componentWillReceiveProps(nextProps) {
  if (nextProps.MoviesList !== this.props.MoviesList) {
    this.setState({
     movies: nextProps.MoviesList
    });
    console.log('new Movies',this.state.movies)
  }
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
           <Card title={movie.title} key={i}>
             <View>
                <View style={{alignItems:'center'}}  >
                  <Image
                    resizeMode="cover"
                    source={{ uri:"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path }}
                    style={{ width: 200, height: 150 }}
                  />
                  </View>
                  <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text >Release :{movie.release_date}</Text>
                    <Text> Rating {movie.vote_average}</Text>
                  </View>  
                </View>
                <Divider  />
              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <Button
                  type="clear"
                  titleStyle={{color:COLOR.SECONDARY}}
                  icon={
                    <Icon
                      name="share"
                      size={15}
                      color={COLOR.SECONDARY}
                    />
            }
            onPress={this.props.share.bind(this,movie.title,"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path)}
            title="Share"
          />
          
          <Button
             type="clear"
             titleStyle={{color:COLOR.SECONDARY}}

              icon={
                <Icon
                  name="star"
                  size={15}
                  color={COLOR.SECONDARY}
                />
               

              }
              title="Favorite"
            />
          </View>
          
            </Card>
              );
            })
        }
     
      </ScrollView>
    </View>
      );
}}


