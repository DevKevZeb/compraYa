import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';

const AuthStack = createNativeStackNavigator();

// Auth screens draw their own back button (see AuthLayout).
export const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);
