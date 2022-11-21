import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import Topbar from '../Bar/Topbar';
import YoutubePlayer from 'react-native-youtube-iframe';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function RecipeTopArea({navigation, food_name}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [made, setMade] = useState(false);
  const [madeCount, setMadeCount] = useState(0);
  const [view, setView] = useState(174334);
  const [playing, setPlaying] = useState(true);
  const [videoName, setVideoName] = useState('');
  const [videoId, setVideoId] = useState('j7s9VRsrm9o');
  //    const [params, setParams] = useState({
  //     key: 'AIzaSyC5Ss_A2H0Z9kWdY21AcQawsWCJRvFPA3k',
  //     q: '제육볶음',
  //     type: 'video',
  //     maxResults: 3,
  //     part: 'snippet',
  //   });

  const params = {
    key: 'AIzaSyC5Ss_A2H0Z9kWdY21AcQawsWCJRvFPA3k',
    q: food_name,
    type: 'video',
    maxResults: 1,
    part: 'snippet',
  };

  axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';

  const findLink = useCallback(() => {
    axios
      .get('/search', {params})
      .then(response => {
        console.log(response.data.items[0].snippet.title);
        setVideoName(response.data.items[0].snippet.title);
        setVideoId(response.data.items[0].id.videoId);
        if (!response) {
          setError('검색된 영상이 없습니다');
          return;
        }
        // console.log(response.data.item)
      })
      .catch(err => {
        console.log('Hi');
        console.log(err);
      });
  }, [params]);

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
    findLink();
  }, []);

  return (
    <View style={{flex: 0.55, padding: 5}}>
      <View
        style={{
          flex: 0.8,
          // backgroundColor: 'red',
          // marginBottom: Height * 0.02,
          justifyContent: 'flex-end',
        }}>
        <YoutubePlayer height={Height * 0.3} play={playing} videoId={videoId} />
      </View>

      <View
        style={{
          flex: 0.3,
          //   marginTop: Height * 0.005,
        }}>
        <Text style={styles.text}>{videoName}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
            flex: 0.5,
            // backgroundColor: 'red',
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
              <Text style={styles.bottomButtonText2} onPress={() => onShare()}>
                공유하기
              </Text>
            </TouchableOpacity>
          </View>
          <Text>
            조회수{' '}
            {view.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}회
          </Text>
        </View>
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
    fontSize: 15,
    fontWeight: '900',
    padding: 5,
    flex: 1,
    // marginBottom: Height * 0.02,
    // backgroundColor: 'red',
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

export default RecipeTopArea;