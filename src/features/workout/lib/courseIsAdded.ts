import { useAuth } from "@/shared/lib/auth";

export const useIsCourseAdded = (courseId: string) => {
  const { user } = useAuth();
  if (!user) return false;
  return user.selectedCourses.includes(courseId);
};

export const courseIsAdded = (courseId: string, userSelectedCourses?: string[]) => {
  if (!userSelectedCourses) return false;
  return userSelectedCourses.includes(courseId);
};