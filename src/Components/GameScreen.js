import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TextInput, Button, ImageBackground } from 'react-native';
import Square from './Square';

const GameScreen = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [ties, setTies] = useState(0);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      if (winner === 'X') {
        setPlayer1Wins(player1Wins + 1);
      } else {
        setPlayer2Wins(player2Wins + 1);
      }
      Alert.alert('Game Over', `Winner: ${winner === 'X' ? player1 : player2}`, [
        { text: 'OK', onPress: () => resetGame() },
      ]);
    } else if (isBoardFull(board)) {
      setTies(ties + 1);
      Alert.alert('Game Over', 'Game is a tie!', [
        { text: 'OK', onPress: () => resetGame() },
      ]);
    }
  }, [board]);

  const handlePress = (index) => {
    if (player1.trim() === '' || player2.trim() === '') {
      Alert.alert('Player Names Required', 'Please enter names for both players.');
      setModalVisible(true);
      return;
    }

    const newBoard = board.slice();
    if (calculateWinner(board) || newBoard[index]) {
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
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

  const resetGame = () => {
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
    if (player1.trim() && player2.trim()) {
      setModalVisible(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter names for both players.');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner === 'X' ? player1 : player2}`;
  } else {
    status = `Next player: ${xIsNext ? player1 : player2}`;
  }

  return (
    <ImageBackground source={{ uri: 'https://e1.pxfuel.com/desktop-wallpaper/627/1007/desktop-wallpaper-tic-tac-toe.jpg' }} style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.background}></View>
        <Modal
          animationType="slide"  
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Player Names</Text>
              <TextInput
                placeholder="Player 1 (X)"
                style={styles.input}
                value={player1}
                onChangeText={setPlayer1}
              />
              <TextInput
                placeholder="Player 2 (O)"
                style={styles.input}
                value={player2}
                onChangeText={setPlayer2}
              />
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
     


   <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Wins:</Text>
          <Text>{`${player1}: ${player1Wins}`}</Text>
          <Text>{`${player2}: ${player2Wins}`}</Text>
          <Text>Ties: {ties}</Text>
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
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent', 
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
    backgroundColor: '#E2DFDA',
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
    borderRadius:1,
 
  },
  statsContainer: {
    marginTop: 140,
    backgroundColor: '#C9BDA5',
    padding: 10,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
    
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default GameScreen;
