import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import firstscene from './loadingScene';
import mapscene from './MapScene';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="load"
          component={firstscene}
          //title="first"
          initial
        />
        <Scene
          key="map"
          component={mapscene}
          //title="map"
        />
      </Scene>
    </Router>
  );
}

export default App;