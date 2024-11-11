import styles from "./FloatingButton.module.css";
const FloatingButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.floatingButton}>
      <span className={styles.plusIcon}>+</span>
    </button>
  );
};

export default FloatingButton; 
