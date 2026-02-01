import { axiosInstance } from "@/shared/axios";
import type { CourseProgress, WorkoutProgress } from "./types";

export const progressApi = {
  getCourseProgress: async (courseId: string): Promise<CourseProgress> => {
    const res = await axiosInstance.get<CourseProgress>(`/users/me/progress`, { params: { courseId } });
    return res.data;
  },

  getWorkoutProgress: async (courseId: string, workoutId: string): Promise<WorkoutProgress> => {
    const res = await axiosInstance.get<WorkoutProgress>(`/users/me/progress`, { params: { courseId, workoutId } });
    return res.data;
  },
};
