import styles from "./tile.module.css";

interface ForYouTileProps {
  tileNumber: string;
  text: string;
}
export const ForYouTile = ({ tileNumber, text }: ForYouTileProps) => {
  return (
    <div className={styles.tile__container}>
      <div className={styles.number}>{tileNumber}</div>
      <p className={styles.description}>{text}</p>
    </div>
  );
};
