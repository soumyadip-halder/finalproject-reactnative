import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  useDeviceOrientation,
  useDimensions,
} from '@react-native-community/hooks';
import {connect} from 'react-redux';
import {fetchLatest} from '../redux/latest/actions';
import latest from '../assets/latestMovieSeatData';
import {bookLatestInit} from '../redux/seatsLatest/action';
import Header from './Header';

/*
This component displays all the available latest movies in the browser for user to interact with
*/

function LatestMovies(props) {
  const {landscape} = useDeviceOrientation();
  const {width, height} = useDimensions().window;
  useEffect(() => {
    props.fetchon();
    props.bookedSeats(latest);
  }, []);

  let filtered = [];
  if (props.searchStr !== '') {
    filtered = props.success.filter(data =>
      data.title.toLowerCase().includes(props.searchStr.toLowerCase()),
    );
  } else {
    filtered = props.success;
  }

  return (
    <>
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}
        style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={!landscape ? styles.containertop : styles.containertopLand}>
            {props.fetching === true ? (
              <View>
                <Text>Loading...</Text>
              </View>
            ) : props.error === '' ? (
              <>
                {props.searchStr !== '' && (
                  <View
                    style={
                      !landscape
                        ? [styles.containertop, {alignItems: 'flex-start'}]
                        : [styles.containertopLand, {alignItems: 'flex-start'}]
                    }>
                    <Text>
                      Showing results for search string: {props.searchStr}
                    </Text>
                  </View>
                )}
                {filtered.length !== 0 ? (
                  filtered.map((data, index) => (
                    <View key={index}>
                      <View
                        style={
                          !landscape
                            ? {
                                width: width * 0.8,
                                borderRadius: 3,
                              }
                            : {
                                width: width * 0.8,
                                borderRadius: 3,
                              }
                        }>
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate('Details', {
                              movieid: data.id,
                            });
                          }}>
                          <Image
                            resizeMode="stretch"
                            style={
                              !landscape
                                ? {
                                    width: width * 0.8,
                                    height: height * 0.2,
                                    borderWidth: 1,
                                  }
                                : {
                                    width: width * 0.8,
                                    height: height * 0.5,
                                    borderWidth: 1,
                                  }
                            }
                            source={{
                              uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
                            }}
                          />
                          <View style={{borderWidth: 1}}>
                            <Text
                              style={{textTransform: 'uppercase'}}
                              adjustsFontSizeToFit={true}>
                              Title: {data.title}
                            </Text>
                            <Text
                              style={{textTransform: 'uppercase'}}
                              adjustsFontSizeToFit={true}>
                              Original Title: {data.original_title}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <Text></Text>
                    </View>
                  ))
                ) : (
                  <View></View>
                )}
              </>
            ) : (
              <View>
                <Text>Error while fetching data {props.error}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

mapStateToProps = state => {
  return {
    fetching: state.latestReducer.loading,
    success: state.latestReducer.data,
    error: state.latestReducer.error,
    searchStr: state.searchReducer.str,
  };
};

mapDispatchToProps = dispatch => {
  return {
    fetchon: () => dispatch(fetchLatest()),
    bookedSeats: data => dispatch(bookLatestInit(data)),
  };
};

const styles = StyleSheet.create({
  containertop: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containertopLand: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestMovies);
