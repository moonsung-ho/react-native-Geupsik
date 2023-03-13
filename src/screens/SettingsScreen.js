import {
  View,
  Text,
  Linking,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import { useEffect, useState } from "react";
import Button from "./settings/SettingButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import * as Analytics from "expo-firebase-analytics";
import WebView from "react-native-webview";
import Constants from "expo-constants";
import Ad from "./Ad";
import * as Clipboard from "expo-clipboard";
import { KEYS, useAsyncStorage } from "../hooks/asyncStorage";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useMemo, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet";
import SchoolSettingScreen from "./settings/SchoolSettingScreen";

export default function SettingsScreen({ navigation }) {
  const [coronaApiSource, setCoronaApiSource] = useState("로딩중");
  const [todayPositive, setTodayPositive] = useState("로딩중");
  const [totalPositive, setTotalPositive] = useState("로딩중");
  const [schoolName, setSchoolName] = useState("로딩중");
  const [grade, setGrade] = useState("로딩중");
  const [className, setClassName] = useState("로딩중");
  const [schoolURL, setSchoolURL] = useState("로딩중");
  const [schoolTel, setSchoolTel] = useState("로딩중");
  const [schoolFax, setSchoolFax] = useState("로딩중");
  const [schoolCode, setSchoolCode] = useState("00000000");

  useEffect(() => {
    Analytics.logEvent("settingScreenEnter");
  }, []);
  const colors = useTheme();
  const [isDarkmodeAsyncStorage, setIsDarkmodeAsyncStorage] = useState(false);
  AsyncStorage.getItem("isdarkmode", (err, result) => {
    if (result != null) {
      setIsDarkmodeAsyncStorage(result);
    }
  });
  const [isDarkmodeToggled, setIsDarkmodeToggled] = useState(
    isDarkmodeAsyncStorage
  );
  useEffect(() => {
    fetch(
      "https://api.corona-19.kr/korea/?serviceKey=LXNyctsed96ahp2mViJKQZ3EnAzTHwvUk"
    )
      .then((response) => response.json())
      .then((json) => {
        setTodayPositive(json.TotalCaseBefore + "명");
        setCoronaApiSource(json.source);
        setTotalPositive(json.TotalCase + "명");
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <View>
          <View style={{ marginTop: 10 }}>
            <Ad />
          </View>
        </View>
      )
    });
  }, []);

  function toggleDarkmode() {
    // setIsDarkmodeToggled((previous) => !previous);
    // AsyncStorage.setItem("isdarkmode", `${isDarkmodeToggled}`, () => {});
  }

  const isFocused = useIsFocused();

  const schoolNameAS = useAsyncStorage(KEYS.SCHOOL_NAME, isFocused);
  useEffect(() => {
    if (!schoolNameAS.isLoading) {
      setSchoolName(schoolNameAS.state);
    }
  }, [schoolNameAS.isLoading, schoolNameAS.state, isFocused]);
  const gradeAS = useAsyncStorage(KEYS.GRADE, isFocused);
  useEffect(() => {
    if (!gradeAS.isLoading) {
      setGrade(gradeAS.state * 1);
    }
  }, [gradeAS.isLoading, gradeAS.state, isFocused]);
  const classAS = useAsyncStorage(KEYS.CLASS, isFocused);
  useEffect(() => {
    if (!classAS.isLoading) {
      setClassName(classAS.state * 1);
    }
  }, [classAS.isLoading, classAS.state, isFocused]);
  const schoolCodeAS = useAsyncStorage(KEYS.SCHOOL_CODE, isFocused);
  useEffect(() => {
    if (!schoolCodeAS.isLoading) {
      setSchoolCode(schoolCodeAS.state);
    }
  }, [schoolCodeAS.isLoading, schoolCodeAS.state, isFocused]);

  useEffect(() => {
    fetch(
      `https://mealtimeapi.sungho-moon.workers.dev/hub/schoolInfo?Type=json&SD_SCHUL_CODE=${schoolCode}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.schoolInfo) {
          setSchoolURL(json.schoolInfo[1].row[0].HMPG_ADRES);
          setSchoolTel(json.schoolInfo[1].row[0].ORG_TELNO);
          setSchoolFax(json.schoolInfo[1].row[0].ORG_FAXNO);
        } else {
          setSchoolURL("null");
          setSchoolTel("null");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [isFocused, schoolCode, schoolName]);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["15%", "70%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaView
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.colors.border,
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        flex: 1
      }}
    >
      <ScrollView>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.colors.border,
            borderRadius: 10,
            margin: 11,
            padding: 10,
            flexDirection: "row",
            alignSelf: "stretch",
            flex: 1
          }}
        >
          <View style={{ alignSelf: "stretch", flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${schoolURL}`).catch((error) => {
                  console.warn(error);
                });
              }}
            >
              <Text
                style={{
                  color: colors.colors.text,
                  fontSize: 22,
                  flex: 1
                }}
              >
                {schoolName}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.colors.text,
                fontSize: 15,
                marginTop: 5
              }}
            >
              {grade}학년 {className}반
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`tel:${schoolTel}`.replaceAll("-", "")).catch(
                    (error) => {
                      console.warn(error);
                    }
                  )
                }
              >
                <Text
                  style={{
                    color: colors.colors.text,
                    fontSize: 15,
                    marginTop: 5,
                    marginRight: 5
                  }}
                >
                  전화: {schoolTel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: colors.colors.text,
                    fontSize: 15,
                    marginTop: 5
                  }}
                >
                  팩스: {schoolFax}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button
          title="학교 설정"
          onPress={() => navigation.navigate("학교 설정")}
          // onPress={handlePresentModalPress}
          icon="school"
          toggle={false}
          iconMarginLeft={0}
          iconMarginRight={15}
        />
        <Button
          title="알레르기 설정"
          onPress={() => navigation.navigate("알레르기 설정")}
          icon="virus"
          toggle={false}
          iconMarginLeft={2}
          iconMarginRight={18}
        />
        {/* <Button
        title="다크 모드"
        onPress={toggleDarkmode}
        value={isDarkmodeToggled}
        icon="moon"
        toggle={true}
      /> */}
        {/* <Button
        title="도움말"
        onPress={() => navigation.navigate("도움말")}
        icon="question"
        toggle={false}
        iconMarginLeft={4}
        iconMarginRight={20}
      /> */}
        <Button
          title="앱 정보 & FAQ "
          onPress={() => navigation.navigate("앱 정보")}
          icon="info"
          toggle={false}
          iconMarginLeft={9}
          iconMarginRight={24}
        />
        <Button
          title="공지사항"
          onPress={() => navigation.navigate("공지사항")}
          icon="archive"
          toggle={false}
          iconMarginLeft={4}
          iconMarginRight={17}
        />
        {/* <Button
          title="개발자에게 후원하기"
          onPress={() => {
            Clipboard.setString("토스뱅크 1908-6515-5247");
            Alert.alert(
              "계좌번호가 클립보드에 복사되었어요.",
              "복사된 계좌번호로 후원금을 보내주세요. 후원금은 제가 잘 쓰겠습니다🥳"
            );
          }}
          icon="dollar-sign"
          toggle={false}
          iconMarginLeft={8}
          iconMarginRight={20}
        /> */}
        <Button
          title="개발자에게 문의하기"
          onPress={() =>
            Linking.openURL("https://www.facebook.com/appmealtime").catch(
              (error) => {
                console.warn(error);
              }
            )
          }
          icon="question"
          toggle={false}
          iconMarginLeft={6}
          iconMarginRight={18}
        />
        <View
          style={{
            paddingVertical: 11
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 11
            }}
          >
            <View style={{ width: "100%" }}></View>
          </View>
        </View>
      </ScrollView>
      {/* <View
        style={{
          justifyContent: "flex-end",
          flex: 1
        }}
      >
        <Ad />
      </View> */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: colors.colors.card,
          borderWidth: 0
        }}
      >
        <View>
          <Text>ddd</Text>
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
