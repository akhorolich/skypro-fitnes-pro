import Image from "next/image";
import styles from "./circle.module.css";

interface CircleProps {
  isAuth?: boolean;
}
export const Circle = ({ isAuth = false }: CircleProps) => {
  const add = "/icon/icon-add-circle.svg";
  const remove = "/icon/icon-remove-circle.svg";
  return (
    <div className={styles.add__circle}>
      <Image src={add} alt="circle" width={32} height={32} />
    </div>
  );
};
