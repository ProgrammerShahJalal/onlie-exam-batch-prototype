import { useSearchParams } from "react-router-dom";
import ExamInfoTitle from "../components/Exam/ExamInfoTitle";
import ExamTimer from "../components/Exam/ExamTimer";
import SingleQuestion from "../components/Question/SingleQuestion";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Exam() {
  const [searchParams] = useSearchParams();
  const examId = searchParams.get("examId");
  const language = searchParams.get("language");

  console.log(language);

  const [exam, setExam] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/exams/${examId}`
        );
        setExam(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExam();
  }, [examId]);

  const questionMarkDuration = {
    noOfQuestions: exam?.total_question,
    totalMark: exam?.total_mark,
    durationInMinutes: Number(exam?.duration_in_minutes),
  };

  const handleScroll = () => {
    if (timerRef.current) {
      const timerRect = timerRef.current.getBoundingClientRect();
      if (timerRect.top <= 0) {
        timerRef.current.classList.add("fixed", "top-0", "left-0", "right-0");
      } else {
        timerRef.current.classList.remove(
          "fixed",
          "top-0",
          "left-0",
          "right-0"
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#f7f7f7]">
      <div className="py-4 bg-white rounded-lg mb-4 shadow">
        <ExamInfoTitle
          title="HSC Daily MCQ Live Exam C-19"
          info={questionMarkDuration}
          whiteBg={true}
        />
      </div>
      <div className="sticky top-16 z-10 bg-white">
        {exam && <ExamTimer minutes={questionMarkDuration.durationInMinutes} />}
      </div>
      <div className="bg-[#f7f7f7] flex flex-col gap-4">
        <SingleQuestion />
        <SingleQuestion />
        <SingleQuestion />
      </div>
    </div>
  );
}

export default Exam;
