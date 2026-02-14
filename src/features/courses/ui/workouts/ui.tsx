"use client";
import { useEffect, useState } from "react";
import { Workout } from "@/shared/api";
import styles from "./workouts.module.css";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/classnames";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { notifyWarning } from "@/shared/lib/notification";
import { paths } from "@/shared/config/paths";
import { useProgress } from "@/shared/api/hooks/useProgress";

interface WorkoutsProps {
  exercise: Workout[];
  courseName: string;
  courseId: string;
}
export const Workouts = ({ exercise, courseName, courseId }: WorkoutsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { fetchWorkoutProgress } = useProgress();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const extractExerciseName = (exerciseName: string) => {
    if (courseName !== "Йога") return exerciseName;
    return exerciseName.split("/")[0];
  };

  const addQuery = (lessonId: string) => {
    const url = new URLSearchParams(searchParams?.toString());
    url.set("lesson", lessonId);
    const withParam = url.toString();
    router?.push(pathname + "?" + withParam);
  };

  const goToLesson = () => {
    const url = new URLSearchParams(searchParams?.toString());
    const lessonId = url.get("lesson");
    if (!lessonId) {
      notifyWarning("Выберите тренировку");
      return;
    }
    router?.push(paths.lesson + `/${lessonId}`);
  };

  useEffect(() => {
    if (!courseId) return;
    exercise.forEach(async (wk) => {
      try {
        const res = await fetchWorkoutProgress(courseId, wk._id);
        setCompleted((prev) => ({ ...prev, [wk._id]: Boolean(res.workoutCompleted) }));
      } catch (err) {
      }
    });
  }, [courseId]);

  return (
    <div className={styles.workouts__container}>
      <h2 className={styles.title}>Выберите тренировку</h2>
      <ul className={styles.workouts__list}>
        {exercise.map((lesson, index) => (
          <div
            key={lesson._id}
            className={styles.lesson__container}
            onClick={(e) => {
              e.stopPropagation();
              addQuery(lesson._id);              
            }}
          >
            <li className={styles.workout__item}>
              <label className={styles.radio__label} htmlFor={lesson._id}>
                <input
                  className={cn(styles.radio__btn, {
                    [styles.isComplitedLesson]: !!completed[lesson._id],
                  })}
                  type="radio"
                  name="workout"
                  id={lesson._id}
                  disabled={!!completed[lesson._id]}
                />
                <div className={styles.text__container}>
                  <p className={styles.lesson__name}>
                    {extractExerciseName(lesson.name)}
                  </p>
                  <p
                    className={styles.lesson__text}
                  >{`${courseName} на каждый день / день ${++index}`}</p>
                </div>
              </label>
            </li>
            <div className={styles.lesson_border}></div>
          </div>
        ))}
      </ul>
      <Button className={styles.start__lesson_btn} onClick={() => goToLesson()}>
        Начать
      </Button>
    </div>
  );
};
