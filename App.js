import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { TabNavigation } from './src/navigation/tab.navigation';
import { styles } from './src/styles/globalStyle';

const toastConfig = {
  error: ({ text1, text2, ...rest }) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText1}>{text1}</Text>
      <Text style={styles.toastText2}>{text2}</Text>
    </View>
  ),
};

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <TabNavigation />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
}