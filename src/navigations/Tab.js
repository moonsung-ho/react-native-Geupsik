import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Geupsik, Settings } from "../screens/TabScreen";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert, AsyncStorage } from "react-native";
import { useTheme } from "@react-navigation/native";

const MaterialIconsSet = ({ name, size, color }) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};
const MaterialCommunityIconsSet = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const colors = useTheme();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="급식"
        component={Geupsik}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarLabelPosition: "beside-icon",
          tabBarActiveTintColor: colors.colors.primary,
          tabBarIcon: (props) =>
            MaterialCommunityIconsSet({ ...props, name: "food-fork-drink" })
        }}
      />
      <Tab.Screen
        name="설정"
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabelPosition: "beside-icon",
          tabBarActiveTintColor: colors.colors.primary,
          tabBarIcon: (props) =>
            MaterialIconsSet({ ...props, name: "settings" })
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
