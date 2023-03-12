import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./src/navigations/Tab";
import { themes } from "./src/theme";
import { Alert, Appearance, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { KEYS, useAsyncStorage } from "./src/hooks/asyncStorage";
import * as Clipboard from "expo-clipboard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import "expo-dev-client";

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
  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === "granted") {
        trackingPermissionAS.setValue("true");
      } else {
        trackingPermissionAS.setValue("false");
      }
    })();
  }, []);

  React.useEffect(() => {
    if (Math.random() > 0.95) {
      Alert.alert(
        "개발자에게 후원하기",
        "가난한 앱 개발자에게 후원을 해주세요! 확인 버튼을 누르면 계좌번호가 복사돼요!"
      );
      Clipboard.setString("토스뱅크 1908-6515-5247");
    }
  }, []);

  // First, set the handler that will cause the notification
  // to show the alert

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    })
  });

  // Second, call the method

  const triggerGeupsikNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "오늘의 급식을 확인해 보세요!",
        body: "급식시간 앱을 사용해서 오늘의 급식을 확인하세요!"
      },
      trigger: {
        hour: 7,
        minute: 30,
        repeats: true
      }
    });
  };
  const triggerCalendarNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "내일의 시간표를 확인해 보세요!",
        body: "급식시간 앱을 사용해서 내일 시간표를 확인하세요!"
      },
      trigger: {
        hour: 22,
        minute: 30,
        repeats: true
      }
    });
  };

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
      if (statusObj.status !== "granted") {
        return;
      } else {
        Notifications.cancelAllScheduledNotificationsAsync();
        triggerGeupsikNotifications();
        triggerCalendarNotifications();
      }
      return statusObj;
    });
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
