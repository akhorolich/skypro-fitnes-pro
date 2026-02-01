"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/shared/ui/button";
import { CourseCard } from "@/features/workout/ui/course.card";
import { Course, useCourses } from "@/shared/api";
import { useEffect, useState } from "react";
import { useCourseCtx } from "@/shared/context/courses-context";

export default function Home() {
  // const [courses, setCourses] = useState<Course[] | []>();
  const { addCoursesInCtx, courses } = useCourseCtx();
  const { fetchCourses } = useCourses();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchCourses().then(addCoursesInCtx);
  }, []);
  console.log(courses);
  
  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.title__slogan}>
          Начните заниматься спортом и улучшите качество жизни
        </h1>
        <Image src="slogan.svg" alt="slogan" width={288} height={120} />
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
