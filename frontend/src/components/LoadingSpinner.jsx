import styles from "../assets/styles/loadingSpinner.module.css";

export function LoadingSpinner() {
  return (
    <>
      <div className={styles.loadingSpinner}></div>
    </>
  );
}

export function LoadingSpinnerWindow() {
  return (
    <div className={styles.loadingSpinnerWindow}>
      <LoadingSpinner />
    </div>
  );
}

export function LoadingSpinnerFullscreen() {
  return (
    <div className={styles.loadingSpinnerFullscreen}>
      <p>Loading ...</p>
      <LoadingSpinner />
    </div>
  );
}
