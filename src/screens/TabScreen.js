import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components/native";
import GeupsikScreen from "./GeupsikScreen";
import CalendarScreen from "./CalendarScreen";
import SettingsScreen from "./SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchoolSettingScreen from "./settings/SchoolSettingScreen";
import HelpScreen from "./settings/HelpScreen";
import AllergySettingScreen from "./settings/AllergySettingScreen";
import AppfirstLaunchScreen from "./AppFirstLaunch";
import AppInfoScreen from "./settings/AppInfoScreen";
import GradeClassSettingScreen from "./settings/GradeClassSettingScreen";
import CalendarErrorScreen from "./CalendarErrorScreen";
import NoticeScreen from "./settings/NoticeScreen";
import { useAsyncStorage, KEYS } from "../hooks/asyncStorage";
import { useFocusEffect } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const Container = styled.View`
  flex: 1;
`;

export const Geupsik = () => {
  const [schoolName, setSchoolName] = useState("");
  const schoolNameAS = useAsyncStorage(KEYS.SCHOOL_NAME);
  useFocusEffect(
    React.useCallback(() => {
      if (!schoolNameAS.isLoading) {
        setSchoolName(` - ${schoolNameAS.state}`);
      }
    }, [schoolNameAS.isLoading, schoolNameAS.state])
  );
  return (
    <Container>
      <Stack.Navigator>
        <Stack.Screen
          name="급식screen"
          component={GeupsikScreen}
          //options={{ headerTitle: "급식" + schoolName, title: "급식" }}
        />
        <Stack.Screen
          name="first-launch"
          component={AppfirstLaunchScreen}
          options={{ headerShown: false, headerTitle: "급식" }}
        />
      </Stack.Navigator>
    </Container>
  );
};

export const Calendar = () => {
  const [schoolName, setSchoolName] = useState("");
  const schoolNameAS = useAsyncStorage(KEYS.SCHOOL_NAME);
  useFocusEffect(
    React.useCallback(() => {
      if (!schoolNameAS.isLoading) {
        setSchoolName(` - ${schoolNameAS.state}`);
      }
    }, [schoolNameAS.isLoading, schoolNameAS.state])
  );
  return (
    <Container>
      <Stack.Navigator>
        <Stack.Screen
          name="시간표screen"
          component={CalendarScreen}
          options={{ header: () => <></> }}
        />
        <Stack.Screen
          name="에러"
          component={CalendarErrorScreen}
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
          options={{ headerTitle: "더보기" }}
        />
        <Stack.Screen name="학교 설정" component={SchoolSettingScreen} />
        <Stack.Screen name="알레르기 설정" component={AllergySettingScreen} />
        <Stack.Screen name="도움말" component={HelpScreen} />
        <Stack.Screen name="앱 정보" component={AppInfoScreen} />
        <Stack.Screen name="공지사항" component={NoticeScreen} />
        <Stack.Screen
          name="학년 & 반 설정"
          component={GradeClassSettingScreen}
        />
      </Stack.Navigator>
    </Container>
  );
};
