import React from 'react';
import {View, Text, Button} from 'react-native';
import Topbar from '../Bar/Topbar';

function MbtiSurvey({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <Text>This is MbtiSurvey screen !</Text>
    </View>
  );
}

export default MbtiSurvey;
