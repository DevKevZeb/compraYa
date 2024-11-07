import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screen/sig-in-up-Screnn/homeScreen/home.screen';
import { SignInComponent } from '../screen/sig-in-up-Screnn/sign-in-Screen/sign-in.component';
import { RegisterComponent } from '../screen/sig-in-up-Screnn/RegisterScreen/register.component';
import { ForgotPassword } from '../screen/sig-in-up-Screnn/ForgotPassword/forgotPassword.screen';

const AuthStack = createNativeStackNavigator();

export const AuthNavigation = () => {
	return (
		<AuthStack.Navigator
			initialRouteName='Inicio'
			screenOptions={{ headerShown: false }}
		>
			<AuthStack.Screen name='inicio' component={HomeScreen} />
			<AuthStack.Screen
				name='SigIn'
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
            }}/>
		</AuthStack.Navigator>
	);
};
