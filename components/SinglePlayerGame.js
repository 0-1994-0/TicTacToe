import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Board from './Board';

export default function SinglePlayerGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAITurn, setIsAITurn] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
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
      //setIsAITurn((currentMove - 1) % 2 !== 0);
    }
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsAITurn(false);
  }

  function getAIMove(squares) {
    if (difficulty === 'easy') {
      return easy(squares);
    } else if (difficulty === 'normal') {
      return normal(squares);
    } else if (difficulty === 'hard') {
      return hard(squares);
    }
  }

  function easy(squares) {
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }

  function normal(squares) {
    // Add a basic strategy for the normal level
    // For example, prioritize the center or corners
    if (squares[4] === null) return 4; // Take center if available
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter((index) => squares[index] === null);
    if (emptyCorners.length > 0) {
      return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }
    return easy(squares); // Fall back to random move
  }

  function hard(squares) {
    // Implement Minimax or another sophisticated algorithm for hard level
    // This is a simplified version; you can improve it further
    // You can implement the full Minimax algorithm here
    const bestMove = minimax(squares, 'O').index;
    return bestMove;
  }


  function minimax(newBoard, player) {
    const emptySquares = newBoard
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);

    const winner = checkWinner(newBoard);
    if (winner === 'X') return { score: -10 };
    if (winner === 'O') return { score: 10 };
    if (emptySquares.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < emptySquares.length; i++) {
      const move = {};
      move.index = emptySquares[i];
      newBoard[emptySquares[i]] = player;

      if (player === 'O') {
        const result = minimax(newBoard, 'X');
        move.score = result.score;
      } else {
        const result = minimax(newBoard, 'O');
        move.score = result.score;
      }

      newBoard[emptySquares[i]] = null;
      moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  function checkWinner(board) {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }





  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

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
    <Text style={styles.difficultyStatus}> Choose a difficulty level: </Text> 
      <View style={styles.buttonContainer}>
   
          <TouchableOpacity
            style={[styles.button, difficulty === 'easy' && styles.selectedButton]}
            onPress={() => handleDifficultyChange('easy')}
          >
            <Text style={styles.buttonText}>Easy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, difficulty === 'normal' && styles.selectedButton]}
            onPress={() => handleDifficultyChange('normal')}
          >
            <Text style={styles.buttonText}>Normal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, difficulty === 'hard' && styles.selectedButton]}
            onPress={() => handleDifficultyChange('hard')}
          >
            <Text style={styles.buttonText}>Hard</Text>

            </TouchableOpacity>

        
        </View>



    <View style={styles.gameBoard}>

       <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onUndo={undoMove}/>
      

       <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text></TouchableOpacity>

        



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
    height:'100%',
    width:'100%',
  },
  game: {
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  gameBoard: {
    marginTop: 10,
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

  selectedButton:{
    backgroundColor: '#006400',
    
  },

  buttonContainer: {
    display: 'flex',
    flexDirection:'row',
  },

  button:{
    color: '#006400',
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  buttonText:{
    fontWeight:'bold',
  },

  difficultyStatus:{
    fontSize: 25,
  },


});

