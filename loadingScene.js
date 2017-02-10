import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  MapView,
  Dimensions,
  Image,
  Alert,
  PropTypes,
  TouchableHighlight

} from 'react-native';


var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

const { width, height } = Dimensions.get('window')



var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A very tighly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});


var PageOne = React.createClass ( {
  _handlePress() {
    this.props.navigator.replace({id: 2,});
  },

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'rgb(247, 246, 256)'}]}>
      <Image
        style={styles.imageLogo}
        source={require('./logo.png')}
      />
        <Text style={styles.welcome}>Welcome to RunnerPro</Text>
        <TouchableOpacity onPress={this._handlePress}>
          <View style={styles.buttomGet}>
            <Text style={styles.buttomGetText}>Get</Text>
          </View>
        </TouchableOpacity>
       </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#263441',
  },
  buttomGetText: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  buttomGet: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF1493'
  },
  imageLogo: {
    width: 170,
    height: 170,
    marginTop: -110,
  }
});


module.exports = PageOne;
