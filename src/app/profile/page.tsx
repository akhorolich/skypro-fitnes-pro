"use client";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { CourseCard } from "@/features/workout/ui/course.card";
import styles from "./page.module.css";
import { useCourseCtx } from "@/shared/context/courses-context";
import { useAuth } from "@/shared/lib/auth";
import { useRedirect } from "@/shared/hooks/useRedirect";
import { paths } from "@/shared/config/paths";

export default function Profile() {
  const { redirectTo } = useRedirect();
  const { courses } = useCourseCtx();
  const { user, logout } = useAuth();

  const selectedCourses = () => {
    const coursesSet = new Set(user?.selectedCourses);
    const selected = courses.filter((course) => coursesSet.has(course._id));
    console.log(selected);

    return selected.map((course) => (
      <CourseCard key={course._id} course={course} isProfile={true} />
    ));
  };

  const onLogout = () => {
    logout();
    redirectTo(paths.home);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles["profile-info"]}>
          <h2 className={styles["profile-info__text"]}>Профиль</h2>
          <div className={styles["profile-info__content"]}>
            <Image src="/profile.svg" alt="profile" width={197} height={197} />
            <div className={styles.info}>
              <h3 className={styles.info__name}>{user?.email}</h3>
              <p>{`ID: ${user?._id}`}</p>
              <Button className={styles.info__btn} onClick={onLogout}>
                Выйти
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.courses}>
          <h2 className={styles.courses__text}>Мои курсы</h2>
          <div className={styles.courses__list}>{selectedCourses()}</div>
        </div>
      </div>
    </>
  );
}
