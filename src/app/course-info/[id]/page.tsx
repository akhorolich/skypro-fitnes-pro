import CourseInfo from "@/components/page/course-info";

interface CourseInfoPageProps {
  params: Promise<{ id: string }>;
}
export default async function CourseInfoPage({ params }: CourseInfoPageProps) {
  const param = await params;
  return <CourseInfo courseId={param.id}/>;
}
