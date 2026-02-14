import { axiosInstance } from "@/shared/axios";
import type { Workout } from "./types";

export const workoutsApi = {
  getWorkout: async (workoutId: string): Promise<Workout> => {
    const res = await axiosInstance.get<Workout>(`/workouts/${workoutId}`);
    return res.data;
  },

  saveWorkoutProgress: async (courseId: string, workoutId: string, progressData: number[]) => {
    const res = await axiosInstance.patch<{ message: string }>(`/courses/${courseId}/workouts/${workoutId}`, { progressData });
    return res.data;
  },

  resetWorkoutProgress: async (courseId: string, workoutId: string) => {
    const res = await axiosInstance.patch<{ message: string }>(`/courses/${courseId}/workouts/${workoutId}/reset`);
    return res.data;
  },
};
