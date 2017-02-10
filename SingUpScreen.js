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



class SingUpScreen extends Component {
constructor(props) {
  super(props)
  this.state = {
    name : "",
    password: ""
  }
}

render() {
  return (
    <View style={[styles.container, {backgroundColor: 'rgb(247, 246, 256)'}]}>
      <TextInput
      style = {styles.Account}
      placeholder = "Account Name"
      onCangeText = {(value) => this.setState({name : value})}
      />
      <TextInput
      style={styles.Account}
      placeholder = "Password"
      secureTextEntry = {true}
      onChangeText = {(value) => this.setState({password : value})}
      />
      <View style ={styles.ViewForButton}>
      <TouchableOpacity onPress={() => this.props.navigator.replace({id: 1,})}>
      <View style={styles.buttomGet}>
        <Text style={styles.buttomGetText}>Sing up</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigator.replace({id: 5,})}>
      <View style={styles.buttomGet2}>
        <Text style={styles.buttomGetText}>Registration</Text>
      </View>
      </TouchableOpacity>
      </View>
      <View style={styles.ViewForLogo}>
      <Image
        source={require('./logo.png')}/>
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
  ViewForButton : {
    flex : 0.2,
    flexDirection : 'row',
  },
  ViewForLogo:{
    flex:1,
  },
  Account:{
    height: 40,
    backgroundColor : '#FFFFFF',
    padding: 4,
    marginTop:10,
  },
});

module.exports = SingUpScreen;
