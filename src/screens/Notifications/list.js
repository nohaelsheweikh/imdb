import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import _ from 'lodash';
import {
  RkStyleSheet,
  RkText,
  RkTextInput,
  RkComponent
} from 'react-native-ui-kitten';
import { Avatar } from '../../components';
// import { data } from '../../data';
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import IconS from 'react-native-vector-icons/SimpleLineIcons'
import IconF from 'react-native-vector-icons/Feather'

import { Layout } from '../../components';
import Orientation from 'react-native-orientation';

const moment = require('moment');

extractItemKey = (item) => `${item.id}`;

  onInputChanged = (event) => {
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const chats = _.filter(this.state.data.original, chat => {
      const filterResult = {
        firstName: chat.firstName.search(pattern),
        lastName: chat.lastName.search(pattern),
      };
      return filterResult.firstName !== -1 || filterResult.lastName !== -1 ? chat : undefined;
    });
    this.setState({
      data: {
        original: this.state.data.original,
        filtered: chats,
      },
    });
  };

  

export class List extends RkComponent {
    state = {
        data:null
    };
   
    componentWillReceiveProps(nextProps) {
      // console.log(nextProps)
    if(!_.isEqual(nextProps.notifications,this.props.notifications)){ 
      //user scrolled, call next offset using the API   
        this.setState({
            data: [...this.state.data,...nextProps.notifications]
        })
    
  }
}

componentDidMount() {
this.setState({data:this.props.notifications})
}
componentWillUnmount(){
//  this.setState({data:null})
}
onItemPressed = (item) => {
// this.props.navigation.navigate(item.id);
// Actions.TripsDetails(item);
};
    


   renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderInputLabel = () => (
    <RkText rkType='awesome'>{FontAwesome.search}</RkText>
  );

  renderHeader = () => (
    <View style={styles.searchContainer}>
      {/* <RkTextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChange={this.onInputChanged}
        label={this.renderInputLabel()}
        rkType='row'
        placeholder='Search'
      /> */}
    </View>
  );

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.onItemPressed(item)}>
        <View style={styles.container}>
         <TouchableOpacity>        
          {item.level == 'success' ?
            <IconF
                name='sun'
                color='#00FF00'
                size={24}
            />
            :null
          }
          {item.level == 'warning' ?
            <IconM
                name='warning'
                color='#FFC300'
                size={28}
            />
            :null
          }
          {item.level == 'danger' ?
            <IconM
                name='warning'
                color='#FF0000'
                size={28}
            />
            :null
          }
          {item.level == 'info' ?
            <IconM
                name='info'
                color='#5DADE2'
                size={28}
            />
            :null
            }
         </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5' style={{fontWeight:'bold'}}>{item.verb}</RkText>           
            </View>
            <RkText numberOfLines={2} rkType='primary3 mediumLine' style={{ paddingTop: 5 }}>
              {item.description}
            </RkText>
            <RkText rkType='secondary4' style={{fontSize:13,color:'grey',padding:5}}>
              18 minutes ago
            </RkText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

render = () => (
    <FlatList
      style={styles.root}
      data={this.state.data}
      ListHeaderComponent={this.renderHeader}
      ItemSeparatorComponent={this.renderSeparator}
      renderItem={this.renderItem}
      ref={r => (this.refs = r)}
      keyExtractor={this._keyExtractor} 
      keyExtractor = { (item, index) => index.toString() }
      onEndReached={this.props.loadmoreFunction.bind(this)}
      onEndReachedThreshold={0.1}
  />
)}

const styles = RkStyleSheet.create(theme => ({
    root: {
      backgroundColor: theme.colors.screen.base,
    },
    searchContainer: {
      backgroundColor: theme.colors.screen.bold,
      paddingHorizontal: 16,
      paddingVertical: 10,
      height: 20,
      alignItems: 'center',
    },
    container: {
      paddingLeft: 19,
      paddingRight: 16,
      paddingBottom: 12,
      paddingTop: 7,
      flexDirection: 'row',
    },
    content: {
      marginLeft: 16,
      flex: 1,
    },
    contentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.border.base,
    },
    avatar:{
        height:30,
        width:30,
        borderRadius:30,
        backgroundColor:'#CCC'
    }
  }));
  