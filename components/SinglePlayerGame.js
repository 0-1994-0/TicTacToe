import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Board from './Board';

export default function SinglePlayerGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAITurn, setIsAITurn] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];



 useEffect(() => {
    if (isAITurn) {
      const aiMove = getAIMove(currentSquares);
      if (aiMove !== undefined) {
      const nextSquares = currentSquares.slice();
      nextSquares[aiMove] = 'O';
      setTimeout(()=> {
         
      handlePlay(nextSquares);
    //setIsAITurn(false); 

      },500);
    }
  }
  }, [isAITurn]);



  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsAITurn(!isAITurn);
    }


  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsAITurn(nextMove % 2 !== 0);
  }
  
  function undoMove() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
      setIsAITurn((currentMove - 1) % 2 !== 0);
    }
  }


  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsAITurn(false);
  }


  function getAIMove(squares) {
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);
    
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }
    const moves = history.map((squares, move) => {
      const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
      return (
        <View key={move} style={styles.moveButton}>
          <TouchableOpacity onPress={() => jumpTo(move)}>
            <Text>{description}</Text>
          </TouchableOpacity>
        </View>
      );
    });

  return (
    <ImageBackground source={require('../BackgroundPvE.jpg')} style={styles.background}>
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
  },
  moveButton: {
    marginBottom: 5,
  },
  undoButton: {
    marginTop: 20,
    backgroundColor: '#90ee90',
  },
  undoButtonText: {
    color: 'white',
    fontWeight: 'bold',
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

