import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  initialOccurrences,
  Occurrence,
  OccurrenceStatus,
  Priority,
  roadSections,
} from "../data/mockData";

type NewOccurrenceInput = {
  km: string;
  section: string;
  highway: string;
  city: string;
  type: string;
  priority: Priority;
  description: string;
  height?: string;
  location?: string;
  photoUri?: string | null;
  assetCode?: string;
  status?: OccurrenceStatus;
};

type OccurrenceContextData = {
  occurrences: Occurrence[];
  addOccurrence: (input: NewOccurrenceInput) => Occurrence;
  updateOccurrenceStatus: (id: string, status: OccurrenceStatus) => void;
  resetMockData: () => void;
};

const STORAGE_KEY = "@motiva_verde_occurrences";

const OccurrenceContext = createContext<OccurrenceContextData | undefined>(
  undefined
);

export function OccurrenceProvider({ children }: { children: React.ReactNode }) {
  const [occurrences, setOccurrences] =
    useState<Occurrence[]>(initialOccurrences);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadOccurrences() {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedData) {
          setOccurrences(JSON.parse(storedData));
        }
      } catch (error) {
        console.log("Erro ao carregar mocks salvos:", error);
      } finally {
        setLoaded(true);
      }
    }

    loadOccurrences();
  }, []);

  useEffect(() => {
    async function saveOccurrences() {
      if (!loaded) return;

      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(occurrences));
      } catch (error) {
        console.log("Erro ao salvar ocorrências:", error);
      }
    }

    saveOccurrences();
  }, [occurrences, loaded]);

  function addOccurrence(input: NewOccurrenceInput) {
    const newOccurrence: Occurrence = {
      id: `OC${Date.now()}`,
      km: input.km,
      section: input.section,
      highway: input.highway,
      city: input.city,
      type: input.type,
      priority: input.priority,
      status: input.status ?? "Em andamento",
      description: input.description,
      height: input.height,
      createdAt: new Date().toLocaleDateString("pt-BR"),
      createdBy: "Operador de Campo",
      assetCode:
        input.assetCode ?? `MV${Math.floor(1000 + Math.random() * 8999)}`,
      location: input.location,
      photoUri: input.photoUri ?? null,
    };

    setOccurrences((currentOccurrences) => [
      newOccurrence,
      ...currentOccurrences,
    ]);

    return newOccurrence;
  }

  function updateOccurrenceStatus(id: string, status: OccurrenceStatus) {
    setOccurrences((currentOccurrences) =>
      currentOccurrences.map((occurrence) =>
        occurrence.id === id ? { ...occurrence, status } : occurrence
      )
    );
  }

  function resetMockData() {
    setOccurrences(initialOccurrences);
  }

  const value = useMemo(
    () => ({
      occurrences,
      addOccurrence,
      updateOccurrenceStatus,
      resetMockData,
    }),
    [occurrences]
  );

  return (
    <OccurrenceContext.Provider value={value}>
      {children}
    </OccurrenceContext.Provider>
  );
}

export function useOccurrences() {
  const context = useContext(OccurrenceContext);

  if (!context) {
    throw new Error(
      "useOccurrences deve ser usado dentro de um OccurrenceProvider"
    );
  }

  return context;
}

export { roadSections };