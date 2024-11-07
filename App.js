import { LogBox, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigation from 'navigations/RootNavigation';
import moment from 'moment';
import { useFonts } from 'expo-font';
import { ModalProvider } from 'context/modalContext';

moment.locale("id")

LogBox.ignoreAllLogs()

export default function App() {

  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Bold': require('./src/assets/fonts/PlusJakartaSans-Bold.ttf'),
    'PlusJakartaSans-Medium': require('./src/assets/fonts/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Regular': require('./src/assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-SemiBold': require('./src/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null
  }

  return (
    <ModalProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <RootNavigation/>
      </GestureHandlerRootView>
    </ModalProvider>
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
