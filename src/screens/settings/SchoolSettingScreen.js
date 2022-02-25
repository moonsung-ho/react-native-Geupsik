import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  AsyncStorage,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";

export default function SchoolSettingScreen() {
  const colors = useTheme();
  const Item = ({ title, address, schoolCode, officeCode }) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          selectSchool([schoolCode, officeCode, title]);
        }}
      >
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>({address})</Text>
        <Text style={styles.text}>{""}</Text>
      </TouchableOpacity>
    </View>
  );
  const [message, setMessage] = useState("");
  const [data, setData] = useState();

  function selectSchool([schoolCode, officeCode, schoolName]) {
    AsyncStorage.setItem("schoolcode", schoolCode);
    AsyncStorage.setItem("officecode", officeCode);
    AsyncStorage.setItem("schoolname", schoolName);
    Alert.alert("선택되었습니다.", schoolName);
  }

  const renderItem = ({ item }) => (
    <Item
      title={item.SCHUL_NM}
      address={item.ORG_RDNMA}
      schoolCode={item.SD_SCHUL_CODE}
      officeCode={item.ATPT_OFCDC_SC_CODE}
    />
  );

  function searchSchool(value) {
    fetch(
      `https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${value}&Type=json&KEY=a9a5367947564a1aa13e46ba545de634`
    )
      .then((res) => res.json())
      .then((json) => {
        let dataTotalCount = json.schoolInfo[0].head[0].list_total_count;
        let dataCandidate = new Array();
        if (dataTotalCount <= 1) {
          dataCandidate = dataCandidate.concat(json.schoolInfo[1].row[0]);
        } else {
          let n = 0;
          while (n < dataTotalCount - 1) {
            dataCandidate = dataCandidate.concat(json.schoolInfo[1].row[n]);
            n++;
          }
        }
        setData(dataCandidate);
        setMessage("");
      })
      .catch((err) => {
        setMessage("에러가 발생했습니다.\n다시 검색해 주세요.\n" + err);
      });
  }
  const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      alignItems: "center"
    },
    input: {
      height: 40,
      width: 250,
      marginTop: 30,
      borderColor: colors.colors.border,
      borderWidth: 1,
      color: colors.colors.text,
      padding: 10,
      borderRadius: 10
    },
    text: {
      color: colors.colors.text
    },
    toptext: {
      marginLeft: 30,
      marginTop: 50
    },
    divider: {
      marginTop: 30
    },
    error: {
      color: "tomato"
    }
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="학교 검색"
        onSubmitEditing={(event) => searchSchool(event.nativeEvent.text)}
        placeholderTextColor={colors.colors.border}
      />
      <Text style={styles.error}>{message}</Text>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}
