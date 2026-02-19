export const SETTINGS_SCHEMA_VERSION = 1 as const;

export type ID = string;
export type ISODateString = string;

export interface User {
  id: ID;
  name: string;
  email?: string;
  avatarUrl?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Subject {
  id: ID;
  userId: ID;
  title: string;
  color?: string;
  description?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Note {
  id: ID;
  userId: ID;
  subjectId?: ID;
  title: string;
  body: string;
  tags: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: ID;
  userId: ID;
  subjectId?: ID;
  title: string;
  description?: string;
  dueAt?: ISODateString;
  status: TaskStatus;
  priority: 1 | 2 | 3 | 4 | 5;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface StudySession {
  id: ID;
  userId: ID;
  subjectId?: ID;
  startedAt: ISODateString;
  endedAt?: ISODateString;
  durationMinutes?: number;
  focusScore?: number;
  notes?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ChatThread {
  id: ID;
  userId: ID;
  title: string;
  subjectId?: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type ChatRole = "system" | "assistant" | "user";

export interface ChatMessage {
  id: ID;
  threadId: ID;
  role: ChatRole;
  content: string;
  createdAt: ISODateString;
}

export interface AnalyticsSnapshot {
  id: ID;
  userId: ID;
  capturedAt: ISODateString;
  totalStudyMinutes: number;
  sessionsCompleted: number;
  tasksCompleted: number;
  notesCreated: number;
  streakDays: number;
}

export type AIProviderType = "mock" | "openai-compatible";

export interface AISettings {
  provider: AIProviderType;
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  temperature?: number;
}

export interface UISettings {
  theme: "light" | "dark" | "system";
  timezone: string;
  typingSimulation: boolean;
}

export interface AppSettings {
  version: number;
  activeUserId?: ID;
  ai: AISettings;
  ui: UISettings;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface AppDataset {
  users: User[];
  subjects: Subject[];
  notes: Note[];
  tasks: Task[];
  studySessions: StudySession[];
  chatThreads: ChatThread[];
  chatMessages: ChatMessage[];
  analyticsSnapshots: AnalyticsSnapshot[];
  settings: AppSettings;
}

export type EntityStoreMap = Omit<AppDataset, "settings">;
export type EntityStoreName = keyof EntityStoreMap;

export const ENTITY_STORE_NAMES: EntityStoreName[] = [
  "users",
  "subjects",
  "notes",
  "tasks",
  "studySessions",
  "chatThreads",
  "chatMessages",
  "analyticsSnapshots",
];

export const DATASET_STORE_NAMES = [...ENTITY_STORE_NAMES, "settings"] as const;

export const defaultSettings = (now: ISODateString): AppSettings => ({
  version: SETTINGS_SCHEMA_VERSION,
  ai: {
    provider: "mock",
    temperature: 0.4,
  },
  ui: {
    theme: "system",
    timezone: "UTC",
    typingSimulation: true,
  },
  createdAt: now,
  updatedAt: now,
});
