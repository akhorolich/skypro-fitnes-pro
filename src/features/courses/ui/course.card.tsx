import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Course,
  CourseProgress,
  useCourses,
  useWorkouts,
  Workout,
} from "@/shared/api";
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
import { LoginForm } from "@/features/auth/ui/login/login-form";
import { RegisterForm } from "@/features/auth/ui/register/register-form";
import { useProgress } from "@/shared/api/hooks/useProgress";

interface CourseCardProps {
  isProfile: boolean;
  course: Course;
}

export const CourseCard = ({ course, isProfile = false }: CourseCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [progress, setProgress] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const { addCourse, removeCourse, fetchWorkoutsCourse, resetCourse } =
    useCourses();
  const { isAuth } = useAuth();
  const router = useRouter();

  const { fetchCourseProgress } = useProgress();
  const addCourseProgress = (workouts: Workout[], progress: CourseProgress) => {
    const total = workouts.length || 0;
    if (total === 0) {
      setProgress(0);
      setCourseCompleted(false);
      return;
    }
    const completed = progress.workoutsProgress.filter(
      (w) => w.workoutCompleted,
    ).length;
    const percent = Math.round((completed / total) * 100);
    setProgress(percent);
    setCourseCompleted(progress.courseCompleted);
  };

  useEffect(() => {
    if (isAuth && isProfile) {
      (async () => {
        try {
          console.log('1');
          
          const wks = await fetchWorkoutsCourse(course._id);
          setWorkouts(wks);
          const prog = await fetchCourseProgress(course._id);
          addCourseProgress(wks, prog);
        } catch (err) {
          setProgress(0);
          setCourseCompleted(false);
        }
      })();
    }
  }, [isAuth, isProfile, course._id]);

  const openCourseInfo = () => {
    if (isProfile) return setIsOpen(true);
    router.push(`/course-info/${course._id}`);
  };
  const openWorkoutsModal = () => setIsOpen(true);
  const closeWorkoutsModal = () => setIsOpen(false);

  useEffect(() => {
    if (isAuth && isProfile) {
      fetchWorkoutsCourse(course._id).then(setWorkouts);
    }
  }, []);

  const add = (courseId: string) => async () => {
    if (!isAuth) {
      notifyWarning("Для добавления курса необходимо войти в аккаунт");
      setAuthMode("login");
      setAuthModalOpen(true);
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

  const onStart = async () => {
    if (courseCompleted) {
      try {
        await resetCourse(course._id);
        notifySuccess("Прогресс по курсу сброшен");
        setProgress(0);
        setCourseCompleted(false);
      } catch (err) {
        notifyError("Не удалось сбросить прогресс");
      }
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
            <p className={styles.progress__text}>{`Прогресс ${progress}%`}</p>
            <ProgressBar value={progress} />
          </div>
        )}
        {isProfile && (
          <Button
            className={styles.course__btn}
            onClick={() => (courseCompleted ? onStart() : openWorkoutsModal())}
          >
            {courseCompleted
              ? "Начать заново"
              : progress === 0
                ? "Начать тренировку"
                : "Продолжить"}
          </Button>
        )}
        {isOpen && (
          <Modal onClose={closeWorkoutsModal}>
            <Workouts
              exercise={workouts}
              courseName={course.nameRU}
              courseId={course._id}
            />
          </Modal>
        )}

        {authModalOpen && (
          <Modal onClose={() => setAuthModalOpen(false)}>
            {authMode === "login" && (
              <LoginForm
                onOpenRegister={() => setAuthMode("register")}
                closeModal={() => setAuthModalOpen(false)}
              />
            )}
            {authMode === "register" && (
              <RegisterForm onOpenLogin={() => setAuthMode("login")} />
            )}
          </Modal>
        )}
      </div>
    </article>
  );
};
