import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import Topbar from '../Bar/Topbar';
import MbtiSurveyComponent from './MbtiSurveyComponent';

function MbtiSurvey({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <MbtiSurveyComponent text={'식사를 하면서 대화하는 것을 좋아한다.'} />
        <MbtiSurveyComponent text={'운동을 규칙적으로 하는 편이다.'} />
        <MbtiSurveyComponent text={'나는 수면 시간이 규칙적이다.'} />
        <MbtiSurveyComponent text={'아침 식사는 꼭 먹는다.'} />
        <MbtiSurveyComponent text={'나는 맛집을 탐방하는 취미가 있다.'} />
      </ScrollView>
    </View>
  );
}

export default MbtiSurvey;
