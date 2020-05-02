import React, { PureComponent } from "react";
import { View, Image, StyleSheet } from "react-native";



export default class SplashScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../img/icon_splash.png")}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6202F5"
  }
});
