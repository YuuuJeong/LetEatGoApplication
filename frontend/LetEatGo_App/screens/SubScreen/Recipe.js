import {useScrollToTop} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';
import IngredientComponent from './IngredientComponent';
import Topbar from '../Bar/Topbar';
import RecipeTopArea from './RecipeTopArea';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Recipe({navigation, route}) {
  const [error, setError] = useState('');
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [made, setMade] = useState(false);
  const [madeCount, setMadeCount] = useState(0);
  const [view, setView] = useState(174334);
  const [orders, setOrders] = useState([]);
  const [detail, setDetail] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [foodName, setFoodName] = useState('닭도리탕');
  const [videoName, setVideoName] = useState('');
  const [videoId, setVideoId] = useState('j7s9VRsrm9o');
  const [materials1, setMaterials1] = useState([]);

  async function getData(food_id) {
    try {
      const response = await axios.get(
        `http://10.0.2.2:80/recipe?foodid=${food_id}`,
      );

      console.log(response.data.recipe.general.foodname);
      setDetail(response.data.recipe.detail);
      setOrders(response.data.recipe.general.order);
      setFoodName(response.data.recipe.general.foodname);
      setMaterials1(Object.values(response.data.recipe.general.material));
    } catch (e) {
      console.log(e);
    }
  }

  const materialList = materials1.map(material => (
    <IngredientComponent key={material} food_name={material} />
  ));

  useEffect(() => {
    getData(route.params.food_id);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <RecipeTopArea food_name={foodName} />
      <View style={{flex: 0.55}}>
        <ScrollView
          style={{
            paddingLeft: Width * 0.04,
            paddingRight: Width * 0.03,
            flex: 1,
            paddingTop: Height * 0.02,
          }}>
          <View style={{flex: 0.45}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: Height * 0.01,
              }}>
              <Text style={{color: '#FFCDD2'}}>식재료</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#A4A4A4',
                  borderRadius: 10,
                  padding: 3,
                  marginRight: Width * 0.012,
                }}
                onPress={() => {
                  showDetail ? setShowDetail(false) : setShowDetail(true);
                }}>
                <Text style={{fontSize: 12, color: 'white'}}>자세히 보기</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                // marginBottom: Height * 0.02,
                // marginLeft: Width * 0.01,
                flexWrap: 'wrap',
              }}>
              {materialList}
            </View>
          </View>

          <Text>{showDetail ? detail : null}</Text>

          <View
            style={{
              flex: 0.1,
              marginBottom: Height * 0.05,
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
              <View style={{flexShrink: 1}}>
                <Text style={{marginTop: Width * 0.04}}>
                  {('' + orders.Order1).substring(2)}
                </Text>
                <Image
                  style={{
                    width: Width * 0.5,
                    height: Height * 0.17,
                    borderRadius: 12,
                  }}
                  source={{
                    uri: orders.Order1_img,
                  }}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/2.png')}
                style={styles.texticon}
              />
              <View style={{flexShrink: 1}}>
                <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                  {('' + orders.Order2).substring(2)}
                </Text>
                <Image
                  style={{
                    width: Width * 0.5,
                    height: Height * 0.17,
                    borderRadius: 12,
                  }}
                  source={{
                    uri: orders.Order2_img,
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/3.png')}
                style={styles.texticon}
              />

              <View style={{flexShrink: 1}}>
                <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                  {('' + orders.Order3).substring(2)}
                </Text>
                <Image
                  style={{
                    width: Width * 0.5,
                    height: Height * 0.17,
                    borderRadius: 12,
                  }}
                  source={{
                    uri: orders.Order3_img,
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/4.png')}
                style={styles.texticon}
              />
              <View style={{flexShrink: 1}}>
                <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                  {('' + orders.Order4).substring(2)}
                </Text>
                <Image
                  style={{
                    width: Width * 0.5,
                    height: Height * 0.17,
                    borderRadius: 12,
                  }}
                  source={{
                    uri: orders.Order4_img,
                  }}
                />
              </View>
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
    marginBottom: Height * 0.01,
    // backgroundColor: 'blue',
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
    width: Width * 0.03,
    margin: Width * 0.04,
    resizeMode: 'stretch',
  },
});

export default Recipe;
