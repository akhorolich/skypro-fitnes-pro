import { WorkoutLesson } from "@/pages/lesson";
import { workoutsApi } from "@/shared/api";

interface WorkoutLessonPageProps {
  params: Promise<{ id: string }>;
}
export default async function WorkoutLessonPage({ params }: WorkoutLessonPageProps) {
  const param = await params;
  return <WorkoutLesson lessonId={param.id}/>;
}
