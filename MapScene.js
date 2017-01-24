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

import pick from 'lodash.pick'
import haversine from 'haversine'


var SCREEN_WIDTH = require('Dimensions').get('window').width
var BaseConfig = Navigator.SceneConfigs.FloatFromRight

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


class PageTwo extends Component {

constructor(props) {
  super(props)

  this.state = {
    routeCoordinates: [],
    distanceTravelled: 0,
    calcDistanceButton: false,
    prevLatLng: {},
    pressStatus: false,
  }
}



  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }

  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

 _onPressButton() {
    Alert.alert('Your distance '+ parseFloat(this.state.distanceTravelled).toFixed(2) +' km');
   
}


  componentDidMount() {
   
   
    navigator.geolocation.getCurrentPosition(
      (position) => {},
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates, distanceTravelled } = this.state
      const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      this.setState({
        routeCoordinates: routeCoordinates.concat(positionLatLngs),
        distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
        prevLatLng: newLatLngs
      })
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance(newLatLng) {
    const { prevLatLng } = this.state
    return (haversine(prevLatLng, newLatLng) || 0)
  }


  render() {

    return (
      <View style={styles.container}>
        
        <MapView
          style={styles.map}
          mapType='standard'
          showsUserLocation={true}
          followUserLocation={true}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: '#7B88F7',
            lineWidth: 9,
          }]}

        />
        <View style={styles.navBar}><Text style={styles.navBarText}>Run</Text></View>
       
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarGroup}>

             <TouchableHighlight 
             activeOpacity={1}
          style={ this.state.pressStatus ? styles.buttonPause : styles.buttonRun }
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onShowUnderlay={this._onShowUnderlay.bind(this)}>
      <Text style={ this.state.pressStatus ? styles.navBarText : styles.navBarText }>ff</Text>
    </TouchableHighlight>
            <Text style={styles.bottomBarHeader}>DISTANCE</Text>
             <Text style={styles.bottomBarContent}>{parseFloat(this.state.distanceTravelled).toFixed(2)} km</Text>
          </View>
        </View>
     </View>
     
    )
  }
};


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
  }
});


module.exports = PageTwo;
