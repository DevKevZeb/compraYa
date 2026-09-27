import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Compraya3 from '../../../assets/Compraya3.png';
import { DEMO_ACCOUNT, signInAsGuest } from '../../services/auth';

export const WelcomeScreen = ({ navigation }) => {
  const [guestLoading, setGuestLoading] = useState(false);

  const handleGuest = async () => {
    setGuestLoading(true);
    const { error } = await signInAsGuest();
    setGuestLoading(false);

    // On success the root navigator switches to the main app.
    if (error) {
      Toast.show({ type: 'error', text1: 'No se pudo entrar como invitado', text2: error.message });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Compraya3} style={styles.imageContainer} />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('SignIn')}
          style={styles.button}
        >
          Ingresar
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        >
          Registrate
        </Button>
        {DEMO_ACCOUNT && (
          <>
            <Button
              mode="outlined"
              onPress={handleGuest}
              loading={guestLoading}
              disabled={guestLoading}
              style={styles.guestButton}
              textColor="#5B3FD1"
            >
              Entrar como invitado
            </Button>
            <Text variant="bodySmall" style={styles.guestHint}>
              Cuenta demo compartida con datos de prueba
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaddff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '70%',
    backgroundColor: '#9C7CFE',
    marginBottom: 20,
  },
  guestButton: {
    width: '70%',
    borderColor: '#9C7CFE',
  },
  guestHint: {
    marginTop: 6,
    color: '#5B5B5B',
  },
  imageContainer: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
