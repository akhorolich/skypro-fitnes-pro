"use client";
import { useProgress, useWorkouts, Workout } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { useEffect, useState } from "react";

interface WorkoutLessonProps {
  lessonId: string;
}

export const WorkoutLesson = ({ lessonId }: WorkoutLessonProps) => {
  const [lesson, setLesson] = useState<Workout | null>();
  const [progress, setProgress] = useState();
  const { fetchWorkoutProgress } = useProgress();
  const { fetchWorkout } = useWorkouts();

  useEffect(() => {
    fetchWorkout(lessonId).then(setLesson);
    //fetchWorkoutProgress -> setProgress
  }, [lessonId]);
  console.log(lesson);

  return (
    <>
      <div>
        <h2>Йога</h2>
        <div>
          <iframe
            src={lesson?.video}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div>
        <h2>{lesson?.name}</h2>
        <div>
          <div>
            <p>{lesson && lesson.exercises[0].name}</p>
            <ProgressBar value={0} />
          </div>
          <div>
            <p>{lesson && lesson.exercises[1].name}</p>
            <ProgressBar value={0} />
          </div>
          <div>
            <p>{lesson && lesson.exercises[2].name}</p>
            <ProgressBar value={0} />
          </div>
        </div>
        <Button>Заполнить свой прогресс</Button>
      </div>
      
    </>
  );
};

{
  const mock = {
    _id: "dq9rzo",
    name: "Урок 4. Продвинутые движения",
    video: "https://www.youtube.com/embed/3RPauxe4SeE",
    exercises: [],
    __v: 0,
  };
}
