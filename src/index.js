import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

// Register the main component
AppRegistry.registerComponent('SupaCalc', () => App);

// Run the app on web
AppRegistry.runApplication('SupaCalc', {
  rootTag: document.getElementById('root'),
});
