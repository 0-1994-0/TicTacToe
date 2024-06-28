import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Game from './components/Game';
import SinglePlayerGame from './components/SinglePlayerGame';
import HomeScreen from './components/HomeScreen';
import { Image } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import { Audio } from 'expo-av';


const Stack = createStackNavigator();

export default function App() {
  return (
  
<NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Two Player Game" component={Game} />
        <Stack.Screen name="Single Player Game" component={SinglePlayerGame} />
      </Stack.Navigator>
       <StatusBar style="auto" />
    </NavigationContainer>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#9acd32',
    alignItems: 'center',
    justifyContent: 'center',
  },

});




registerRootComponent(App);