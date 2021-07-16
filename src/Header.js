import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {connect} from 'react-redux';
import {saveStr} from '../redux/search/actions';

function Header(props) {
  const {landscape} = useDeviceOrientation();
  const [str, setStr] = useState('');
  return (
    <View
      style={
        !landscape
          ? [styles.containertop, {flex: 0}]
          : [styles.containertopLand, {flex: 0}]
      }>
      <View
        style={{
          width: 200,
        }}>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="Search..."
            style={{borderWidth: 1, flex: 1}}
            onChangeText={text => setStr(text)}
          />
          <TouchableOpacity
            style={!landscape ? styles.button : styles.buttonLand}
            onPress={() => props.searchStr(str)}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containertop: {
    padding: 20,
    flex: 0.5,
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

const mapDispatchToProps = dispatch => {
  return {
    searchStr: str => dispatch(saveStr(str)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
