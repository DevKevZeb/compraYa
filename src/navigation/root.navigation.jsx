import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthNavigation } from './auth.navigation';
import { TabNavigation } from './tab.navigation';
import { UserProfile } from '../screen/UserProfile/userProfile.component';

const RootStack = createNativeStackNavigator();

export const RootNavigation = () => {
    return (
        <RootStack.Navigator
            initialRouteName='Auth'
            screenOptions={{ headerShown: false }}
        >
            <RootStack.Screen name='Auth' component={AuthNavigation} />
            <RootStack.Screen
                name='ListProductos'
                component={TabNavigation}
            />
    
        </RootStack.Navigator>
    );
};