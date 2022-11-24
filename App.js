import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AccelComponent from './components/AccelComponent';
import GyroComponent from './components/GyroComponent';
import BarComponent from './components/BarComponent';
import MagnetComponent from './components/MagnetComponent';
import PedometerComponent from './components/PedometerComponent';


export default function App() {

  return (
    <SafeAreaView>
      <StatusBar hidden />
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <AccelComponent />
      {/* <GyroComponent /> */}
      {/* <BarComponent /> */}
      {/* <MagnetComponent /> */}
      {/* <PedometerComponent /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
