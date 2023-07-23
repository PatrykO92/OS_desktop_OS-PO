import "../assets/styles/loadingSpinner.css";

export function LoadingSpinner() {
  return <div className="loading-spinner"></div>;
}

export default function LoadingSpinnerWindow() {
  return (
    <div className="loading-spinner-window">
      <div className="loading-spinner"></div>
    </div>
  );
}

export function LoadingSpinnerFullscreen() {
  return (
    <div className="loading-spinner-fullscreen">
      <div className="loading-spinner"></div>
    </div>
  );
}
