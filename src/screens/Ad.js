import { View } from "react-native";
import WebView from "react-native-webview";

export default function Ad() {
  const kakaoAdHtml = `
  <head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1"
  />
</head><ins
        class="kakao_ad_area"
        style="display:none;"
        data-ad-unit="DAN-QdCEnC4cqSQZvKQU"
        data-ad-width="320"
        data-ad-height="100"
      ></ins>
      <script
        type="text/javascript"
        src="https://t1.daumcdn.net/kas/static/ba.min.js"
        async
      ></script>`;
  return (
    <View
      style={{
        width: "100%",
        height: 100,
        position: "absolute",
        bottom: 10
      }}
    >
      <WebView
        source={{ html: kakaoAdHtml }}
        onError={(error) => {
          console.warn(error);
        }}
      />
    </View>
  );
}
