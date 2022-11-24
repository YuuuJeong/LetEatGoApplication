import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type {Node} from 'react';

const LoginScreen: () => Node = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1.5}}></View>
      <View style={{flex: 2}}>
        <View style={styles.logoArea}></View>
        <View style={styles.btnArea}>
          <TouchableOpacity>
            <Text>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity>
            <Text>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  logoArea: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  btnArea: {
    flex: 1,
    // justifyContentxs: 'center',
    // alignItems: 'center',
    backgroundColor: 'orange',
  },
});

export default LoginScreen;
