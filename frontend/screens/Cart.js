import React from 'react';
import {View, Text, Button} from 'react-native';

function Cart({navigation}) {
  return (
    <View>
      <Text>This is Cart screen !</Text>
      <Button title="Go to main" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Cart;
