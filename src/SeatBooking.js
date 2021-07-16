import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {bookLatestSuccess} from '../redux/seatsLatest/action';
import {getBooking} from '../redux/bookingDetails/actions';
import Header from './Header';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  useDeviceOrientation,
  useDimensions,
} from '@react-native-community/hooks';

/*
This component shows the available seats for the movie to the user. From here user can
choose the seats as per wish and proceed for booking.
*/

function SeatBooking(props) {
  const seats = Array.from({length: 8 * 8}, (_, i) => i);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const {landscape} = useDeviceOrientation();
  const {width, height} = useDimensions().window;
  const [grey, setGrey] = useState({
    backgroundColor: 'grey',
    width: 25,
    height: 25,
    margin: 2,
    flexBasis: '12.5%',
  });
  const [green, setGreen] = useState({
    backgroundColor: 'green',
    width: 25,
    height: 25,
    margin: 2,
    flexBasis: '12.5%',
  });
  const [red, setRed] = useState({
    backgroundColor: 'red',
    width: 25,
    height: 25,
    margin: 2,
    flexBasis: '12.5%',
  });

  let item = [];
  item = props.latestOne.filter(
    latest => latest.id === props.route.params.movieid,
  );

  function handleSelectedState(seat) {
    const isSelected = selectedSeat.includes(seat);
    if (isSelected) {
      const seats = selectedSeat.filter(selectedSeat => selectedSeat !== seat);
      setSelectedSeat([...seats]);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
    }
  }

  const dispatchIt = () => {
    if (selectedSeat.length !== 0) {
      Alert.alert(
        'Are you sure you wanna go ahead with the booking?',
        'Press OK to continue',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => okpressed()},
        ],
      );
    }
  };

  const okpressed = () => {
    props.latestDispatch(selectedSeat, props.route.params.movieid);
    const details = {
      id: props.route.params.movieid,
      moviename: props.route.params.moviename,
      date: item[0].date,
      time: item[0].time,
      totalprice: `Rs ${item[0].price * selectedSeat.length}`,
      seatsBooked: selectedSeat,
    };
    props.bookingDetailsReducer(details);
    Alert.alert('Booking done successfully');

    props.navigation.replace('Payment');
  };

  return (
    <>
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}
        style={{flex: 1}}>
        {item.length !== 0 ? (
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View
              style={
                !landscape ? styles.containertop : styles.containertopLand
              }>
              <View>
                <View
                  style={
                    !landscape
                      ? {
                          width: width * 0.8,
                          borderRadius: 3,
                        }
                      : {
                          width: width * 0.6,
                          borderRadius: 3,
                        }
                  }>
                  <Text style={{fontWeight: 'bold'}}>
                    Date and Time for booking:{' '}
                  </Text>
                  <Text className="font-weight-bold">
                    {item[0].date} {item[0].time}
                  </Text>
                  <Text />
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'grey',
                      }}
                    />
                    <Text>N/A</Text>
                    <Text>{'  '}</Text>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'green',
                      }}
                    />
                    <Text>Selected</Text>
                    <Text>{'  '}</Text>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'red',
                      }}
                    />
                    <Text>Occupied</Text>
                  </View>
                  <Text />
                  <Text
                    style={{
                      borderWidth: 1,
                      color: 'black',
                      textAlign: 'center',
                      backgroundColor: 'white',
                    }}>
                    Screen
                  </Text>
                  <Text />
                  <Text />
                  <View
                    style={{
                      flexWrap: 'wrap',
                      //flexBasis: '12.5%',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    {seats.map(seat => {
                      const occupied = item[0].occupied.includes(seat);
                      const selected = selectedSeat.includes(seat);

                      return (
                        <Fragment key={seat}>
                          <TouchableOpacity
                            onPress={
                              occupied ? null : () => handleSelectedState(seat)
                            }>
                            <View
                              style={
                                occupied
                                  ? [styles.import, red]
                                  : selected
                                  ? [styles.import, green]
                                  : [styles.import, grey]
                              }
                            />
                          </TouchableOpacity>
                          <Text>{'  '}</Text>
                        </Fragment>
                      );
                    })}
                  </View>
                  <Text />
                  <View>
                    <Text>
                      You have selected{' '}
                      <Text style={{fontWeight: 'bold', color: 'red'}}>
                        {selectedSeat.length}
                      </Text>{' '}
                      seats for the price of{' '}
                      <Text style={{fontWeight: 'bold', color: 'red'}}>
                        Rs {selectedSeat.length * item[0].price}
                      </Text>
                    </Text>
                  </View>
                  <Text />
                  <Text />
                  <TouchableOpacity
                    onPress={() => {
                      dispatchIt();
                    }}>
                    <Text
                      style={{
                        borderRadius: 3,
                        borderWidth: 1,
                        color: 'white',
                        textAlign: 'center',
                        backgroundColor: 'green',
                      }}>
                      CONFIRM BOOKING
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text></Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{padding: 20}}>
            <Text style={{fontWeight: 'bold'}}>Booking for Movie:</Text>
            <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
              {props.route.params.moviename}
            </Text>
            <Text />
            <View>
              <Text>
                The movie is not running in any of the halls. Sorry for the
                inconvenience
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const mapStateToProps = state => {
  return {
    latestOne: state.bookingLatestReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    latestDispatch: (seatList, id) => dispatch(bookLatestSuccess(seatList, id)),
    bookingDetailsReducer: details => dispatch(getBooking(details)),
  };
};

const styles = StyleSheet.create({
  containertop: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containertopLand: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  import: {
    backgroundColor: 'grey',
    width: 25,
    height: 25,
    margin: 2,
    flexBasis: '12.5%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatBooking);
