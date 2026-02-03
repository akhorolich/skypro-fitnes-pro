"use client";
import { Exercise } from "@/shared/api";
import styles from "./workouts.module.css";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/classnames";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { paths } from "@/shared/config/paths";

interface WorkoutsProps {
  exercise: Exercise[];
  courseName: string;
}
export const Workouts = ({ exercise, courseName }: WorkoutsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const extractExerciseName = (exerciseName: string) => {
    if (courseName !== "Йога") return exerciseName;
    return exerciseName.split("/")[0];
  };

  const addQuery = (lessonId: string) => {
    const url = new URLSearchParams(searchParams?.toString());
    console.log(url);
    url.set("lesson", lessonId);
    const withParam = url.toString();
    router?.push(pathname + "?" + withParam);
  };

  const goToLesson = () => {
    const url = new URLSearchParams(searchParams?.toString());
    const lessonId = url.get("lesson");
    router?.push(paths.lesson + `/${lessonId}`);
  };

  console.log(exercise);

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
              console.log(lesson._id);
              
            }}
          >
            <li className={styles.workout__item}>
              <label className={styles.radio__label} htmlFor={lesson._id}>
                <input
                  className={cn(styles.radio__btn, {
                    [styles.isComplitedLesson]: false,
                  })}
                  type="radio"
                  name="workout"
                  id={lesson._id}
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
