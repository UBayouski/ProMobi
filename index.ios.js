import React, { Component } from 'react';

import {
  
  AppRegistry,
  MapView,
  View,
  StyleSheet,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
  StatusBarIOS

  
} from 'react-native';

import haversine from 'haversine'
import pick from 'lodash.pick'

import SplashScreen from 'react-native-splash-screen'

const { width, height } = Dimensions.get('window')


class Map extends Component {

constructor(props) {
    super(props)

    this.state = {
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {}
    }
  }

///////
 
componentDidMount() {
    //StatusBarIOS.setStyle('light-content')
    SplashScreen.hide();
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

/////////
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
            <Text style={styles.bottomBarHeader}>DISTANCE</Text>
            <Text style={styles.bottomBarContent}>{parseFloat(this.state.distanceTravelled).toFixed(2)} km</Text>
          </View>
        </View>
      </View>
    )
  }
}



var styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  map: {
    flex: 0.7,
    width: width,
    height: height
  },
  bottomBar: {
    position: 'absolute',
    height: 100,
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
    color: '#fff',
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
 });


AppRegistry.registerComponent('PropertyFinder', () => Map);
