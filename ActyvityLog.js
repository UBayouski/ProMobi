import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
export default class ActyvityLog extends Component{
  constructor(){
    super()
    this.state = {
    list: ''
    }
    try {
      AsyncStorage.getItem('database').then((value) =>{
                                            this.setState({
                                                          list:value
                                                          })
                                            })
                                          AsyncStorage.clear();
    }
    catch(err){
      console.log(err)
    }

  }
  render(){
    const data=JSON.stringify(this.state.list)
    return(
      <View style={styles.container}>
      <Text>{data}</Text>
      </View>
    )
  }
}
const styles =StyleSheet.create({
                                container:{
                                flex: 1,
                                marginTop: 80
                                }
                                })
