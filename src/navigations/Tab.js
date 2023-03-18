import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Geupsik, Settings, Calendar, Community } from "../screens/TabScreen";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Ad from "../screens/Ad";
import { View } from "react-native";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import React from "react";
import { Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MaterialIconsSet = ({ name, size, color }) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};
const MaterialCommunityIconsSet = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = ({ navigation }) => {
  const colors = useTheme();
  return (
    <SafeAreaProvider style={{ backgroundColor: colors.colors.background }}>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarIconStyle: {
            alignItems: "center",
            borderColor: colors.colors.border
          },
          tabBarItemStyle: {
            height: 48,
            borderColor: colors.colors.border
          },
          tabBarStyle: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderColor: colors.colors.border,
            borderTopWidth: 1
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#fff",
            width: 0,
            borderColor: colors.colors.border
          },
          tabBarLabelStyle: {
            fontSize: 11,
            margin: 0,
            borderColor: colors.colors.border
          }
        }}
        showPageIndicator={true}
        backBehavior={"history"}
      >
        <Tab.Screen
          name="급식"
          component={Geupsik}
          options={{
            headerShown: false,
            headerTitle: "급식",
            headerTitleAlign: "center",
            tabBarActiveTintColor: colors.colors.primary,
            tabBarIcon: (props) =>
              MaterialCommunityIconsSet({
                ...props,
                name: "food-fork-drink",
                size: 22
              }),
            style: {
              backgroundColor: "red",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              position: "absolute",
              bottom: 0
            }
          }}
        />
        <Tab.Screen
          name="시간표"
          component={Calendar}
          options={{
            headerShown: false,
            tabBarActiveTintColor: colors.colors.primary,
            tabBarIcon: (props) =>
              MaterialCommunityIconsSet({
                ...props,
                name: "calendar-month",
                size: 22
              })
          }}
        />
        <Tab.Screen
          name="더보기"
          component={Settings}
          options={{
            headerShown: false,
            tabBarActiveTintColor: colors.colors.primary,
            tabBarIcon: (props) =>
              MaterialCommunityIconsSet({
                ...props,
                name: "dots-horizontal",
                size: 22
              })
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default TabNavigation;
