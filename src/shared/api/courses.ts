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
