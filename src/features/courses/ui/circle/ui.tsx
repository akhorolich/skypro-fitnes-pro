import Image from "next/image";
import styles from "./circle.module.css";
import { CoursesResponse } from "@/shared/api";

interface CircleProps {
  addCourse: () => Promise<void>;
  removeCourse: () => Promise<void>;
  isProfile: boolean;
}
export const Circle = ({
  addCourse,
  removeCourse,
  isProfile = false,
}: CircleProps) => {
  const add = "/icon/icon-add-circle.svg";
  const remove = "/icon/icon-remove-circle.svg";
  return (
    <div
      className={styles.circle}
      onClick={isProfile ? removeCourse : addCourse}
    >
      <Image
        src={isProfile ? remove : add}
        alt="circle"
        width={32}
        height={32}
      />
    </div>
  );
};
