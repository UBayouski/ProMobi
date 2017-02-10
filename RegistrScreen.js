import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  PropTypes,
  TextInput

} from 'react-native';

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const { width, height } = Dimensions.get('window');


class RegistrScreen extends Component{
  constructor(props){
    super(props)
    this.stete={
      name : "",
      email : "",
      password : "",
      passwordAgin : "",

    }
  }

  render(){
    return(
      <View style = {styles.container}>
      <TextInput
      style = {styles.Account}
      placeholder = "Name"
      onChangeText = {(value) => this.setState({value : name})}
      />
      <TextInput
      style ={styles.Account}
      placeholder = "Email"
      onChangeText = {(value) => this.setState({value : email})}
      />
      <TextInput
      style = {styles.Account}
      placeholder = "Password"
      onChangeText = {(value) => this.setState({vlue : password})}
      />
      <TextInput
      style = {styles.Account}
      placeholder = "PasswordAgin"
      onChangeText = {(value) => this.setState({value : passwordAgin})}
      />
      <View style={styles.ViewForButton}>
      <TouchableOpacity onPress={() => this.props.navigator.replace({id: 4,})}>
      <View style={styles.buttomGet}>
        <Text style={styles.buttomGetText}>Back</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigator.replace({id: 1,})}>
      <View style={styles.buttomGet2}>
        <Text style={styles.buttomGetText}>Registration</Text>
      </View>
      </TouchableOpacity>

      </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'flex-start',
    alignItems : 'center',
    padding:10,
    paddingTop: 80,
    backgroundColor: 'rgb(247, 246, 256)',
  },
  Account:{
    height: 40,
    backgroundColor : '#FFFFFF',
    padding: 4,
    marginTop:10,
  },
  ViewForButton : {
    flex : 0.5,
    flexDirection : 'row',
  },
  buttomGetText: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    paddingTop: 5,
    color: '#fff',
  },
  buttomGet2: {
    height : 50,
    width : width /3,
    marginTop : 20,
    marginLeft : 20,
    backgroundColor: '#FF1493',
  },
  buttomGet: {
    height : 50,
    width : width /3,
    marginTop : 20,
    marginLeft : 20,
    backgroundColor: '#FF1493'
  },
});

module.exports = RegistrScreen;
