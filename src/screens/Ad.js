import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import WebView from "react-native-webview";
import { Linking } from "react-native";

export default function Ad() {
  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        padding: 0,
        minHeight: 60
      }}
    >
      <WebView
        source={{ uri: "https://jazzy-chimera-4f518f.netlify.app" }}
        onError={(error) => {
          console.warn(error);
        }}
        scrollEnabled={false}
        allowsLinkPreview={false}
        pagingEnabled={false}
        onNavigationStateChange={(event) => {
          if (event.url !== "https://jazzy-chimera-4f518f.netlify.app/") {
            Linking.openURL(event.url);
          }
        }}
      />
    </View>
  );
}
