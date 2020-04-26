import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import { IOS_BANNER_KEY, ANDROID_BANNER_KEY } from "../../components/Admob";
import Constants from "expo-constants";
import { Platform, View } from "react-native";

export default function Banner(bannerSize = "largeBanner") {
  return null;
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <AdMobBanner
        bannerSize={bannerSize}
        adUnitID={Platform.OS === "ios" ? IOS_BANNER_KEY : ANDROID_BANNER_KEY}
        testDeviceID={`${Constants.deviceId}`}
        onDidFailToReceiveAdWithError={e => console.log(e)}
      />
    </View>
  );
}
