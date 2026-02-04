"use client";
import Image from "next/image";
import { useCourses } from "@/shared/api";
import { useEffect } from "react";
import { useCourseCtx } from "@/shared/context/courses-context";

import { Button } from "@/shared/ui/button";
import { CourseCard } from "@/features/courses/ui/course.card";
import styles from "./page.module.css";

export default function Home() {
  const { courses } = useCourseCtx();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.title__slogan}>
          Начните заниматься спортом и улучшите качество жизни
        </h1>
        <Image className={styles.slogan__img} src="/slogan.svg" alt="slogan" width={288} height={120} />
      </div>
      <div className={styles.content}>
        {courses?.map((course) => (
          <CourseCard key={course._id} course={course} isProfile={false} />
        ))}
      </div>
      <div className={styles.footer}>
        <Button onClick={scrollToTop} className={styles.footer__btn}>
          Наверх
        </Button>
      </div>
    </>
  );
}
