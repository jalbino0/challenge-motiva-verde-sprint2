import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Occurrence } from "../data/mockData";
import { theme } from "../styles/theme";

type Props = {
  occurrence: Occurrence;
  showAction?: boolean;
  onFinish?: () => void;
};

function getCardStyle(occurrence: Occurrence) {
  if (occurrence.status === "Concluída") {
    return {
      background: theme.colors.successSoft,
      border: "#B7E8C8",
      text: theme.colors.success,
    };
  }

  if (occurrence.status === "Cancelada") {
    return {
      background: "#F4F4F5",
      border: "#E4E4E7",
      text: theme.colors.muted,
    };
  }

  if (occurrence.status === "Crítica" || occurrence.priority === "Crítica") {
    return {
      background: theme.colors.dangerSoft,
      border: "#F8B4B4",
      text: theme.colors.danger,
    };
  }

  if (occurrence.priority === "Alta") {
    return {
      background: "#EEF2FF",
      border: "#C7D2FE",
      text: theme.colors.primary,
    };
  }

  if (occurrence.priority === "Média") {
    return {
      background: theme.colors.warningSoft,
      border: "#FCD34D",
      text: theme.colors.warning,
    };
  }

  return {
    background: theme.colors.white,
    border: theme.colors.border,
    text: theme.colors.dark,
  };
}

export function OccurrenceCard({
  occurrence,
  showAction = false,
  onFinish,
}: Props) {
  const cardStyle = getCardStyle(occurrence);

  const canFinish =
    showAction &&
    occurrence.status !== "Concluída" &&
    occurrence.status !== "Cancelada";

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardStyle.background,
          borderColor: cardStyle.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.km}>{occurrence.km}</Text>
          <Text style={[styles.type, { color: cardStyle.text }]}>
            {occurrence.type}
          </Text>
        </View>

        <View style={[styles.badge, { borderColor: cardStyle.text }]}>
          <Text style={[styles.badgeText, { color: cardStyle.text }]}>
            {occurrence.status}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{occurrence.description}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>📅 {occurrence.createdAt}</Text>
        <Text style={styles.meta}>📍 {occurrence.assetCode}</Text>
      </View>

      {canFinish && (
        <Pressable style={styles.actionButton} onPress={onFinish}>
          <Text style={styles.actionText}>Marcar como concluída</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 16,
    marginBottom: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  headerInfo: {
    flex: 1,
  },
  km: {
    fontSize: 17,
    fontWeight: "900",
    color: theme.colors.dark,
    marginBottom: 4,
  },
  type: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "900",
  },
  description: {
    color: theme.colors.dark,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 14,
  },
  meta: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  actionButton: {
    marginTop: 14,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    paddingVertical: 11,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionText: {
    color: theme.colors.success,
    fontWeight: "900",
    fontSize: 13,
  },
});