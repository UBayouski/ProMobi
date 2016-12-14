import React, { Component } from 'react';
import  {
  AppRegistry,
  Navigator,
  Text,
  StyleSheet,
  View
} from 'react-native';

import SimpleButton from './APP/Component/SimpleButton';
import HomeScreen from './APP/Component/HomeScreen';
import NoteScreen from './APP/Component/NoteScreen';
import MapTest from './APP/Component/MapTest';
class PropertyFinder extends React.Component {
  renderScene (route, navigator) {
    switch (route.name) {
      case 'home':
        return (
                <HomeScreen />
                );
      case 'Run':
        return (
                <MapTest />
                );
      case 'Button':
        return (
                <NoteScreen />
                );
        
    }
  }
  render () {
    return (
            <Navigator
            initialRoute={{name: 'home'}}
            renderScene={this.renderScene}
            navigationBar={
            <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            />
            }
            />
            );
  }}//36
var NavigationBarRouteMapper = {
LeftButton: function(route, navigator, index, navState) {
  switch (route.name) {
    case 'Run':
      return (
              <SimpleButton
              onPress={() => navigator.pop()}
              customText='Back'
              />
              );
    case 'Button':
      return (
              <SimpleButton
              onPress={() => navigator.pop()}
              customText='Run'
              />
              );
    default:
      return null;
  }
},//50
RightButton: function(route, navigator, index, navState) {
  switch (route.name) {
    case 'home':
      return (
              <SimpleButton
              onPress={() => {
              navigator.push({
                             name: 'Run'
                            
                             });
              }}
              customText='Map'
              />
              );
    case 'Run':
      return (
              <SimpleButton
              onPress={() => {
              navigator.push({
                             name: 'Button'
                             
                             });
              }}
              customText='Button'
              />
              );
    default:
      return null;
  }
},
Title: function(route, navigator, index, navState) {
  switch (route.name) {
    
    case 'home':
      return (
              <Text>React</Text>
              );
    case 'Run':
      return (
              <Text>Map</Text>
              );
    case 'Button':
      return (
              <Text>Button</Text>
              );
  }
}
};
  var styles = StyleSheet.create({
                               container: {
                               flex: 1,
                               justifyContent: 'center',
                               alignItems: 'center',
                               }
                               });
AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
