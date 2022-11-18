import React from 'react';
import {View, Text, Button, Image} from 'react-native';

function Cart({navigation}) {
  return (
    <View>
      <Text>This is Cart screen !</Text>
      <Button title="Go to main" onPress={() => navigation.navigate('Home')} />
      <Image
        source={{
          url: 'https://img.youtube.com/vi/oEWZ4DOgVK4/0.jpg',
        }}
        style={{width: '100%', height: '100%'}}
        resizeMode="stretch"
      />
    </View>
  );
}

export default Cart;
