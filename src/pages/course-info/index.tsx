"use client";
import Image from "next/image";
import { useCourseCtx } from "@/shared/context/courses-context";
import { cn } from "@/shared/lib/classnames";
import { Button } from "@/shared/ui/button";
import { ForYouTile } from "@/components/ui/tile";
import styles from "./info.module.css";

interface CourseInfoProps {
  courseId: string;
}
export default function CourseInfo({ courseId }: CourseInfoProps) {
  const { findById, courses } = useCourseCtx();
  const course = findById(courseId);
  console.log(course);

  return (
    <>
      <div className={styles.wrapper__img}>
        <Image
          className={styles.course__img}
          src={`skill_card_${course?.order}.svg`}
          alt="yoga"
          width={1160}
          height={310}
        />
      </div>
      <div className={styles["for-you"]}>
        <h2 className={styles["for-you__text"]}>Подойдет для вас, если:</h2>
        <div className={styles["for-you__tiles"]}>
          {course?.fitting.map((fit, index) => (
            <ForYouTile
              key={`fitting-${index}`}
              tileNumber={`${++index}`}
              text={fit}
            />
          ))}
        </div>
      </div>
      <div className={styles.directions}>
        <h2 className={styles.directions__text}>Направления</h2>
        <div className={styles.directions__content}>
          {course?.directions.map((direction, index) => (
            <div key={`course-direction-${index}`}>
              <p className={styles.content}>{direction}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.way}>
        <div className={styles.way__container}>
          <div className={styles.way__content}>
            <h2 className={styles.way__text}>
              Начните путь <br />к новому телу
            </h2>
            <ul className={styles.list}>
              <li className={styles.list__item}>проработка всех групп мышц</li>
              <li className={styles.list__item}>тренировка суставов</li>
              <li className={styles.list__item}>улучшение циркуляции крови</li>
              <li className={styles.list__item}>
                упражнения заряжают бодростью
              </li>
              <li className={styles.list__item}>
                помогают противостоять стрессам
              </li>
            </ul>
            <Button className={styles.way__btn}>
              Войдите, чтобы добавить курс
            </Button>
          </div>
          <Image
            className={styles.way__img}
            src="info_way.svg"
            alt="men"
            width={700}
            height={688}
          />
        </div>
      </div>
    </>
  );
}
