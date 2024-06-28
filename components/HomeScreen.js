import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';



export default function HomeScreen({ navigation}) {
    const [sound, setSound] = useState(null); 
    
    function handleButtonPress(destination) {
      console.log("Hiiii");
      playSound();
      navigation.navigate(destination);
    }

async function playSound() {
    try {
      console.log("Yeah");
      const { sound } = await Audio.Sound.createAsync(
        require('../jungle-story-168459.mp3')
      );
      setSound(sound);
      await sound.playAsync();
      console.log("ohhhhh");
    } catch (error) {
      console.log('Error loading or playing sound:', error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  

  
    return (
      <ImageBackground source={require('../jungle.jpg')} style={styles.background}>
      <View style={styles.container}>
      <Text style={styles.title}>Choose Game Mode</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress('Two Player Game')}
      >
        <Text style={styles.buttonText}>Two Player Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress('Single Player Game')}
      >
        <Text style={styles.buttonText}>Single Player Game</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );     
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#8fbc8f',
    borderColor: '#2f4f4f',
  },
  button: {
    padding: 20,
    margin: 30,
    backgroundColor: '#9BCD9B',
    borderRadius: 5,
    borderColor: '#2f4f4f',
  },
  buttonText: {
    color: '#2e8b57',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
