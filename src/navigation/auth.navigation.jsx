import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screen/sig-in-up-Screnn/homeScreen/home.screen';
import { SignInComponent } from '../screen/sig-in-up-Screnn/sign-in-Screen/sign-in.component';
import { RegisterComponent } from '../screen/sig-in-up-Screnn/RegisterScreen/register.component';
import { ForgotPassword } from '../screen/sig-in-up-Screnn/ForgotPassword/forgotPassword.screen';
import { RecoveryPasswordComponent } from '../screen/sig-in-up-Screnn/recoveryPassword/recoveryPassword.component';
import { DataUserProfile } from '../screen/UserProfile/DataUserProfile.component';

const AuthStack = createNativeStackNavigator();

export const AuthNavigation = () => {
    return (
        <AuthStack.Navigator
            initialRouteName='Inicio'
            screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen name='Inicio' component={HomeScreen} />
            <AuthStack.Screen
                name='SignIn'
                component={SignInComponent}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: { backgroundColor: '#EADDFF' },
                    headerShadowVisible: false,
                }}
            />
            <AuthStack.Screen
                name='Register'
                component={RegisterComponent}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: { backgroundColor: '#EADDFF' },
                    headerShadowVisible: false,
                }}
            />
            <AuthStack.Screen
                name='ForgotPassword'
                component={ForgotPassword}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: { backgroundColor: '#EADDFF' },
                    headerShadowVisible: false,
                }}
            />
            <AuthStack.Screen
                name='RecoveryPassword'
                component={RecoveryPasswordComponent}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: { backgroundColor: '#EADDFF' },
                    headerShadowVisible: false,
                }}
            />
			 <AuthStack.Screen
                name='DataUserProfile'
                component={DataUserProfile}
                options={{
                    headerShown: true,
                    headerTitle: 'Actualizar Datos',
                    headerStyle: { backgroundColor: '#EADDFF' },
                    headerShadowVisible: false,
                }}
            />
        </AuthStack.Navigator>
    );
};