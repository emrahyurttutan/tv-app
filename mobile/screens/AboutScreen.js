import React, { Component } from "react";
import { Platform, Linking, View, Text, StyleSheet } from "react-native";
import { Card, ListItem, Header, Divider } from "react-native-elements";
import Colors from "../constants/Colors";
import NavigationDrawerStructure from "../navigation/NavigationDrawerStructure";

export default class About extends Component {
  state = {
    about: [
      { title: "Uygulamaya Oy Ver", icon: "star" },
      { title: "Diğer Uygulamalar", icon: "person" }
    ]
  };

  _handleRateWebBrowser = () => {
    const url =
      Platform.OS == "ios"
        ? "https://apps.apple.com/tr/app/ehliyet-2019-çıkmış-sorular/id1435728653?l=tr"
        : "https://play.google.com/store/apps/details?id=com.emrahyurttutan.tvapp";

    this.openUrl(url);
  };

  openUrl = url =>
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });

  _otherApp = () => {
    const url =
      Platform.OS == "ios"
        ? "https://apps.apple.com/tr/developer/emrah-yurttutan/id1434663262?l=tr"
        : "https://play.google.com/store/apps/developer?id=Best+Developers+Word&hl=tr";

    this.openUrl(url);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <NavigationDrawerStructure
              navigationProps={this.props.navigation}
            />
          }
          containerStyle={{
            backgroundColor: Colors.tintColor,
            justifyContent: "space-around"
          }}
          centerComponent={{
            text: "Hakkımızda",
            style: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: Colors.headerFontSize
            }
          }}
        />
        <Card containerStyle={{ padding: 0 }}>
          <View>
            <View style={{ margin: 10 }}>
              <Text
                h5
                style={{
                  paddingBottom: 10,
                  color: "#e17055"
                }}
              >
                Önemli Bilgiler
              </Text>
              <Divider />
              <Text style={{ paddingBottom: 10, paddingTop: 10 }}>
                Yayınların açılması bazen uzun sürebilmektedir. Lütfen bekleyin.
              </Text>
              <Divider />
              <Text style={{ paddingBottom: 10, paddingTop: 10 }}>
                Kanalların sesi çıkmıyorsa telefonuzu sessiz moddan çıkarmayı
                unutmayın.
              </Text>
            </View>
            {this.state.about.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
                onPress={() =>
                  i === 0 ? this._handleRateWebBrowser() : this._otherApp()
                }
              />
            ))}
            <View style={{ margin: 10 }}>
              <Text>
                Uygulamamıza 5 yıldız ve yorum yaparak bize destek
                olabilirsiniz.
              </Text>
              <Text>İyi eğlenceler</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

About.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
