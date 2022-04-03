import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Constants from "expo-constants";

export default function AppInfoScreen() {
  const [userCount, setUserCount] = useState("로딩중...");
  const [version, setVersion] = useState("로딩중...");
  useEffect(() => {
    fetch("https://geupsikapp.azurewebsites.net/usercount")
      .then((res) => res.json())
      .then((json) => {
        setUserCount(json[0].count);
      });
    setVersion(Constants.manifest.version);
  }, []);
  const colors = useTheme();
  const styles = StyleSheet.create({
    text: {
      color: colors.colors.text,
      alignSelf: "flex-start",
      marginTop: 10,
      marginHorizontal: 15
    },
    divider: { marginVertical: 10, marginHorizontal: 15 }
  });
  return (
    <ScrollView style={{ marginBottom: 10 }}>
      <Text style={styles.text}>
        이 앱은 나이스의 open API를 활용하여 급식 정보를 제공합니다. 나이스는
        우리나라의 교육행정정보시스템으로, 전국 모든 학교의 학생을 대상으로
        전산적으로 정보를 관리 및 처리하는 시스템입니다.
        {"\n"}이 앱은 expo를 사용하여 React Native로 만들어졌습니다.
      </Text>

      <Text
        style={{
          color: colors.colors.text,
          fontSize: 30,
          marginLeft: 15,
          marginTop: 30
        }}
      >
        FAQ
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Q. 급식을 일일히 다 조사하나요?.</Text>
      <Text style={styles.text}>
        A. 그건 아닙니다. 학교 영양사가 식단을 작성해서 나이스에 등록하면 그
        식단을 급식 앱에서 가져와서 가공하여서 쓰는 것입니다.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Q. 급식이 왜 나오지 않나요?</Text>
      <Text style={styles.text}>
        A. 급식이 나오지 않는 것은 앱의 문제가 아니고 영양사 선생님이 급식을
        등록하지 않아서 생긴 문제입니다. 혹시 다른 학교로 바꿔도 나오지 않는다면
        그때는 저에게 이메일로 신고하시면 됩니다. 저의 이메일은{" "}
        <Text
          style={{ textDecorationLine: "underline" }}
          onPress={() => Linking.openURL("mailto:sungho.moon@aol.com")}
        >
          {" "}
          sungho.moon@aol.com
        </Text>{" "}
        이오니 부담 갖지 말고 신고하시면 됩니다.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Q. 조식과 석식도 나오게 해주세요.</Text>
      <Text style={styles.text}>
        A. 그건 제가 귀찮아서 안 만든 것이니 필요하시면{" "}
        <Text
          style={{ textDecorationLine: "underline" }}
          onPress={() => Linking.openURL("mailto:sungho.moon@aol.com")}
        >
          {" "}
          sungho.moon@aol.com
        </Text>{" "}
        으로 알려주시면 최대한 빠른 시일 내에 업데이트 하겠습니다.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Q. 학교를 바꿨는데 급식이 그대로예요.</Text>
      <Text style={styles.text}>
        A. 그 문제는 새로고침이 안 되어서 그런 것이니 앱을 재시작하시거나 다음
        급식 보기 또는 이전 급식 보기 버튼을 눌러서 급식을 다시 로딩해 주시면
        됩니다.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>
        Q. 알레르기 유발 식품을 바꿨는데 급식이 그대로예요.
      </Text>
      <Text style={styles.text}>
        A. 그 문제도 새로고침이 안 되어서 그런 것이니 앱을 재시작하시거나 다음
        급식 보기 또는 이전 급식 보기 버튼을 눌러서 급식을 다시 로딩해 주시면
        됩니다.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>
        Q. 알레르기 식품이 제대로 빨간색으로 표시되지 않아요.
      </Text>
      <Text style={styles.text}>
        A. 그 문제는 학교 영양사 선생님이 제대로 알레르기 등록을 하지 않은
        것이니 학교 영양사 선생님께 문의하시면 됩니다.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>
        Q. 급식에 이상한 문자가 포함되어 있어요. ("N"등)
      </Text>
      <Text style={styles.text}>
        A. 제 이메일({" "}
        <Text
          style={{ textDecorationLine: "underline" }}
          onPress={() => Linking.openURL("mailto:sungho.moon@aol.com")}
        >
          {" "}
          sungho.moon@aol.com
        </Text>{" "}
        )로 이상한 문자와 학교를 보내주시면 예외처리 하겠습니다.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>
        Q. 이 앱의 소스 코드를 다운로드하고 싶어요.
      </Text>
      <Text style={styles.text}>
        A. 제 깃허브 레포지토리를 통해서 다운로드하시면 됩니다. 링크는
        <Text
          style={{ textDecorationLine: "underline" }}
          onPress={() =>
            Linking.openURL(
              "https://github.com/sungho0205/react-native-Geupsik"
            )
          }
        >
          {" "}
          https://github.com/sungho0205/react-native-Geupsik
        </Text>{" "}
        입니다.
      </Text>
      <Divider style={styles.divider} />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>오늘의 유저 수: {userCount}</Text>
        <Text style={styles.text}>앱 버전: {version}</Text>
      </View>
    </ScrollView>
  );
}
