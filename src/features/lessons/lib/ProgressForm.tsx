"use client";
import { Exercise } from "@/shared/api";
import { useForm } from "react-hook-form";
import styles from "./progress-form.module.css";
import { Button } from "@/shared/ui/button";

interface Props {
  exercises: Exercise[];
  initialProgress: number[];
  onSubmit: (progressData: number[]) => Promise<void> | void;
  onClose: () => void;
}

type FormValues = { progress: number[] };

export const ProgressForm = ({
  exercises,
  initialProgress,
  onSubmit,
  onClose,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { progress: initialProgress },
  });

  const submit = async (data: FormValues) => {
    await onSubmit(
      data.progress.map((v) => Math.max(0, Math.floor(Number(v) || 0))),
    );
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submit)}
      id="progress-form"
    >
      <h3 className={styles.title}>Мой прогресс</h3>
      <ul className={styles.list}>
        {exercises.map((exercis, index) => (
          <li key={exercis._id} className={styles.item}>
            <div
              className={styles.name}
            >{`Сколько раз вы сделали ${exercis.name.split("(")[0]}`}</div>
            <div className={styles.hint}>{`Максимум: ${exercis.quantity}`}</div>
            <input
              type="number"
              inputMode="numeric"
              aria-label={`Повторы ${exercis.name}`}
              {...register(`progress.${index}`, {
                valueAsNumber: true,
                min: { value: 1, message: "Не меньше 1" },
                max: {
                  value: exercis.quantity,
                  message: `Не больше ${exercis.quantity}`,
                },
              })}
              className={styles.input}
            />
            <div className={styles.error}>
              {errors?.progress?.[index]?.message as string}
            </div>
          </li>
        ))}
      </ul>
      <Button type="submit" className={styles.save}>
        Сохранить
      </Button>
    </form>
  );
};
