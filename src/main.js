import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import splash from './screens/splash';
import home from './screens/home'
import targetRegister from './screens/targetRegister';
import colors from './styles/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator();

  return (
    <>
    <StatusBar backgroundColor={colors.purple_primary}/>
     <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={splash} />
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="CadastroMeta" component={targetRegister} />
      </Stack.Navigator>
    </NavigationContainer></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default App;
