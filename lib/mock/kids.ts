export type AllergyLabel = "MANÍ" | "LACTOSA";
export type LinkChipLabel = "VINCULAR";
export type KidChip =
  | { kind: "allergy"; label: AllergyLabel }
  | { kind: "link"; label: LinkChipLabel };

export type ParentStatus = "active" | "pending";

export const PARENT_STATUS_LABELS: Record<ParentStatus, string> = {
  active: "ACTIVA",
  pending: "PENDIENTE",
};

export interface MockParent {
  initial: string;
  name: string;
  role: string;
  status: ParentStatus;
  avatarBg: string;
  avatarFg: string;
}

export interface MockKid {
  id: string;
  name: string;
  initial: string;
  avatarBg: string;
  avatarFg: string;
  age: string;
  birthDate: string;
  ingreso: string;
  chip: KidChip | null;
  allergyText?: string;
  parentsCountText: string;
  parents: MockParent[];
}

export const MOCK_KIDS: MockKid[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    initial: "M",
    avatarBg: "#A9D9E8",
    avatarFg: "#1F7A93",
    age: "3 años",
    birthDate: "12 mar 2022",
    ingreso: "feb 2025",
    chip: { kind: "allergy", label: "MANÍ" },
    allergyText:
      "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parentsCountText: "2 padres vinculados",
    parents: [
      {
        initial: "L",
        name: "Lucía Fernández",
        role: "Mamá",
        status: "active",
        avatarBg: "#C9B6E8",
        avatarFg: "#fff",
      },
      {
        initial: "D",
        name: "Diego Fernández",
        role: "Papá",
        status: "pending",
        avatarBg: "#A9C7E8",
        avatarFg: "#fff",
      },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    initial: "S",
    avatarBg: "#F4B8CC",
    avatarFg: "#C44A7A",
    age: "2 años",
    birthDate: "8 jul 2023",
    ingreso: "mar 2025",
    chip: null,
    parentsCountText: "1 padre vinculado",
    parents: [
      {
        initial: "A",
        name: "Andrea Méndez",
        role: "Mamá",
        status: "active",
        avatarBg: "#F4B8CC",
        avatarFg: "#fff",
      },
    ],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    initial: "B",
    avatarBg: "#B9DEC4",
    avatarFg: "#3E8B62",
    age: "3 años",
    birthDate: "3 oct 2021",
    ingreso: "ene 2025",
    chip: null,
    parentsCountText: "2 padres vinculados",
    parents: [
      {
        initial: "M",
        name: "Mariana Ortiz",
        role: "Mamá",
        status: "active",
        avatarBg: "#B9DEC4",
        avatarFg: "#fff",
      },
      {
        initial: "P",
        name: "Pablo Ruiz",
        role: "Papá",
        status: "active",
        avatarBg: "#F4DC8E",
        avatarFg: "#3F362E",
      },
    ],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    initial: "V",
    avatarBg: "#F4DC8E",
    avatarFg: "#9A7B1E",
    age: "2 años",
    birthDate: "19 may 2023",
    ingreso: "abr 2025",
    chip: { kind: "link", label: "VINCULAR" },
    parentsCountText: "sin padres vinculados",
    parents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    initial: "T",
    avatarBg: "#C9B6E8",
    avatarFg: "#7B5FC0",
    age: "3 años",
    birthDate: "27 ene 2022",
    ingreso: "feb 2025",
    chip: { kind: "allergy", label: "LACTOSA" },
    allergyText:
      "Intolerancia a la lactosa. Usar leche sin lactosa en todas las comidas.",
    parentsCountText: "1 padre vinculado",
    parents: [
      {
        initial: "L",
        name: "Laura Díaz",
        role: "Mamá",
        status: "active",
        avatarBg: "#C9B6E8",
        avatarFg: "#fff",
      },
    ],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    initial: "E",
    avatarBg: "#F4B8CC",
    avatarFg: "#C44A7A",
    age: "2 años",
    birthDate: "14 sep 2023",
    ingreso: "mar 2025",
    chip: null,
    parentsCountText: "1 padre vinculado",
    parents: [
      {
        initial: "R",
        name: "Ricardo Castro",
        role: "Papá",
        status: "active",
        avatarBg: "#F4B8CC",
        avatarFg: "#fff",
      },
    ],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    initial: "L",
    avatarBg: "#A9D9E8",
    avatarFg: "#1F7A93",
    age: "3 años",
    birthDate: "6 mar 2022",
    ingreso: "ene 2025",
    chip: null,
    parentsCountText: "1 padre vinculado",
    parents: [
      {
        initial: "M",
        name: "María Romero",
        role: "Mamá",
        status: "active",
        avatarBg: "#A9D9E8",
        avatarFg: "#fff",
      },
    ],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    initial: "O",
    avatarBg: "#B9DEC4",
    avatarFg: "#3E8B62",
    age: "2 años",
    birthDate: "22 nov 2023",
    ingreso: "abr 2025",
    chip: null,
    parentsCountText: "1 padre vinculado",
    parents: [
      {
        initial: "J",
        name: "José Vega",
        role: "Papá",
        status: "active",
        avatarBg: "#B9DEC4",
        avatarFg: "#fff",
      },
    ],
  },
];
