// import { AdMobBanner } from "expo-ads-admob";
import { View, Text } from "react-native";
import { Platform, SafeAreaView } from "react-native";
// import * as Device from "expo-device";
// import { KEYS, useAsyncStorage } from "../hooks/asyncStorage";

// const testID = "ca-app-pub-3940256099942544/6300978111";
// const iOSProductionID = "ca-app-pub-7245930610023842/4484950317";
// const androidProductionID = "ca-app-pub-7245930610023842/2837359556";

// const adBannerUnitId =
//   Platform.OS === "android"
//     ? Device.isDevice
//       ? androidProductionID
//       : testID
//     : Device.isDevice
//     ? iOSProductionID
//     : testID;

// export default function Ad() {
//   const trackingPermissionAS = useAsyncStorage(KEYS.TRACKINGPERMISSION);

//   return (
//     <SafeAreaView>
//       <AdMobBanner
//         bannerSize="smartBannerPortrait"
//         //adUnitID={adBannerUnitId} // Test ID, Replace with your-admob-unit-id
//         adUnitID={adBannerUnitId}
//         servePersonalizedAds={
//           trackingPermissionAS.state === "true" ? true : false
//         } // true or false
//         onDidFailToReceiveAdWithError={(err) => {
//           console.warn(err);
//         }}
//       />
//     </SafeAreaView>
//   );
// }

// export default function Ad() {
//   return (
//     <SafeAreaView>
//       <View></View>
//     </SafeAreaView>
//   );
// }

import React from "react";
import {
  BannerAd,
  BannerAdSize,
  TestIds
} from "react-native-google-mobile-ads";
import { useAsyncStorage, KEYS } from "../hooks/asyncStorage";

const iOSProductionID = "ca-app-pub-7245930610023842/4484950317";
const androidProductionID = "ca-app-pub-7245930610023842/2837359556";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "android"
  ? androidProductionID
  : iOSProductionID;

export default function Ad() {
  const [allowPersonalizedAd, setAllowPersonalizedAd] = React.useState("true");

  const trackingPermissionAS = useAsyncStorage(KEYS.TRACKINGPERMISSION);
  React.useEffect(() => {
    if (!trackingPermissionAS.isLoading) {
      setAllowPersonalizedAd(trackingPermissionAS.state);
    }
  }, [allowPersonalizedAd, trackingPermissionAS.state]);

  return (
    <SafeAreaView>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly:
            allowPersonalizedAd === "true" ? false : true,
          onAdFailedToLoad: () => {
            console.warn("광고 로딩 실패");
          }
        }}
      />
    </SafeAreaView>
  );
}

// import { useTheme } from "@react-navigation/native";
// import { View } from "react-native";
// import WebView from "react-native-webview";
// import { Linking } from "react-native";

// export default function Ad() {
//   return (
//     <View
//       style={{
//         width: "100%",
//         position: "absolute",
//         margin: 0,
//         bottom: 0,
//         padding: 0,
//         minHeight: 60
//       }}
//     >
//       <WebView
//         source={{ uri: "https://jazzy-chimera-4f518f.netlify.app" }}
//         onError={(error) => {
//           console.warn(error);
//         }}
//         scrollEnabled={false}
//         allowsLinkPreview={false}
//         pagingEnabled={false}
//         onNavigationStateChange={(event) => {
//           if (event.url !== "https://jazzy-chimera-4f518f.netlify.app/") {
//             Linking.openURL(event.url);
//           }
//         }}
//       />
//     </View>
//   );
// }
