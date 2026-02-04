import { createContext } from "react";
import { Course } from "../api";

interface ICourseCtx {
  findById: (id: string) => Course | null;
  addCoursesInCtx: (courses: Course[]) => void;
  courses: [] | Course[];
}

export const CourseCtx = createContext<ICourseCtx | null>(null);
