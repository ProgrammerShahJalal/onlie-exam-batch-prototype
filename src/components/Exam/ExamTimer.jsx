import { useState, useEffect } from "react";
import dayjs from "dayjs";

function ExamTimer({ minutes }) {
  const [currentTime, setCurrentTime] = useState("");
  const [addedTime, setAddedTime] = useState("");
  const [remainingTime, setRemainingTime] = useState(minutes * 60); // Convert minutes to seconds
  const [isLastMinute, setIsLastMinute] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const currentDayjs = dayjs();
      const formattedCurrentTime = currentDayjs.format("h:mm A");
      setCurrentTime(formattedCurrentTime);

      const addedTime = currentDayjs.add(minutes, "minute").format("h:mm A");
      setAddedTime(addedTime);
    };

    updateTime();

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          return 0;
          // Handle timer completion here
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes]);

  useEffect(() => {
    setIsLastMinute(remainingTime <= 60);
  }, [remainingTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-w-[200px] bg-gray-700 pt-3 pb-2 my-4 flex flex-col justify-center items-center rounded-lg">
      <div className="grid grid-cols-2 items-center justify-center">
        <p className="text-white text-xl">Remaining:&nbsp;</p>
        <div
          className={`font-semibold text-2xl timer ${
            isLastMinute ? "text-red-500" : "text-white"
          }`}
        >
          {formatTime(remainingTime)}
        </div>
      </div>
      <h4 className="text-white text-lg">
        Start: {currentTime} - End: {addedTime}
      </h4>
    </div>
  );
}

export default ExamTimer;
