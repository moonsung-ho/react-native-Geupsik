import {
  View,
  Text,
  Linking,
  SafeAreaView,
  ScrollView,
  Alert
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

export default function SettingsScreen({ navigation }) {
  const [coronaApiSource, setCoronaApiSource] = useState("로딩중");
  const [todayPositive, setTodayPositive] = useState("로딩중");
  const [totalPositive, setTotalPositive] = useState("로딩중");
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
        <Button
          title="학교 설정"
          onPress={() => navigation.navigate("학교 설정")}
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
        <Button
          title="건강상태 자가진단 바로가기"
          onPress={() =>
            Linking.openURL("https://hcs.eduro.go.kr").catch((error) => {
              console.warn(error);
            })
          }
          icon="check"
          toggle={false}
          iconMarginLeft={4}
          iconMarginRight={16}
        />
        <Button
          title="개발자에게 후원하기"
          onPress={() => {
            Clipboard.setString("토스뱅크 1908-6515-5247");
            Alert.alert(
              "계좌번호가 클립보드에 복사되었습니다",
              "복사된 계좌번호로 후원금을 보내주세요. 후원금은 제가 잘 쓰겠습니다🥳"
            );
          }}
          icon="dollar-sign"
          toggle={false}
          iconMarginLeft={8}
          iconMarginRight={20}
        />
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
    </SafeAreaView>
  );
}
