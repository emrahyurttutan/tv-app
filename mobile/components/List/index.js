import React from "react";
import { View, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import Banner from "../Admob/Banner";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";
export default function List({ navigation, navigate, items }) {
  //const [items] = useState(Data[dataName]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          {items.map((l, index) => (
            <ListItem
              Component={TouchableScale}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              containerStyle={{
                backgroundColor:
                  index % 2 === 0
                    ? Colors.linearGradientGrayColor
                    : Colors.linearGradientGray2Color
              }}
              onPress={() => {
                navigation.navigate(navigate, {
                  data: l
                });
              }}
              key={l.id}
              title={l.name}
              bottomDivider
              leftAvatar={{
                rounded: false,
                source: { uri: "https://tvapi.yurttutan.net/" + l.icon }
              }}
            />
          ))}
        </View>
      </ScrollView>
      {Banner()}
    </View>
  );
}
