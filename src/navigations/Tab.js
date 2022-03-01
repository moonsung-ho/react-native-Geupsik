import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Geupsik, Settings } from "../screens/TabScreen";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert, AsyncStorage } from "react-native";

const MaterialIconsSet = ({ name, size, color }) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};
const MaterialCommunityIconsSet = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="급식tab"
        component={Geupsik}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarIcon: (props) =>
            MaterialCommunityIconsSet({ ...props, name: "food-fork-drink" })
        }}
      />
      <Tab.Screen
        name="설정tab"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: (props) =>
            MaterialIconsSet({ ...props, name: "settings" })
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
