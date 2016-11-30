import React, { Component } from 'react';

import {
  
  AppRegistry,
  
  MapView,
  
  View,

  StyleSheet
  
} from 'react-native';



class MapTest extends Component{
  

  render(){
    
    return (
            
            <MapView
            
            style= {styles.map}
            mapType='satellite'
            showsUserLocation={true}
            followUserLocation={true}
            
            >
            
            </MapView>
            
            );
    
  }
  
}







var styles = StyleSheet.create({
                               
                               map:{
                               
                               flex:1
                               
                               }
                               
                               });



AppRegistry.registerComponent('Project1', () => MapTest);
