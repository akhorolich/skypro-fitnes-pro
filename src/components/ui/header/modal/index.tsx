import { useEffect, useEffectEvent } from "react";
import styles from "./styles.module.css";

interface ProfileHeaderModal {
  children: React.ReactNode;
  onClose: () => void;
}
export const ProfileHeaderModal = ({
  children,
  onClose,
}: ProfileHeaderModal) => {
  const handleKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose?.();
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.content} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
