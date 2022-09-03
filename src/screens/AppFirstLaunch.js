import { useTheme } from "@react-navigation/native";
import { View, Text, Image, Button } from "react-native";

const icon = require("../../assets/adaptive-icon.png");

export default function AppfirstLaunchScreen({ navigation }) {
  const colors = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          flex: 100
        }}
      >
        <Text
          style={{
            color: colors.colors.text,
            fontSize: 40,
            alignSelf: "center",
            fontWeight: "bold"
          }}
        >
          급식시간
        </Text>
        <Image
          style={{ height: 100, width: 100, alignSelf: "center" }}
          source={icon}
        />
        <Text style={{ color: colors.colors.text }}>
          설치해 주셔서 감사합니다!
        </Text>
        <Text style={{ color: colors.colors.text }}>
          아래 버튼을 누르면 설정으로 이동합니다.
        </Text>
        <Text style={{ color: colors.colors.text }}>
          설정에서는 학교 설정 및 알레르기 유발 식품 설정을
        </Text>
        <Text style={{ color: colors.colors.text }}>할 수 있습니다.</Text>
        <View style={{ marginTop: 15 }}>
          <Button
            onPress={() => {
              navigation.navigate("급식", { screen: "급식screen" });
              navigation.navigate("더보기");
            }}
            title="설정으로 이동"
          />
        </View>
      </View>
      <Text
        style={{
          textAlignVertical: "bottom",
          margin: 5,
          alignSelf: "center",
          color: colors.colors.text
        }}
      >
        문성호
      </Text>
    </View>
  );
}
