import React from 'react';
import {View, Text, Button} from 'react-native';
import Topbar from '../Bar/Topbar';
import YoutubePlayer from 'react-native-youtube-iframe';

function RecipeTopArea({navigation, food_name}) {
  return (
    <View>
      <Topbar navigation={navigation} />
      <Text>This is Notice screen !</Text>
    </View>
  );
}

export default RecipeTopArea;
