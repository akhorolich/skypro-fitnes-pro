"use client";
import Image from "next/image";
import { useCourseCtx } from "@/shared/context/courses-context";
import { useIsCourseAdded } from "@/features/courses/lib/courseIsAdded";
import { useCourses } from "@/shared/api";
import { useAuth } from "@/shared/context/auth-context";
import { notifyWarning, notifySuccess } from "@/shared/lib/notification";
import { ApiError } from "@/shared/api/client";

import { Button } from "@/shared/ui/button";
import { ForYouTile } from "@/components/ui/tile";
import styles from "./info.module.css";

interface CourseInfoProps {
  courseId: string;
}
export default function CourseInfo({ courseId }: CourseInfoProps) {
  const { addCourse } = useCourses();
  const { findById } = useCourseCtx();
  const isAdded = useIsCourseAdded(courseId);
  const { isAuth } = useAuth();
  const course = findById(courseId);

  const onAdd = async () => {
    if (!isAuth) {
      notifyWarning("Для добавления курса необходимо войти в аккаунт");
      return;
    }
    try {
      await addCourse(courseId);
      notifySuccess(
        "Курс добавлен. Просмотреть добавленные курсы можно на странице в профиле",
      );
    } catch (reason) {
      const err = reason as ApiError;
      notifyWarning(err.message);
    }
  };

  return (
    <>
      <div className={styles.wrapper__img}>
        <Image
          className={styles.course__img}
          src={`/skill_card_${course?.order}.svg`}
          alt="yoga"
          width={1160}
          height={310}
        />
        <Image
          className={styles.course__img__mobile}
          src={`/main_wk${course?.order}.svg`}
          alt="yoga"
          width={0}
          height={0}
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
              <div className={styles.item__wrapper}>
                <li className={styles.list__item}>
                  проработка всех групп мышц
                </li>
              </div>
              <div className={styles.item__wrapper}>
                <li className={styles.list__item}>тренировка суставов</li>
              </div>
              <div className={styles.item__wrapper}>
                <li className={styles.list__item}>
                  улучшение циркуляции крови
                </li>
              </div>
              <div className={styles.item__wrapper}>
                <li className={styles.list__item}>
                  упражнения заряжают бодростью
                </li>
              </div>
              <div className={styles.item__wrapper}>
                <li className={styles.list__item}>
                  помогают противостоять стрессам
                </li>
              </div>
            </ul>
            {!isAuth ? (
              <Button
                className={styles.way__btn}
                onClick={() =>
                  notifyWarning(
                    "Для добавления курса необходимо войти в аккаунт",
                  )
                }
              >
                Войдите, чтобы добавить курс
              </Button>
            ) : !isAdded ? (
              <Button className={styles.way__btn} onClick={onAdd}>
                Добавить курс
              </Button>
            ) : (
              <Button
                className={styles.way__btn}
                onClick={() => notifyWarning("Курс уже был добавлен")}
              >
                Курс уже добавлен
              </Button>
            )}
          </div>
          <Image
            className={styles.way__img}
            src="/info_way.svg"
            alt="men"
            width={700}
            height={688}
          />
        </div>
        <Image
          className={styles.way__img__mobile}
          src="/info_way.svg"
          alt="men"
          width={700}
          height={688}
        />
      </div>
    </>
  );
}
