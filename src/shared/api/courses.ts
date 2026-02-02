import { axiosInstance } from "@/shared/axios";
import type { Course, CoursesResponse, Workout } from "./types";
import { request } from "./client";

export const coursesApi = {
  getCourses: async () =>
    request<null, Course[]>({ url: "/courses", method: "get" }),
  
  getCourse: async (courseId: string) =>
    request<null, Course>({ url: `/courses/${courseId}`, method: "get" }),

  getCourseWorkouts: async (courseId: string) =>
    request<null, Workout[]>({
      url: `/courses/${courseId}/workouts`,
      method: "get",
    }),

  addCourseToUser: async (courseId: string) =>
    request<{ courseId: string }, CoursesResponse>({
      url: `/users/me/courses`,
      method: "post",
      data: { courseId },
    }),

  deleteCourseFromUser: async (courseId: string) =>
    request<null, CoursesResponse>({
      url: `/users/me/courses/${courseId}`,
      method: "delete",
    }),

  resetCourseProgress: async (courseId: string) =>
    request<null, CoursesResponse>({
      url: `/courses/${courseId}/reset`,
      method: "patch",
    }),
};

/* 
 async (): Promise<Course[]> => {
    const res = await axiosInstance.get<Course[]>("/courses");
    return res.data;
  }

  getCourse: async (courseId: string): Promise<Course> => {
    const res = await axiosInstance.get<Course>(`/courses/${courseId}`);
    return res.data;
  },

  getCourseWorkouts: async (courseId: string): Promise<Workout[]> => {
    const res = await axiosInstance.get<Workout[]>(
      `/courses/${courseId}/workouts`,
    );
    return res.data;
  },

  addCourseToUser: async (courseId: string): Promise<CoursesResponse> => {
    const res = await axiosInstance.post<CoursesResponse>(
      `/users/me/courses`,
      { courseId },
    );
    return res.data;
  },

  deleteCourseFromUser: async (
    courseId: string,
  ): Promise<CoursesResponse> => {
    const res = await axiosInstance.delete<CoursesResponse>(
      `/users/me/courses/${courseId}`,
    );
    return res.data;
  },

  resetCourseProgress: async (
    courseId: string,
  ): Promise<CoursesResponse> => {
    const res = await axiosInstance.patch<CoursesResponse>(
      `/courses/${courseId}/reset`,
    );
    return res.data;
  },
*/
