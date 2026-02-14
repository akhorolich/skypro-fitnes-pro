"use client";

import { useContext } from "react";
import { CourseCtx } from "./courses-context";

export const useCourseCtx = () => {
  const context = useContext(CourseCtx);
  if (!context) {
    throw new Error(`useCourseCtx использутся вне своего контекста`);
  }
  return context;
};
