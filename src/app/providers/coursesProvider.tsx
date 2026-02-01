"use client";
import { useState } from "react";
import { CourseCtx } from "@/shared/context/courses-context";
import type { Course } from "@/shared/api";

interface CoursesProviderProps {
  children: React.ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  const [courses, setCourses] = useState<Course[] | []>([]);

  const addCoursesInCtx = (courses: Course[]) => setCourses(courses);
  const findById = (id: string) => {
    const course = courses.find((course) => course._id === id);
    if (!course) return null;
    return course;
  };

  return (
    <CourseCtx.Provider value={{ addCoursesInCtx, findById, courses }}>
      {children}
    </CourseCtx.Provider>
  );
};
