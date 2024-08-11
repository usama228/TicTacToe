import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Square = ({ value, onPress, player }) => {
  const getColor = () => {
    if (value === 'X') {
      return { color: '#3489eb', fontWeight: 'bold' };
    } else if (value === 'O') {
      return { color: 'yellow', fontWeight: 'bold' };
    } else {
      return {};
    }
  };

  return (
    <TouchableOpacity style={styles.square} onPress={onPress}>
      <Text style={[styles.squareText, getColor()]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#434240',
    backgroundColor: 'transparent',
  },
  squareText: {
    fontSize: 39,
  },
});

export default Square;
