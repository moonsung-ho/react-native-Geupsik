import { AdMobBanner } from "expo-ads-admob";
import { View } from "react-native";
import { Platform } from "react-native";
import * as Device from "expo-device";

const testID = "ca-app-pub-3940256099942544/6300978111";
const iOSProductionID = "ca-app-pub-7245930610023842/4484950317";
const androidProductionID = "ca-app-pub-7245930610023842/2837359556";

const adBannerUnitId =
  Platform.OS === "android"
    ? Device.isDevice
      ? androidProductionID
      : testID
    : Device.isDevice
    ? iOSProductionID
    : testID;

export default function Ad() {
  return (
    <View>
      <AdMobBanner
        bannerSize="banner"
        adUnitID={adBannerUnitId} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true} // true or false
        onDidFailToReceiveAdWithError={(err) => {
          alert(err);
        }}
      />
    </View>
  );
}
