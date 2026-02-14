"use client";
import { useEffect, useEffectEvent } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {

  const handleKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose?.();
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (typeof window === "undefined") return null;

  const modalContent = (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.content} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
