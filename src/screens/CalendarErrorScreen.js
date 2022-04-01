import { useTheme } from "@react-navigation/native";
import { View, Text, Image, Button } from "react-native";

const icon = require("../../assets/adaptive-icon.png");

export default function CalendarErrorScreen({ navigation }) {
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
        <Text style={{ color: colors.colors.text, textAlign: "center" }}>
          시간표 기능을 이용할 수 없습니다!
        </Text>
        <Text style={{ color: colors.colors.text, textAlign: "center" }}>
          이 문제는 일부 학교에서 발생하는 문제로
        </Text>
        <Text style={{ color: colors.colors.text, textAlign: "center" }}>
          학교에서 나이스에 반 등록을 하지 않은 것일 수 있습니다.
        </Text>
        <Text style={{ color: colors.colors.text, textAlign: "center" }}>
          학교를 다시 설정해 보거나 탭 바 중앙에 있는 시간표 버튼을 눌러 이
          화면을 재로드하세요.
        </Text>
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
    </View>
  );
}
