import React, {useState} from 'react';
import {View, Text, Button, Image, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const icons = [
  {
    foodname: '돈까스',
    src: require('../../Ingredients/0.png'),
  },
  {
    foodname: '돈까스',
    src: require('../../Ingredients/0.png'),
  },
  {
    foodname: '돈까스',
    src: require('../../Ingredients/0.png'),
  },
  {
    foodname: '돈까스',
    src: require('../../Ingredients/0.png'),
  },
];

function IngredientComponent({food_name}) {
  const [foodID, setFoodID] = useState('바나나');
  const iconlist = icons.map(icon => (
    <View>
      <TouchableOpacity>
        <Image
          style={styles.icon}
          source={foodID === icon.foodname ? icon.src : null}
        />
        {/* <Text>{foodID}</Text> */}
      </TouchableOpacity>
    </View>
  ));
  return <View>{iconlist}</View>;
}

const styles = {
  icon: {
    height: Height * 0.12,
    width: Width * 0.18,
    marginRight: Width * 0.07,
    marginTop: Height * 0.01,
  },
};

export default IngredientComponent;
