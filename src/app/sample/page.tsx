import styles from "./styles.module.css";
export default function SamplePage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <h1>SamplePage</h1>
      </div>

      <div className={styles.footerMenu}>
        <button className={`${styles.menuButton} ${styles.active}`}>
          <span></span>
          <span>チーム</span>
        </button>
        <button className={styles.menuButton}>
          <span></span>
          <span>仮想敵</span>
        </button>
        <button className={styles.menuButton}>
          <span></span>
          <span>選出</span>
        </button>
      </div>
    </div>
  );
}
