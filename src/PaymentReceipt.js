import React from 'react';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import Header from './Header';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {
  useDeviceOrientation,
  useDimensions,
} from '@react-native-community/hooks';

/*
This component shows the QRCode for the movie ticket booked by the user
alongwith the details in tabular format
*/

function PaymentReceipt(props) {
  const {landscape} = useDeviceOrientation();
  const {width, height} = useDimensions().window;

  let seats = '';
  if (props.bookingDetails) {
    for (let i = 0; i < props.bookingDetails.seatsBooked.length; i++) {
      seats = seats + props.bookingDetails.seatsBooked[i] + '#';
    }
  }
  return (
    <>
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}
        style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <View
            style={!landscape ? styles.containertop : styles.containertopLand}>
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
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                  Payment Receipt and QR code
                </Text>
                <Text />
                <View style={{alignItems: 'center'}}>
                  {props.bookingDetails && (
                    <QRCode
                      id="movieBooking"
                      value={`${props.bookingDetails.id}#${props.bookingDetails.moviename}#${props.bookingDetails.date}#${props.bookingDetails.time}#${props.bookingDetails.totalprice}#${seats}`}
                      size={290}
                      level={'H'}
                      includeMargin={true}
                      bgColor="#000000"
                      fgColor="#FFFFFF"
                    />
                  )}
                </View>
                <Text />
                <View style={{alignItems: 'flex-start'}}>
                  <Text style={{fontWeight: 'bold'}}>
                    Movie Name:{' '}
                    <Text style={{fontWeight: 'normal'}}>
                      {props.bookingDetails.moviename}
                    </Text>
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>
                    Date:{' '}
                    <Text style={{fontWeight: 'normal'}}>
                      {props.bookingDetails.date}
                    </Text>
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>
                    Time:{' '}
                    <Text style={{fontWeight: 'normal'}}>
                      {props.bookingDetails.time}
                    </Text>
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>
                    Amount Paid:{' '}
                    <Text style={{fontWeight: 'normal'}}>
                      {props.bookingDetails.totalprice}
                    </Text>
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>
                    Seat Numbers:{' '}
                    {props.bookingDetails.seatsBooked.map((seat, index) => (
                      <Text key={index} style={{fontWeight: 'normal'}}>
                        {seat}
                        {', '}
                      </Text>
                    ))}
                  </Text>
                </View>
              </View>
              <Text></Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const mapStateToProps = state => {
  return {
    bookingDetails: state.bookingDetailsReducer.details,
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
});

export default connect(mapStateToProps, null)(PaymentReceipt);
