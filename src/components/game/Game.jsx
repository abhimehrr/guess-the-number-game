import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Fetch } from "@/utils/fetch";

export default function Game({ stats, setStats }) {
  const [nums, setNums] = useState({
    guess: "",
    numberToGuess: 0,
    attempts: 0,
  });


  // Generate a random number to guess
  const generateNumber = () => Math.floor(Math.random() * 100) + 1;

  // Handle Guess
  const handleGuess = (e) => {
    e.preventDefault();

    var { guess, numberToGuess } = nums;
    guess = parseInt(guess);

    if (guess === numberToGuess) {
      setNums((prev) => ({
        ...prev,
        guess: "",
        numberToGuess: generateNumber(),
        attempts: 0,
      }));

      const newScore = stats.score + 1;
      const { highScore } = stats;

      setStats((prev) => ({
        ...prev,
        message: `Correct! you did it in ${
          nums.attempts + 1
        } attempts. 😍`,
        score: newScore,
        isHighScore: false,
        isSolved: true,
      }));

      if (newScore > highScore) {
        setStats((prev) => ({
          ...prev,
          highScore: highScore + 1,
          isHighScore: true,
        }));
        updateScore(highScore + 1);
      }
    } else if (guess > numberToGuess) {
      setStats((prev) => ({
        ...prev,
        isSolved: false,
        isHighScore: false,
        message: "Too High! Please try again ☹",
      }));
      setNums((prev) => ({
        ...prev,
        attempts: prev.attempts + 1,
      }));
    } else {
      setStats((prev) => ({
        ...prev,
        isSolved: false,
        isHighScore: false,
        message: "Too Low! Please try again ☹",
      }));
      setNums((prev) => ({
        ...prev,
        attempts: prev.attempts + 1,
      }));
    }
  };

  // Update score
  const updateScore = (score) => {
    (async () => {
      const res = await Fetch("/update-score", {
        method: "POST",
        token: localStorage.getItem('token') || '',
        body:{
          score
        }
      });
      
      if (res?.error) {
        window.alert('Login failed, login again!')
        localStorage.clear()
        navigate('/auth', {replace: true})
        return;
      }
    })();

  };

  useEffect(() => {
    setNums((prev) => ({
      ...prev,
      numberToGuess: generateNumber(),
    }));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>🚀 Ready, set, go!</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="mb-4 text-lg">
            Guess the number between{" "}
            <span className="font-medium">1 - 100</span>
          </p>
          <form
            onSubmit={handleGuess}
            className="flex justify-center items-center gap-8"
          >
            <Input
              value={nums.guess}
              onChange={(e) =>
                setNums((prev) => ({
                  ...prev,
                  guess: e.target.value,
                }))
              }
              type="number"
              placeholder="1 - 100"
              className="w-[150px]"
            />
            <Button className="tracking-wide">Take a Guess!</Button>
          </form>
          <p className="mt-4 flex justify-center items-center gap-2">
            <span>You have taken</span>
            <span className="text-xl font-medium text-red-600">
              {nums.attempts}
            </span>
            <span>attempts.</span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="mx-auto text-2xl font-medium">
          {stats.isSolved ? (
            <span className="text-green-700">{stats.message}</span>
          ) : (
            <span className="text-red-500">{stats.message}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
