import styles from "./Skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={`${styles.card} ${styles.skeleton}`}>
      <div className={styles.avatarSkeleton}></div>

      <div className={styles.info}>
        <div className={styles.line}></div>
        <div className={styles.lineSmall}></div>
      </div>
    </div>
  );
};

export default Skeleton;
