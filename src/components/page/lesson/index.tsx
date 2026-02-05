"use client";
import {
  useProgress,
  useWorkouts,
  Workout,
  WorkoutProgress,
} from "@/shared/api";
import { useEffect, useState, useMemo } from "react";
import { useCourseCtx } from "@/shared/context/use-courses-context";

import { Button } from "@/shared/ui/button";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { Modal } from "@/shared/ui/modal";
import { ProgressForm } from "../../../features/lessons/ui/progress-form/ProgressForm";
import { SuccessModal } from "@/features/lessons/ui/succsess-modal";
import styles from "./workout.module.css";

interface WorkoutLessonProps {
  lessonId: string;
}

export default function WorkoutLesson({ lessonId }: WorkoutLessonProps) {
  const [lesson, setLesson] = useState<Workout | null>(null);
  const [progress, setProgress] = useState<WorkoutProgress | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const { fetchWorkoutProgress } = useProgress();
  const { fetchWorkout, saveProgress, resetProgress } = useWorkouts();
  const { courses } = useCourseCtx();

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  useEffect(() => {
    fetchWorkout(lessonId)
      .then((w) => setLesson(w))
      .catch(() => {});
  }, [lessonId]);

  const courseId = useMemo(() => {
    if (!courses || !lesson) return null;
    const course = courses.find((course) =>
      course.workouts?.includes(lesson._id),
    );
    return course?._id ?? null;
  }, [courses, lesson]);

  const courseName = () => {
    if (!courses || !lesson) return null;
    const course = courses.find((course) =>
      course.workouts?.includes(lesson._id),
    );
    return course?.nameRU ?? null;
  };

  useEffect(() => {
    if (!courseId || !lesson) return;
    fetchWorkoutProgress(courseId, lesson._id)
      .then(setProgress)
      .catch(() => setProgress(null));
  }, [courseId, lesson]);

  const progressArray = useMemo(() => {
    if (!lesson) return [] as number[];
    const len = lesson.exercises.length;
    const base = Array(len).fill(0);
    if (!progress?.progressData) return base;
    return progress.progressData
      .slice(0, len)
      .concat(Array(Math.max(0, len - progress.progressData.length)).fill(0));
  }, [lesson, progress]);

  const handleSave = async (newProgressData: number[]) => {
    if (!courseId || !lesson) return;
    const merged = progressArray.map((value, index) =>
      typeof newProgressData[index] === "number"
        ? newProgressData[index]
        : value,
    );
    await saveProgress(courseId, lesson._id, merged);
    try {
      const res = await fetchWorkoutProgress(courseId, lesson._id);
      setProgress(res);
    } catch {}
    setIsFormOpen(false);
    setIsSuccessOpen(true);
  };

  const handleReset = async () => {
    if (!courseId || !lesson) return;
    await resetProgress(courseId, lesson._id);
    try {
      const res = await fetchWorkoutProgress(courseId, lesson._id);
      setProgress(res);
    } catch {
      setProgress(null);
    }
  };

  return (
    <>
      <div className={styles.video__content}>
        <h2 className={styles.workout__name}>{courseName() ?? "Тренировка"}</h2>
        <div className={styles.video__wrapper}>
          <iframe
            className={styles.video}
            src={lesson?.video}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className={styles.lessons__container}>
        <h2 className={styles.lesson__name}>{lesson?.name.split("/")[0]}</h2>
        {lesson?.exercises.length === 0 ? (
          <h2 className={styles.noWk__text}>
            Кажется по этому уроку нет заданий
          </h2>
        ) : (
          <div className={styles.lessons}>
            {lesson?.exercises.map((exercis, index) => {
              const done = progressArray[index] ?? 0;
              const percent =
                Math.round(
                  (Math.min(done, exercis.quantity) / exercis.quantity) * 100,
                ) || 0;
              return (
                <div key={exercis._id}>
                  <p
                    className={styles.exercis__name}
                  >{`${exercis.name.split("(")[0]} ${percent}%`}</p>
                  <ProgressBar value={percent} />
                </div>
              );
            })}
          </div>
        )}

        {progress?.workoutCompleted ? (
          <Button className={styles.fill__btn} onClick={handleReset}>
            Повторить тренировку
          </Button>
        ) : (
          <Button
            className={styles.fill__btn}
            onClick={() =>
              lesson?.exercises.length === 0 ? handleSave([0]) : handleOpenForm()
            }
          >
            Заполнить свой прогресс
          </Button>
        )}
      </div>

      {isFormOpen && lesson && (
        <Modal onClose={handleCloseForm}>
          <ProgressForm
            exercises={lesson.exercises}
            initialProgress={progressArray}
            onSubmit={handleSave}
            onClose={handleCloseForm}
          />
        </Modal>
      )}
      {isSuccessOpen && (
        <Modal onClose={() => setIsSuccessOpen(false)}>
          <SuccessModal onClose={() => setIsSuccessOpen(false)} />
        </Modal>
      )}
    </>
  );
}
