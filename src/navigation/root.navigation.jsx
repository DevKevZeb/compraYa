import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { supabase } from '../../lib/initSupaBase';
import { useCartStore } from '../Stores/card.store';
import { useUserStore } from '../Stores/user.store';
import { AuthNavigation } from './auth.navigation';
import { TabNavigation } from './tab.navigation';

const RootStack = createNativeStackNavigator();

export const RootNavigation = () => {
  const session = useUserStore((state) => state.session);
  const authReady = useUserStore((state) => state.authReady);

  useEffect(() => {
    // Fires INITIAL_SESSION on subscribe, then on every sign in / sign out.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      useUserStore.getState().handleSession(nextSession);
      if (!nextSession) {
        useCartStore.setState({ cartItems: [], cartId: null });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!authReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#EADDFF' }}>
        <ActivityIndicator size="large" color="#9C7CFE" />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {session ? (
        <RootStack.Screen name="Main" component={TabNavigation} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigation} />
      )}
    </RootStack.Navigator>
  );
};
