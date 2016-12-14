'use strict';
import React, { Component } from 'react';
import {
        AppRegistry,
    AsyncStorage,
    Text,
    MapView,
    View,
    StyleSheet,
} from 'react-native';
import Button from './Button';
export default class MapTest extends Component{
    state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    };
watchID: ?number = null;
    
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
                                                 (position) => {
                                                 var initialPosition = JSON.stringify(position);
                                                 this.setState({initialPosition});
                                                 },
                                                 (error) => alert(JSON.stringify(error)),
                                                 {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
                                                 );
        this.watchID = navigator.geolocation.watchPosition((position) => {
                                                           var lastPosition = JSON.stringify(position);
                                                           this.setState({lastPosition});
                                                           });
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
 /*   async getTheItem(key,callback) {
        var fetchedItem;
        try {
            fetchedItem = await AsyncStorage.getItem(key);
        } catch (e) {
            console.log(e);
        } finally {
            callback(fetchedItem);
        }
    }
    
    async setTheItem(key,position,callback) {
        try {
            await AsyncStorage.setItem(key,position);
        } catch (e) {
            console.log(e);
        } finally {
            callback();
        }
    }
    
    async deleteAllItems(keys, callback) {
        try {
            await AsyncStorage.multiRemove(keys);
        } catch (e) {
            console.log(e);
        } finally {
            callback();
        }
    }*/
      render(){//10
        return (
                <View>
                <MapView
                style= {styles.map}
                mapType='satellite'
                showsUserLocation={true}
                followUserLocation={true}
                >
                </MapView>
         
                <Text>
                <Text style={styles.title}>Initial position: </Text>
                {this.state.initialPosition}
                </Text>
                <Text>
                <Text style={styles.title}>Current position: </Text>
                {this.state.lastPosition}
                </Text>
                </View>
                );
             
    }
}




var styles = StyleSheet.create({
                               title: {
                               fontWeight: '500',
                               },
                               map: {
                               height: 250,
                               margin: 40,
                               
                               },
                               but: {
                               justifyContent: 'center',
                                alignItems: 'center',
                               },
                             

                               });

