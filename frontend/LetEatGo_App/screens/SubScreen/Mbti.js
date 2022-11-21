import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../Bar/Topbar';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Mbti({navigation, route}) {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(true);
  const [third, setThird] = useState(true);
  const [fourth, setFourth] = useState(true);
  const [fifth, setFifth] = useState(true);
  return (
    <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={styles.container}>
      <Topbar navigation={navigation} />
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.2,
            height: Height * 0.2,
          }}>
          <Text>나의 먹비티아이는</Text>
          <Text>ISFJ - P</Text>
        </View>
        <View style={{flex: 0.8}}>
          <View style={{...styles.textArea, backgroundColor: '#EFB6BC'}}>
            <Text>나는 음식에 있어</Text>
            <Text>~</Text>
            <Text>한 사람입니다 !</Text>
          </View>
          <View style={styles.textArea}>
            <Text>나는 음식에 있어</Text>
            <Text>~</Text>
            <Text>한 사람입니다 !</Text>
          </View>
          <View style={styles.textArea}>
            <Text>나는 음식에 있어</Text>
            <Text>~</Text>
            <Text>한 사람입니다 !</Text>
          </View>
          <View style={styles.textArea}>
            <Text>나는 음식에 있어</Text>
            <Text>~</Text>
            <Text>한 사람입니다 !</Text>
          </View>
          <View style={styles.textArea}>
            <Text>나는 음식에 있어</Text>
            <Text>~</Text>
            <Text>한 사람입니다 !</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: Width * 0.01,
  },
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Height * 0.03,
    borderWidth: 1,
    height: Height * 0.15,
  },
});

export default Mbti;
