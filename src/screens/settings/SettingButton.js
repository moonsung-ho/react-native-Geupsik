import { View, StyleSheet, Text, Pressable, Switch } from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Button(props) {
  const colors = useTheme();
  const styles = StyleSheet.create({
    button: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.colors.border,
      paddingLeft: 15,
      alignSelf: "stretch",
      height: 50,
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: colors.colors.background
    },
    arrow: {
      fontWeight: "bold",
      color: "#BDBDBF",
      marginLeft: 5
    },
    switch: {},
    Icon: {
      marginRight: props.iconMarginRight,
      marginLeft: props.iconMarginLeft
    }
  });

  return (
    <View style={{ alignSelf: "stretch" }}>
      <Pressable onPress={props.onPress} style={styles.button}>
        <View style={styles.Icon}>
          <Icon name={props.icon} size={20} color={colors.colors.text} />
        </View>
        <Text style={{ color: colors.colors.text }}>{props.title}</Text>
        <View>
          {(props.toggle && (
            <Switch
              style={{ marginLeft: 10 }}
              onValueChange={props.onPress}
              value={props.value}
            />
          )) || <Text style={styles.arrow}>{">"}</Text>}
        </View>
      </Pressable>
    </View>
  );
}
