import { CourseCard } from "@/features/courses/ui/course.card";
import { Course } from "@/shared/api";
import { JSX } from "react";

export const getSelectedCourses = (
  userSelected: string[] | undefined,
  allCourses: Course[],
): JSX.Element[] => {
  if (!userSelected) return [];
  const coursesSet = new Set(userSelected);
  const selected = allCourses.filter((course) => coursesSet.has(course._id));
  console.log(selected);

  return selected.map((course) => (
    <CourseCard key={course._id} course={course} isProfile={true} />
  ));
};
