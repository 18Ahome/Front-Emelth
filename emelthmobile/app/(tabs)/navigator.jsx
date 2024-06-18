import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './index'; // Asegúrate de que estas rutas de importación sean correctas
import SesionScreen from './sesion'; // La pantalla a la que quieres navegar
import FormScreen from './peticiones';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="sesion" component={SesionScreen} />
        <Stack.Screen name="form" component={FormScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
