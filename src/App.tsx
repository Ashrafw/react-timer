import { useEffect, useState } from "react";

function App() {
  const [inputMinutes, setInputMinutes] = useState<number>(0);
  const [inputSeconds, setInputSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isFirstStart, setIsFirstStart] = useState<boolean>(false);
  let timerInt: number;

  const handleStart = () => {
    setMinutes(Math.floor((inputMinutes * 60 + inputSeconds) / 60));
    setSeconds((inputMinutes * 60 + inputSeconds) % 60);
    setTimer(inputMinutes * 60 + inputSeconds);
    setIsStart(true);
    setIsFirstStart(true);
  };

  const handleRestart = () => {
    clearInterval(timerInt);
    setIsFirstStart(false);
    setIsStart(false);
    setMinutes(0);
    setSeconds(0);
  };
  useEffect(() => {
    if (isStart) {
      timerInt = setInterval(() => {
        if (timer > 0) {
          setTimer((prev) => {
            setMinutes(Math.floor((prev - 1) / 60));
            setSeconds((prev - 1) % 60);
            return prev - 1;
          });
        }
      }, 500);
    } else {
      clearInterval(timerInt);
    }

    return () => clearInterval(timerInt);
  }, [timer, isStart]);

  return (
    <div className=" h-screen w-screen flex flex-col text-lg gap-8 justify-center items-center">
      <div className=" font-bold text-9xl text-center w-[600px]">
        <span className="  px-2 w-[200px]">{minutes.toString().padStart(2, "0")}</span> :{" "}
        <span className=" w-[120px]">{seconds.toString().padStart(2, "0")}</span>
      </div>
      <div className=" flex gap-4">
        <label className=" flex items-center gap-2">
          <input
            className=" rounded-md p-2 w-[180px]"
            type="number"
            onChange={(e) => setInputMinutes(Number(e.target.value))}
          />
          Minutes
        </label>
        <label className=" flex items-center  gap-2">
          <input
            className="rounded-md p-2 w-[180px]"
            type="number"
            onChange={(e) => setInputSeconds(Number(e.target.value))}
          />
          Seconds
        </label>
      </div>
      <div className=" flex gap-8 text-lg">
        <button
          onClick={handleStart}
          disabled={isFirstStart}
          className={` ${
            isFirstStart ? "opacity-30 cursor-not-allowed" : ""
          } min-w-[140px] py-2 px-10 shadow-md shadow-slate-500 bg-slate-600 rounded-md`}
        >
          Start
        </button>
        <button
          onClick={() => setIsStart((prev) => !prev)}
          className=" min-w-[140px] py-2 px-10 shadow-md shadow-slate-500 bg-slate-600 rounded-md"
        >
          {isStart ? "Pause" : "Resume"}
        </button>
        <button
          onClick={handleRestart}
          className=" min-w-[140px] py-2 px-10 shadow-md shadow-slate-500 bg-slate-600 rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
