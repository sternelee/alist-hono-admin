export const enum LocalStorageKey {
  THEME = "alist-theme",
}

export interface UserSession {
  token: string;
  id: string;
  name: string;
  email: string;
  password: null;
  role: "editor" | "user" | "admin";
  plan: null;
  createdOn: number;
  updatedOn: number;
  userId: string;
}
