import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { StatusCard } from "../src/components/StatusCard";
import { roadSections, useOccurrences } from "../src/context/OccurrenceContext";
import { theme } from "../src/styles/theme";

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { occurrences } = useOccurrences();

  const criticalOccurrences = occurrences.filter(
    (occurrence) =>
      occurrence.priority === "Alta" ||
      occurrence.priority === "Crítica" ||
      occurrence.status === "Crítica"
  ).length;

  const pendingSections = roadSections.filter(
    (section) => section.status !== "Normal"
  ).length;

  const completedOccurrences = occurrences.filter(
    (occurrence) => occurrence.status === "Concluída"
  ).length;

  const openOccurrences = occurrences.filter(
    (occurrence) =>
      occurrence.status !== "Concluída" && occurrence.status !== "Cancelada"
  ).length;

  const latestOccurrences = occurrences.slice(0, 2);

  return (
    <View style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 36 },
        ]}
      >
        <View style={[styles.hero, { paddingTop: insets.top + 24 }]}>
          <Text style={styles.heroTitle}>Olá, Operador</Text>
          <Text style={styles.heroSubtitle}>Bem-vindo ao Motiva Verde</Text>
        </View>

        <View style={styles.cardsArea}>
          <View style={styles.grid}>
            <StatusCard
              icon="!"
              value={criticalOccurrences}
              label="Ocorrências críticas"
              tone="red"
            />
            <StatusCard
              icon="⌖"
              value={pendingSections}
              label="Trechos em atenção"
              tone="yellow"
            />
          </View>

          <View style={styles.grid}>
            <StatusCard
              icon="✓"
              value={completedOccurrences}
              label="Manutenções concluídas"
              tone="green"
            />
            <StatusCard
              icon="+"
              value={openOccurrences}
              label="Registros em aberto"
              tone="blue"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações rápidas</Text>

          <View style={styles.actions}>
            <PrimaryButton
              title="Registrar ocorrência"
              icon="+"
              variant="success"
              onPress={() => router.push("/registrar")}
            />

            <PrimaryButton
              title="Ver mapa de trechos"
              icon="⌖"
              variant="primary"
              onPress={() => router.push("/mapa")}
            />

            <PrimaryButton
              title="Acompanhar histórico"
              icon="↗"
              variant="dark"
              onPress={() => router.push("/historico")}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimos registros</Text>

          {latestOccurrences.map((occurrence) => (
            <View key={occurrence.id} style={styles.latestCard}>
              <View style={styles.latestInfo}>
                <Text style={styles.latestKm}>{occurrence.km}</Text>
                <Text style={styles.latestType}>{occurrence.type}</Text>
              </View>

              <Text style={styles.latestStatus}>{occurrence.status}</Text>
            </View>
          ))}
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
  scrollContent: {},
  hero: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 72,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 22,
    fontWeight: "900",
  },
  heroSubtitle: {
    color: "#EDE9FE",
    fontSize: 15,
    marginTop: 8,
  },
  cardsArea: {
    paddingHorizontal: 20,
    marginTop: -42,
    gap: 14,
  },
  grid: {
    flexDirection: "row",
    gap: 14,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: theme.colors.dark,
    marginBottom: 14,
  },
  actions: {
    gap: 14,
  },
  latestCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  latestInfo: {
    flex: 1,
  },
  latestKm: {
    fontSize: 15,
    fontWeight: "900",
    color: theme.colors.dark,
  },
  latestType: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.muted,
    lineHeight: 18,
  },
  latestStatus: {
    color: theme.colors.primary,
    fontWeight: "900",
    fontSize: 12,
  },
});