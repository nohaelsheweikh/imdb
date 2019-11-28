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
  BackHandler,
  RefreshControl,
  processColor,
  AsyncStorage,
} from 'react-native';
import { Layout } from '../../components';
import Loader from '../../components/Loader';
import { scaleModerate, scaleVertical,scale } from '../../utils/scale';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import BackgroundColor from 'react-native-background-color';
import { withNavigationFocus } from "react-navigation";
// import styles from '../../styles/profile'
import styles from '../../styles/healthReport'
import { SearchBar, Button,Icon,ListItem,Card,Image} from 'react-native-elements';


 

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

       <ScrollView >
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
                    style={{ width: 300, height: 200 }}
                  />
                  <Text >{u.name}</Text>
                </View>
            </Card>
              );
            })
        }
     
      </ScrollView>
      <View style={{height:50}}></View>
    </View>
      );
}}


