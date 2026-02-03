import Image from "next/image";
import styles from "./succsess.module.css";

interface SuccessModalProps {
  onClose: () => void;
}
export const SuccessModal = ({ onClose }: SuccessModalProps) => {
  const close = () => setTimeout(() => onClose(), 1000);
  close();
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>Ваш прогресс засчитан!</h2>
      <Image
        src={"/icon/complited-lesson.svg"}
        alt="succsess icon"
        width={68}
        height={68}
      />
    </div>
  );
};
