"use client";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { Modal } from "@/shared/ui/modal";
import { LoginForm } from "@/features/auth/ui/login/login-form";
import { RegisterForm } from "@/features/auth/ui/register/register-form";
import styles from "./header.module.css";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  const openLogin = () => {
    setMode("login");
    setIsOpen(true);
  };

  const onCloseModalForm = () => setIsOpen(false);

  return (
    <div className={styles.header}>
      <div>
        <Image
          src="logo.svg"
          alt="logo"
          width={220}
          height={35}
          className={styles.header__logo}
        />
        <p className={styles.header__title}>
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      <Button className={styles.header__btn} onClick={openLogin}>
        Войти
      </Button>
      {isOpen && (
        <Modal onClose={onCloseModalForm}>
          {mode === "login" && (
            <LoginForm
              onOpenRegister={() => setMode("register")}
              closeModal={onCloseModalForm}
            />
          )}

          {mode === "register" && (
            <RegisterForm onOpenLogin={() => setMode("login")} />
          )}
        </Modal>
      )}
    </div>
  );
};
