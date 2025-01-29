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
    'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
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
