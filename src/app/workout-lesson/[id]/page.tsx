import WorkoutLesson from "@/components/page/lesson";
interface WorkoutLessonPageProps {
  params: Promise<{ id: string }>;
}
export default async function WorkoutLessonPage({ params }: WorkoutLessonPageProps) {
  const param = await params;
  return <WorkoutLesson lessonId={param.id}/>;
}
