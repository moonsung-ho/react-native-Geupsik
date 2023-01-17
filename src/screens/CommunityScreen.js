// import { WebView } from "react-native-webview";
// import * as Permissions from "expo-permissions";
// import React, { usePermissions } from "react";
// import { Text, View } from "react-native";
// import { useTheme } from "@react-navigation/native";

// export default function CommunityScreen() {
//   // const [permission, askPermission, getPermission] = usePermissions([
//   //   Permissions.CAMERA,
//   //   Permissions.AUDIO_RECORDING,
//   //   Permissions.MEDIA_LIBRARY
//   // ]);
//   const colors = useTheme();
//   async function ask() {
//     const { status, expires, permissions } = await Permissions.askAsync(
//       Permissions.CAMERA,
//       Permissions.AUDIO_RECORDING,
//       Permissions.MEDIA_LIBRARY
//     );
//     if (status === "granted") {
//       return (
//         <WebView
//           source={{ uri: "https://breaktime.sungho.xyz" }}
//           style={{ marginTop: 30 }}
//         />
//       );
//     } else {
//       return (
//         <View>
//           <Text>권한을 허용해 주세요.</Text>
//         </View>
//       );
//     }
//   }
//   React.useEffect(() => {
//     ask();
//   }, []);
//   return (
//     <View
//       style={{
//         alignContent: "center",
//         alignItems: "center",
//         justifyContent: "center",
//         flex: 100
//       }}
//     >
//       <Text
//         style={{
//           textAlign: "center",
//           color: colors.colors.text,
//           justifyContent: "center"
//         }}
//       >
//         쉬는시간 커뮤니티는 사용량 저조, 서버 비용 부족 등의 이유로 서비스가
//         종료되었습니다. 죄송합니다.
//       </Text>
//     </View>
//     // <WebView
//     //   source={{ uri: "https://breaktime.sungho.xyz" }}
//     //   style={{ marginTop: 30 }}
//     // />
//   );
// }
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { WidgetPreview } from "react-native-android-widget";

import { HelloWidget } from "../widgets/helloworldwidget";

export function HelloWidgetPreviewScreen() {
  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <HelloWidget />}
        width={320}
        height={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
