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

import SplashScreen from 'react-native-splash-screen'


import PageOne from './loadingScene'
import PageTwo from './MapScene'
import PageLctyvityLog from './ActyvityLog'

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





class ReactNativeNavigationExample extends Component {


componentDidMount() {
	 SplashScreen.hide();
}

  _renderScene(route, navigator) {
    if (route.id === 1) {
      return <PageOne navigator={navigator} />
    } if (route.id === 2) {
      return <PageTwo navigator={navigator} />
    }
    if (route.id == 3){
      return <PageLctyvityLog navigator ={navigator}/>
    }
  }

  _configureScene(route) {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 1, }}
        renderScene={this._renderScene}
        configureScene={this._configureScene} />
    );
  }
}

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
    backgroundColor: '#29D39A'
  },
   map: {
    flex: 0.7,
    width: width,
    height: height
  },
  navBar: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    height: 64,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  navBarText: {
    color: '#7B88F7',
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center',
    paddingTop: 30
  },
bottomBar: {
    position: 'absolute',
    height: 200,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: width,
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  bottomBarGroup: {
    flex: 1
  },
  bottomBarHeader: {
    color: '#19B5FE',
    fontWeight: "400",
    textAlign: 'center'
  },
  bottomBarContent: {
    color: '#fff',
    fontWeight: "700",
    fontSize: 18,
    marginTop: 10,
    color: '#19B5FE',
    textAlign: 'center'
  },
  buttonRun: {
    borderColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
    width: 72,
    height: 72,
    alignSelf: 'center'
  },
  buttonPause: {
     borderColor: '#000066',
    backgroundColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
    width: 72,
    height: 72,
    alignSelf: 'center'
  },
  imageLogo: {
    width: 170,
    height: 170,
    marginTop: -110,
  }
});

AppRegistry.registerComponent('PropertyFinder', () => ReactNativeNavigationExample);
