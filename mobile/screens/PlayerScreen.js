import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import Layout from "../constants/Layout";
import Banner from "../components/Admob/Banner";
// import { Video } from "expo-av";
import { Header, Text } from "react-native-elements";
import Colors from "../constants/Colors";
import NavigationDrawerStructure from "../navigation/NavigationDrawerStructure";
export default function PlayerScreen({ navigation }) {
  const [data, setData] = useState(navigation.getParam("data", []));
  const [height, setHeight] = useState(260);
  useEffect(() => {
    setData(navigation.getParam("data", []));
  }, [navigation]);

  useEffect(() => {
    return () => {
      if (!data.embed) this.video.pauseAsync();
    };
  }, []);

  onCloseInfo = () => {
    setHeight(170);
  };
  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <NavigationDrawerStructure
            navigationProps={navigation}
            onClick={() => {}}
          />
        }
        centerComponent={{
          text: data.name,
          style: { color: "#fff", fontWeight: "bold" }
        }}
        containerStyle={{
          backgroundColor: Colors.tintColor,
          justifyContent: "space-around"
        }}
        rightComponent={{
          type: "material",
          icon: "arrow-back",
          color: "#fff",
          onPress: () => {
            navigation.goBack(null);
          }
        }}
      />
      <ScrollView>
        <WebView
          javaScriptEnabled={true}
          style={{
            width: Layout.window.width,
            height: Layout.window.height - height,
            flex: 1
          }}
          source={{
            uri: `https://tvapi.yurttutan.net/play/${data.id}`
          }}
        />

        <View style={{ padding: 10 }}>
          <Text>
            Yayınların açılması bazen uzun sürebilmektedir. Lütfen bekleyin.
          </Text>
          <Text style={{ marginTop: 10 }}>
            Kanalların sesi çıkmıyorsa telefonuzu sessiz moddan çıkarmayı
            unutmayın.
          </Text>
        </View>
      </ScrollView>
      {Banner()}
    </View>
  );
}

PlayerScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
