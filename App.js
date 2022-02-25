import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./src/navigations/Tab";
import { AppearanceProvider } from "react-native-appearance";
import { themes } from "./src/theme";
import { Appearance } from "react-native";

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
  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={theme === "dark" ? themes.darkTheme : themes.lightTheme}
      >
        <TabNavigation />
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
