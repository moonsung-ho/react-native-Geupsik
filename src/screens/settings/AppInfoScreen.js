import { Linking, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function AppInfoScreen() {
  const colors = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    text: {
      color: colors.colors.primary,
      marginTop: 50,
      fontSize: 30
    }
  });
  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => Linking.openURL("https://github.com/sungho0205")}
      >
        문성호
      </Text>
    </View>
  );
}
