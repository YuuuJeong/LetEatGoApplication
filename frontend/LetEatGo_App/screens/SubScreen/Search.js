import React from 'react';
import {View, Text, Button} from 'react-native';
import Topbar from '../Bar/Topbar';

function Search({navigation}) {
  return (
    <View>
      <Topbar navigation={navigation} />
      <Text>This is Search screen !</Text>
    </View>
  );
}

export default Search;
