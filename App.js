import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './src/navigation/TabNavigation';
export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <TabNavigation/>
      </NavigationContainer>

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
