"use client";
import { useState } from "react";
import { progressApi } from "../progress";

export function useProgress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCourseProgress(courseId: string) {
    setLoading(true);
    setError(null);
    try {
      return await progressApi.getCourseProgress(courseId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function fetchWorkoutProgress(courseId: string, workoutId: string) {
    setLoading(true);
    setError(null);
    try {
      return await progressApi.getWorkoutProgress(courseId, workoutId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { fetchCourseProgress, fetchWorkoutProgress, loading, error } as const;
}
