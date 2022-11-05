import React from 'react';
import {View, Text, Button} from 'react-native';
import Topbar from '../Bar/Topbar';

function Mbti({navigation}) {
  return (
    <View>
      <Topbar navigation={navigation} />
      <Text>This is MBTI screen !</Text>
    </View>
  );
}

export default Mbti;
