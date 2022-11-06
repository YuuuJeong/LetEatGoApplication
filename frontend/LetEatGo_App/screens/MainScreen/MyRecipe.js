import React, {useState} from 'react';
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

function RecipeComponent() {
  const [like, setLike] = useState(false);
  const [check, setCheck] = useState(false);

  return (
    <View
      style={{
        ...styles.box,
        height: Height * 0.2,
      }}>
      <View style={{flex: 0.9}}></View>
      <View
        style={{
          flex: 0.1,
          paddingBottom: Height * 0.04,
        }}>
        <View style={{width: Width * 0.85, flexDirection: 'row-reverse'}}>
          <TouchableOpacity onPress={() => setCheck(!check)}>
            <Image
              source={
                check
                  ? require('../../android/app/assets/icons/Checked2.png')
                  : require('../../android/app/assets/icons/Check2.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLike(!like)}>
            <Image
              source={
                like
                  ? require('../../android/app/assets/icons/Heart2.png')
                  : require('../../android/app/assets/icons/EmptyHeart2.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function MyRecipe({navigation}) {
  const [active, setActive] = useState(true);
  const [userId, setUserId] = useState('yunmi123');
  const [nickname, setNickname] = useState('윰블리');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View style={{flex: 1, paddingHorizontal: Width * 0.03}}>
        <View style={{flex: 0.3}}>
          <View style={{...styles.box, flexDirection: 'row'}}>
            <Image
              source={require('../../android/app/assets/icons/User_default.png')}
              style={{marginLeft: Width * 0.03}}
            />
            <View style={{marginLeft: Width * 0.02}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: Height * 0.015,
                }}>
                <Text>{userId}</Text>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => navigation.replace('Auth')}>
                  <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
              </View>
              <Text>{nickname}</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 0.7}}>
          <View
            style={{
              flex: 0.1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={{
                ...styles.block,
                backgroundColor: active ? '#F0F0F0' : '#FFCDD2',
              }}
              onPress={active ? null : () => setActive(!active)}>
              <Text>만들어 본 레시피</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.block,
                backgroundColor: active ? '#FFCDD2' : '#F0F0F0',
              }}
              onPress={active ? () => setActive(!active) : null}>
              <Text>관심 있는 레시피</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 0.9}}>
            <RecipeComponent />
            <RecipeComponent />
            <RecipeComponent />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    // paddingHorizontal: Width * 0.013,
    marginTop: Height * 0.012,
    marginBottom: Height * 0.012,
    backgroundColor: 'white',
    // marginHorizontal: Width * 0.018,
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
    paddingLeft: Width * 0.01,
  },
  block: {
    backgroundColor: '#FFCDD2',
    paddingTop: Height * 0.01,
    borderBottomRightRadius: 23,
    // marginBottom: Height * 0.006,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: Width * 0.46,
    elevation: 3,
  },
  logoutText: {
    fontSize: 12,
    color: '#FFCDD2',
    marginLeft: Width * 0.01,
    marginTop: Height * 0.003,
  },
  icon: {
    marginLeft: Width * 0.015,
  },
});

export default MyRecipe;
