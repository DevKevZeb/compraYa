import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { TabNavigation } from './src/navigation/tab.navigation';
import { styles } from './src/styles/globalStyle';
import { RootNavigation } from './src/navigation/root.navigation';

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
  return (
    <Provider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
}