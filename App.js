import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./src/navigations/Tab";
// import { AppearanceProvider } from "react-native-appearance";
import { themes } from "./src/theme";
import { Alert, Appearance, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { requestPermissionsAsync } from "expo-ads-admob";
import { KEYS, useAsyncStorage } from "./src/hooks/asyncStorage";
import * as Clipboard from "expo-clipboard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const App = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  // AsyncStorage.getItem("isdarkmode", (err, result) => {
  //   if (result != null) {
  //     setIsDarkmode(result);
  //     console.warn(result);
  //   }
  // })
  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme);
  });

  const trackingPermissionAS = useAsyncStorage(KEYS.TRACKINGPERMISSION);

  async function request() {
    const { status } = await requestPermissionsAsync();
    if (status === "granted") {
      trackingPermissionAS.setValue("true");
    }
  }

  React.useEffect(() => {
    if (Math.random() > 0.95) {
      Alert.alert(
        "개발자에게 후원하기",
        "가난한 앱 개발자에게 후원을 해주세요! 확인 버튼을 누르면 계좌번호가 복사돼요!"
      );
      Clipboard.setString("토스뱅크 1908-6515-5247");
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          {/* <AppearanceProvider> */}
          <StatusBar
            backgroundColor={
              theme === "dark"
                ? themes.darkTheme.colors.background
                : themes.lightTheme.colors.background
            }
            barStyle={theme === "dark" ? "light-content" : "dark-content"}
          />
          <NavigationContainer
            theme={theme === "dark" ? themes.darkTheme : themes.lightTheme}
          >
            <TabNavigation />
          </NavigationContainer>
          {/* </AppearanceProvider> */}
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
