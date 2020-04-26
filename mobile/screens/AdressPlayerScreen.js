import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Layout from "../constants/Layout";
import Banner from "../components/Admob/Banner";
import { Video } from "expo-av";
import { Header, Text, Input, Button } from "react-native-elements";
import Colors from "../constants/Colors";
import NavigationDrawerStructure from "../navigation/NavigationDrawerStructure";
export default function AdressPlayerScreen({ navigation }) {
  _onLoadStart = () => {
    // console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  handleVideoRef = ref => {
    this.video = ref;
  };

  const [height] = useState(260);
  const [url, onChangeUrl] = useState("");
  const [type, setType] = useState("url");

  useEffect(() => {
    return () => {
      this.video.pauseAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <NavigationDrawerStructure
            navigationProps={navigation}
            onClick={() => {
              if (navigation.openDrawer()) {
                this.video.stopAsync();
              } else if (navigation.closeDrawer()) {
                this.video.playAsync();
              }
            }}
          />
        }
        centerComponent={{
          text: "Adresten İzle",
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
            this.video.stopAsync();
            navigation.goBack(null);
          }
        }}
      />
      <ScrollView>
        {type === "url" ? (
          <View style={{ margin: 10 }}>
            <Input
              placeholder="İzlemek istediğiniz yayın adresini girin"
              onChangeText={text => onChangeUrl(text)}
              value={url}
            />
            <Button
              title="İzle"
              type="solid"
              onPress={() => setType("player")}
            />
          </View>
        ) : (
          <Video
            ref={this.handleVideoRef}
            source={{
              uri: url
            }}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            rate={1.0}
            shouldPlay
            volume={1.0}
            isMuted={false}
            useNativeControls
            fullscreen={true}
            style={{
              width: Layout.window.width,
              height: Layout.window.height - height
            }}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
            inFullscreen={true}
          />
        )}
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

AdressPlayerScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
