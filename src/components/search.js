import React, { Component } from 'react';
import { View} from 'react-native';
import '../styles/search.js';
import { SearchBar, Button,Icon,Divider} from 'react-native-elements';

export default class Search extends Component {
    render(){
        return (
            <View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.props.update.bind(this)}
                    value={this.props.value}
                />  
                <View style={{alignItems:'center',top:5}}>
                    <Button
                        buttonStyle={{width:150}}
                        icon={
                            <Icon
                            name="search"
                            size={15}
                            color="white"
                            />
                        }
                        onPress={this.props.change.bind(this)}
                        iconRight
                        title="search"
                    />
                    <Divider/>
                </View>
            </View>
        );
    };
}
