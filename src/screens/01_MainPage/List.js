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


import DashboardActions from '../../actions/Dashboard';
import LoginActions from '../../actions/Login';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import ErrorModal from '../../components/ErrorModal'
import update from 'immutability-helper';
import ProfileActions from '../../actions/Profile'
// import RNExitApp from 'react-native-exit-app';
import {Blocks} from './Blocks'
import {Battery} from './Battery'
import ProgressChart from './progessChart';
import NotificationsActions from '../../actions/Notifications';
import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
import styles from '../../styles/profile'
import {searchMovie} from '../../actions/searchMovie';
import { SearchBar, Button,Icon,ListItem,Card} from 'react-native-elements';

const screenSize = Dimensions.get('window');
const { width,height } = Dimensions.get('window');
const size = 120;
const fontSize = 25;
const chartBackgroundStyle = { backgroundColor: "#FFFFFF"};
 

export default class List extends React.PureComponent {  

    state = {
        search:'',
        movies: [
            {
                key: 'a',
                index: 0,
                name: 'Fight Club',
                year: '1999',
                duration: '139',
                genre: 'Drama',
                logo_path: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZGY5Y2RjMmItNDg5Yy00NjUwLThjMTEtNDc2OGUzNTBiYmM1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
              },
        
        ]
      
      };
componentWillReceiveProps(nextProps) {
  if (nextProps.MoviesList !== this.props.MoviesList) {
    this.setState({
     movies: nextProps.MoviesList
    });
    console.log('new Movies',this.state.movies)
  }
}



// let image base= https://image.tmdb.org/t/p/w500/
 



  

  

  render = () => {
    
      
      return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.props.updateSearch.bind(this)}
          value={this.props.search}
        />
        <View style={{alignItems:'center',top:5,width:'100%'}}>
          <Button
            icon={
              <Icon
                name="search"
                size={15}
                color="white"
              />
            }
            onPress={this.props.onChange.bind(this)}
            iconRight
            title="search"
          />
      </View>

      <View>
        {/* <FlatList
          data={this.state.movies}
          extraData={this.state}
          renderItem={({item}) => (
            <ListItem key={item.key}
                      roundAvatar
                      avatar={item.avatar}
                      title={item.title}
                      subtitle={`${item.year} ${item.genre} ${item.duration} min`}
                      onPress={() => this.editMovie(item)}/>
          )}
        /> */}
        {this.props.isLoading?
      
             
            <Loader loading={true} />
            :null
        }
        {
          this.state.movies.map((u, i) => {
            return (
           <Card title={u.name}>
                <View key={i} >
                  <Image
                    resizeMode="cover"
                    source={{ uri:"https://image.tmdb.org/t/p/w500/"+u.logo_path }}
                  />
                  <Text >{u.name}</Text>
                </View>
            </Card>
              );
            })
        }
     
      </View>
    </View>
      );
}}


