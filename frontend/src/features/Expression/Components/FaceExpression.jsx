import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import { UseSong } from "../../home/hooks/UseSong";
import "../FaceExpression.scss";

let detectExpression = (blendshapes) => {
  const get = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score ?? 0;

  const smileLeft = get("mouthSmileLeft");
  const smileRight = get("mouthSmileRight");
  const jawOpen = get("jawOpen");
  const browInnerUp = get("browInnerUp");
  const browDownLeft = get("browDownLeft");
  const browDownRight = get("browDownRight");

  if (smileLeft > 0.5 || smileRight > 0.5) return "happy";
  if (jawOpen > 0.5) return "surprised";
  if (browDownLeft > 0.35 && browDownRight > 0.35) return "angry";
  if (browInnerUp > 0.08) return "sad";
  return "neutral";
};

const moodConfig = {
  happy:     { emoji: "😄", label: "Happy",      color: "#39ffa0" },
  sad:       { emoji: "🥺", label: "Sad",        color: "#60a5fa" },
  surprised: { emoji: "😮", label: "Surprised",  color: "#f59e0b" },
  angry:     { emoji: "😠", label: "Angry",      color: "#ff4d6d" },
  neutral:   { emoji: "😐", label: "Neutral",    color: "#a78bfa" },
  detecting: { emoji: "👁",  label: "Scanning...", color: "#6b7280" },
};

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);
  const lastExpressionRef = useRef("");

  const [expression, setExpression] = useState("detecting");
  const { handlegetsong } = UseSong();

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });
    return () => {
      cancelAnimationFrame(animationRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleDetect = () => {
    detect({
      videoRef,
      landmarkerRef,
      detectExpression,
      lastExpressionRef,
      setExpression: (val) => {
        setExpression(val);
        const mood = val.split(" ")[0].toLowerCase();
        handlegetsong({ mood });
      },
    });
  };

  const current = moodConfig[expression] || moodConfig.detecting;

  return (
    <div className="face">
      <div className="face__video-wrap">
        <video ref={videoRef} muted className="face__video" />
        <div className="face__video-border" style={{ '--mood-color': current.color }} />
        <div className="face__scan-line" />
      </div>

      <div className="face__info">
        <div className="face__mood" style={{ '--mood-color': current.color }}>
          <span className="face__emoji">{current.emoji}</span>
          <span className="face__label">{current.label}</span>
        </div>

        <button className="face__btn" onClick={handleDetect}>
          <span className="face__btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </span>
          Detect Mood
        </button>
      </div>
    </div>
  );
}