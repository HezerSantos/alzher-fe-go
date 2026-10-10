import { useEffect, useState } from "react";
import "./LoadingBar.scss";

interface LoadingBarProps {
  loading: boolean;
}

const LoadingBar = ({ loading }: LoadingBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      setProgress(100);
      return;
    }

    setProgress(80);

    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 90) {
          clearInterval(interval);
          return 90;
        }

        return Math.min(current + Math.random() * 5, 90);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading && progress === 100) {
    return null;
  }

  return (
    <div className="loading-bar">
      <div
        className="loading-bar__progress"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default LoadingBar;
