import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Share,
  FlatList,
  Alert,
  Linking,
  ActivityIndicator
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  useTheme,
  useFocusEffect,
  useIsFocused
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Platform } from "react-native";
import { KEYS, useAsyncStorage } from "../hooks/asyncStorage";
import * as Analytics from "expo-firebase-analytics";
import Ad from "./Ad";

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";
  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  ];
  var d = this;
  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      case "E":
        return weekName[d.getDay()];
      case "HH":
        return d.getHours().zf(2);
      case "hh":
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm":
        return d.getMinutes().zf(2);
      case "ss":
        return d.getSeconds().zf(2);
      case "a/p":
        return d.getHours() < 12 ? "오전" : "오후";
      default:
        return $1;
    }
  });
};
String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};
/* 출처: https://stove99.tistory.com/46 [스토브 훌로구] */

export default function GeupsikScreen({ navigation }) {
  const [schoolName, setSchoolName] = useState("");
  const isFocused = useIsFocused();
  useEffect(() => {
    Analytics.logEvent("geupsikScreenEnter");
  }, []);
  const loading = {
    beforeLoading: "BEFORE_LOADING",
    loading: "LOADING",
    loaded: "LOADED",
    error: "ERROR"
  };
  const [apiLoadingState, setApiLoadingState] = useState(loading.beforeLoading);
  const colors = useTheme();
  const [data, setData] = useState(["급식을 가져오고 있어요."]);
  const [schoolCode, setSchoolCode] = useState("7031159");
  const [officeCode, setOfficeCode] = useState("B09");
  const [allergy, setAllergy] = useState("");
  const [date, setDate] = useState(new Date());
  const [text, onChangeText] = useState(
    date.format("MM월 dd일(E)").replace("요일", "")
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const schoolNameAS = useAsyncStorage(KEYS.SCHOOL_NAME, isFocused);
  useEffect(() => {
    //navigation.setOptions({ headerTitle: `급식 - ${schoolNameAS.state}` });
    navigation.setOptions({
      header: (props) => (
        <View>
          <View style={{ marginTop: 10 }}>
            <Ad />
          </View>
          <View style={styles.rowContainer}>
            <Pressable
              style={[
                styles.button,
                { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
              ]}
              onPress={seeYesterdayGeupsik}
            >
              <Icon
                name="keyboard-arrow-left"
                size={20}
                color={colors.colors.text}
              />
            </Pressable>
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                pointerEvents="none"
                style={styles.textInput}
                placeholderTextColor="#000000"
                underlineColorAndroid="transparent"
                editable={false}
                value={text}
              />
            </TouchableOpacity>
            <Pressable
              style={[
                styles.button,
                { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
              ]}
              onPress={seeTomorrowGeupsik}
            >
              <Icon
                name="keyboard-arrow-right"
                size={20}
                color={colors.colors.text}
              />
            </Pressable>
          </View>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#f4511e"
      }
    });
  }, [text]);

  const loadingSpinnerTop =
    (Platform.OS === "ios" && 20) || (Platform.OS === "android" && 5) || 5;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    hideDatePicker();
    if (date.type === "set") {
      setDate(date.nativeEvent.timestamp);
      onChangeText(
        date.nativeEvent.timestamp.format("MM월 dd일(E)").replace("요일", "")
      );
    } else {
    }
  };
  const seeYesterdayGeupsik = () => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );
    setDate(newDate);
    onChangeText(newDate.format("MM월 dd일(E)").replace("요일", ""));
  };
  const seeTomorrowGeupsik = () => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    setDate(newDate);
    onChangeText(newDate.format("MM월 dd일(E)").replace("요일", ""));
  };
  function notLaunchedToday() {
    fetch("https://geupsikapp.azurewebsites.net/newuser").catch((error) => {
      console.log(error);
    });
    launchedTodayAS.setValue(new Date().toString());
  }
  const onShare = async () => {
    Analytics.logEvent("GeupsikShare");
    try {
      await Share.share({
        message: `${date.format(
          "MM월 dd일 E"
        )} 급식: \n${data}\nhttps://mealtime.page.link/downloads`
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const schoolCodeAS = useAsyncStorage(KEYS.SCHOOL_CODE, isFocused);
  useEffect(() => {
    if (!schoolCodeAS.isLoading) {
      if (schoolCodeAS.state) {
        setSchoolCode(schoolCodeAS.state * 1);
      } else {
        navigation.navigate("first-launch");
      }
    }
  }, [schoolCodeAS.isLoading, schoolCodeAS.state, isFocused]);
  const hasLaunchedAS = useAsyncStorage(KEYS.HAS_LAUNCHED);
  useEffect(() => {
    if (!hasLaunchedAS.isLoading && hasLaunchedAS.state !== "true") {
      hasLaunchedAS.setValue("true");
      navigation.navigate("first-launch");
    }
  }, [hasLaunchedAS.isLoading, hasLaunchedAS.state, text, schoolCode]);
  const launchedTodayAS = useAsyncStorage(KEYS.LAUNCHED_TODAY);
  useEffect(() => {
    if (!launchedTodayAS.isLoading) {
      const dateFromStorage = new Date(launchedTodayAS.state);
      const date = new Date();
      if (launchedTodayAS.state === null) {
        notLaunchedToday();
      } else if (
        date.getFullYear().toString() +
          date.getMonth().toString() +
          date.getDate().toString() !==
        dateFromStorage.getFullYear().toString() +
          dateFromStorage.getMonth().toString() +
          dateFromStorage.getDate().toString()
      ) {
        notLaunchedToday();
      }
    }
  }, [launchedTodayAS.isLoading, launchedTodayAS.state]);

  const officeCodeAS = useAsyncStorage(KEYS.OFFICE_CODE, isFocused);
  useEffect(() => {
    if (!officeCodeAS.isLoading) {
      setOfficeCode(officeCodeAS.state);
    }
  }, [officeCodeAS.isLoading, officeCodeAS.state, isFocused]);
  const allergyAS = useAsyncStorage(KEYS.ALLERGY, text);
  useEffect(() => {
    if (!allergyAS.isLoading) {
      setAllergy(allergyAS.state);
    }
  }, [allergyAS.isLoading, allergyAS.state]);

  const Item = ({ menu }) => (
    <TouchableOpacity
      onLongPress={() => {
        if (menu !== "등록된 급식이 없어요.") {
          Alert.alert(
            "이 음식이 뭐지?",
            menu.replace("⚠️", "") + "을(를) 검색할까요?",
            [
              {
                text: "취소",
                style: "cancel"
              },
              {
                text: "검색",
                onPress: () =>
                  Linking.openURL(
                    "https://www.google.com/search?q=" + menu.replace("⚠️", "")
                  ),
                style: "default"
              }
            ],
            {
              cancelable: true
            }
          );
        }
      }}
      activeOpacity={0.8}
    >
      <View>
        <Text style={styles.title}>
          {menu.includes("⚠️") ? (
            <Text style={{ color: colors.colors.error }}>{menu}</Text>
          ) : (
            menu
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item menu={item} />;

  useEffect(() => {
    getGeupsik();
  }, [text, officeCode, allergy, schoolCode]);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1
    },
    buttonText: {
      fontWeight: "bold",
      color: colors.colors.text
    },
    rowContainer: {
      flexDirection: "row",
      marginTop: 15,
      alignSelf: "center",
      //borderBottomWidth: 1,
      borderBottomColor: colors.colors.border,
      width: "100%",
      alignContent: "center",
      justifyContent: "center",
      paddingBottom: 15
    },
    title: {
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      color: colors.colors.text,
      alignContent: "center"
    },
    textInput: {
      fontSize: 16,
      height: 50,
      width: 150,
      alignItems: "center",
      alignContent: "center",
      borderWidth: 1,
      borderRadius: 12,
      color: colors.colors.text,
      padding: 10,
      borderColor: colors.colors.border,
      textAlign: "center",
      backgroundColor: colors.colors.background,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    button: {
      justifyContent: "center",
      borderRadius: 12,
      borderWidth: 1,
      width: 50,
      alignItems: "center",
      marginHorizontal: 0,
      borderColor: colors.colors.border,
      backgroundColor: colors.colors.background,
      height: 50
    },
    shareButton: {
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      borderRadius: 100,
      backgroundColor: colors.colors.primary,
      position: "absolute",
      bottom: 10,
      right: 10
    }
  });

  return (
    <View style={styles.container}>
      {isDatePickerVisible && Platform.OS != "ios" && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleConfirm}
        />
      )}
      <View
        style={{
          width: "80%",
          backgroundColor: colors.colors.background,
          position: "absolute",
          top: 0,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: colors.colors.border,
          borderRadius: 20,
          paddingVertical: 40,
          paddingHorizontal: 11
        }}
      >
        <FlatList
          style={{}}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
        <ActivityIndicator
          style={{
            position: "absolute",
            right: 5,
            top: loadingSpinnerTop,
            alignItems: "center",
            justifyContent: "center"
          }}
          color={
            (apiLoadingState === loading.error && colors.colors.error) ||
            "#999999"
          }
          size="large"
          animating={
            (apiLoadingState === loading.loaded && false) ||
            (apiLoadingState === loading.loading && true) ||
            (apiLoadingState === loading.beforeLoading && true) ||
            (apiLoadingState === loading.error && true)
          }
        />
      </View>
      <Pressable onPress={onShare} style={styles.shareButton}>
        <Icon name="share" size={22} color={"#FFF"} />
      </Pressable>
    </View>
  );

  function getGeupsik() {
    if (apiLoadingState === loading.beforeLoading) {
      setData(["로딩 중이에요."]);
    }
    const url = `https://mealtimeapi.sungho-moon.workers.dev/hub/mealServiceDietInfo?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${date.format(
      "yyyyMMdd"
    )}`;
    setApiLoadingState(loading.loading);
    setData(["로딩 중이에요."]);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!("mealServiceDietInfo" in json)) {
          setApiLoadingState(loading.loaded);
          setData(["등록된 급식이 없어요."]);
        } else {
          // navigation.setOptions({
          //   headerTitle: `급식 - ${json.mealServiceDietInfo[1].row[0].SCHUL_NM}`
          // });
          let meal =
            json.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>").join(
              "\n"
            );
          let menus = meal.split("\n");
          let n = 0;
          while (n < menus.length) {
            if (allergy) {
              if (menus[n].split(" ")[2].includes(allergy + ".")) {
                meal = meal.replace(menus[n], `${menus[n]}⚠️`);
              }
            }
            n = n + 1;
          }
          meal = meal.replace(/[0-9]/g, ""); // 불필요한 숫자 제거
          meal = meal.replace(/[a-z]/g, ""); // 불필요한 문자 제거
          meal = meal.replace(/[A-Z]/g, ""); // 불필요한 문자 제거
          meal = meal.replace(/\./g, ""); // 불필요한 마침표 제거
          meal = meal.replace(/[()]/g, ""); // 불필요한 괄호 제거
          meal = meal.replace(/[ ]/g, ""); // 불필요한 공백 제거
          meal = meal.replace(/#/g, ""); // 불필요한 # 제거
          meal = meal.replace(/-/g, ""); // 불필요한 - 제거
          meal = meal.replace(/\*/g, ""); // 불필요한 * 제거
          setData(meal.split("\n"));
          setApiLoadingState(loading.loaded);
        }
      })
      .catch((error) => {
        setApiLoadingState(loading.error);
        console.log(error);
      });
  }
}
