import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Celebrate from "@/components/game/Celebrate";
import Game from "@/components/game/Game";
import { Fetch } from "@/utils/fetch";

export default function Home() {
  const [stats, setStats] = useState({
    score: 0,
    highScore: 0,
    isSolved: false,
    isHighScore: false,
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await Fetch("/get-user", {
        method: "POST",
        token: localStorage.getItem("token") || "",
      });

      if (res?.error) {
        window.alert("Login failed, login again!");
        localStorage.clear();
        navigate("/auth", { replace: true });
        return;
      }

      setStats((prev) => ({
        ...prev,
        highScore: res?.user?.score,
      }));
    })();
  }, []);

  return (
    <div className="my-4">
      <div className="text-center">
        <h1 className="font-semibold text-lg">
          Welcome to the Ultimate Number Guessing Challenge!
        </h1>
        <p className="mb-4">🔥 Challenge Yourself, and Become the Best!</p>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-6">
        <p className="text-lg tracking-wide">
          <span className="mr-2">⭐ Current Score :</span>
          <span className="font-medium">{stats.score}</span>
        </p>
        <div className="w-[1px] h-6 bg-slate-400 max-sm:hidden"></div>
        <p className="text-lg tracking-wide">
          <span className="mr-2">🥇 High Score :</span>
          <span className="font-medium">{stats.highScore}</span>
        </p>
        <div className="w-[1px] h-6 bg-slate-400 max-sm:hidden"></div>
        <p className="text-lg tracking-wide">
          <Link to={"/leaderboard"} className="font-medium ">
            🏆 Leaderboard
          </Link>
        </p>
      </div>
      {/* Game Component */}
      <div className="max-w-[600px] max-sm:p-2 my-8 mx-auto text-center">
        <Game stats={stats} setStats={setStats} />
        {/* {stats.isHighScore && <Confetti width={window.screen.width} height={window.screen.height} />} */}
        {stats.isHighScore && <Celebrate celebrate={stats.isHighScore} />}
      </div>
    </div>
  );
}
