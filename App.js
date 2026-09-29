import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Provider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AppFrame } from './src/components/AppFrame';
import { toastConfig } from './src/components/AppToast';
import { RootNavigator } from './src/navigation/RootNavigator';
import { fontAssets, theme } from './src/theme';

// Keep the splash screen up until the brand fonts are ready.
SplashScreen.preventAutoHideAsync().catch(() => {});

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
