import React, { Component } from 'react';
import { View} from 'react-native';
import { SearchBar, Button,Icon,Divider} from 'react-native-elements';
import Styles, { COLOR } from "../config/styles";

export default class Search extends Component {
    render(){
        return (
            <View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.props.update.bind(this)}
                    value={this.props.value}
                    showLoading={this.props.isLoading}
                />  
                <View style={{alignItems:'center',top:5}}>
                    <Button
                        buttonStyle={{width:150,backgroundColor:COLOR.SECONDARY}}
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
