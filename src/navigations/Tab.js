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
    <SafeAreaProvider>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarIconStyle: { alignItems: "center" },
          tabBarBounces: false,
          tabBarInactiveTintColor: colors.colors.border,
          tabBarItemStyle: {
            borderColor: colors.colors.border,
            borderTopWidth: 1,
            height: 48
          },
          // tabBarBackground: () => (
          //   <View style={{ justifyContent: "flex-start", marginBottom: 48 }}>
          //     <Ad />
          //   </View>
          // ),
          tabBarIndicatorStyle: { backgroundColor: "#fff", width: 0 },
          tabBarLabelStyle: { fontSize: 11, margin: 0 }
        }}
        showPageIndicator={true}
        backBehavior={"history"}
      >
        {/* <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <Ad />
      </View> */}
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
              })
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
          name="쉬는시간"
          component={Community}
          options={{
            headerShown: false,
            tabBarActiveTintColor: colors.colors.primary,
            tabBarIcon: (props) =>
              MaterialCommunityIconsSet({
                ...props,
                name: "chat",
                size: 25
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
