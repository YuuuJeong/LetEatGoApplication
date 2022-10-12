import React from 'react';
import {View, Text, Button} from 'react-native';

function Refrigerator({navigation}) {
  return (
    <View>
      <Text>This is Refrigerator screen !</Text>
      <Button title="Go to main" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Refrigerator;
