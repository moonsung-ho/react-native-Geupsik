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
import { ActivityIndicator } from "react-native";

const Item = ({
  title,
  address,
  schoolCode,
  officeCode,
  schoolForm,
  navigation,
  schoolName,
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
    schoolNameAS.setValue(schoolName);
    schoolCodeAS.setValue(schoolCode);
    officeCodeAS.setValue(officeCode);
    schoolFormAS.setValue(schoolForm);
    // 학교를 설정하는 경우에 hasLaunched를 true로 설정합니다.
    // 학교를 설정한 경우에만 AppfirstLaunchScreen으로 이동하지 않습니다.
    hasLaunchedAS.setValue("true");

    Alert.alert(
      schoolName +
        "가 선택되었어요. 앞으로는 " +
        schoolName +
        "의 급식과 시간표를 표시할게요."
    );
    navigation.navigate("학년 & 반 설정", {
      schoolCode,
      schoolForm,
      previousSchool,
      officeCode
    });
  }

  const styles = StyleSheet.create({
    result: {
      borderBottomWidth: 0,
      borderColor: colors.colors.border,
      width: Dimensions.get("window").width,
      alignItems: "center",
      paddingVertical: 5,
      marginVertical: 3
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
          previousSchool,
          schoolName
        ]);
      }}
    >
      <View style={styles.result}>
        <Text style={[styles.text, { fontSize: 17 }]}>{title}</Text>
        <Text style={[styles.text, { fontSize: 14 }]}>({address})</Text>
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
  const loading = {
    beforeLoading: "BEFORE_LOADING",
    loading: "LOADING",
    loaded: "LOADED",
    error: "ERROR"
  };
  const [apiLoadingState, setApiLoadingState] = useState(loading.loaded);

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
      schoolName={item.SCHUL_NM}
      previousSchool={previousSchoolCode}
    />
  );

  function searchSchool(value) {
    setApiLoadingState(loading.loading);
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
        setApiLoadingState(loading.loaded);
      })
      .catch((err) => {
        setMessage("에러가 발생했어요.\n다시 검색해 주세요.\n" + err);
        setApiLoadingState(loading.error);
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
      color: colors.colors.text,
      padding: 10,
      flex: 7,
      textAlign: "center",

      borderRadius: 10,
      marginHorizontal: 10,
      textDecorationColor: colors.colors.text,
      borderWidth: 1,
      marginTop: 5
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
      borderColor: colors.colors.border,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      marginRight: 10,
      borderRadius: 10,
      marginTop: 5
    },
    searchButtonText: { color: colors.colors.text }
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          placeholder="학교를 검색해주세요."
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
      <ActivityIndicator
        style={{
          position: "absolute",
          right: "50%",

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
          (apiLoadingState === loading.error && true)
        }
      />
    </View>
  );
}
