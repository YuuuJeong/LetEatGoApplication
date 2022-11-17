import {useScrollToTop} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Share,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Topbar from '../Bar/Topbar';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Recipe({navigation, route}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [made, setMade] = useState(false);
  const [madeCount, setMadeCount] = useState(0);
  const [view, setView] = useState(174334);
  const [orders, setOrders] = useState([]);
  const [detail, setDetail] = useState('');
  const [showDetail, setShowDetail] = useState(false);

  async function getData(food_id) {
    try {
      const response = await axios.get(
        `http://10.0.2.2:80/recipe?foodid=${food_id}`,
      );
      console.log(response.data.recipe);
      console.log('\n');
      console.log(response.data.recipe.general.order);
      setDetail(response.data.recipe.detail);
      setOrders(response.data.recipe.general.order);
    } catch (e) {
      console.log(e);
    }
  }

  const link =
    'https://www.youtube.com/watch?v=oEWZ4DOgVK4&ab_channel=GONGSAMTABLE%EC%9D%B4%EA%B3%B5%EC%82%BC';

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('activityType!');
        } else {
          console.log('Share!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getData(route.params.food_id);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View style={{flex: 0.55, padding: 5}}>
        <View style={{flex: 0.65}}>
          <Image
            source={require('../../android/app/assets/imgs/recipeImage.jpeg')}
            style={{width: '100%', height: '100%'}}
            resizeMode="stretch"
          />
        </View>

        <View style={{flex: 0.35, marginTop: Height * 0.005}}>
          <Text style={styles.text}>
            [ASMR MUKBANG] 직접 만든 떡볶이 불닭볶음면 양념 치킨먹방! & 레시피
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
              flex: 0.5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.bottomButton}
                onPress={
                  like === false
                    ? () => {
                        setLike(true);
                        setLikeCount(likeCount + 1);
                      }
                    : () => {
                        setLike(false);
                        setLikeCount(likeCount - 1);
                      }
                }>
                <Image
                  source={
                    like === true
                      ? require('../../android/app/assets/icons/Heart.png')
                      : require('../../android/app/assets/icons/EmptyHeart.png')
                  }
                />
                <Text style={styles.bottomButtonText}>{likeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomButton}
                onPress={
                  made === false
                    ? () => {
                        setMade(true);
                        setMadeCount(madeCount + 1);
                      }
                    : () => {
                        setMade(false);
                        setMadeCount(madeCount - 1);
                      }
                }>
                <Image
                  source={
                    made === true
                      ? require('../../android/app/assets/icons/Checked.png')
                      : require('../../android/app/assets/icons/Check.png')
                  }
                />
                <Text style={styles.bottomButtonText}>{madeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButton}>
                <Image
                  source={require('../../android/app/assets/icons/Share.png')}
                />
                <Text
                  style={styles.bottomButtonText2}
                  onPress={() => onShare()}>
                  공유하기
                </Text>
              </TouchableOpacity>
            </View>
            <Text>
              조회수{' '}
              {view.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              회
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.45}}>
        <ScrollView
          style={{
            paddingLeft: Width * 0.03,
            paddingRight: Width * 0.03,
            flex: 1,
          }}>
          <View style={{flex: 0.45}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#FFCDD2'}}>식재료</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#A4A4A4',
                  borderRadius: 10,
                  padding: 3,
                }}
                onPress={() => {
                  // console.log(typeof route.params.food_id);
                  // getData(route.params.food_id);
                  showDetail ? setShowDetail(false) : setShowDetail(true);
                }}>
                <Text style={{fontSize: 12, color: 'white'}}>자세히 보기</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginBottom: Height * 0.01}}>
              <Image
                source={require('../../android/app/assets/Ingredient/chicken.png')}
                style={styles.icon}
              />
              <Image
                source={require('../../android/app/assets/Ingredient/sausage.png')}
                style={styles.icon}
              />

              <Image
                source={require('../../android/app/assets/Ingredient/meatball.png')}
                style={styles.icon}
              />
              <Image
                source={require('../../android/app/assets/Ingredient/ramen.png')}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: '#FFCDD2'}}>조미료</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: Height * 0.01,
              }}>
              <Image
                source={require('../../android/app/assets/Ingredient/sesame_oil.png')}
                style={styles.icon}
              />
              <Image
                source={require('../../android/app/assets/Ingredient/soy_sauce.png')}
                style={styles.icon}
              />
            </View>
          </View>

          <Text>{showDetail ? detail : null}</Text>

          <View
            style={{
              flex: 0.1,
              marginBottom: Height * 0.05,
              marginTop: Height * 0.02,
            }}>
            <Text style={{color: '#FFCDD2'}}>레시피</Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../android/app/assets/icons/1.png')}
                style={styles.texticon}
              />
              <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                {orders.Order1}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/2.png')}
                style={styles.texticon}
              />
              <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                {orders.Order2}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/3.png')}
                style={styles.texticon}
              />
              <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                {orders.Order3}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topButton: {
    height: Height * 0.05,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.01,
    elevation: 1,
  },
  bottomButton: {
    height: Height * 0.05,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.01,
    elevation: 1,
  },
  bottomButtonText: {
    fontSize: 19,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  bottomButtonText2: {
    fontSize: 13,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  image: {
    height: Height * 0.15,
    width: Height * 0.15,
  },
  text: {
    fontSize: 17,
    fontWeight: '900',
    padding: 5,
    flex: 0.5,
  },
  topButtonText: {
    fontSize: 14,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  iconArea: {
    backgroundColor: 'white',
    height: Height * 0.12,
    width: Width * 0.12,
  },
  icon: {
    height: Height * 0.12,
    width: Width * 0.12,
    marginRight: Width * 0.07,
  },
  texticon: {
    height: Height * 0.02,
    width: Width * 0.02,
    margin: Width * 0.04,
  },
});

export default Recipe;
