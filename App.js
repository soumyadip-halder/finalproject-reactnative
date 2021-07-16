import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {Provider} from 'react-redux';
import store from './redux/store';
import LatestMovies from './src/LatestMovies';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieDetails from './src/MovieDetails';
import SeatBooking from './src/SeatBooking';
import PaymentReceipt from './src/PaymentReceipt';

/*
The main function featuring all the different screen navigations. 
This component also wraps all others with the redux store for further use
*/

const Stack = createStackNavigator();
function App() {
  const {landscape} = useDeviceOrientation();
  return (
    <Provider store={store}>
      <SafeAreaView style={!landscape ? styles.safearea : styles.safeareaLand}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Latest"
            screenOptions={{
              title: 'Movie Ticket Booking',
              headerStyle: {
                backgroundColor: '#D3D3D3',
              },
              headerTintColor: '#000',
            }}>
            <Stack.Screen name="Latest" component={LatestMovies} />
            <Stack.Screen name="Details" component={MovieDetails} />
            <Stack.Screen name="Booking" component={SeatBooking} />
            <Stack.Screen name="Payment" component={PaymentReceipt} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
  },
  safeareaLand: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#D3D3D3',
  },
  containertop: {
    padding: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  containertopLand: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
    padding: 5,
    borderWidth: 1,
  },
  buttonLand: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
    padding: 5,
    borderWidth: 1,
  },
});

export default App;
