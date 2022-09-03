import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./src/navigations/Tab";
import { AppearanceProvider } from "react-native-appearance";
import { themes } from "./src/theme";
import { Appearance, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { requestPermissionsAsync } from "expo-ads-admob";
import { KEYS, useAsyncStorage } from "./src/hooks/asyncStorage";

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
    request();
  }, []);

  return (
    <AppearanceProvider>
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
    </AppearanceProvider>
  );
};

export default App;
