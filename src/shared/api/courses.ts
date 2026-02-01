import { axiosInstance } from "@/shared/axios";
import type { Course, Workout } from "./types";

export const coursesApi = {
  getCourses: async (): Promise<Course[]> => {
    const res = await axiosInstance.get<Course[]>("/courses");
    return res.data;
  },

  getCourse: async (courseId: string): Promise<Course> => {
    const res = await axiosInstance.get<Course>(`/courses/${courseId}`);
    return res.data;
  },

  getCourseWorkouts: async (courseId: string): Promise<Workout[]> => {
    const res = await axiosInstance.get<Workout[]>(`/courses/${courseId}/workouts`);
    return res.data;
  },

  addCourseToUser: async (courseId: string): Promise<{ message: string }> => {
    const res = await axiosInstance.post<{ message: string }>(`/users/me/courses`, { courseId });
    return res.data;
  },

  deleteCourseFromUser: async (courseId: string): Promise<{ message: string }> => {
    const res = await axiosInstance.delete<{ message: string }>(`/users/me/courses/${courseId}`);
    return res.data;
  },

  resetCourseProgress: async (courseId: string): Promise<{ message: string }> => {
    const res = await axiosInstance.patch<{ message: string }>(`/courses/${courseId}/reset`);
    return res.data;
  },
};
