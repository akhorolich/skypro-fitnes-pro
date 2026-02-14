"use client";
import { useState } from "react";
import { workoutsApi } from "../workouts";

export function useWorkouts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchWorkout(workoutId: string) {
    setLoading(true);
    setError(null);
    try {
      return await workoutsApi.getWorkout(workoutId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function saveProgress(courseId: string, workoutId: string, progressData: number[]) {
    setLoading(true);
    setError(null);
    try {
      return await workoutsApi.saveWorkoutProgress(courseId, workoutId, progressData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function resetProgress(courseId: string, workoutId: string) {
    setLoading(true);
    setError(null);
    try {
      return await workoutsApi.resetWorkoutProgress(courseId, workoutId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { fetchWorkout, saveProgress, resetProgress, loading, error } as const;
}
