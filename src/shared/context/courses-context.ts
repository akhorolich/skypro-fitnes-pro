'use client';
import { createContext, useContext } from "react";
import { Course } from "../api";

interface ICourseCtx {
  findById: (id: string) => Course | null;
  addCoursesInCtx: (courses: Course[]) => void;
  courses: [] | Course[];
}

export const CourseCtx = createContext<ICourseCtx | null>(null);

export const useCourseCtx = () => {
  const context = useContext(CourseCtx);
  if (!context) {
    throw new Error(`useCourseCtx использутся вне своего контекста`);
  }
  return context;
};
