import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
  Alert
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { Platform } from "react-native";

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

export default function GeupsikScreen() {
  const colors = useTheme();
  const [meal, setMeal] = useState("급식을 가져오는 중입니다.");
  const [date, setDate] = useState(new Date());
  const [schoolCode, setSchoolCode] = useState("7031159");
  const [officeCode, setOfficeCode] = useState("B09");
  const [text, onChangeText] = useState(date.format("yyyy/MM/dd"));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
      onChangeText(date.nativeEvent.timestamp.format("yyyy/MM/dd"));
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
    onChangeText(newDate.format("yyyy/MM/dd"));
  };
  const seeTomorrowGeupsik = () => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    setDate(newDate);
    onChangeText(newDate.format("yyyy/MM/dd"));
  };

  AsyncStorage.getItem("schoolcode", (err, result) => {
    setSchoolCode(result * 1);
  });
  AsyncStorage.getItem("officecode", (err, result) => {
    setOfficeCode(result);
  });

  const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=4c1690204c08404ca7f1775720f17054&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${date.format(
    "yyyyMMdd"
  )}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      if (!("mealServiceDietInfo" in json)) {
        setMeal("급식이 없는 날입니다.");
      } else {
        let meal =
          json.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>").join("\n");
        meal = meal.replace(/[0-9]/g, ""); // 불필요한 숫자 제거
        meal = meal.replace(/\./g, ""); // 불필요한 마침표 제거
        setMeal(meal);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  const styles = StyleSheet.create({
    container: {
      alignItems: "center"
    },
    buttonText: {
      fontWeight: "bold",
      color: colors.colors.text
    },
    rowContainer: {
      flexDirection: "row",
      marginTop: 40
    },
    title: {
      marginTop: 100,
      paddingVertical: 8,
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      color: colors.colors.text
    },
    textInput: {
      fontSize: 16,
      height: 50,
      width: "auto",
      alignItems: "center",
      alignContent: "center",
      borderWidth: 1,
      borderRadius: 12,
      color: colors.colors.text,
      padding: 10,
      borderColor: colors.colors.border
    },
    button: {
      padding: 5,
      borderRadius: 12,
      borderWidth: 1,
      width: 50,
      alignItems: "center",
      padding: 13,
      marginHorizontal: 20,
      borderColor: colors.colors.border
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Pressable style={styles.button} onPress={seeYesterdayGeupsik}>
          <Icon name="leftcircleo" size={20} color={colors.colors.text} />
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
        <Pressable style={styles.button} onPress={seeTomorrowGeupsik}>
          <Icon name="rightcircleo" size={20} color={colors.colors.text} />
        </Pressable>
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
      <Text style={styles.title}>{meal}</Text>
    </View>
  );
}
