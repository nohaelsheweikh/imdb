import React, { Component } from 'react';
import { View,Text} from 'react-native';
import { Button,Icon,ListItem,Card,Image,Divider} from 'react-native-elements';
import Styles, { COLOR } from "../config/styles";

export default class MovieCardDetails extends Component {
    render(){
        return (
            <Card title={this.props.title}>
                <View>
                    <View style={{alignItems:'center'}}  >
                        <Image
                            resizeMode="cover"
                            source={this.props.source}
                            style={{ width: 200, height: 150 }}
                        />
                    </View>

                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                        <Text >Release :{this.props.releaseDate}</Text>
                        <Text> Rating {this.props.rating}</Text>
                    </View>

                </View>

                <Divider/>

                <View >
                 <Text style={{textAlign:'center'}}>{this.props.overview}</Text>
                   
                </View>
            </Card>
        );
    };
}
