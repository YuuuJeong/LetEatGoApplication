import React, { useReducer, useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import RNPickerSelect from "react-native-picker-select";
import LinearGradient from "react-native-linear-gradient";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal,
  ScrollView,
  Platform,
} from "react-native";

function Register() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [sex, setSex] = useState(false);
  const [contact, setContact] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const placeholder = {
    label: "성별을 선택해주세요",
    value: null,
  };

  async function handleSubmitButton(
    userId,
    userPassword,
    userPasswordCheck,
    nickname,
    sex,
    contact
  ) {
    setErrortext("");
    if (!userId) {
      alert("아이디를 입력해주세요 .");
      return;
    }
    if (!userPassword) {
      alert("비밀번호를 입력해주세요 .");
      return;
    }
    if (!userPasswordCheck) {
      alert("비밀번호 확인을 입력해주세요 .");
      return;
    }
    if (!nickname) {
      alert("닉네임을 입력해주세요 .");
      return;
    }
    if (!sex) {
      alert("성별을 입력해주세요 .");
      return;
    }
    if (!contact) {
      alert("연락처를 입력해주세요 .");
      return;
    }
  }

  return (
    <LinearGradient colors={["#FFCDD2", "#FFAAB3"]} style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Image
            source={require("../../android/app/assets/imgs/Register_logo.png")}
            style={{ width: wp(30), resizeMode: "contain" }}
          />
        </View>
        <View style={styles.textArea}>
          <Text style={styles.Text}>회원가입하여 나만의 레시피 공간</Text>
          <Text style={styles.Text}>입맛춤을 사용해보세요 🍖</Text>
        </View>
      </View>
      <View style={styles.formArea}>
        <TextInput
          placeholder="아이디(5자 이상, 영문, 숫자 포함)"
          style={styles.formAreaTop}
          onChangeText={(userId) => setUserId(userId)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="비밀번호(8자 이상)"
          secureTextEntry={true}
          style={styles.formAreaMiddle}
          onChangeText={(userPassword) => setUserPassword(userPassword)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="비밀번호 확인"
          secureTextEntry={true}
          style={styles.formAreaBottom}
          onChangeText={(userPasswordCheck) =>
            setUserPasswordCheck(userPasswordCheck)
          }
          autoCapitalize="none"
        />
      </View>
      <View
        style={{
          flex: 0.03,
          justifyContent: "flex-start",
          // backgroundColor: "blue",
          marginBottom: wp("2%"),
        }}
      >
        {userPassword !== userPasswordCheck ? (
          <Text style={styles.textValidation}>
            비밀번호가 일치하지 않습니다 .
          </Text>
        ) : null}
      </View>

      <View style={styles.formArea2}>
        <TextInput
          placeholder="닉네임"
          style={styles.formAreaTop}
          onChangeText={(nickname) => setNickname(nickname)}
          autoCapitalize="none"
        />
        {/* <RNPickerSelect
          style={pickerSelectStyles}
          fixAndroidTouchableBug={true}
          useNativeAndroidPickerStyle={false}
          items={[
            { label: "남", value: 1 },
            { label: "여", value: 2 },
          ]}
        /> */}

        <TextInput
          placeholder="성별"
          style={styles.formAreaMiddle}
          onChangeText={(sex) => setSex(sex)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="연락처 ex)01012345678"
          style={styles.formAreaBottom}
          onChangeText={(contact) => setContact(contact)}
          autoCapitalize="none"
        />
      </View>
      <View style={{ flex: 0.2 }}>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              handleSubmitButton(
                userId,
                userPassword,
                userPasswordCheck,
                nickname,
                sex,
                contact
              )
            }
          >
            <Text style={{ color: "white", fontSize: wp(4) }}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: wp(7),
    paddingRight: wp(7),
    paddingTop: wp(10),
  },
  topArea: {
    flex: 0.3,
    paddingTop: wp(5),
  },
  titleArea: {
    flex: 0.6,
    justifyContent: "center",
  },
  textArea: {
    flex: 0.4,
    justifyContent: "center",
  },
  Text: {
    fontSize: wp(4),
  },
  formArea: {
    flex: 0.24,
    padding: 0,
  },
  formArea2: {
    flex: 0.24,
  },
  formAreaTop: {
    borderWidth: 2,
    borderColor: "black",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomWidth: 1,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  formAreaMiddle: {
    borderWidth: 2,
    borderColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  formAreaBottom: {
    borderWidth: 2,
    borderColor: "black",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopWidth: 1,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  btnArea: {
    height: hp(8),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btn: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 5,
  },
  textValidation: {
    fontSize: wp("4%"),
    color: "red",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: "black",
    width: "100%",
    paddingLeft: 10,
  },
  inputAndroid: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: "black",
    width: "100%",
    paddingLeft: 10,
  },
});
