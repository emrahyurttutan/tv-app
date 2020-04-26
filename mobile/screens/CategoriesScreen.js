import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import List from "../components/List";
import { Header } from "react-native-elements";
import Colors from "../constants/Colors";
import NavigationDrawerStructure from "../navigation/NavigationDrawerStructure";
// import { StoreReview } from "expo";
import { axiosPost } from "../utils/axios";
export default function CategoriesScreen({ navigation }) {
  const [categoryId] = useState(navigation.getParam("CategoryId", []));
  const [title] = useState(navigation.getParam("Title", []));
  const [items, setItems] = useState([]);
  useEffect(() => {
    // if (Platform.OS === "ios") {
    //   if (StoreReview.hasAction()) StoreReview.requestReview();
    // }
    axiosPost(`category_channels/${categoryId}`).then(res => {
      if (res.success) {
        setItems(res.data);
      } else {
        setItems([]);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <NavigationDrawerStructure navigationProps={navigation} />
        }
        centerComponent={{
          text: title,
          style: { color: "#fff", fontWeight: "bold" }
        }}
        containerStyle={{
          backgroundColor: Colors.tintColor,
          justifyContent: "space-around"
        }}
        /*rightComponent={{ icon: "home", color: "#fff" }}*/
      />

      <List
        dataName="ChannelList"
        items={items}
        navigation={navigation}
        navigate="Player"
      />
    </View>
  );
}

CategoriesScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
