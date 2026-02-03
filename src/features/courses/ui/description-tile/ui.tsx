import styles from "./description.module.css";

interface PropsDescriptionTile {
  imgPath: string;
  text?: string;
  duration?: { from: string; to: string };
}
export const DescriptionTile = ({
  imgPath,
  text,
  duration,
}: PropsDescriptionTile) => {
  return (
    <div className={styles.tile}>
      <svg className={styles.icon} aria-hidden="true">
        <use href={imgPath} />
      </svg>
      {text && <p className={styles.tile__text}>{text}</p>}
      {duration && (
        <p
          className={styles.tile__text}
        >{`${duration.from}-${duration.to} мин/день`}</p>
      )}
    </div>
  );
};
