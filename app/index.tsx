import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { theme } from "../src/styles/theme";

export default function EntryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.safe}>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 28,
            paddingBottom: insets.bottom + 22,
          },
        ]}
      >
        <View style={styles.topArea} />

        <View style={styles.centerArea}>
          <Image
            source={require("../assets/logo-simbolo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            title="bem vindo de volta operador"
            onPress={() => router.replace("/dashboard")}
            variant="primary"
          />

          <Text style={styles.footerText}>Challenge CCR Motiva - Sprint 2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  topArea: {
    height: 20,
  },
  centerArea: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logoImage: {
    width: 190,
    height: 190,
  },
  footer: {
    gap: 14,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.muted,
    fontSize: 12,
  },
});