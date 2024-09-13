import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Celebrate({ celebrate }) {
  const height = window.screen.height;
  const width = window.screen.width;

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (celebrate) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }, [celebrate]);

  return createPortal(
    showConfetti && (
      <div className="fixed left-0 top-0 w-full h-full overflow-hidden ">
        <Confetti numberOfPieces={500} width={width} height={height} />
      </div>
    ),
    document.getElementById("portal")
  );
}
