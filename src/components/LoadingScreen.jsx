import { useState, useEffect } from "react";
import Logo from "./Logo";
import "./LoadingScreen.css";

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const interval = 50;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <Logo size="large" />
        </div>

        <div className="loading-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="loading-text">Loading...</p>
          <p className="text-yellow-500 mt-4 text-2xl">
            Developed And Maintained by SAMEER ABBASI
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
