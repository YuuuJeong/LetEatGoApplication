import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-gesture-handler';
import Topbar from '../Bar/Topbar';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Search({navigation}) {
  const [text, setText] = useState('');
  const [history, setHistory] = useState({});
  const [top5, setTop5] = useState();

  // useEffect(()=>{
  //   loadHistory();
  // },[]);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <LinearGradient
        style={styles.block}
        colors={['#FFCDD2', '#FFAAB3']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View></View>
        <View></View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#FFCDD2',
    paddingVertical: Height * 0.0146,
    borderBottomRightRadius: 23,
    marginBottom: Height * 0.006,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    fontFamily: 'Happiness-Sans-Bold',
    // paddingRight: Width * 0.226,
  },

  // StatusBarIcon: {
  //   position: 'absolute',
  //   flexDirection: 'row',
  //   right: Width * 0.15,
  //   top: Height * 0.018,
  // },
  TextInput: {
    backgroundColor: 'white',
    width: Width * 0.86,
    height: Height * 0.045,
    borderRadius: 17,
    paddingLeft: '11%',
    fontSize: 15.5,
  },
});

export default Search;
