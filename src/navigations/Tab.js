import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Geupsik, Settings, Calendar } from "../screens/TabScreen";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
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
          headerTitle: "급식",
          headerTitleAlign: "center",
          tabBarActiveTintColor: colors.colors.primary,
          tabBarIcon: (props) =>
            MaterialCommunityIconsSet({ ...props, name: "food-fork-drink" })
        }}
      />
      <Tab.Screen
        name="시간표"
        component={Calendar}
        options={{
          headerShown: false,
          headerTitle: "시간표",
          headerTitleAlign: "center",
          tabBarActiveTintColor: colors.colors.primary,
          tabBarIcon: (props) =>
            MaterialCommunityIconsSet({ ...props, name: "calendar-month" })
        }}
      />
      <Tab.Screen
        name="더보기"
        component={Settings}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.colors.primary,
          tabBarIcon: (props) =>
            MaterialCommunityIconsSet({ ...props, name: "dots-horizontal" })
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
