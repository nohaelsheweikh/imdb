import React, { Component } from 'react';
import { View,Text} from 'react-native';
import { Button,Icon,ListItem,Card,Image,Divider} from 'react-native-elements';
import Styles, { COLOR } from "../config/styles";

export default class MovieCard extends Component {
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
                        onPress={this.props.share.bind(this)}
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
                        onPress={this.props.addToFavorites.bind(this)}
                        title="Favorite"
                    />
                </View>
            </Card>
        );
    };
}
