import {useScrollToTop} from '@react-navigation/native';
import React, {useState} from 'react';
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

function Recipe({navigation}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [made, setMade] = useState(false);
  const [madeCount, setMadeCount] = useState(0);
  const [view, setView] = useState(174334);

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
        {/* <View style={{flex: 0.15, padding: 5, flexDirection: 'row'}}>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>인트로</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>5</Text>
          </TouchableOpacity>
        </View> */}
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
            <Text style={{color: '#FFCDD2'}}>식재료</Text>
            <View style={{flexDirection: 'row'}}>
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
            <View style={{flexDirection: 'row'}}>
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
          <View style={{flex: 0.1, marginBottom: Height * 0.05}}>
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
                양파는 채썰고 슬라이스햄은 먹기 좋은 크기로 썰어줍니다.
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/2.png')}
                style={styles.texticon}
              />
              <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                끓는 물에 면을 먼저 데쳐줍니다. 이때 면은 완전히 삶는 것이 아닌
                면이 살짝 풀어질 정도로만 데리고, 데친 면은 찬물에 담가 면이
                불지 않도록 식혀주세요.
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/3.png')}
                style={styles.texticon}
              />
              <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                달궈진 팬에 오일을 두르고 슬라이스햄과 다진마늘, 채썬 양파를
                약불에서 5분간 볶아주세요.
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
