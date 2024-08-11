import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/Components/WelcomeScreen';
import GameScreen from './src/Components/GameScreen';
import GameWithComputerScreen from './src/Components/GameWithComputerScreen';
import { Text, TouchableOpacity } from 'react-native';
import LeaderboardScreen from './src/Components/LeaderBoardScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome"  component={WelcomeScreen}  options={{headerShown: false } } />
        <Stack.Screen
        name="Game"
        component={GameScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()} 
              style={{ marginLeft: 10 }}
            >
              <Text style={{fontSize:25, fontWeight:'bold'}}>X</Text>
            </TouchableOpacity>
          ),
          headerTitle: '', 
          headerStyle: {
            backgroundColor: '#BFB7AA', 
          },
        })}
      />
       <Stack.Screen
        name="GameWithComputer"
        component={GameWithComputerScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()} 
              style={{ marginLeft: 10 }}
            >
              <Text style={{fontSize:25, fontWeight:'bold'}}>X</Text>
            </TouchableOpacity>
          ),
          headerTitle: '', 
          headerStyle: {
            backgroundColor: '#BFB7AA', 
          },
        })}
      />
        <Stack.Screen 
          name="Leaderboard" 
          component={LeaderboardScreen} 
          options={{headerTitle:'', headerStyle:{backgroundColor:'#BFB7AA'}}}
          initialParams={{ player1Wins: 0, player2Wins: 0, aiWins: 0, ties: 0 }}  
          
        />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
