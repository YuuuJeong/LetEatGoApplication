import React from 'react';
import {View, Text, Button} from 'react-native';

function MyRecipe({navigation}) {
  return (
    <View>
      <Text>This is MyRecipe screen !</Text>
      <Button title="Go to main" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default MyRecipe;
