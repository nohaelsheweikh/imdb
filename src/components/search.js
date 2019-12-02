import React, { Component } from 'react';
import { View} from 'react-native';
import { SearchBar, Button,Icon,Divider} from 'react-native-elements';
import Styles from "../styles/search"

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
                <View style={Styles.buttonContainer}>
                    <Button
                        buttonStyle={Styles.buttonStyle}     
                        onPress={this.props.change.bind(this)}
                        iconRight
                        title="Search"
                    />
                    <Divider/>
                </View>
            </View>
        );
    };
}
