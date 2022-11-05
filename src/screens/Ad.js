import { AdMobBanner } from "expo-ads-admob";
import { View, Text } from "react-native";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { KEYS, useAsyncStorage } from "../hooks/asyncStorage";

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
  const trackingPermissionAS = useAsyncStorage(KEYS.TRACKINGPERMISSION);

  return (
    <View>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        //adUnitID={adBannerUnitId} // Test ID, Replace with your-admob-unit-id
        adUnitID={adBannerUnitId}
        servePersonalizedAds={
          trackingPermissionAS.state === "true" ? true : false
        } // true or false
        onDidFailToReceiveAdWithError={(err) => {
          console.warn(err);
        }}
      />
    </View>
  );
}
