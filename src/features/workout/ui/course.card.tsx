import Image from "next/image";
import styles from "./course.module.css";
import { DescriptionTile } from "./description-tile/ui";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/classnames";
import { Circle } from "./circle/ui";
import { Course } from "@/shared/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  isProfile: boolean;
  course: Course;
}

export const CourseCard = ({ course, isProfile = false }: CourseCardProps) => {
  const router = useRouter();
  return (
    <article className={cn(styles.course, { [styles.profile]: isProfile })}>
      <Circle />
      <Image
        className={styles.img}
        src={`main_wk${course.order}.svg`}
        alt="course"
        width={360}
        height={325}
      />
      <div className={styles.course__content} onClick={() => router.push(`/course-info/${course._id}`)}>
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
