import React from 'react';
import { View } from 'react-native';
import {
  RkComponent,
  RkText,
  RkTheme,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { VictoryPie } from 'victory-native';
import { Svg, Text as SvgText } from 'react-native-svg';
import { scale } from '../../utils/scale';
import IconM from 'react-native-vector-icons/MaterialIcons'

export class FaultProgressChart extends RkComponent {
  state = {
    percents:0,
    themeColor:''
  };
  size = 120;
  fontSize = 25;

  componentDidMount() {
    //this.setStateInterval = setInterval(this.updatePercent, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.setStateInterval);
  }

  updatePercent = () => {
    let positive = Math.random() > 0.5;
    if (this.state.percents > 95) {
      positive = false;
    } else if (this.state.percents < 60) {
      positive = true;
    }
    this.setState({
      percents: positive ? this.state.percents + 1 : this.state.percents - 1,
    });
  };

  getChartData = () => [
    { x: 1, y: this.state.percents },
    { x: 2, y: 100 - this.state.percents },
  ];

  onChartFill = (data) => {
    this.state.themeColor = 'red'
    return data.x === 1 ? this.state.themeColor : 'transparent';
  };

  render = () => (
    <View>
    <View style={styles.row}>
      <RkText rkType='header4'>Vehicle Fault</RkText>
      <RkText rkType='awesome hero' style={styles.icon}>
      <IconM
        name='error-outline'
        color='red'
        size={26}
      />
      </RkText>
      </View>
      <View style={styles.chartContainer}>
        <Svg width={scale(this.size)} height={scale(this.size)}>
          <VictoryPie
            labels={[]}
            padding={0}
            standalone={false}
            width={scale(this.size)}
            height={scale(this.size)}
            style={{ data: { fill: this.onChartFill } }}
            data={this.getChartData()}
            cornerRadius={scale(25)}
            innerRadius={scale(40)}
          />
          <SvgText
            textAnchor="middle"
            verticalAnchor="middle"
            x={scale(this.size / 2)}
            y={scale(this.size / 2)}
            height={scale(this.fontSize)}
            fontSize={scale(this.fontSize)}
            // fontFamily={RkTheme.current.fonts.family.regular}
            // stroke={RkTheme.current.colors.text.base}
            // fill={RkTheme.current.colors.text.base}
            >
            {`${this.state.percents}`}
          </SvgText>
        </Svg>
        <View>
          <RkText rkType='header4'>REACH</RkText>
          <RkText rkType='header2'>1 500 356</RkText>
          <RkText rkType='secondary2'>+6 per day in average</RkText>
        </View>
      </View>
    </View>
  );
}

const styles = RkStyleSheet.create(() => ({
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  row:{
    flexDirection: 'row',
  },
  icon:{
    paddingHorizontal:5,
    marginBottom:20
 }

}));
