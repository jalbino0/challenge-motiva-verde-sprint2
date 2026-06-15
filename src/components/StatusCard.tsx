import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";

type Tone = "red" | "yellow" | "green" | "blue" | "purple";

type Props = {
  icon: string;
  value: string | number;
  label: string;
  tone?: Tone;
};

const toneMap = {
  red: {
    background: theme.colors.dangerSoft,
    color: theme.colors.danger,
  },
  yellow: {
    background: theme.colors.warningSoft,
    color: theme.colors.warning,
  },
  green: {
    background: theme.colors.successSoft,
    color: theme.colors.success,
  },
  blue: {
    background: theme.colors.infoSoft,
    color: theme.colors.info,
  },
  purple: {
    background: "#F1ECFF",
    color: theme.colors.primary,
  },
};

export function StatusCard({ icon, value, label, tone = "purple" }: Props) {
  const toneStyle = toneMap[tone];

  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: toneStyle.background }]}>
        <Text style={[styles.icon, { color: toneStyle.color }]}>{icon}</Text>
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 112,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: 14,
    justifyContent: "space-between",
    ...theme.shadow,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 16,
    fontWeight: "900",
  },
  value: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.dark,
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    color: theme.colors.muted,
    lineHeight: 17,
  },
});