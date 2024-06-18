import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

export default function LoginScreen() {
  const navigation = useNavigation(); // Obtener el objeto de navegación
  const [fontsLoaded] = useFonts({
    'Quicksand Light': require('@/assets/fonts/Quicksand-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F2F2F2', '#A6A6A6']} // Colores del degradado
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <Image
        source={require('@/assets/images/logoemelth.png')}
        style={styles.backgroundImage}
      />
      <LottieView
        source={require('@/assets/lottie/doctor.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Image
        source={require('@/assets/images/emelth.png')}
        style={styles.title}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('sesion')} // Navegar a 'Sesion' al presionar
      >
        <LinearGradient
          colors={['#22F5FA', '#04C5C8']} // Colores del degradado
          style={styles.gradient2}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient2: {
    position: 'absolute',
    width: '100%',
    height: '180%',
  },
  backgroundImage: {
    position: 'absolute',
    width: '80%',
    height: '50%',
    resizeMode: 'cover',
    top:50,
    right:45,
  },
  lottie: {
    width: 400,
    height: 400,
    marginTop:150,
  },
  title: {
    marginVertical: 20,
    height:200,
    width:'100%',
    top:-143,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    left:10,
    top:-200,
    overflow:'hidden',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    fontSize:30,
    fontFamily:'Quicksand Light',
  }
});
