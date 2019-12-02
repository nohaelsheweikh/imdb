import React, { Component } from 'react';
import { View,Text} from 'react-native';
import { Button,Icon,ListItem,Card,Image,Divider} from 'react-native-elements';
import  { COLOR } from "../config/styles";
import Styles from "../styles/movieCard"

export default class MovieCardDetails extends Component {
    render(){
        return (
            <Card title={this.props.title}>
                <View>
                    <View style={Styles.image}  >
                        <Image
                            resizeMode="cover"
                            source={this.props.source}
                            style={{ width: 200, height: 150 }}
                        />
                    </View>

                    <View style={Styles.data}>
                        <Text >Release :{this.props.releaseDate}</Text>
                        <Text style={[this.props.rating<6 ? Styles.lowRate : Styles.highRate]}> 
                            Rating {this.props.rating}
                        </Text>
                    </View>

                </View>

                <Divider/>

                <View >
                 <Text style={Styles.overView}>{this.props.overview}</Text>
                </View>

                <View style={Styles.buttonGroup}>
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
                </View>
            </Card>
        );
    };
}
