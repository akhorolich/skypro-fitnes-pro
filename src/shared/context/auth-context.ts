import { createContext} from "react";
import type { User } from "@/features/auth/api/types";

export interface IAuthContext {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User | null) => void;
  fetchMe: () => Promise<void>;
  logout: () => void;
  addSelectedCourse: (courseId: string) => void;
  removeSelectedCourse: (courseId: string) => void;
};

export const AuthCtx = createContext<IAuthContext | undefined>(undefined);