import { View } from "react-native";
import { useState } from "react";
import Button from "./settings/SettingButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
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
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start"
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
        title="다크 모드"
        onPress={toggleDarkmode}
        value={isDarkmodeToggled}
        icon="moon"
        toggle={true}
      /> */}
      <Button
        title="도움말"
        onPress={() => navigation.navigate("도움말")}
        icon="question"
        toggle={false}
        iconMarginLeft={4}
        iconMarginRight={20}
      />
      <Button
        title="앱 정보"
        onPress={() => navigation.navigate("앱 정보")}
        icon="info"
        toggle={false}
        iconMarginLeft={9}
        iconMarginRight={24}
      />
    </View>
  );
}
