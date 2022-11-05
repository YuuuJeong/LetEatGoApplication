import React from 'react';
import {View, Text, Button} from 'react-native';
import Topbar from '../Bar/Topbar';

function Survey({navigation}) {
  return (
    <View>
      <Topbar navigation={navigation} />
      <Text>This is Survey screen !</Text>
    </View>
  );
}

export default Survey;
