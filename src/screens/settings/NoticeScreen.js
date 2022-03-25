import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Divider } from "react-native-elements/dist/divider/Divider";

export default function NoticeScreen() {
  const colors = useTheme();
  const [data, setData] = useState([
    { title: "불러오는 중입니다.", version: "", description: "" }
  ]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/sungho0205/react-native-Geupsik/master/notices.json"
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json.reverse());
      });
  }, []);
  return (
    <ScrollView>
      {data.map(({ title, version, description }) => {
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                padding: 5
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 22,
                  color: colors.colors.text
                }}
              >
                {title}
              </Text>
              <Text style={{ color: "grey", margin: 5 }}>v{version}</Text>
            </View>
            <Text style={{ marginHorizontal: 15, color: colors.colors.text }}>
              {description}
            </Text>
            <Divider style={{ margin: 13, color: "gray" }} />
          </View>
        );
      })}
    </ScrollView>
  );
}
