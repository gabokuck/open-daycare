export type PostCategory = "achievement" | "activity" | "announcement";

export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  achievement: "LOGRO",
  activity: "ACTIVIDAD",
  announcement: "ANUNCIO",
};

export interface MockPost {
  id: string;
  category: PostCategory;
  child: {
    name: string;
    initial: string;
    avatarBg: string;
    avatarFg: string;
    isGeneral?: boolean;
  };
  publishedAt: string;
  audience: string;
  body: string;
  photoCaption?: string;
  reactions: number;
  comments: number;
}

export const MOCK_POSTS: MockPost[] = [
  {
    id: "p-achievement",
    category: "achievement",
    child: { name: "Mateo", initial: "M", avatarBg: "#A9D9E8", avatarFg: "#1F7A93" },
    publishedAt: "14:20",
    audience: "Para: familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    reactions: 3,
    comments: 1,
  },
  {
    id: "p-activity",
    category: "activity",
    child: { name: "Mateo", initial: "M", avatarBg: "#A9D9E8", avatarFg: "#1F7A93" },
    publishedAt: "09:40",
    audience: "Para: familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photoCaption: "Foto · pintando con témperas",
    reactions: 5,
    comments: 2,
  },
  {
    id: "p-announcement",
    category: "announcement",
    child: {
      name: "Anuncio general",
      initial: "",
      avatarBg: "#CCD8F4",
      avatarFg: "#4E72C8",
      isGeneral: true,
    },
    publishedAt: "07:50",
    audience: "Para: toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    reactions: 8,
    comments: 0,
  },
];

export const CURRENT_USER = {
  initial: "C",
  name: "Caro Giménez",
  role: "Maestra · Soles",
} as const;
