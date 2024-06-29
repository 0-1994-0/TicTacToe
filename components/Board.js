import Square from './Square';
import React, {useEffect, useRef, useState} from 'react';
import { Audio } from 'expo-av';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function Board({ xIsNext, squares, onPlay, onUndo }) {
 const [winner, setWinner] = useState(null);
 const [sound, setSound] = useState(null);
  

  useEffect(() => {
    const calculatedWinner = calculateWinner(squares);
    if (calculatedWinner && !winner) {
      setWinner(calculatedWinner);
      playSound();
    }
  }, [squares]);
 

 useEffect(() => {
    if (winner) {
      playSound();
    }
  }, [winner]);
 

 useEffect(() => {
    setWinner(calculateWinner(squares));
  }, [squares]);
  
  
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  
  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/tiger-roar-loudly-193229.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error loading or playing sound:', error);
    }
  }
  

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

    let status;
    if (winner) {
     
      status = "Winner: " + winner;
   
    } else {
    
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  
    return (
      <View>
    <Text style={styles.status}>{status}</Text>
    <View style={styles.boardRow}>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </View>
        <View style={styles.boardRow}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </View>
        <View style={styles.boardRow}>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </View>
        <TouchableOpacity style={styles.undoButton} onPress={onUndo}>
        <Text style={styles.undoButtonText}>Undo</Text>
      </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    status: {
      marginBottom: 10,
      paddingLeft:60,
      paddingBottom:50,
      fontSize: 30,
      color: '#006400',
      fontWeight: 'bold',
      alignContent: 'center',
      alignItems:'center',
      justifyContent: 'center',
      
    },
    boardRow: {
      flexDirection: 'row',
    },
    undoButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#90ee90',
      borderRadius: 5,
      alignItems: 'center',
    },
    undoButtonText: {
      color: '#006400',
      fontWeight: 'bold',
    },
  });

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }