"use client";
import { useState } from "react";
import { coursesApi } from "../courses";
import type { Course } from "../types";
import { ApiError } from "../client";
import { useAuth } from "@/shared/lib/auth";

export function useCourses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCourses() {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesApi.getCourses();
      return data as Course[];
    } catch (err) {
      const requestError = err as ApiError;
      setError(requestError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function fetchCourse(courseId: string) {
    setLoading(true);
    setError(null);
    try {
      return await coursesApi.getCourse(courseId);
    } catch (err: unknown) {
      const requestError = err as ApiError;
      setError(requestError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const { user, addSelectedCourse, removeSelectedCourse, setUser } = useAuth();

  async function addCourse(courseId: string) {
    setLoading(true);
    setError(null);

    const prev = user?.selectedCourses ?? [];
    try {
      // optimistic update
      if (user) addSelectedCourse(courseId);
      const res = await coursesApi.addCourseToUser(courseId);
      return res;
    } catch (err: unknown) {
      // revert
      if (user) setUser({ ...user, selectedCourses: prev });
      const requestError = err as ApiError;
      setError(requestError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function removeCourse(courseId: string) {
    setLoading(true);
    setError(null);

    const prev = user?.selectedCourses ?? [];
    try {
      // optimistic update
      if (user) removeSelectedCourse(courseId);
      const res = await coursesApi.deleteCourseFromUser(courseId);
      return res;
    } catch (err: unknown) {
      // revert
      if (user) setUser({ ...user, selectedCourses: prev });
      const requestError = err as ApiError;
      setError(requestError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function resetCourse(courseId: string) {
    setLoading(true);
    setError(null);
    try {
      return await coursesApi.resetCourseProgress(courseId);
    } catch (err: unknown) {
      const requestError = err as ApiError;
      setError(requestError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    fetchCourses,
    fetchCourse,
    addCourse,
    removeCourse,
    resetCourse,
    loading,
    error,
  } as const;
}
