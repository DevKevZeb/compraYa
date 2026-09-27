import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { supabase } from '../../lib/initSupaBase';
import { RecoveryPasswordComponent } from '../screen/sig-in-up-Screnn/recoveryPassword/recoveryPassword.component';
import { createSessionFromUrl, PASSWORD_RESET_PATH } from '../services/auth.service';
import { useCartStore } from '../Stores/card.store';
import { useUserStore } from '../Stores/user.store';
import { AuthNavigation } from './auth.navigation';
import { TabNavigation } from './tab.navigation';

const RootStack = createNativeStackNavigator();

export const RootNavigation = () => {
  const session = useUserStore((state) => state.session);
  const authReady = useUserStore((state) => state.authReady);
  const passwordRecovery = useUserStore((state) => state.passwordRecovery);
  const url = Linking.useURL();

  useEffect(() => {
    // Fires INITIAL_SESSION on subscribe, then on every sign in / sign out.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      useUserStore.getState().handleSession(nextSession);
      if (!nextSession) {
        useCartStore.getState().clearCart();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Password reset emails link back into the app with a recovery session.
    if (!url || !url.includes(PASSWORD_RESET_PATH)) {
      return;
    }

    const { setPasswordRecovery } = useUserStore.getState();
    setPasswordRecovery(true);
    createSessionFromUrl(url)
      .then((type) => {
        if (type !== 'recovery') {
          setPasswordRecovery(false);
        }
      })
      .catch((error) => {
        setPasswordRecovery(false);
        Toast.show({ type: 'error', text1: 'Enlace inválido', text2: error.message });
      });
  }, [url]);

  if (!authReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#EADDFF' }}>
        <ActivityIndicator size="large" color="#9C7CFE" />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {session && passwordRecovery ? (
        <RootStack.Screen name="ResetPassword" component={RecoveryPasswordComponent} />
      ) : session ? (
        <RootStack.Screen name="Main" component={TabNavigation} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigation} />
      )}
    </RootStack.Navigator>
  );
};
