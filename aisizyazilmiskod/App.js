import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import GirisScreen from './src/screens/GirisScreen';
import SifreScreen from './src/screens/SifreScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Giris"
        screenOptions={{
          headerStyle: { backgroundColor: '#1e1e2e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Giris" component={GirisScreen} options={{ title: 'Şifre Üretici' }} />
        <Stack.Screen name="Sifre" component={SifreScreen} options={{ title: 'Şifre Oluştur' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
