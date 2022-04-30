import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import WebView from "react-native-webview";
import { Linking } from "react-native";

export default function Ad() {
  const colors = useTheme();
  const kakaoAdHtml = `
  <head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1"
  />
</head>
<body style="background-color: ${colors.colors.background};"><ins
        class="kakao_ad_area"
        style="display:none; background-color: ${colors.colors.background};"
        data-ad-unit="DAN-QdCEnC4cqSQZvKQU"
        data-ad-width="320"
        data-ad-height="50"
      ></ins>
      <script
        type="text/javascript"
        src="https://t1.daumcdn.net/kas/static/ba.min.js"
        async
      ></script></body>`;

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
        source={{ html: kakaoAdHtml }}
        onError={(error) => {
          console.warn(error);
        }}
        scrollEnabled={false}
        allowsLinkPreview={false}
        pagingEnabled={false}
        onNavigationStateChange={(event) => {
          if (event.url !== "about:blank") {
            Linking.openURL(event.url);
          }
        }}
      />
    </View>
  );
}
