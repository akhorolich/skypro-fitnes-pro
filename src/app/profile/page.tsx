"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useCourseCtx } from "@/shared/context/courses-context";
import { useAuth } from "@/shared/context/auth-context";
import { useRedirect } from "@/shared/hooks/useRedirect";
import { paths } from "@/shared/config/paths";
import { getSelectedCourses } from "@/features/profile/lib/getSelectedCourses";

import { Button } from "@/shared/ui/button";
import styles from "./page.module.css";

export default function Profile() {
  const { redirectTo } = useRedirect();
  const { courses } = useCourseCtx();
  const { user, logout, isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) redirectTo(paths.home);
  }, [isAuth]);

  const onLogout = () => {
    logout();
    redirectTo(paths.home);
  };
  
  const userCourses = getSelectedCourses(user?.selectedCourses, courses);
  
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
          <div className={styles.courses__list}>{userCourses}</div>
        </div>
      </div>
    </>
  );
}
