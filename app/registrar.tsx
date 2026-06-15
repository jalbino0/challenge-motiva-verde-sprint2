import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { roadSections, useOccurrences } from "../src/context/OccurrenceContext";
import {
  occurrenceTypes,
  priorities,
  Priority,
  RoadSection,
} from "../src/data/mockData";
import { theme } from "../src/styles/theme";

export default function RegisterOccurrenceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addOccurrence } = useOccurrences();

  const [selectedSection, setSelectedSection] = useState<RoadSection>(
    roadSections[0]
  );
  const [km, setKm] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState<Priority>("Média");
  const [height, setHeight] = useState("");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState(
    "GPS: localização automática não capturada"
  );
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleGetLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLocationText("GPS: permissão de localização negada");
      Alert.alert(
        "Permissão negada",
        "Não foi possível capturar a localização do dispositivo."
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    const latitude = location.coords.latitude.toFixed(4);
    const longitude = location.coords.longitude.toFixed(4);

    setLocationText(`GPS: ${latitude}, ${longitude}`);
  }

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão negada",
        "Não foi possível acessar a galeria do dispositivo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.6,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function handleTakePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão negada",
        "Não foi possível acessar a câmera do dispositivo."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.6,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  function handleSave() {
    if (!km.trim()) {
      Alert.alert("Campo obrigatório", "Informe o KM da ocorrência.");
      return;
    }

    if (!type) {
      Alert.alert("Campo obrigatório", "Selecione o tipo de ocorrência.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Campo obrigatório", "Descreva a situação encontrada.");
      return;
    }

    setSaving(true);

    const formattedKm = km.toUpperCase().includes("KM")
      ? km.trim()
      : `KM ${km.trim()}`;

    addOccurrence({
      km: formattedKm,
      section: selectedSection.title,
      highway: selectedSection.highway,
      city: selectedSection.city,
      type,
      priority,
      status: priority === "Crítica" ? "Crítica" : "Em andamento",
      description: description.trim(),
      height: height.trim(),
      location: locationText,
      photoUri,
      assetCode: selectedSection.assetCode,
    });

    setSaving(false);

    Alert.alert(
      "Ocorrência registrada",
      "O registro foi salvo no histórico e os indicadores do dashboard foram atualizados.",
      [
        {
          text: "Ver histórico",
          onPress: () => router.replace("/historico"),
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

          <View style={styles.headerInfo}>
            <Text style={styles.title}>Registrar Ocorrência</Text>
            <Text style={styles.subtitle}>Preencha os dados abaixo</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Localização / KM da rodovia</Text>

          <TextInput
            style={styles.input}
            value={km}
            onChangeText={setKm}
            placeholder="Ex: KM 22 ou KM 15 - 16"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.helper}>{locationText}</Text>

          <PrimaryButton
            title="Capturar GPS"
            icon="⌖"
            variant="outline"
            onPress={handleGetLocation}
            style={styles.smallButton}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Trecho monitorado</Text>

          <View style={styles.chipGroup}>
            {roadSections.map((section) => (
              <Pressable
                key={section.id}
                style={[
                  styles.chip,
                  selectedSection.id === section.id && styles.chipSelected,
                ]}
                onPress={() => setSelectedSection(section)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedSection.id === section.id &&
                      styles.chipTextSelected,
                  ]}
                >
                  {section.km}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Tipo de ocorrência</Text>

          <View style={styles.chipGroup}>
            {occurrenceTypes.map((item) => (
              <Pressable
                key={item}
                style={[styles.chip, type === item && styles.chipSelected]}
                onPress={() => setType(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    type === item && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Prioridade</Text>

          <View style={styles.priorityRow}>
            {priorities.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.priorityChip,
                  priority === item && styles.prioritySelected,
                ]}
                onPress={() => setPriority(item)}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === item && styles.priorityTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Altura estimada da vegetação</Text>

          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="Ex: 1,5m ou 80cm"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Descrição breve</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva a situação encontrada..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Adicionar foto</Text>

          <View style={styles.photoActions}>
            <PrimaryButton
              title="Tirar foto"
              variant="outline"
              onPress={handleTakePhoto}
              style={styles.photoButton}
            />

            <PrimaryButton
              title="Escolher galeria"
              variant="outline"
              onPress={handlePickImage}
              style={styles.photoButton}
            />
          </View>

          {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}
        </View>

        <PrimaryButton
          title="Salvar ocorrência"
          icon="✓"
          variant="success"
          onPress={handleSave}
          loading={saving}
        />
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
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 14,
  },
  label: {
    color: theme.colors.dark,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
  },
  input: {
    minHeight: 52,
    backgroundColor: theme.colors.input,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    color: theme.colors.dark,
    fontSize: 14,
  },
  textArea: {
    minHeight: 110,
    paddingTop: 14,
  },
  helper: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 10,
  },
  smallButton: {
    marginTop: 14,
    minHeight: 44,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  chipSelected: {
    backgroundColor: "#F1ECFF",
    borderColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "800",
  },
  chipTextSelected: {
    color: theme.colors.primary,
  },
  priorityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  priorityChip: {
    flex: 1,
    minWidth: 70,
    alignItems: "center",
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: 12,
  },
  prioritySelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  priorityText: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "900",
  },
  priorityTextSelected: {
    color: theme.colors.white,
  },
  photoActions: {
    flexDirection: "row",
    gap: 10,
  },
  photoButton: {
    flex: 1,
    minHeight: 46,
  },
  photo: {
    width: "100%",
    height: 180,
    borderRadius: theme.radius.md,
    marginTop: 14,
  },
});