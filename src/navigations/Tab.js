import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Geupsik, Settings, Calendar } from "../screens/TabScreen";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const MaterialIconsSet = ({ name, size, color }) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};
const MaterialCommunityIconsSet = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createMaterialTopTabNavigator();

const TabNavigation = () => {
  const colors = useTheme();
  return (
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
        tabBarIndicatorStyle: { backgroundColor: "#fff", width: 0 },
        tabBarLabelStyle: { fontSize: 11, margin: 0 }
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
  );
};

export default TabNavigation;
