'use client';
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { CourseCard } from "@/features/workout/ui/course.card";
import styles from "./page.module.css";

export default function Profile() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles["profile-info"]}>
          <h2 className={styles["profile-info__text"]}>Профиль</h2>
          <div className={styles["profile-info__content"]}>
            <Image src="profile.svg" alt="profile" width={197} height={197} />
            <div className={styles.info}>
              <h3 className={styles.info__name}>Сергей</h3>
              <p>Логин: sergey.petrov96</p>
              <Button className={styles.info__btn}>Выйти</Button>
            </div>
          </div>
        </div>
        <div className={styles.courses}>
          <h2 className={styles.courses__text}>Мои курсы</h2>
          <div className={styles.courses__list}>
            {/* {courses?.map((course) => (
              <CourseCard key={course._id} course={course} isProfile={true} />
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}
