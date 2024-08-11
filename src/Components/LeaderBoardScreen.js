import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeaderboardScreen = ({ route }) => {
  const { player1Wins, player2Wins, aiWins, ties } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.statText}>Player 1 Wins: {player1Wins}</Text>
      <Text style={styles.statText}>Player 2 Wins: {player2Wins}</Text>
      <Text style={styles.statText}>AI Wins: {aiWins}</Text>
      <Text style={styles.statText}>Ties: {ties}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C9BDA5',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  statText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default LeaderboardScreen;
