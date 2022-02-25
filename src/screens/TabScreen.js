import React from "react";
import styled from "styled-components/native";
import GeupsikScreen from "./GeupsikScreen";
import SettingsScreen from "./SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchoolSettingScreen from "./settings/SchoolSettingScreen";

const Stack = createNativeStackNavigator();

const Container = styled.View`
  flex: 1;
`;

export const Geupsik = () => {
  return (
    <Container>
      <GeupsikScreen />
    </Container>
  );
};

export const Settings = () => {
  return (
    <Container>
      <Stack.Navigator>
        <Stack.Screen name="설정" component={SettingsScreen} />
        <Stack.Screen name="학교 설정" component={SchoolSettingScreen} />
      </Stack.Navigator>
    </Container>
  );
};
