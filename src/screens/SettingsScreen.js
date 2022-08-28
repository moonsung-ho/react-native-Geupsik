import { View, Text, Linking, SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Button from "./settings/SettingButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import * as Analytics from "expo-firebase-analytics";
import WebView from "react-native-webview";
import Constants from "expo-constants";
import Ad from "./Ad";

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
          title="개발자의 학교 숙제 설문조사(참여 부탁드립니다)"
          onPress={() =>
            Linking.openURL("http://asq.kr/zQzG76oF").catch((error) => {
              console.warn(error);
            })
          }
          icon="check"
          toggle={false}
          iconMarginLeft={4}
          iconMarginRight={16}
        />
        <Button
          title="개발자의 친구 학교 숙제 설문조사(참여 부탁드립니다)"
          onPress={() =>
            Linking.openURL("https://forms.gle/hjgytb327FMj2MJs9").catch(
              (error) => {
                console.warn(error);
              }
            )
          }
          icon="check"
          toggle={false}
          iconMarginLeft={4}
          iconMarginRight={16}
        />
        <Button
          title="개발자의 또 다른 친구 학교 숙제 설문조사(참여 부탁드립니다)"
          onPress={() =>
            Linking.openURL("https://forms.gle/upYyETQHjwDLNDmQA").catch(
              (error) => {
                console.warn(error);
              }
            )
          }
          icon="check"
          toggle={false}
          iconMarginLeft={4}
          iconMarginRight={16}
        />

        <View
          style={{
            paddingVertical: 11,
            borderColor: colors.colors.border,
            borderBottomWidth: 2,
            borderTopWidth: 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 11
            }}
          >
            <View style={{ width: "100%" }}>
              <Text style={{ fontWeight: "bold", color: colors.colors.text }}>
                오늘의 코로나19
              </Text>
              <Text
                style={{
                  color: "gray",
                  position: "absolute",
                  right: 9,
                  flex: 1,
                  fontSize: 11
                }}
              >
                출처: {coronaApiSource}
              </Text>
            </View>
          </View>
          <Text style={{ marginHorizontal: 14, color: colors.colors.text }}>
            오늘의 확진자 수:{" "}
            {todayPositive.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
          <Text style={{ marginHorizontal: 14, color: colors.colors.text }}>
            총 확진자 수: {totalPositive}
          </Text>
        </View>
        <View style={{ justifyContent: "flex-end", flex: 1 }}>
          <Ad />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
