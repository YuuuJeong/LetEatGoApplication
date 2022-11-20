import React, {useState} from 'react';
import {View, Text, Button, Image, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const icons = [
  {
    foodname: '달걀',
    src: require('../../Ingredients/0.png'),
  },
  {
    foodname: '돈까스',
    src: require('../../Ingredients/1.png'),
  },
  {
    foodname: '만두',
    src: require('../../Ingredients/2.png'),
  },
  {
    foodname: '메추리알',
    src: require('../../Ingredients/3.png'),
  },
  {
    foodname: '모짜렐라치즈',
    src: require('../../Ingredients/4.png'),
  },
  {
    foodname: '물만두',
    src: require('../../Ingredients/5.png'),
  },
  {
    foodname: '옥수수콘',
    src: require('../../Ingredients/6.png'),
  },
  {
    foodname: '요거트',
    src: require('../../Ingredients/7.png'),
  },
  {
    foodname: '참치캔',
    src: require('../../Ingredients/8.png'),
  },
  {
    foodname: '체다치즈',
    src: require('../../Ingredients/9.png'),
  },
  {
    foodname: '닭고기',
    src: require('../../Ingredients/10.png'),
  },
  {
    foodname: '돼지고기',
    src: require('../../Ingredients/11.png'),
  },
  {
    foodname: '소고기',
    src: require('../../Ingredients/12.png'),
  },
  {
    foodname: '양고기',
    src: require('../../Ingredients/13.png'),
  },
  {
    foodname: '오리고기',
    src: require('../../Ingredients/14.png'),
  },
  {
    foodname: '감자',
    src: require('../../Ingredients/15.png'),
  },
  {
    foodname: '고구마',
    src: require('../../Ingredients/16.png'),
  },
  {
    foodname: '귀리',
    src: require('../../Ingredients/17.png'),
  },
  {
    foodname: '누룽지',
    src: require('../../Ingredients/18.png'),
  },
  {
    foodname: '밀가루',
    src: require('../../Ingredients/19.png'),
  },
  {
    foodname: '부침가루',
    src: require('../../Ingredients/20.png'),
  },
  {
    foodname: '빵가루',
    src: require('../../Ingredients/21.png'),
  },
  {
    foodname: '옥수수',
    src: require('../../Ingredients/22.png'),
  },
  {
    foodname: '찹쌀가루',
    src: require('../../Ingredients/23.png'),
  },
  {
    foodname: '통밀',
    src: require('../../Ingredients/24.png'),
  },
  {
    foodname: '감',
    src: require('../../Ingredients/25.png'),
  },
  {
    foodname: '건포도',
    src: require('../../Ingredients/26.png'),
  },
  {
    foodname: '귤',
    src: require('../../Ingredients/27.png'),
  },
  {
    foodname: '딸기',
    src: require('../../Ingredients/28.png'),
  },
  {
    foodname: '라임',
    src: require('../../Ingredients/29.png'),
  },
  {
    foodname: '레몬',
    src: require('../../Ingredients/30.png'),
  },
  {
    foodname: '망고',
    src: require('../../Ingredients/31.png'),
  },
  {
    foodname: '메론',
    src: require('../../Ingredients/32.png'),
  },
  {
    foodname: '바나나',
    src: require('../../Ingredients/33.png'),
  },
  {
    foodname: '배',
    src: require('../../Ingredients/34.png'),
  },
  {
    foodname: '복숭아',
    src: require('../../Ingredients/35.png'),
  },
  {
    foodname: '블루베리',
    src: require('../../Ingredients/36.png'),
  },
  {
    foodname: '자두',
    src: require('../../Ingredients/37.png'),
  },
  {
    foodname: '포도',
    src: require('../../Ingredients/38.png'),
  },
  {
    foodname: '체리',
    src: require('../../Ingredients/39.png'),
  },
  {
    foodname: '키위',
    src: require('../../Ingredients/40.png'),
  },
  {
    foodname: '파인애플',
    src: require('../../Ingredients/41.png'),
  },
  {
    foodname: '당면',
    src: require('../../Ingredients/42.png'),
  },
  {
    foodname: '라면',
    src: require('../../Ingredients/43.png'),
  },
  {
    foodname: '소면',
    src: require('../../Ingredients/44.png'),
  },
  {
    foodname: '수제비',
    src: require('../../Ingredients/45.png'),
  },
  {
    foodname: '스파게티면',
    src: require('../../Ingredients/46.png'),
  },
  {
    foodname: '우동면',
    src: require('../../Ingredients/47.png'),
  },
  {
    foodname: '칼국수면',
    src: require('../../Ingredients/48.png'),
  },
  {
    foodname: '가래떡',
    src: require('../../Ingredients/49.png'),
  },
  {
    foodname: '떡국떡',
    src: require('../../Ingredients/50.png'),
  },
  {
    foodname: '떡볶이떡',
    src: require('../../Ingredients/51.png'),
  },
  {
    foodname: '바게트',
    src: require('../../Ingredients/52.png'),
  },
  {
    foodname: '베이글',
    src: require('../../Ingredients/53.png'),
  },
  {
    foodname: '식빵',
    src: require('../../Ingredients/54.png'),
  },
  {
    foodname: '가지',
    src: require('../../Ingredients/55.png'),
  },
  {
    foodname: '고추',
    src: require('../../Ingredients/56.png'),
  },
  {
    foodname: '김치',
    src: require('../../Ingredients/57.png'),
  },
  {
    foodname: '깻잎',
    src: require('../../Ingredients/58.png'),
  },
  {
    foodname: '당근',
    src: require('../../Ingredients/59.png'),
  },
  {
    foodname: '대파',
    src: require('../../Ingredients/60.png'),
  },
  {
    foodname: '마늘',
    src: require('../../Ingredients/61.png'),
  },
  {
    foodname: '무',
    src: require('../../Ingredients/62.png'),
  },
  {
    foodname: '배추',
    src: require('../../Ingredients/63.png'),
  },
  {
    foodname: '브로콜리',
    src: require('../../Ingredients/64.png'),
  },
  {
    foodname: '비트',
    src: require('../../Ingredients/65.png'),
  },
  {
    foodname: '상추',
    src: require('../../Ingredients/66.png'),
  },
  {
    foodname: '샐러리',
    src: require('../../Ingredients/67.png'),
  },
  {
    foodname: '시금치',
    src: require('../../Ingredients/68.png'),
  },
  {
    foodname: '아스파라거스',
    src: require('../../Ingredients/69.png'),
  },
  {
    foodname: '애호박',
    src: require('../../Ingredients/70.png'),
  },
  {
    foodname: '양배추',
    src: require('../../Ingredients/71.png'),
  },
  {
    foodname: '양송이버섯',
    src: require('../../Ingredients/72.png'),
  },
  {
    foodname: '양파',
    src: require('../../Ingredients/73.png'),
  },
  {
    foodname: '열무',
    src: require('../../Ingredients/74.png'),
  },
  {
    foodname: '오이',
    src: require('../../Ingredients/75.png'),
  },
  {
    foodname: '콩나물',
    src: require('../../Ingredients/76.png'),
  },
  {
    foodname: '토마토',
    src: require('../../Ingredients/77.png'),
  },
  {
    foodname: '파프리카',
    src: require('../../Ingredients/78.png'),
  },
  {
    foodname: '팽이버섯',
    src: require('../../Ingredients/79.png'),
  },
  {
    foodname: '표고버섯',
    src: require('../../Ingredients/80.png'),
  },
  {
    foodname: '호박',
    src: require('../../Ingredients/81.png'),
  },
  {
    foodname: '검은콩',
    src: require('../../Ingredients/82.png'),
  },
  {
    foodname: '깨',
    src: require('../../Ingredients/83.png'),
  },
  {
    foodname: '두부',
    src: require('../../Ingredients/84.png'),
  },
  {
    foodname: '땅콩',
    src: require('../../Ingredients/85.png'),
  },
  {
    foodname: '순두부',
    src: require('../../Ingredients/86.png'),
  },
  {
    foodname: '아몬드',
    src: require('../../Ingredients/87.png'),
  },
  {
    foodname: '완두콩',
    src: require('../../Ingredients/88.png'),
  },
  {
    foodname: '콩',
    src: require('../../Ingredients/89.png'),
  },
  {
    foodname: '호두',
    src: require('../../Ingredients/90.png'),
  },
  {
    foodname: '갈치',
    src: require('../../Ingredients/91.png'),
  },
  {
    foodname: '건새우',
    src: require('../../Ingredients/92.png'),
  },
  {
    foodname: '게맛살',
    src: require('../../Ingredients/93.png'),
  },
  {
    foodname: '고등어',
    src: require('../../Ingredients/94.png'),
  },
  {
    foodname: '골뱅이',
    src: require('../../Ingredients/95.png'),
  },
  {
    foodname: '굴',
    src: require('../../Ingredients/96.png'),
  },
  {
    foodname: '꼬막',
    src: require('../../Ingredients/97.png'),
  },
  {
    foodname: '꽁치',
    src: require('../../Ingredients/98.png'),
  },
  {
    foodname: '꽃게',
    src: require('../../Ingredients/99.png'),
  },
  {
    foodname: '낙지',
    src: require('../../Ingredients/100.png'),
  },
  {
    foodname: '다시마',
    src: require('../../Ingredients/101.png'),
  },
  {
    foodname: '대합',
    src: require('../../Ingredients/102.png'),
  },
  {
    foodname: '도다리',
    src: require('../../Ingredients/103.png'),
  },
  {
    foodname: '동태',
    src: require('../../Ingredients/104.png'),
  },
  {
    foodname: '멸치',
    src: require('../../Ingredients/105.png'),
  },
  {
    foodname: '명태',
    src: require('../../Ingredients/106.png'),
  },
  {
    foodname: '문어',
    src: require('../../Ingredients/107.png'),
  },
  {
    foodname: '미역',
    src: require('../../Ingredients/108.png'),
  },
  {
    foodname: '바지락',
    src: require('../../Ingredients/109.png'),
  },
  {
    foodname: '새우',
    src: require('../../Ingredients/110.png'),
  },
  {
    foodname: '소라',
    src: require('../../Ingredients/111.png'),
  },
  {
    foodname: '아귀',
    src: require('../../Ingredients/112.png'),
  },
  {
    foodname: '어묵',
    src: require('../../Ingredients/113.png'),
  },
  {
    foodname: '연어',
    src: require('../../Ingredients/114.png'),
  },
  {
    foodname: '오징어',
    src: require('../../Ingredients/115.png'),
  },
  {
    foodname: '전복',
    src: require('../../Ingredients/116.png'),
  },
  {
    foodname: '전어',
    src: require('../../Ingredients/117.png'),
  },
  {
    foodname: '조개',
    src: require('../../Ingredients/118.png'),
  },
  {
    foodname: '조기',
    src: require('../../Ingredients/119.png'),
  },
  {
    foodname: '진미오징어',
    src: require('../../Ingredients/120.png'),
  },
  {
    foodname: '쭈꾸미',
    src: require('../../Ingredients/121.png'),
  },
  {
    foodname: '홍합',
    src: require('../../Ingredients/122.png'),
  },
  {
    foodname: '미트볼',
    src: require('../../Ingredients/123.png'),
  },
  {
    foodname: '베이컨',
    src: require('../../Ingredients/124.png'),
  },
  {
    foodname: '비엔나소시지',
    src: require('../../Ingredients/125.png'),
  },
  {
    foodname: '소시지',
    src: require('../../Ingredients/126.png'),
  },
  {
    foodname: '순대',
    src: require('../../Ingredients/127.png'),
  },
  {
    foodname: '스팸',
    src: require('../../Ingredients/128.png'),
  },
  {
    foodname: '햄',
    src: require('../../Ingredients/129.png'),
  },
  {
    foodname: '간장',
    src: require('../../Ingredients/130.png'),
  },
  {
    foodname: '고추장',
    src: require('../../Ingredients/131.png'),
  },
  {
    foodname: '고춧가루',
    src: require('../../Ingredients/132.png'),
  },
  {
    foodname: '굴소스',
    src: require('../../Ingredients/133.png'),
  },
  {
    foodname: '굵은소금',
    src: require('../../Ingredients/134.png'),
  },
  {
    foodname: '까나리액젓',
    src: require('../../Ingredients/135.png'),
  },
  {
    foodname: '깨소금',
    src: require('../../Ingredients/136.png'),
  },
  {
    foodname: '꿀',
    src: require('../../Ingredients/137.png'),
  },
  {
    foodname: '다진마늘',
    src: require('../../Ingredients/138.png'),
  },
  {
    foodname: '데리야끼소스',
    src: require('../../Ingredients/139.png'),
  },
  {
    foodname: '돈까스소스',
    src: require('../../Ingredients/140.png'),
  },
  {
    foodname: '된장',
    src: require('../../Ingredients/141.png'),
  },
  {
    foodname: '마요네즈',
    src: require('../../Ingredients/142.png'),
  },
  {
    foodname: '머스타드소스',
    src: require('../../Ingredients/143.png'),
  },
  {
    foodname: '멸치액젓',
    src: require('../../Ingredients/144.png'),
  },
  {
    foodname: '명란젓갈',
    src: require('../../Ingredients/145.png'),
  },
  {
    foodname: '물엿',
    src: require('../../Ingredients/146.png'),
  },
  {
    foodname: '미원',
    src: require('../../Ingredients/147.png'),
  },
  {
    foodname: '버터',
    src: require('../../Ingredients/148.png'),
  },
  {
    foodname: '설탕',
    src: require('../../Ingredients/149.png'),
  },
  {
    foodname: '소금',
    src: require('../../Ingredients/150.png'),
  },
  {
    foodname: '쇠고기다시다',
    src: require('../../Ingredients/151.png'),
  },
  {
    foodname: '식총',
    src: require('../../Ingredients/152.png'),
  },
  {
    foodname: '쌈장',
    src: require('../../Ingredients/153.png'),
  },
  {
    foodname: '오징어젓갈',
    src: require('../../Ingredients/154.png'),
  },
  {
    foodname: '올리고당',
    src: require('../../Ingredients/155.png'),
  },
  {
    foodname: '올리브유',
    src: require('../../Ingredients/156.png'),
  },
  {
    foodname: '짜장가루',
    src: require('../../Ingredients/157.png'),
  },
  {
    foodname: '참기름',
    src: require('../../Ingredients/158.png'),
  },
  {
    foodname: '청국장',
    src: require('../../Ingredients/159.png'),
  },
  {
    foodname: '초고추장',
    src: require('../../Ingredients/160.png'),
  },
  {
    foodname: '춘장',
    src: require('../../Ingredients/161.png'),
  },
  {
    foodname: '칠리소스',
    src: require('../../Ingredients/162.png'),
  },
  {
    foodname: '카레가루',
    src: require('../../Ingredients/163.png'),
  },
  {
    foodname: '케첩',
    src: require('../../Ingredients/164.png'),
  },
  {
    foodname: '토마토소스',
    src: require('../../Ingredients/165.png'),
  },
  {
    foodname: '핫소스',
    src: require('../../Ingredients/166.png'),
  },
  {
    foodname: '후추',
    src: require('../../Ingredients/167.png'),
  },
];

function IngredientComponent({food_name}) {
  if (
    food_name !== '' &&
    icons.find(element => element.foodname === food_name) === undefined
  ) {
    return (
      <View>
        <TouchableOpacity style={styles.iconButton}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{...styles.icon}}
              source={require('../../Ingredients/mystery.png')}
            />
            <Image
              style={{position: 'absolute', right: 0}}
              source={require('../../Ingredients/addButton.png')}
            />
          </View>
          <Text style={styles.iconText}>{food_name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const iconlist = icons.map(icon =>
    food_name === icon.foodname ? (
      <View>
        <TouchableOpacity style={styles.iconButton}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.icon} source={icon.src} />
            <Image
              style={{position: 'absolute', right: 0}}
              source={require('../../Ingredients/addButton.png')}
            />
          </View>

          <Text style={styles.iconText}>{icon.foodname}</Text>
        </TouchableOpacity>
      </View>
    ) : null,
  );
  return <View>{iconlist}</View>;
}

const styles = StyleSheet.create({
  icon: {
    height: Height * 0.06,
    width: Width * 0.13,
    // marginRight: Width * 0.05,
    marginTop: Height * 0.01,
    resizeMode: 'stretch',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    width: Width * 0.13,
    fontSize: 12,
    // backgroundColor: 'blue',
    textAlign: 'center',
  },
  iconButton: {
    // marginRight: Width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    width: Width * 0.18,
    marginBottom: Height * 0.02,
    marginTop: Height * 0.01,
  },
});

export default IngredientComponent;
