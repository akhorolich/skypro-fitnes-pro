export type DailyDuration = { from: string; to: string };
export type Course = {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  fitting: string[];
  workouts: string[];
  difficulty: string;
  durationInDays: number;
  dailyDurationInMinutes: DailyDuration;
  order: number;
};

export type Exercise = { name: string; quantity: number; _id: string };
export type Workout = {
  _id: string;
  name: string;
  video: string;
  exercises: Exercise[];
};

export type WorkoutProgress = {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
};

export type CourseProgress = {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkoutProgress[];
};

export type CoursesResponse = { message: string };
