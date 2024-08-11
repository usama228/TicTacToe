import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TextInput, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Square from './Square';

const GameWithComputerScreen = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState('easy'); // Add difficulty state
  const [playerWins, setPlayerWins] = useState(0);
  const [AIWins, setAIWins] = useState(0);
  const [ties, setTies] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      Alert.alert('Game Over', `Winner: ${winner === 'X' ? playerName : 'AI'}`, [
        { text: 'OK', onPress: () => resetGame(winner) },
      ]);
    } else if (isBoardFull(board)) {
      Alert.alert('Game Over', 'Game is a tie!', [
        { text: 'OK', onPress: () => resetGame(null) },
      ]);
    }
  }, [board]);

  const handlePress = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(board) || newBoard[index]) {
      return;
    }
    newBoard[index] = 'X';
    setBoard(newBoard);
    setXIsNext(false);
    setTimeout(() => makeComputerMove(newBoard), 200); 
  };

  const makeComputerMove = (newBoard) => {
    let availableSquares = newBoard.map((val, index) => val === null ? index : null).filter(val => val !== null);
    if (availableSquares.length === 0) {
      return;
    }

    let move;
    if (difficulty === 'easy') {
      move = easyMove(availableSquares);
    } else if (difficulty === 'medium') {
      move = mediumMove(newBoard, availableSquares);
    } else {
      move = hardMove(newBoard);
    }
    
    newBoard[move] = 'O';
    setBoard(newBoard);
    setXIsNext(true);
  };

  const easyMove = (availableSquares) => {
    return availableSquares[Math.floor(Math.random() * availableSquares.length)];
  };

  const mediumMove = (newBoard, availableSquares) => {
    for (let i = 0; i < availableSquares.length; i++) {
      const boardCopy = [...newBoard];
      boardCopy[availableSquares[i]] = 'X';
      if (calculateWinner(boardCopy) === 'X') {
        return availableSquares[i];
      }
    }
    return easyMove(availableSquares);
  };

  const hardMove = (newBoard) => {
    const bestMove = minimax(newBoard, 'O').index;
    return bestMove;
  };

  const minimax = (newBoard, player) => {
    const availableSquares = newBoard.map((val, index) => val === null ? index : null).filter(val => val !== null);
    
    if (calculateWinner(newBoard) === 'X') {
      return { score: -10 };
    } else if (calculateWinner(newBoard) === 'O') {
      return { score: 10 };
    } else if (availableSquares.length === 0) {
      return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availableSquares.length; i++) {
      let move = {};
      move.index = availableSquares[i];
      newBoard[availableSquares[i]] = player;

      if (player === 'O') {
        move.score = minimax(newBoard, 'X').score;
      } else {
        move.score = minimax(newBoard, 'O').score;
      }

      newBoard[availableSquares[i]] = null;
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
  };

  const resetGame = (winner = null) => {
    if (winner === 'X') {
      setPlayerWins(playerWins + 1);
    } else if (winner === 'O') {
      setAIWins(AIWins + 1);
    } else if (winner === null && board.every((square) => square !== null)) {
      setTies(ties + 1);
    }
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6], 
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (board) => {
    return board.every((square) => square !== null);
  };

  const handleStartGame = () => {
    if (playerName.trim()) {
      setModalVisible(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter your name.');
    }
  };

  const handleCancel = () => {
    if (playerName.trim()) {
      setModalVisible(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter your name to cancel.');
    }
  };

  const renderSquare = (index) => {
    return (
      <Square
        value={board[index]}
        onPress={() => handlePress(index)}
        player={board[index]}
      />
    );
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner === 'X' ? playerName : 'AI'}`;
  } else {
    status = `Next player: ${xIsNext ? playerName : 'AI'}`;
  }

  return (
    <ImageBackground source={{ uri: 'https://e1.pxfuel.com/desktop-wallpaper/627/1007/desktop-wallpaper-tic-tac-toe.jpg' }} style={styles.container}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Player Name</Text>
              <TextInput
                placeholder="Player 1 (X)"
                style={styles.input}
                value={playerName}
                onChangeText={setPlayerName}
              />
              <Text style={styles.modalTitle}>Select Difficulty</Text>
              <View style={styles.buttonDifficulty}>
                <Button  title="Easy" onPress={() => setDifficulty('easy')} color={difficulty === 'easy' ? "#C0AD8C" : "#CCC0A8"} />
                <Button title="Medium" onPress={() => setDifficulty('medium')} color={difficulty === 'medium' ? "#C0AD8C" : "#CCC0A8"} />
                <Button title="Hard" onPress={() => setDifficulty('hard')} color={difficulty === 'hard' ? "#C0AD8C" : "#CCC0A8"} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Start Game" onPress={handleStartGame} color="#C0AD8C" />
                <Button title="Cancel" onPress={handleCancel} color="#CCC0A8" />
              </View>
            </View>
          </View>
        </Modal>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.board}>
          <View style={styles.row}>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </View>
          <View style={styles.row}>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </View>
          <View style={styles.row}>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </View>
        </View>
        <View style={styles.ResetButton}>
        <Button title="Reset Game" onPress={() => resetGame()} color="#C0AD8C" />
        </View >
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>Player Wins: {playerWins}</Text>
          <Text style={styles.statText}>AI Wins: {AIWins}</Text>
          <Text style={styles.statText}>Ties: {ties}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
  },
  row: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  
    width: '100%',
  },
  statsContainer: {
    marginTop: 140,
    backgroundColor: '#C9BDA5',
    padding: 10,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  statText: {
    fontSize: 15,
    color: '#000',
    marginTop: 10,
  },
  ResetButton:{
    marginTop:7,
    padding:5,
    borderRadius:1
  },
  buttonDifficulty:{
   flexDirection:'row',
  
   width:'100%',
   justifyContent:'space-between',
    borderRadius:2,
    borderWidth:1,
    borderColor:'#C0AD8C',
  }
});

export default GameWithComputerScreen;




