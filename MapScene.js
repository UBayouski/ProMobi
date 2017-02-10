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
  ScrollView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';


import pick from 'lodash.pick'
import haversine from 'haversine'
import SideMenu from 'react-native-side-menu'
import ModalDropdown from 'react-native-modal-dropdown'
import Hamburger from 'react-native-hamburger'

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
const speedlist=[];
const coord=[];
const DEMO_OPTIONS_1 = ['Run','Type1','Type2','Type3','Type4'];
class Button extends Component{
  constructor(props){
    super(props);
  }
  handlePress(e){
    if(this.props.onPress){
      this.props.onPress(e);
    }
  }
  render(){
    return(
      <TouchableOpacity
      onPress={this.handlePress.bind(this)}
      style={this.props.style}>
      <Text>{this.props.children}</Text>
      </TouchableOpacity>
      );
  }
}

class Menu extends Component{
  static propTypes ={
    onItemSelected : React.PropTypes.func.isRequired,
  };
  render(){
    return(
      <ScrollView scrollsToTop ={false} style={styles.menu}>
      <Text
      onPress={() => this.props.onItemSelected('ACCOUNT')}
      style={styles.item}>
      ACCOUNT
      </Text>
         <Text
      onPress={() =>this.props.onItemSelected('ACTYVITY LOG')}
      style={styles.item}>
      ACTYVITY LOG
      </Text>
         <Text
      onPress={() =>this.props.onItemSelected('SCREEN LAYOUT')}
      style={styles.item}>
      SCREEN LAYOUT
      </Text>
         <Text
      onPress={() =>this.props.onItemSelected('LOG OUT')}
      style={styles.item}>
      LOG OUT
      </Text>
</ScrollView>
      );
  }
}

class PageTwo extends Component {
constructor(props) {
  super(props)
  this.state = {
    routeCoordinates: [],
    distanceTravelled: 0,
    calcDistanceButton: false,
    prevLatLng: {},
    pressStatus: false,
    active : false,
    isOpen : false,
    selectedItem : 'ACCOUNT',
    playPress : false,
    stopPress : true,
    speed : 0,
  }
}

toggle(){
  this.setState({
    isOpen : !this.state.isOpen,
    active: !this.state.active,
  });
}

updateMenuState(isOpen){
  this.setState({isOpen,});
}

onMenuItemSelected = (item) =>{
  if(item == 'ACTYVITY LOG')
    this.props.navigator.replace({id: 3,});

  if(item == 'LOG OUT')
    this.props.navigator.replace({id: 4,});
  this.setState({
    isOpen:false,
    selectedItem:item,
    active:false,
  });
}
_dropdown_2_renderRow(rowData,rowID, hieghlighted){
try{
if(this.state.stopPress== true){
  return(
    <TouchableHighlight underlayColor = 'cornflowerble'>
  <View style={styles.dropdown_2_row}>
  <Text style ={styles.navBarText1}>
{`${rowData}`}
  </Text>
  </View>
  </TouchableHighlight>
);
}}
  catch (err) {}
}

  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }

  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

_onChangePlay(){
  if(this.state.playPress == true){
    this.setState({
      prevLatLng : {},
    })
  }
  this.setState({
    playPress : !this.state.playPress,
    stopPress : false,



  });
}

_onPresStop(){
 const arrayData=[];
 const data={
 time: JSON.stringify(new Date),
 distance:parseFloat(this.state.distanceTravelled).toFixed(2),
 coordinates: coord,
 speed:speedlist
 }
 arrayData.push(data);
  alert (parseFloat(this.state.distanceTravelled).toFixed(2));
  this.setState({
    stopPress : true,
    playPress : false,
    distanceTravelled: 0,
    prevLatLng: {},
    routeCoordinates:[],
  })
  AsyncStorage.getItem('database').then((value)=>{
                                       if(value !== null){
                                       const d=JSON.parse(value);
                                       d.push(data)
                                       AsyncStorage.setItem('database',JSON.stringify(d))
                                       }
                                       else{
                                       AsyncStorage.setItem('database',JSON.stringify(arrayData))
                                     }
                                       })
}

 _onPressPlayButton(){
   if(this.state.playPress == false){
   return (
    <Image
     style={styles.imageRun}
     source={require('./play.png')}/>
   );
 }else{
   return (
     <Image
     style={styles.imageRun}
     source={require('./pause.png')}/>
   );
 }
 }

 _onRenderStop(){
   if(this.state.stopPress == false){
     return(
        <Image
        style = {styles.imageStop}
        source={require('./stop.png')}/>
     );
   }
 }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {},
      (speed) => {},
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 0, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates, distanceTravelled , speed } = this.state
      const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      this.setState({
      speed : position.coords.speed,
      });
      if (this.state.stopPress == false){
      this.setState({
        routeCoordinates: routeCoordinates.concat(positionLatLngs),
      });
    }
  if (this.state.playPress == true){
      coord.push(newLatLngs)
      speedlist.push(position.coords.speed)
      this.setState({
        distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
        prevLatLng: newLatLngs,
      })
}
    });

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  calcDistance(newLatLng) {
    const { prevLatLng } = this.state
    return (haversine(prevLatLng, newLatLng) || 0)
  }
_changeSelection(feed) {
    this.setState({ myChatsSelected: feed === 'my' });
    this.props.onChange(feed);
  }



  render() {
    const menu =<Menu onItemSelected = {this.onMenuItemSelected}/>;
    return (
      <SideMenu
      openMenuOffset={150}
      menu={menu}
      isOpen={this.state.isOpen}
      onChange ={(isOpen) => this.updateMenuState(isOpen)}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType={'standard'}
          showsUserLocation={true}
          followUserLocation={true}
          zoomEnable = {true}
          scrollEnabled={true}
          showsScale={true}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: '#7B88F7',
            lineWidth: 9,
          }]}
        />
<View style={styles.navBar}>
<ModalDropdown style = {styles.dropdown_1}
dropdownStyle = {styles.dropdown_2_dropdown}
textStyle ={styles.navBarText}
defaultValue={'Please select'}
options={DEMO_OPTIONS_1}
renderRow={this._dropdown_2_renderRow.bind(this)}/>
  </View>
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarGroup}>
          <Text style={styles.bottomBarContent}>{parseFloat(this.state.distanceTravelled).toFixed(2)}</Text>
          <Text style={styles.bottomBarHeader}>km</Text>
          <Text style={styles.bottomBarContent}>{parseFloat(this.state.speed)}</Text>
          <View style={styles.FromButton}>
          <TouchableOpacity onPress = {() => this._onPresStop()}>
          {this._onRenderStop()}
          </TouchableOpacity>
          </View>
          <TouchableOpacity  style={styles.imageRun} onPress={() => this._onChangePlay()}>
             {this._onPressPlayButton()}
             </TouchableOpacity>

          </View>
        </View>
      </View>
      <Button style ={styles.button}>
      <Hamburger active ={this.state.active}
      onPress={() =>this.toggle()}
      style={styles.button}
      type="spinArrow"/>
      </Button>
      </SideMenu>
    );
  }
}
const styles = StyleSheet.create({
dropdown_2_row: {
  flexDirection:'row',
  height:40,
  alignItems:'center',
  backgroundColor:'#8A2BE2',
},
dropdown_2_dropdown: {
	alignItems:'center',
  width:SCREEN_WIDTH,
  height:210,
  backgroundColor:'#8A2BE2',
},
dropdown_1:{
  flex:1,
  top:32,
},
  menu:{
    flex:1,
    width:window.width,
    height:window.height,
    backgroundColor:'#8A2BE2',
  },
  item:{
    color:'#FFFFFF',
    fontSize: 16,
    fontWeight:"700",
    paddingTop:40,
    padding:10
  },
  button:{
    position: 'absolute',
    top:20,
    padding:10,
  },
  containerPopup: {
    flexDirection: 'column',
    padding: 30,
  },
  backdrop: {
    backgroundColor: 'red',
    opacity: 0.5,
  },
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
    right: 0,
  },
  navBarText: {
    color: '#7B88F7',
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center',
  },
    navBarText1: {
  	textAlign:'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: "700",
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
  FromButton:{
    position : 'absolute',
    height : 200,
    width : 100,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal : 60,
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
  },
  buttonPause: {
    borderColor: '#000066',
    backgroundColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
    width: 72,
    height: 72,
  },
  buttonStop: {
    borderColor: '#000066',
    backgroundColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
  },
  imageRun: {
    alignSelf: 'center'
  },
});
const triggerStyles = {
  triggerText: {
    color: 'white',
  },
  triggerOuterWrapper: {
    backgroundColor: 'orange',
    padding: 5,
    flex: 1,
  },
  triggerWrapper: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style : {
    flex: 1,
    },
  },
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'green',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: 'purple',
  },
  optionWrapper: {
    backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
};

const optionStyles = {
  optionTouchable: {
    underlayColor: 'red',
    activeOpacity: 40,
  },
  optionWrapper: {
    backgroundColor: 'pink',
    margin: 5,
  },
  optionText: {
    color: 'black',
  },
};

const menuContextStyles = {
  menuContextWrapper: styles.container,
  backdrop: styles.backdrop,
};


module.exports = PageTwo;
