import { WebView } from "react-native-webview";
import * as Permissions from "expo-permissions";
import React, { usePermissions } from "react";
import { Text, View } from "react-native";

export default function CommunityScreen() {
  // const [permission, askPermission, getPermission] = usePermissions([
  //   Permissions.CAMERA,
  //   Permissions.AUDIO_RECORDING,
  //   Permissions.MEDIA_LIBRARY
  // ]);
  async function ask() {
    const { status, expires, permissions } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.AUDIO_RECORDING,
      Permissions.MEDIA_LIBRARY
    );
    if (status === "granted") {
      return (
        <WebView
          source={{ uri: "https://breaktime.sungho.xyz" }}
          style={{ marginTop: 30 }}
        />
      );
    } else {
      return (
        <View>
          <Text>권한을 허용해 주세요.</Text>
        </View>
      );
    }
  }
  React.useEffect(() => {
    ask();
  }, []);
  return (
    <WebView
      source={{ uri: "https://breaktime.sungho.xyz" }}
      style={{ marginTop: 30 }}
    />
  );
}
