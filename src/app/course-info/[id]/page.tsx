import CourseInfo from "@/pages/course-info";

interface CourseInfoPageProps {
  params: Promise<{ id: string }>;
}
export default async function CourseInfoPage({ params }: CourseInfoPageProps) {
  const param = await params;
  return <CourseInfo courseId={param.id}/>;
}
