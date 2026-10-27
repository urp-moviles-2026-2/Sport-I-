
import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeLogoButton() {
  return (
    <Pressable
      onPress={() => router.navigate("/")}
      accessibilityRole="button"
      accessibilityLabel="Volver al inicio"
      style={styles.button}
    >
      <Image
        source={require("../../../../assets/images/pelotaya/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  logo: {
    width: 90,
    height: 36,
  },
});
