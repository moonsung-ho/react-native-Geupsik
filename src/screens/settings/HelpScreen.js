import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from "react-native";
import { useTheme } from "@react-navigation/native";
import SwiperFlatList from "react-native-swiper-flatlist";

export default function HelpScreen() {
  const colors = useTheme();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const styles = StyleSheet.create({
    container: { flex: 1 },
    child: {
      width,
      justifyContent: "center",
      alignSelf: "center",
      flex: 1,
      height: height
    },
    text: { fontSize: 20, textAlign: "center" }
  });
  return (
    <View style={styles.container}>
      <SwiperFlatList index={0} style={{ flex: 1 }}>
        <View style={[styles.child, {}]}>
          <Text style={[styles.text, { color: colors.colors.text }]}>
            스와이프로 도움말을 넘기세요!
          </Text>
        </View>
        <ImageBackground
          source={require("../../../assets/helpImages/geupsikpage.png")}
          style={{ height: height - 70, width: width }}
        >
          <View style={[styles.child, {}]}>
            <Text style={[styles.text, { marginTop: 111 }]}>
              급식 화면에서 화살표 버튼으로 다음 날과 {"\n"}이전 날 급식을 볼 수
              있어요.
            </Text>
          </View>
        </ImageBackground>
        <ImageBackground
          source={require("../../../assets/helpImages/geupsikpage.png")}
          style={{ height: height - 70, width: width }}
        >
          <View style={[styles.child, {}]}>
            <Text style={[styles.text, { marginTop: 111 }]}>
              급식 화면에서 메뉴를 꾹 누르고 있으면 그 음식이 뭔지 검색할 수
              있어요.
            </Text>
          </View>
        </ImageBackground>
        <ImageBackground
          source={require("../../../assets/helpImages/shareimage.png")}
          style={{ height: height - 70, width: width }}
        >
          <View style={[styles.child, {}]}>
            <Text style={[styles.text, { marginTop: -400 }]}>
              급식 화면 오른쪽 밑 공유 버튼을 누르면 급식을 공유할 수 있어요.
            </Text>
          </View>
        </ImageBackground>
        <ImageBackground
          source={require("../../../assets/helpImages/geupsikpage.png")}
          style={{ height: height - 70, width: width }}
        >
          <View style={[styles.child, {}]}>
            <Text style={[styles.text, { marginTop: 111 }]}>
              급식 화면에서 메뉴를 꾹 누르고 있으면 그 음식이 뭔지 검색할 수
              있어요.
            </Text>
          </View>
        </ImageBackground>
        <View style={[styles.child, {}]}>
          <Text style={[styles.text, { color: colors.colors.text }]}>
            이 앱은 문성호가 만들었어요!
          </Text>
        </View>
      </SwiperFlatList>
    </View>
  );
}
