"use client";
import { useState } from "react";
import Image from "next/image";
import { paths } from "@/shared/config/paths";
import { useRedirect } from "@/shared/hooks/useRedirect";

import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";
import { LoginForm } from "@/features/auth/ui/login/login-form";
import { RegisterForm } from "@/features/auth/ui/register/register-form";
import { useAuth } from "@/shared/context/use-auth-context";
import { notifyWarning } from "@/shared/lib/notification";
import { ProfileHeaderModal } from "./modal";
import styles from "./header.module.css";

export const Header = () => {
  const { redirectTo } = useRedirect();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuth, logout } = useAuth();

  const openLogin = () => {
    setMode("login");
    setIsOpen(true);
  };

  const onCloseModalForm = () => setIsOpen(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const onProfile = () => {
    closeMenu();
    redirectTo(paths.profile);
  };

  const onLogout = () => {
    logout();
    closeMenu();
    notifyWarning("Вы вышли из аккаунта");
    redirectTo(paths.home);
  };

  return (
    <div className={styles.header}>
      <div
        className={styles.logo__mobile_position}
        onClick={() => redirectTo(paths.home)}
      >
        <Image
          src="/logo.svg"
          alt="logo"
          width={220}
          height={35}
          className={styles.header__logo}
        />
        <p className={styles.header__title}>
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      <div className={styles.forMobile}>
        {!isAuth ? (
          <Button className={styles.header__btn} onClick={openLogin}>
            Войти
          </Button>
        ) : (
          <>
            <div className={styles.header__profile}>
              <Image
                src="/profile.svg"
                alt="profile"
                width={50}
                height={50}
                className={styles.profile__avatar}
              />
              <div className={styles.user__btn} onClick={openMenu}>
                <span className={styles.profile__name}>{user?.email}</span>
                <span className={styles.arrow}>
                  <svg
                    width="13"
                    height="8"
                    viewBox="0 0 13 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0624 0.707154L6.38477 6.38477L0.707152 0.707154"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {menuOpen && (
        <ProfileHeaderModal onClose={closeMenu}>
          <p className={styles.menu__username}>{user?.email}</p>
          <div className={styles.btns__block}>
            <Button className={styles.header__btn} onClick={onProfile}>
              Мой профиль
            </Button>
            <Button className={styles.menu__exit_btn} onClick={onLogout}>
              Выйти
            </Button>
          </div>
        </ProfileHeaderModal>
      )}
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
