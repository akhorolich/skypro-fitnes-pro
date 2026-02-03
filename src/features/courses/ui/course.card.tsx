import Image from "next/image";
import { useEffect, useState } from "react";
import { Course, useCourses, useWorkouts, Workout } from "@/shared/api";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/classnames";
import { useAuth } from "@/shared/context/auth-context";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/shared/lib/notification";
import { ApiError } from "@/shared/api/client";

import { DescriptionTile } from "./description-tile/ui";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { Button } from "@/shared/ui/button";
import { Circle } from "./circle/ui";
import styles from "./course.module.css";
import { Modal } from "@/shared/ui/modal";
import { Workouts } from "./workouts/ui";

interface CourseCardProps {
  isProfile: boolean;
  course: Course;
}

export const CourseCard = ({ course, isProfile = false }: CourseCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { addCourse, removeCourse, fetchWorkoutsCourse } = useCourses();
  const { isAuth } = useAuth();
  const router = useRouter();

  const openCourseInfo = () => router.push(`/course-info/${course._id}`);
  const openWorkoutsModal = () => setIsOpen(true);
  const closeWorkoutsModal = () => setIsOpen(false);

  useEffect(() => {
    if (isAuth && isProfile) fetchWorkoutsCourse(course._id).then(setWorkouts);
  }, []);

  const add = (courseId: string) => async () => {
    if (!isAuth) {
      notifyWarning("Для добавления курса необходимо войти в аккаунт");
      return;
    }
    try {
      const res = await addCourse(courseId);
      notifySuccess(res.message);
    } catch (reason) {
      const err = reason as ApiError;
      notifyError(err.message);
    }
  };

  const remove = (courseId: string) => async () => {
    try {
      const res = await removeCourse(courseId);
      notifySuccess(res.message);
    } catch (reason) {
      const err = reason as ApiError;
      notifyError(err.message);
    }
  };

  return (
    <article className={cn(styles.course, { [styles.profile]: isProfile })}>
      <Circle
        addCourse={add(course._id)}
        removeCourse={remove(course._id)}
        isProfile={isProfile}
      />
      <Image
        className={styles.img}
        src={`/main_wk${course.order}.svg`}
        alt="course"
        width={360}
        height={325}
      />
      <div className={styles.course__content}>
        <h2 className={styles.course__title} onClick={openCourseInfo}>
          {course.nameRU}
        </h2>
        <div className={styles.course__description}>
          <DescriptionTile
            imgPath="/icon/sprite.svg#calendar"
            text={`${course.durationInDays} дней`}
          />
          <DescriptionTile
            imgPath="/icon/sprite.svg#time"
            duration={course.dailyDurationInMinutes}
          />
          <DescriptionTile
            imgPath="/icon/sprite.svg#complexity"
            text={course.difficulty}
          />
        </div>
        {isProfile && (
          <div className={styles["for-profile"]}>
            <p className={styles.progress__text}>{`Прогресс 40%`}</p>
            <ProgressBar value={40} />
          </div>
        )}
        {isProfile && (
          <Button className={styles.course__btn} onClick={openWorkoutsModal}>
            Продолжить
          </Button>
        )}
        {isOpen && (
          <Modal onClose={closeWorkoutsModal}>
            <Workouts exercise={workouts} courseName={course.nameRU} />
          </Modal>
        )}
      </div>
    </article>
  );
};
