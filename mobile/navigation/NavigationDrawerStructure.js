import React, { Component } from "react";
import { Icon } from "react-native-elements";
import { View, TouchableOpacity } from "react-native";
export default class NavigationDrawerStructure extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigationProps.toggleDrawer();
            if (this.props.onClick) {
              this.props.onClick();
            }
          }}
        >
          <Icon name="menu" type="material" color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}
