import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Dimensions } from "react-native";

export default function NoticeScreen() {
  const colors = useTheme();
  const [data, setData] = useState([
    { title: "불러오는 중이에요.", version: "", description: "" }
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
    <ScrollView
      style={{ width: Dimensions.get("window").width, flexWrap: "wrap" }}
    >
      {data.map(({ title, version, description }) => {
        return (
          <View key={title + version + description}>
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                flexWrap: "wrap"
              }}
              key={title + version + description}
            >
              <Text
                style={{
                  marginHorizontal: 7,
                  fontWeight: "bold",
                  fontSize: 22,
                  color: colors.colors.text
                }}
                key={title}
              >
                {title}
              </Text>
              <Text key={version} style={{ color: "grey", margin: 5 }}>
                v{version}
              </Text>
            </View>
            <Text
              style={{ marginHorizontal: 15, color: colors.colors.text }}
              key={description}
            >
              {description}
            </Text>
            <Divider style={{ margin: 13, color: "gray" }} />
          </View>
        );
      })}
    </ScrollView>
  );
}
