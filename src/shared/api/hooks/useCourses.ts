"use client";
import { useState } from "react";
import { coursesApi } from "../courses";
import type { Course } from "../types";

export function useCourses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCourses() {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesApi.getCourses();
      return data as Course[];
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
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
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function addCourse(courseId: string) {
    setLoading(true);
    setError(null);
    try {
      return await coursesApi.addCourseToUser(courseId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function removeCourse(courseId: string) {
    setLoading(true);
    setError(null);
    try {
      return await coursesApi.deleteCourseFromUser(courseId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
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
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
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
