import styles from "./loading.module.css";

export function Loading() {
  return (
    <div className={styles.loading}>
      <span className={styles.loader}></span>
    </div>
  );
}
