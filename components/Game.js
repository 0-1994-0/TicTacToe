import React, {useState} from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ImageBackground} from 'react-native';
import Board from './Board';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
  
    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
  
    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
    }


    function undoMove() {
      if (currentMove > 0) {
        setCurrentMove(currentMove - 1);
      }
    }

    function resetGame() {
      setHistory([Array(9).fill(null)]);
      setCurrentMove(0);
    }
  
    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
      return (
        <View key={move} style={styles.moveButton}>
          <button onPress={() => jumpTo(move)}>{description}</button>
        </View>
      );
    });
  
    return (
      <ImageBackground source={require('../BackgroundPvP.jpg')} style={styles.background}>
      <View style={styles.game}>
      <View style={styles.gameBoard}>
         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onUndo={undoMove}/>
         <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.gameInfo}>
        </View>
    </View>
    </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      height:'100%',
      width:'100%',
      resizeMode: 'cover',
    },
    game: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    gameBoard: {
      marginTop: 100,
    },

    status: {
      fontSize: 24,
      marginBottom: 20,
    },
    gameInfo: {
      justifyContent: 'flex-start',
      marginLeft: 20,
      color: 'white',

    },
    moveButton: {
      marginBottom: 5,
    },
    undoButton: {
      marginTop: 20,
    },
    resetButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#90ee90',
      borderRadius: 5,
      alignItems: 'center',
    },
    resetButtonText: {
      color: '#006400',
      fontWeight: 'bold',
    },
  });