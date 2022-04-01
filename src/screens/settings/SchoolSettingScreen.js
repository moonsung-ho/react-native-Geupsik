import { useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { KEYS, useAsyncStorage } from "../../hooks/asyncStorage";

const Item = ({
  title,
  address,
  schoolCode,
  officeCode,
  schoolForm,
  navigation,
  previousSchool
}) => {
  const colors = useTheme();
  const schoolCodeAS = useAsyncStorage(KEYS.SCHOOL_CODE);
  const officeCodeAS = useAsyncStorage(KEYS.OFFICE_CODE);
  const schoolNameAS = useAsyncStorage(KEYS.SCHOOL_NAME);
  const schoolFormAS = useAsyncStorage(KEYS.SCHOOL_FORM);
  const hasLaunchedAS = useAsyncStorage(KEYS.HAS_LAUNCHED);

  function selectSchool([
    schoolCode,
    officeCode,
    schoolName,
    schoolForm,
    previousSchool
  ]) {
    schoolCodeAS.setValue(schoolCode);
    officeCodeAS.setValue(officeCode);
    schoolNameAS.setValue(schoolName);
    schoolFormAS.setValue(schoolForm);

    // 학교를 설정하는 경우에 hasLaunched를 true로 설정합니다.
    // 학교를 설정한 경우에만 AppfirstLaunchScreen으로 이동하지 않습니다.
    hasLaunchedAS.setValue("true");

    Alert.alert("선택되었습니다.", schoolName);
    navigation.navigate("학년 & 반 설정", {
      schoolCode,
      schoolForm,
      previousSchool,
      officeCode
    });
  }

  const styles = StyleSheet.create({
    result: {
      borderBottomWidth: 1,
      borderColor: colors.colors.border,
      width: Dimensions.get("window").width,
      alignItems: "center",
      paddingVertical: 5
    },
    text: {
      color: colors.colors.text,
      textAlign: "center"
    }
  });

  return (
    <TouchableOpacity
      onPress={() => {
        selectSchool([
          schoolCode,
          officeCode,
          title,
          schoolForm,
          previousSchool
        ]);
      }}
    >
      <View style={styles.result}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>({address})</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function SchoolSettingScreen({ navigation }) {
  const colors = useTheme();
  const [previousSchoolCode, setPreviousSchoolCode] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState();
  const [input, setInput] = useState("");

  const schoolCodeAS = useAsyncStorage(KEYS.SCHOOL_CODE);
  useEffect(() => {
    if (!schoolCodeAS.isLoading) {
      setPreviousSchoolCode(schoolCodeAS.state);
    }
  }, []);

  const renderItem = ({ item }) => (
    <Item
      title={item.SCHUL_NM}
      address={item.ORG_RDNMA}
      schoolCode={item.SD_SCHUL_CODE}
      officeCode={item.ATPT_OFCDC_SC_CODE}
      schoolForm={item.SCHUL_KND_SC_NM}
      navigation={navigation}
      previousSchool={previousSchoolCode}
    />
  );

  function searchSchool(value) {
    fetch(
      `https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${value}&Type=json&KEY=a9a5367947564a1aa13e46ba545de634`
    )
      .then((res) => res.json())
      .then((json) => {
        let dataTotalCount =
          json.schoolInfo[0].head[0].list_total_count <= 100
            ? json.schoolInfo[0].head[0].list_total_count
            : 100;
        let dataCandidate = new Array();
        if (dataTotalCount <= 1) {
          dataCandidate = dataCandidate.concat(json.schoolInfo[1].row[0]);
        } else {
          let n = 0;
          while (n < dataTotalCount) {
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
      borderColor: colors.colors.border,
      borderWidth: 2,
      color: colors.colors.text,
      padding: 10,
      flex: 7,
      textAlign: "center",
      borderLeftWidth: 0
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
    },
    searchButton: {
      height: 40,
      flex: 1,
      borderWidth: 2,
      borderColor: colors.colors.border,
      borderLeftWidth: 0,
      alignItems: "center",
      justifyContent: "center"
    },
    searchButtonText: { color: colors.colors.text }
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          placeholder="학교 검색"
          onChangeText={(input) => setInput(input)}
          onSubmitEditing={(event) => searchSchool(event.nativeEvent.text)}
          placeholderTextColor={colors.colors.border}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => searchSchool(input)}
        >
          <Text style={styles.searchButtonText}>검색</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.SD_SCHUL_CODE}
      />
    </View>
  );
}
