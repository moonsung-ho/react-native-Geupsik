import React from "react";
import styled from "styled-components/native";
import GeupsikScreen from "./GeupsikScreen";
import SettingsScreen from "./SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchoolSettingScreen from "./settings/SchoolSettingScreen";
import HelpScreen from "./settings/HelpScreen";
import AllergySettingScreen from "./settings/AllergySettingScreen";
import AppfirstLaunchScreen from "./AppFirstLaunch";
import AppInfoScreen from "./settings/AppInfoScreen";

const Stack = createNativeStackNavigator();

const Container = styled.View`
  flex: 1;
`;

export const Geupsik = () => {
  return (
    <Container>
      <Stack.Navigator>
        <Stack.Screen
          name="급식screen"
          component={GeupsikScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="first-launch"
          component={AppfirstLaunchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Container>
  );
};

export const Settings = () => {
  return (
    <Container>
      <Stack.Navigator>
        <Stack.Screen
          name="설정screen"
          component={SettingsScreen}
          options={{ headerTitle: "설정" }}
        />
        <Stack.Screen name="학교 설정" component={SchoolSettingScreen} />
        <Stack.Screen name="알레르기 설정" component={AllergySettingScreen} />
        <Stack.Screen name="도움말" component={HelpScreen} />
        <Stack.Screen name="앱 정보" component={AppInfoScreen} />
      </Stack.Navigator>
    </Container>
  );
};
