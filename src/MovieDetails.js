import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchId} from '../redux/movieDetails/actions';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  useDeviceOrientation,
  useDimensions,
} from '@react-native-community/hooks';
import Header from './Header';

/*
This component shows the details of the movie clicked by the user and also houses the booking link.
For further movie ticket booking
*/

function MovieDetails(props) {
  const {landscape} = useDeviceOrientation();
  const {width, height} = useDimensions().window;
  useEffect(() => {
    console.log(props.detailsFetch);
    console.log(props.load);
    console.log(props.errorFetch);
    props.detailsDispatch(props.route.params.movieid);
  }, [props.route.params.movieid]);

  let errored = false;
  if (props.errorFetch !== '') {
    errored = true;
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
            {props.load === true ? (
              <View>
                <Text>Loading...</Text>
              </View>
            ) : errored === false ? (
              <>
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
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Booking', {
                          movieid: props.route.params.movieid,
                          moviename: props.detailsFetch.title,
                        });
                      }}>
                      <Text
                        style={{
                          borderRadius: 3,
                          borderWidth: 1,
                          color: 'white',
                          textAlign: 'center',
                          backgroundColor: 'green',
                        }}>
                        BOOK NOW
                      </Text>
                    </TouchableOpacity>
                    <Text></Text>
                    <Image
                      resizeMode="stretch"
                      style={
                        !landscape
                          ? {
                              width: width * 0.8,
                              height: height * 0.5,
                              borderWidth: 1,
                            }
                          : {
                              width: width * 0.6,
                              height: height * 0.5,
                              borderWidth: 1,
                            }
                      }
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${props.detailsFetch.poster_path}`,
                      }}
                    />
                    <View style={{borderWidth: 1}}>
                      <Text></Text>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        Rating:{' '}
                        <Text style={{fontWeight: 'normal'}}>
                          {props.detailsFetch.vote_average}
                        </Text>
                      </Text>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        Title:{' '}
                        <Text style={{fontWeight: 'normal'}}>
                          {props.detailsFetch.title}
                        </Text>
                      </Text>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        Original Title:{' '}
                        <Text style={{fontWeight: 'normal'}}>
                          {props.detailsFetch.original_title}
                        </Text>
                      </Text>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        TagLine:{' '}
                        <Text style={{fontWeight: 'normal'}}>
                          {props.detailsFetch.tagline}
                        </Text>
                      </Text>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        Release Date:{' '}
                        <Text style={{fontWeight: 'normal'}}>
                          {props.detailsFetch.release_date}
                        </Text>
                      </Text>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        Movie Duration:{' '}
                        <Text style={{fontWeight: 'normal'}}>
                          {Math.floor(props.detailsFetch.runtime / 60)} hr{' '}
                          {Math.floor(props.detailsFetch.runtime % 60)} mins
                        </Text>
                      </Text>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        About the movie:{' '}
                        <Text style={{fontWeight: 'normal'}}>
                          {props.detailsFetch.overview}
                        </Text>
                      </Text>
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        Genres:{' '}
                      </Text>
                      {props.detailsFetch.genres &&
                        props.detailsFetch.genres.map(data => (
                          <Text key={data.id}>
                            {data.name}
                            {'..'}
                          </Text>
                        ))}
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        Languages:{' '}
                      </Text>
                      {props.detailsFetch.spoken_languages &&
                        props.detailsFetch.spoken_languages.map(
                          (data, index) => (
                            <Text key={index}>
                              {data.english_name}
                              {'..'}
                            </Text>
                          ),
                        )}
                      <Text
                        adjustsFontSizeToFit={true}
                        style={{fontWeight: 'bold'}}>
                        Production Houses:{' '}
                      </Text>
                      {props.detailsFetch.production_companies &&
                        props.detailsFetch.production_companies.map(data => (
                          <Text key={data.id}>
                            {data.name}
                            {'..'}
                          </Text>
                        ))}
                    </View>
                  </View>
                  <Text></Text>
                </View>
              </>
            ) : (
              <View>
                <Text>Error while fetching data {props.errorFetch}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const makeStateToProps = state => {
  return {
    detailsFetch: state.detailsReducer.data,
    load: state.detailsReducer.loading,
    errorFetch: state.detailsReducer.error,
  };
};

const makeDispatchToProps = dispatch => {
  return {
    detailsDispatch: id => dispatch(fetchId(id)),
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

export default connect(makeStateToProps, makeDispatchToProps)(MovieDetails);
