export type VegetationStatus = "Normal" | "Atenção" | "Crítico";
export type Priority = "Baixa" | "Média" | "Alta" | "Crítica";
export type OccurrenceStatus =
  | "Aberta"
  | "Em andamento"
  | "Concluída"
  | "Cancelada"
  | "Crítica";

export type RoadSection = {
  id: string;
  km: string;
  title: string;
  description: string;
  highway: string;
  city: string;
  status: VegetationStatus;
  risk: string;
  lastInspection: string;
  assetCode: string;
};

export type Occurrence = {
  id: string;
  km: string;
  section: string;
  highway: string;
  city: string;
  type: string;
  priority: Priority;
  status: OccurrenceStatus;
  description: string;
  height?: string;
  createdAt: string;
  createdBy: string;
  assetCode: string;
  location?: string;
  photoUri?: string | null;
};

export const roadSections: RoadSection[] = [
  {
    id: "T001",
    km: "KM 10 - KM 12",
    title: "Trecho Norte",
    description: "Vegetação dentro do padrão",
    highway: "Rodovia BR-050",
    city: "Uberaba",
    status: "Normal",
    risk: "Baixo",
    lastInspection: "16/05/2026",
    assetCode: "MV4723",
  },
  {
    id: "T002",
    km: "KM 15 - KM 16",
    title: "Trecho Intermediário",
    description: "Crescimento acelerado nas laterais",
    highway: "Rodovia BR-050",
    city: "Uberaba",
    status: "Atenção",
    risk: "Médio",
    lastInspection: "15/05/2026",
    assetCode: "MV4780",
  },
  {
    id: "T003",
    km: "KM 22",
    title: "Trecho de Visibilidade",
    description: "Mato alto bloqueando visibilidade",
    highway: "Rodovia BR-050",
    city: "Uberlândia",
    status: "Crítico",
    risk: "Alto",
    lastInspection: "16/05/2026",
    assetCode: "MV4723",
  },
  {
    id: "T004",
    km: "KM 35 - KM 38",
    title: "Trecho Sul",
    description: "Vegetação dentro do padrão",
    highway: "Rodovia BR-050",
    city: "Uberlândia",
    status: "Normal",
    risk: "Baixo",
    lastInspection: "13/05/2026",
    assetCode: "MV4756",
  },
  {
    id: "T005",
    km: "KM 42",
    title: "Trecho de Poda",
    description: "Necessidade de poda preventiva",
    highway: "Rodovia BR-050",
    city: "Araguari",
    status: "Atenção",
    risk: "Médio",
    lastInspection: "14/05/2026",
    assetCode: "MV7785",
  },
];

export const initialOccurrences: Occurrence[] = [
  {
    id: "OC001",
    km: "KM 22",
    section: "Trecho de Visibilidade",
    highway: "Rodovia BR-050",
    city: "Uberlândia",
    type: "Mato alto bloqueando visibilidade",
    priority: "Alta",
    status: "Em andamento",
    description:
      "Vegetação avançando sobre a lateral da pista e prejudicando a visão dos motoristas.",
    height: "1,20m",
    createdAt: "16/05/2026",
    createdBy: "Operador de Campo",
    assetCode: "MV4723",
    location: "GPS: -18.9146, -48.2754",
    photoUri: null,
  },
  {
    id: "OC002",
    km: "KM 15 - 16",
    section: "Trecho Intermediário",
    highway: "Rodovia BR-050",
    city: "Uberaba",
    type: "Necessidade de roçada",
    priority: "Média",
    status: "Concluída",
    description:
      "Vegetação lateral acima do padrão operacional. Roçada registrada como concluída.",
    height: "80cm",
    createdAt: "15/05/2026",
    createdBy: "Equipe de Conservação",
    assetCode: "MV4780",
    location: "GPS: -19.7472, -47.9381",
    photoUri: null,
  },
  {
    id: "OC003",
    km: "KM 42",
    section: "Trecho de Poda",
    highway: "Rodovia BR-050",
    city: "Araguari",
    type: "Poda necessária em árvore",
    priority: "Crítica",
    status: "Crítica",
    description:
      "Galhos próximos à sinalização vertical e com risco de comprometer a visibilidade.",
    height: "2,10m",
    createdAt: "14/05/2026",
    createdBy: "Agente de Conservação",
    assetCode: "MV7785",
    location: "GPS: -18.6470, -48.1877",
    photoUri: null,
  },
  {
    id: "OC004",
    km: "KM 35",
    section: "Trecho Sul",
    highway: "Rodovia BR-050",
    city: "Uberlândia",
    type: "Manutenção de faixa de domínio",
    priority: "Baixa",
    status: "Concluída",
    description:
      "Manutenção preventiva realizada em faixa de domínio com vegetação controlada.",
    height: "40cm",
    createdAt: "13/05/2026",
    createdBy: "Equipe de Conservação",
    assetCode: "MV4756",
    location: "GPS: -18.9503, -48.3155",
    photoUri: null,
  },
  {
    id: "OC005",
    km: "KM 28",
    section: "Trecho Norte",
    highway: "Rodovia BR-050",
    city: "Uberaba",
    type: "Visibilidade comprometida",
    priority: "Baixa",
    status: "Cancelada",
    description:
      "Registro cancelado após nova inspeção indicar que o trecho estava dentro do padrão.",
    height: "50cm",
    createdAt: "12/05/2026",
    createdBy: "Operador de Campo",
    assetCode: "MV4720",
    location: "GPS: -19.7103, -47.9821",
    photoUri: null,
  },
];

export const occurrenceTypes = [
  "Mato alto bloqueando visibilidade",
  "Vegetação obstruindo sinalização",
  "Necessidade de roçada",
  "Poda necessária em árvore",
  "Vegetação próxima ao acostamento",
  "Manutenção de faixa de domínio",
];

export const priorities: Priority[] = ["Baixa", "Média", "Alta", "Crítica"];