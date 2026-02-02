"use client";
import Image from "next/image";
import { notifyError, notifySuccess } from "@/shared/lib/notification";
import { useForm } from "react-hook-form";
import { useLogin } from "@/features/auth/api/hooks/useAuth";
import { Button } from "@/shared/ui/button";
import styles from "./login.module.css";

type FormValues = { email: string; password: string };
interface LoginFormProps {
  onOpenRegister?: () => void;
  closeModal?: () => void;
}

export const LoginForm = ({ onOpenRegister, closeModal }: LoginFormProps) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { login, loading, error } = useLogin();

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
      await closeModal?.();
      notifySuccess("Вы успешно вошли!");
    } catch (err) {
      notifyError("Ошибка при входе в аккаунт. Побробуйте еще раз.");
    }
  };

  return (
    <div className={styles.form}>
      <Image
        className={styles.logo}
        src={"/logo.svg"}
        alt="logo"
        width={220}
        height={35}
      />
      <form
        className={styles.flex__container}
        onSubmit={handleSubmit(onSubmit)}
        id="login-form"
      >
        <input
          className={styles.form__input}
          placeholder="Логин"
          type="text"
          {...register("email", { required: true })}
        />
        <input
          className={styles.form__input}
          placeholder="Пароль"
          type="password"
          {...register("password", { required: true })}
        />
        {error && <div className={styles.error}>{error}</div>}
      </form>
      <div className={styles.flex__container}>
        <Button
          className={styles.login__btn}
          form="login-form"
          disabled={loading}
        >
          {loading ? "Вход..." : "Войти"}
        </Button>
        <Button className={styles.signin__btn} onClick={onOpenRegister}>
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};
