"use client";

interface ScoreDisplayProps {
  score: number;
}

function getScoreStyle(score: number) {
  if (score >= 90) return { color: "text-green-600", message: "太棒了！完美！" };
  if (score >= 70) return { color: "text-yellow-600", message: "很好！繼續加油！" };
  if (score >= 50) return { color: "text-orange-500", message: "不錯，再練習一下！" };
  return { color: "text-pink-500", message: "加油！多練習就會進步！" };
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  const { color, message } = getScoreStyle(score);

  return (
    <div className="bounce-in text-center">
      <div className={`text-6xl font-black ${color}`}>{score}%</div>
      <div className={`text-xl font-bold mt-2 ${color}`}>{message}</div>
    </div>
  );
}
