import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: { backgroundColor: '#EADDFF' },
          headerShadowVisible: false,
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: { backgroundColor: '#EADDFF' },
          headerShadowVisible: false,
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: { backgroundColor: '#EADDFF' },
          headerShadowVisible: false,
        }}
      />
    </AuthStack.Navigator>
  );
};
