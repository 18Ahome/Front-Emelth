import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    'Rubik': require('@/assets/fonts/Rubik-VariableFont_wght.ttf'),
    'Rubik-Italic': require('@/assets/fonts/Rubik-Italic-VariableFont_wght.ttf'),
  });

  const navigation = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      console.log("Ha iniciado sesión");
    } else {
      console.log("No registrado");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/connect', { username, password });
      if (response.data) {
        await AsyncStorage.setItem('token', JSON.stringify(response.data));
        Alert.alert('Inicio de sesión exitoso');
        navigation.navigate('form');
      } else {
        Alert.alert('Inicio de sesión fallido', 'No response data');
      }
    } catch (error) {
      console.error('Error de sesión:', error);
      Alert.alert('Error de sesión', 'Ha ocurrido un error');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <LinearGradient
      colors={['#95FEEF', '#04C5C8']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <LottieView
        source={require('@/assets/lottie/Ambulance.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Usuario"
        placeholderTextColor="#cccccc"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor="#cccccc"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <LinearGradient
        colors={['#FFC000', '#FF437E']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={handleBack}>
        <Text style={styles.secondaryButtonText}>Regresar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    backgroundColor: '#FF4081',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Rubik',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 100,
    marginBottom: 20,
    shadowColor: '#002a69',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  button: {
    overflow: 'hidden',
    width: '50%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 20,
  },
  gradient: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Usar rgba para la opacidad del 50%
    width: '45%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});