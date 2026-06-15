import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { roadSections } from "../src/context/OccurrenceContext";
import { theme } from "../src/styles/theme";

function getSectionStyle(status: string) {
  if (status === "Normal") {
    return {
      background: theme.colors.successSoft,
      border: "#86EFAC",
      text: theme.colors.success,
    };
  }

  if (status === "Atenção") {
    return {
      background: theme.colors.warningSoft,
      border: "#FCD34D",
      text: theme.colors.warning,
    };
  }

  return {
    background: theme.colors.dangerSoft,
    border: "#FCA5A5",
    text: theme.colors.danger,
  };
}

export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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

          <View style={styles.headerInfo}>
            <Text style={styles.title}>Mapa de Trechos</Text>
            <Text style={styles.subtitle}>Rodovia BR-050</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Visualização dos trechos monitorados
          </Text>

          <View style={styles.mapBar}>
            <View style={[styles.barItem, styles.greenBar]} />
            <View style={[styles.barItem, styles.yellowBar]} />
            <View style={[styles.barItem, styles.redBar]} />
            <View style={[styles.barItem, styles.greenBar]} />
            <View style={[styles.barItem, styles.yellowBar]} />
          </View>

          <View style={styles.legend}>
            <Text style={styles.legendText}>● Normal</Text>
            <Text style={styles.legendText}>● Atenção</Text>
            <Text style={styles.legendText}>● Crítico</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Detalhes dos trechos</Text>

        {roadSections.map((section) => {
          const sectionStyle = getSectionStyle(section.status);

          return (
            <View
              key={section.id}
              style={[
                styles.sectionCard,
                {
                  backgroundColor: sectionStyle.background,
                  borderColor: sectionStyle.border,
                },
              ]}
            >
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionKm, { color: sectionStyle.text }]}>
                  {section.km}
                </Text>

                <Text style={[styles.status, { color: sectionStyle.text }]}>
                  {section.status}
                </Text>
              </View>

              <Text
                style={[
                  styles.sectionDescription,
                  { color: sectionStyle.text },
                ]}
              >
                {section.description}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.meta}>Risco: {section.risk}</Text>
                <Text style={styles.meta}>
                  Última inspeção: {section.lastInspection}
                </Text>
              </View>
            </View>
          );
        })}
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
  headerInfo: {
    flex: 1,
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
  title: {
    color: theme.colors.dark,
    fontSize: 21,
    fontWeight: "900",
  },
  subtitle: {
    color: theme.colors.muted,
    marginTop: 4,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 24,
    ...theme.shadow,
  },
  cardTitle: {
    color: theme.colors.dark,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 14,
  },
  mapBar: {
    height: 28,
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 14,
  },
  barItem: {
    flex: 1,
  },
  greenBar: {
    backgroundColor: "#22C55E",
  },
  yellowBar: {
    backgroundColor: "#FACC15",
  },
  redBar: {
    backgroundColor: "#EF4444",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  legendText: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "800",
  },
  sectionTitle: {
    color: theme.colors.dark,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 14,
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 16,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  sectionKm: {
    fontSize: 16,
    fontWeight: "900",
  },
  status: {
    fontSize: 12,
    fontWeight: "900",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  metaRow: {
    marginTop: 14,
    gap: 4,
  },
  meta: {
    color: theme.colors.muted,
    fontSize: 12,
  },
});