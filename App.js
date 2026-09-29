import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { styles } from './src/styles/global';
import { AppFrame } from './src/components/AppFrame';
import { RootNavigator } from './src/navigation/RootNavigator';
import { fontAssets, theme } from './src/theme';

// Keep the splash screen up until the brand fonts are ready.
SplashScreen.preventAutoHideAsync().catch(() => {});

const toastConfig = {
  error: ({ text1, text2, ...rest }) => (
    <View style={[styles.toastContainer, styles.toastError]}>
      <Text style={styles.toastText1}>{text1}</Text>
      <Text style={styles.toastText2}>{text2}</Text>
    </View>
  ),
  success: ({ text1, text2, ...rest }) => (
    <View style={[styles.toastContainer, styles.toastSuccess]}>
      <Text style={styles.toastText1}>{text1}</Text>
      <Text style={styles.toastText2}>{text2}</Text>
    </View>
  ),
  info: ({ text1, text2, ...rest }) => (
    <View style={[styles.toastContainer, styles.toastInfo]}>
      <Text style={styles.toastText1}>{text1}</Text>
      <Text style={styles.toastText2}>{text2}</Text>
    </View>
  ),
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const ready = fontsLoaded || Boolean(fontError);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <AppFrame>
      {/* Brand theme (light only): never follow the system dark mode. */}
      <Provider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </Provider>
    </AppFrame>
  );
}
