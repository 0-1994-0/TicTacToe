import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


//const X_IMAGE = require('../assets/splash.png');  
const X_IMAGE = require('../tiger.png'); 
const O_IMAGE = require('../jaguar.png'); 

function Square({ value, onSquareClick }) {
  let imageSource = null;
  if (value === 'X') {
    imageSource = X_IMAGE;
  } else if (value === 'O') {
    imageSource = O_IMAGE;
  }
    return (
        <TouchableOpacity style={styles.square} onPress={onSquareClick}>
{imageSource && <Image source={imageSource} style={styles.squareImage} />}
</TouchableOpacity>
    );
    }

    const styles = StyleSheet.create({
        square: {
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, .2)',
          borderWidth: 1,
          borderColor: '#006400',
          borderWidth: 2,
          lineHeight: 34,
          height: 100,
          marginRight: -1,
          marginTop: -1,
          justifyContent: 'center',
          width: 100,
      },
      squareImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
      },
      });

      export default Square;