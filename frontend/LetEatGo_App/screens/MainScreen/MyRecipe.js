import React from 'react';
import {View, Text, Button} from 'react-native';
import Topbar from '../Bar/Topbar';

function MyRecipe({navigation}) {
  return (
    <View>
      <Topbar navigation={navigation} />
      <Text>This is MyRecipe screen !</Text>
      <Text>Hello world!</Text>
      <Button title="로그아웃" onPress={() => navigation.replace('Auth')} />
    </View>
  );
}

export default MyRecipe;
