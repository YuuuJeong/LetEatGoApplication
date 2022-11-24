import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import Topbar from '../Bar/Topbar';
import numState from '../../recoils/numState';
import {atom, useRecoilState} from 'recoil';

function Survey({navigation}) {
  const [num, setNum] = useRecoilState(numState);
  return (
    <View>
      <Topbar navigation={navigation} />
      <Text>This is Survey screen !</Text>
      <TouchableOpacity onPress={() => setNum(num + 1)}>
        <Text>Num up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Survey;
