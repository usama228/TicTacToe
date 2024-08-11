import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/1292919739/vector/tic-tac-toe-school-game-colorful-seamless-pattern-for-fabric-and-print-on-the-paper.jpg?s=612x612&w=0&k=20&c=Q4gMspKHffPmhKuofb_Rb_WCD8uAgbsbXSKuWEcziM8=' }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Image 
          source={{uri: 'https://i.pinimg.com/originals/de/47/2b/de472bdc811b6941c6825de74aa5b520.png'}} 
          style={styles.image} 
        />
       
       
       <Text style={styles.title}> 
        <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Tic Tac Toe</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
        
        <Text style={styles.buttonText}>Player1 VS Player2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameWithComputer')}>
        <Text style={styles.buttonText}>Player VS AI</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Leaderboard')}
      >
        <Text style={styles.buttonText}>Leaderboard</Text>
      </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#04BBA9',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    borderWidth:1,
    borderColor:'white'
  },
  buttonText: {
    color: 'white',
    fontSize: 22 ,
    marginLeft: 10,
  },
  icon: {
    marginRight: 8,
  },
});

export default WelcomeScreen;