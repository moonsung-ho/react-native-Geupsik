import { View, Text } from "react-native";
import { useState } from "react";
import Button from "./settings/SettingButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";

export default function SettingsScreen({ navigation }) {
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

  function toggleDarkmode() {
    // setIsDarkmodeToggled((previous) => !previous);
    // AsyncStorage.setItem("isdarkmode", `${isDarkmodeToggled}`, () => {});
  }

  return (
    <View
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.colors.border
      }}
    >
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
        title="학년 및 반 설정"
        onPress={() => navigation.navigate("학년 & 반 설정")}
        icon="id-card"
        toggle={false}
        iconMarginLeft={1}
        iconMarginRight={16}
      /> */}
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
    </View>
  );
}
