import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';
import Topbar from '../Bar/Topbar';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function MyRecipe({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Topbar navigation={navigation} />
      <View style={{flex: 0.3}}>
        <View style={{...styles.box, flexDirection: 'row'}}>
          <Image
            source={require('../../android/app/assets/icons/User_default.png')}
          />
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text>윰블리</Text>
              <TouchableOpacity></TouchableOpacity>
            </View>
            <Text>yunmi@naver.com</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.7, backgroundColor: 'blue'}}>
        <View
          style={{flex: 0.1, flexDirection: 'row', backgroundColor: 'green'}}>
          <TouchableOpacity style={styles.block}>
            <Text>만들어 본 레시피</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.block}>
            <Text>관심 있는 레시피</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 0.9}}></ScrollView>
      </View>
      <Button title="로그아웃" onPress={() => navigation.replace('Auth')} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingHorizontal: Width * 0.013,
    marginTop: Height * 0.012,
    marginBottom: Height * 0.012,
    backgroundColor: 'white',
    marginHorizontal: Width * 0.018,
    borderWidth: 1.8,
    borderBottomRightRadius: 23,
    borderColor: '#FFCDD2',
    borderStyle: 'solid',
    shadowColor: '#FFAAB3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,

    elevation: 1,
    // justifyContent: '',
    alignItems: 'center',
  },
  block: {
    backgroundColor: '#FFCDD2',
    paddingVertical: Height * 0.0146,
    borderBottomRightRadius: 23,
    marginBottom: Height * 0.006,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default MyRecipe;
