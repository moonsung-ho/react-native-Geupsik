import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";

export default function AppInfoScreen() {
  const colors = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      color: colors.colors.text,
      fontSize: 50,
      margin: 15
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>문성호</Text>
    </View>
  );
}
