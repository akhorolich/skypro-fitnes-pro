import Image from "next/image";
import { Course, useCourses } from "@/shared/api";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/classnames";
import { useAuth } from "@/shared/lib/auth";
import { notifyError, notifySuccess, notifyWarning } from "@/shared/lib/notification";
import { ApiError } from "@/shared/api/client";

import { DescriptionTile } from "./description-tile/ui";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { Button } from "@/shared/ui/button";
import { Circle } from "./circle/ui";
import styles from "./course.module.css";

interface CourseCardProps {
  isProfile: boolean;
  course: Course;
}

export const CourseCard = ({ course, isProfile = false }: CourseCardProps) => {
  const { addCourse, removeCourse } = useCourses();
  const router = useRouter();
  const { isAuth } = useAuth();

  const openCourseInfo = () => router.push(`/course-info/${course._id}`);

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
      <div className={styles.course__content} onClick={() => openCourseInfo()}>
        <h2 className={styles.course__title}>{course.nameRU}</h2>
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
          <Button className={styles.course__btn}>Продолжить</Button>
        )}
      </div>
    </article>
  );
};
