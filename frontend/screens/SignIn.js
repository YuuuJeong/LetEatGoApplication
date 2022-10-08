import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function SignIn({navigation}) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  return (
    // <View>
    //   <Text>This is SignIn screen</Text>
    //   <StatusBar style="auto" />
    //   <TextInput
    //     placeholder="ID"
    //     value={userId}
    //     onChangeText={Id => setUserId(Id)}
    //     style={styles.input}
    //   />
    //   <TextInput
    //     placeholder="PASSWORD"
    //     value={userId}
    //     onChangeText={Id => setUserId(Id)}
    //     style={styles.input}
    //   />
    // </View>
    <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={styles.container}>
      <View style={{flex: 1.5}} />
      <View style={{flex: 2}}>
        <View style={styles.logoArea}>
          <Image
            source={require('../android/app/assets/imgs/Main_logo.png')}
            style={{width: wp(40), resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btnoutline}
            onPress={() => navigation.navigate('Login')}>
            <Text style={{color: 'black'}}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'white'}}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  logoArea: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: wp(15),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  btnArea: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
    // backgroundColor: 'orange',
  },
  btn: {
    flex: 1,
    width: wp(75),
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btnoutline: {
    flex: 1,
    width: wp(75),
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
});

export default SignIn;
