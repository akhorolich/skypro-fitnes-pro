import styles from './progress.module.css';

type ProgressProps = {
  value: number;
};

export const ProgressBar = ({ value }: ProgressProps) => {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className={styles.progress}>
      <div
        className={styles.progress__bar}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
};
