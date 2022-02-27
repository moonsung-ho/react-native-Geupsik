import { View, StyleSheet, Text, Pressable, Switch } from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Button(props) {
  const colors = useTheme();
  const styles = StyleSheet.create({
    container: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.colors.border,
      alignSelf: "stretch",
      flexDirection: "row",
      alignItems: "center",
      height: 50
    },
    button: {
      alignSelf: "stretch",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.colors.background,
      flex: 1
    },
    arrow: {
      fontWeight: "bold",
      color: "#BDBDBF",
      textAlign: "right"
    },
    switch: {},
    Icon: {
      marginRight: props.iconMarginRight - 12,
      marginLeft: props.iconMarginLeft + 14
    },
    switchView: {
      flex: 1,
      marginRight: 15
    },
    title: {
      color: colors.colors.text,
      marginLeft: 10
    }
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={props.onPress} style={styles.button}>
        <View style={styles.Icon}>
          <Icon name={props.icon} size={20} color={colors.colors.text} />
        </View>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.switchView}>
          {(props.toggle && (
            <Switch
              style={{ marginLeft: 10 }}
              onValueChange={props.onPress}
              value={props.value}
            />
          )) || <Icon name="chevron-right" style={styles.arrow} />}
        </View>
      </Pressable>
    </View>
  );
}
