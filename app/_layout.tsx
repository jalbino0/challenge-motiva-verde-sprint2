import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { OccurrenceProvider } from "../src/context/OccurrenceContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <OccurrenceProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </OccurrenceProvider>
    </SafeAreaProvider>
  );
}