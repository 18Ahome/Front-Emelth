import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [patientData, setPatientData] = useState({
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Descripcion: '',
    Edad: '',
    Emergency: 'C1',
    Sex: 'Masculino',
  });

  const navigation = useNavigation(); // Obtener el objeto de navegación

  const handleInputChange = (name, value) => {
    setPatientData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem('token', '');
    Alert.alert("Logged out");
    navigation.navigate('sesion'); // Redirige a la página de sesión
  };

  return (
    <LinearGradient
      colors={['#7295F2', '#65FECF']} // Colores del degradado
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Crear Folio</Text>
        <Text style={styles.label}>Selecciona el nivel de emergencia</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={patientData.Emergency}
            style={styles.picker}
            onValueChange={(itemValue) => handleInputChange('Emergency', itemValue)}
          >
            {['C1', 'C2', 'C3', 'C4', 'C5'].map(level => (
              <Picker.Item key={level} label={level} value={level} />
            ))}
          </Picker>
        </View>
        {['Nombre', 'ApellidoPaterno', 'ApellidoMaterno', 'Edad', 'Descripcion'].map((field, index) => (
          <TextInput
            key={index}
            style={styles.input}
            onChangeText={(text) => handleInputChange(field, text)}
            value={patientData[field]}
            placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
          />
        ))}
        <Text style={styles.label}>Sexo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={patientData.Sex}
            style={styles.picker}
            onValueChange={(itemValue) => handleInputChange('Sex', itemValue)}
          >
            <Picker.Item label="Femenino" value="Femenino" />
            <Picker.Item label="Masculino" value="Masculino" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={['#FD98CB', '#CD71CB']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>GENERAR</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <LinearGradient
              colors={['#FF0D52', '#FC9ABD']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: '#343A68',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    color: '#000000',
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    color: '#343A68',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gradient: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 100,
  },
});

