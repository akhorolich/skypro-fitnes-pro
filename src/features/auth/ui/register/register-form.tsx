"use client";
import Image from "next/image";
import styles from "./register.module.css";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { useRegister } from "@/features/auth/api/hooks/useAuth";
import { notifySuccess, notifyWarning } from "@/shared/lib/notification";

type FormValues = { email: string; password: string; repeat: string };

export const RegisterForm = ({ onOpenLogin }: { onOpenLogin?: () => void }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { register: registerAction, loading, error } = useRegister();

  const onSubmit = async (data: FormValues) => {
    if (data.password !== data.repeat) {
      notifyWarning("Пароли не совпадают!")
      return;
    }
    try {
      await registerAction({ email: data.email, password: data.password });
      onOpenLogin?.();
      notifySuccess('Вы успешно зарегистрировались!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.form}>
      <Image
        className={styles.logo}
        src={"logo.svg"}
        alt="logo"
        width={220}
        height={35}
      />
      <form
        className={styles.flex__container}
        onSubmit={handleSubmit(onSubmit)}
        id="register-form"
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
        <input
          className={styles.form__input}
          placeholder="Повторите пароль"
          type="password"
          {...register("repeat", { required: true })}
        />
        {error && <div className={styles.error}>{error}</div>}
      </form>
      <div className={styles.flex__container}>
        <Button
          className={styles.register__btn}
          form="register-form"
          disabled={loading}
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
        <Button className={styles.signup__btn} onClick={onOpenLogin}>
          Войти
        </Button>
      </div>
    </div>
  );
};
