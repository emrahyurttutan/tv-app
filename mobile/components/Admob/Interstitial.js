import { AdMobInterstitial } from "expo-ads-admob";
import { IOS_BANNER_KEY, ANDROID_BANNER_KEY } from "../../components/Admob";
import { Platform } from "react-native";

export default function Interstitial() {

  AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? IOS_BANNER_KEY : ANDROID_BANNER_KEY); 
  AdMobInterstitial.setTestDeviceID(`${Constants.deviceId}`);
  await AdMobInterstitial.requestAdAsync();
  await AdMobInterstitial.showAdAsync();

  return (
   AdMobInterstitial
  );
}
