import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OccurrenceCard } from "../src/components/OccurrenceCard";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { useOccurrences } from "../src/context/OccurrenceContext";
import { theme } from "../src/styles/theme";

export default function HistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { occurrences, updateOccurrenceStatus, resetMockData } =
    useOccurrences();

  function handleFinishOccurrence(id: string) {
    updateOccurrenceStatus(id, "Concluída");

    Alert.alert(
      "Status atualizado",
      "A ocorrência foi marcada como concluída no mock local."
    );
  }

  function handleReset() {
    Alert.alert(
      "Restaurar dados mockados",
      "Isso vai apagar os registros criados no teste e restaurar os dados iniciais.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Restaurar",
          style: "destructive",
          onPress: resetMockData,
        },
      ]
    );
  }

  return (
    <View style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top + 18,
            paddingBottom: insets.bottom + 42,
          },
        ]}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </Pressable>

          <View style={styles.headerContent}>
            <Text style={styles.title}>Histórico</Text>
            <Text style={styles.subtitle}>Ocorrências registradas</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{occurrences.length}</Text>
          <Text style={styles.summaryText}>registros salvos no mock local</Text>
        </View>

        {occurrences.map((occurrence) => (
          <OccurrenceCard
            key={occurrence.id}
            occurrence={occurrence}
            showAction
            onFinish={() => handleFinishOccurrence(occurrence.id)}
          />
        ))}

        <View style={styles.footerActions}>
          <PrimaryButton
            title="Registrar nova ocorrência"
            icon="+"
            variant="success"
            onPress={() => router.push("/registrar")}
          />

          <PrimaryButton
            title="Restaurar mocks iniciais"
            variant="outline"
            onPress={handleReset}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  backText: {
    fontSize: 24,
    color: theme.colors.dark,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    color: theme.colors.dark,
    fontSize: 21,
    fontWeight: "900",
  },
  subtitle: {
    color: theme.colors.muted,
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  summaryNumber: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: "900",
  },
  summaryText: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: "800",
  },
  footerActions: {
    gap: 14,
    marginTop: 10,
  },
});