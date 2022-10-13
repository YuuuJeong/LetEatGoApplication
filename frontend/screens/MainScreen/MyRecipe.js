import React from "react";
import { View, Text, Button } from "react-native";

function MyRecipe({ navigation }) {
  return (
    <View>
      <Text>This is MyRecipe screen !</Text>
      <Button title="로그아웃" onPress={() => navigation.replace("Auth")} />
    </View>
  );
}

export default MyRecipe;
