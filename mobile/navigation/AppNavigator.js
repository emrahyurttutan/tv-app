//This is an example code for NavigationDrawer//
import React from "react";
//import react in our code.
import { Icon } from "react-native-elements";

import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import PlayerScreen from "../screens/PlayerScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import AboutScreen from "../screens/AboutScreen";
import AdressPlayerScreen from "../screens/AdressPlayerScreen";

const PlayerScreen_Stack = createStackNavigator({
  Player: {
    screen: PlayerScreen
  },
  Category: {
    screen: CategoriesScreen
  }
});

//For React Navigation 3.+
const DrawerNavigator = createDrawerNavigator(
  {
    GeneralChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "Genel Kanallar",
        drawerIcon: <Icon name="tv" type="material" color="#111" />
      },
      params: { CategoryId: 1, Title: "Genel Kanallar" }
    },

    HdChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "HD Kanallar",
        drawerIcon: <Icon name="hd" type="material" color="#111" />
      },
      params: { CategoryId: 2, Title: "HD Kanallar" }
    },
    NewChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "Haber Kanalları",
        drawerIcon: <Icon name="person-pin" type="material" color="#111" />
      },
      params: { CategoryId: 3, Title: "Haber Kanalları" }
    },
    SportChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "Spor Kanalları",
        drawerIcon: <Icon name="directions-run" type="material" color="#111" />
      },
      params: { CategoryId: 4, Title: "Spor Kanalları" }
    },
    ChildChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: " Çocuk Kanalları",
        drawerIcon: <Icon name="face" type="material" color="#111" />
      },
      params: { CategoryId: 5, Title: " Çocuk Kanalları" }
    },
    MusicChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "Müzik Kanalları",
        drawerIcon: <Icon name="music-note" type="material" color="#111" />
      },
      params: { CategoryId: 6, Title: "Müzik Kanalları" }
    },
    MovieChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "Sinema Kanalları",
        drawerIcon: <Icon name="movie" type="material" color="#111" />
      },
      params: { CategoryId: 7, Title: "Sinema Kanalları" }
    },
    DocumentaryChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "Belgesel Kanalları",
        drawerIcon: (
          <Icon name="photo-size-select-actual" type="material" color="#111" />
        )
      },
      params: { CategoryId: 8, Title: "Belgesel Kanalları" }
    },
    LocalChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "Yerel Kanallar",
        drawerIcon: <Icon name="location-on" type="material" color="#111" />
      },
      params: { CategoryId: 9, Title: "Yerel Kanallar" }
    },
    ReligionChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "Dini Kanallar",
        drawerIcon: <Icon name="import-contacts" type="material" color="#111" />
      },
      params: { CategoryId: 10, Title: "Dini Kanalları" }
    },
    ForeignChannels: {
      screen: CategoriesScreen,
      navigationOptions: {
        drawerLabel: "Yabancı Kanallar",
        drawerIcon: <Icon name="language" type="material" color="#111" />
      },
      params: { CategoryId: 11, Title: "Yabancı Kanalları" }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        drawerLabel: "Hakkımızda",
        drawerIcon: <Icon name="info" type="material" color="#111" />
      }
    },
    AdressTest: {
      screen: AdressPlayerScreen,
      navigationOptions: {
        drawerLabel: "Adresten İzle",
        drawerIcon: (
          <Icon name="play-circle-outline" type="material" color="#111" />
        )
      }
    },
    HiddenScreen: {
      screen: PlayerScreen_Stack,
      navigationOptions: {
        drawerLabel: () => null
      }
    }
  },
  {
    activeTintColor: "#e91e63",
    drawerType: "block",
    itemsContainerStyle: {
      marginVertical: 0,
      borderBottomColor: "red",
      borderBottomWidth: 1
    },
    iconContainerStyle: {
      opacity: 1,
      width: 20,
      padding: 0,
      margin: 0
    },
    labelStyle: {
      margin: 0,
      padding: 0,
      borderBottomColor: "red",
      borderBottomWidth: 1
    },
    itemStyle: {
      borderBottomColor: "red",
      borderBottomWidth: 1
    },

    header: null,
    gesturesEnabled: false,
    headerMode: "none"
  }
);

export default createAppContainer(DrawerNavigator);
