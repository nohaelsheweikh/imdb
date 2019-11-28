import React from 'react';
import {
  Image,
  View,
} from 'react-native';
import {
  RkComponent,
  RkText,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';

export class Avatar extends RkComponent {
  componentName = 'Avatar';
  typeMapping = {
    container: {},
    image: {},
    username: {},
    description: {}
  };
  constructor(props) {
    super(props);
  }
    
 render() {

  let {container, image, username, description: descriptionStyle} = this.defineStyles();
  let description = this.props.description ? (<RkText style={descriptionStyle}>{this.props.description}</RkText>) :
    <View/>;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={this.props.source}/>
        <View>
          <RkText rkType='header xxlarge' style={username}>{this.props.name}</RkText>
          {description}
        </View>
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  
    image: {
      width: 110,
      height: 110,
      borderRadius: 55,
      marginBottom: 19,
    },
  
    container: {
     
        alignItems: 'center',
        flexDirection: 'column',
      
    },
    username:{
      color: 'black',
      fontWeight:'bold'
    },
    description:{
      color: theme.colors.text.subtitle
    }
  
}));
