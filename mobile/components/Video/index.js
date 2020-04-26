import React, { Component } from "react";
import { View, WebView } from "react-native";
import HTMLView from "react-native-htmlview";

export default class Videos extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HTMLView value={htmlContent} />
      </View>
    );
  }
}
