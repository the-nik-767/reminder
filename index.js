/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import serviceFactory from './src/services/serviceFactory';
import 'react-native-gesture-handler';

import './src/i18n/i18n.config';
import {RecoilRoot} from 'recoil';
import {
  GlobalStateInfluencer,
  GlobalStateObserver,
} from './src/state/globalState';

serviceFactory.create();

const RootComponent = () => (
  <RecoilRoot>
    <App />
    <GlobalStateObserver />
    <GlobalStateInfluencer />
  </RecoilRoot>
);

AppRegistry.registerComponent('reminder', () => RootComponent);
