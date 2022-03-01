import React from "react";
import styled from "styled-components/native";
import GeupsikScreen from "./GeupsikScreen";
import SettingsScreen from "./SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchoolSettingScreen from "./settings/SchoolSettingScreen";
import AppInfoScreen from "./settings/AppInfoScreen";
import AllergySettingScreen from "./settings/AllergySettingScreen";
import AppfirstLaunchScreen from "./AppFirstLaunch";

const Stack = createNativeStackNavigator();

const Container = styled.View`
  flex: 1;
`;

export const Geupsik = () => {
  return (
    <Container>
      <Stack.Navigator>
        <Stack.Screen
          name="급식"
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
        <Stack.Screen name="설정" component={SettingsScreen} />
        <Stack.Screen name="학교 설정" component={SchoolSettingScreen} />
        <Stack.Screen name="알레르기 설정" component={AllergySettingScreen} />
        <Stack.Screen name="도움말" component={AppInfoScreen} />
      </Stack.Navigator>
    </Container>
  );
};
