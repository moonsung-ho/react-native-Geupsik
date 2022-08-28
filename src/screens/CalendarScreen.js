import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  TextInput,
  Share,
  Platform,
  ActivityIndicator
} from "react-native";
import { KEYS, useAsyncStorage } from "../hooks/asyncStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ad from "./Ad";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Analytics from "expo-firebase-analytics";
import * as React from "react";

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

export default function CalendarScreen({ navigation }) {
  useEffect(() => {
    Analytics.logEvent("calendarScreenEnter");
  }, []);

  const loading = {
    beforeLoading: "BEFORE_LOADING",
    loading: "LOADING",
    loaded: "LOADED",
    error: "ERROR"
  };
  const [apiLoadingState, setApiLoadingState] = useState(loading.beforeLoading);
  const [calendar, setCalendar] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [schoolCode, setSchoolCode] = useState();
  const [officeCode, setOfficeCode] = useState();
  const [schoolForm, setSchoolForm] = useState("");
  const [date, setDate] = useState(new Date());
  const [grade, setGrade] = useState();
  const [classN, setClassN] = useState();
  const [text, onChangeText] = useState(
    date.format("yyyy/MM/dd(E)").replace("요일", "")
  );

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
        date.nativeEvent.timestamp.format("yyyy/MM/dd(E)").replace("요일", "")
      );
    } else {
    }
  };

  const onShare = async () => {
    Analytics.logEvent("CalendarShare");
    try {
      await Share.share({
        message: `${date.format("yyyy년 MM월 dd일")} 시간표: ${calendar.map(
          (object) => {
            return object.subject;
          }
        )}`
      });
    } catch (error) {
      alert("에러가 발생했습니다." + error.message);
    }
  };

  const colors = useTheme();

  const schoolCodeAS = useAsyncStorage(KEYS.SCHOOL_CODE, text);
  useEffect(() => {
    if (!schoolCodeAS.isLoading) {
      setSchoolCode(schoolCodeAS.state * 1);
    }
  }, [schoolCodeAS.isLoading, schoolCodeAS.state, text]);
  const gradeAS = useAsyncStorage(KEYS.GRADE, text);
  useEffect(() => {
    if (!gradeAS.isLoading) {
      setGrade(gradeAS.state * 1);
    }
  }, [gradeAS.isLoading, gradeAS.state, text]);
  const classAS = useAsyncStorage(KEYS.CLASS, text);
  useEffect(() => {
    if (!classAS.isLoading) {
      setClassN(classAS.state * 1);
      if (classAS.state === "undefined") {
        navigation.navigate("에러");
      }
    }
  }, [classAS.isLoading, classAS.state, text]);
  const officeCodeAS = useAsyncStorage(KEYS.OFFICE_CODE, text);
  useEffect(() => {
    if (!officeCodeAS.isLoading) {
      setOfficeCode(officeCodeAS.state);
    }
  }, [officeCodeAS.isLoading, officeCodeAS.state, text]);
  const schoolFormAS = useAsyncStorage(KEYS.SCHOOL_FORM, text);
  useEffect(() => {
    if (!schoolFormAS.isLoading) {
      if (schoolFormAS.state === "초등학교") {
        setSchoolForm("els");
      } else if (schoolFormAS.state === "중학교") {
        setSchoolForm("mis");
      } else if (schoolFormAS.state === "고등학교") {
        setSchoolForm("his");
      }
      getCalendar();
    }
  }, [schoolFormAS.isLoading, schoolFormAS.state, text]);

  useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <View style={styles.rowContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              const newDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() - 1
              );
              setDate(newDate);
              onChangeText(newDate.format("yyyy/MM/dd(E)").replace("요일", ""));
            }}
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
            style={styles.button}
            onPress={() => {
              const newDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 1
              );
              setDate(newDate);
              onChangeText(newDate.format("yyyy/MM/dd(E)").replace("요일", ""));
            }}
          >
            <Icon
              name="keyboard-arrow-right"
              size={20}
              color={colors.colors.text}
            />
          </Pressable>
        </View>
      )
    });
  }, [text]);

  const Item = ({ menu }) => (
    <View>
      <Text style={styles.title}>{menu.subject}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item menu={item} />;
  const styles = StyleSheet.create({
    view: { alignItems: "center", flex: 1 },
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
      ...Platform.select({
        ios: {
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 7
        },
        android: { elevation: 10 }
      }),
      backgroundColor: colors.colors.background
    },
    button: {
      justifyContent: "center",
      borderRadius: 12,
      borderWidth: 1,
      width: 50,
      alignItems: "center",
      marginHorizontal: 20,
      borderColor: colors.colors.border,
      ...Platform.select({
        ios: {
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 7
        },
        android: { elevation: 10 }
      }),
      backgroundColor: colors.colors.background
    },
    buttonText: {
      fontWeight: "bold",
      color: colors.colors.text
    },
    title: {
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      color: colors.colors.text,
      alignContent: "center"
    },
    rowContainer: {
      flexDirection: "row",
      marginTop: 50,
      //borderBottomWidth: 1,
      borderBottomColor: colors.colors.border,
      width: "100%",
      paddingBottom: 15,
      justifyContent: "center"
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
      bottom: 70,
      right: 10,
      ...Platform.select({
        ios: {
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 7
        },
        android: { elevation: 10 }
      })
    }
  });
  useEffect(() => {
    getCalendar();
  }, [schoolForm, classN, grade, text]);

  return (
    <View style={styles.view}>
      <View
        style={{
          ...Platform.select({
            ios: {
              shadowColor: "grey",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.6,
              shadowRadius: 7
            },
            android: { elevation: 10 }
          }),
          width: "80%",
          backgroundColor: colors.colors.background,
          marginTop: 70,
          borderRadius: 20,
          paddingVertical: 40,
          paddingHorizontal: 11
        }}
      >
        <FlatList
          style={{}}
          data={calendar}
          renderItem={renderItem}
          keyExtractor={(item) => item.period}
        />
      </View>
      {isDatePickerVisible && Platform.OS != "ios" && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleConfirm}
        />
      )}

      <Pressable onPress={onShare} style={styles.shareButton}>
        <Icon name="share" size={22} color={"#FFF"} />
      </Pressable>
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
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <Ad />
      </View>
    </View>
  );

  function getCalendar() {
    if (apiLoadingState === loading.beforeLoading) {
      setCalendar([{ subject: "로딩 중입니다.", period: "1" }]);
    }
    setApiLoadingState(loading.loading);
    setCalendar([{ subject: "로딩 중입니다.", period: "1" }]);
    fetch(
      `https://open.neis.go.kr/hub/${schoolForm}Timetable?type=json&key=4c1690204c08404ca7f1775720f17054&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&ALL_TI_YMD=${date.format(
        "yyyyMMdd"
      )}&GRADE=${grade}&CLASS_NM=${classN}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (JSON.stringify(json).includes("Timetable")) {
          let n = 0;
          let calendar = new Array();
          if (schoolForm === "els") {
            while (n < json.elsTimetable[0].head[0].list_total_count * 1) {
              let subject = json.elsTimetable[1].row[n].ITRT_CNTNT;
              if (subject.includes("음악")) {
                subject = subject + "🎼";
              }
              if (subject.includes("수학")) {
                subject = subject + "🧮";
              }
              if (subject.includes("영어")) {
                subject = subject + "🔠";
              }
              if (subject.includes("과학")) {
                subject = subject + "🧪";
              }
              if (subject.includes("국어")) {
                subject = subject + "📚";
              }
              if (subject.includes("실과")) {
                subject = subject + "🪡";
              }
              if (subject.includes("도덕")) {
                subject = subject + "😇";
              }
              if (subject.includes("체육")) {
                subject = subject + "💪";
              }
              if (subject.includes("자율활동")) {
                subject = subject + "🆓";
              }
              if (subject.includes("미술")) {
                subject = subject + "🎨";
              }
              if (subject.includes("사회")) {
                subject = subject + "🏬";
              }
              calendar = calendar.concat({
                subject: subject,
                period: json.elsTimetable[1].row[n].PERIO
              });
              n++;
            }
          } else if (schoolForm === "mis") {
            while (n < json.misTimetable[0].head[0].list_total_count * 1) {
              let subject = json.misTimetable[1].row[n].ITRT_CNTNT;
              if (subject.includes("음악")) {
                subject = subject + "🎼";
              }
              if (subject.includes("수학")) {
                subject = subject + "🧮";
              }
              if (subject.includes("영어")) {
                subject = subject + "🔠";
              }
              if (subject.includes("과학")) {
                subject = subject + "🧪";
              }
              if (subject.includes("국어")) {
                subject = subject + "📚";
              }
              if (subject.includes("도덕")) {
                subject = subject + "😇";
              }
              if (subject.includes("체육")) {
                subject = subject + "💪";
              }
              if (subject.includes("자율활동")) {
                subject = subject + "🆓";
              }
              if (subject.includes("미술")) {
                subject = subject + "🎨";
              }
              if (subject.includes("사회")) {
                subject = subject + "🏬";
              }
              if (subject.includes("역사")) {
                subject = subject + "📜";
              }
              if (subject.includes("기술")) {
                subject = subject + "📡";
              }
              calendar = calendar.concat({
                subject: subject,
                period: json.misTimetable[1].row[n].PERIO
              });
              n++;
            }
          } else if (schoolForm === "his") {
            while (n < json.hisTimetable[0].head[0].list_total_count * 1) {
              let subject = json.hisTimetable[1].row[n].ITRT_CNTNT;
              if (subject.includes("음악")) {
                subject = subject + "🎼";
              }
              if (subject.includes("수학")) {
                subject = subject + "𝔁";
              }
              if (subject.includes("영어")) {
                subject = subject + "📃";
              }
              if (subject.includes("과학")) {
                subject = subject + "🧪";
              }
              if (subject.includes("물리학")) {
                subject = subject + "🧪";
              }
              if (subject.includes("화학")) {
                subject = subject + "🧪";
              }
              if (subject.includes("문학")) {
                subject = subject + "📖";
              }
              if (subject.includes("운동")) {
                subject = subject + "💪";
              }
              if (subject.includes("진로")) {
                subject = subject + "🧐";
              }
              if (subject.includes("확률")) {
                subject = subject + "📊";
              }
              if (subject.includes("미술")) {
                subject = subject + "🎨";
              }
              if (subject.includes("지리")) {
                subject = subject + "🗺";
              }
              if (subject.includes("윤리")) {
                subject = subject + "😇";
              }
              if (subject.includes("사회")) {
                subject = subject + "🏬";
              }
              calendar = calendar.concat({
                subject: subject,
                period: json.hisTimetable[1].row[n].PERIO
              });
              n++;
            }
          }
          setApiLoadingState(loading.loaded);
          setCalendar(calendar);
        } else {
          setApiLoadingState(loading.loaded);
          setCalendar([{ subject: "수업이 없는 날입니다.", period: "1" }]);
        }
      })
      .catch((error) => {
        console.warn(error);
        setApiLoadingState(loading.error);
      });
  }
}
