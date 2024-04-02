import { useSearchParams } from "react-router-dom";
import ExamInfoTitle from "../components/Exam/ExamInfoTitle";
import ExamTimer from "../components/Exam/ExamTimer";
import SingleQuestion from "../components/Question/SingleQuestion";
// import { getUserInfo } from "../utility/user";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Exam() {
  // const userResistrationNo = getUserInfo()?.registration_no;
  const [searchParams] = useSearchParams();
  const examId = searchParams.get("examId");
  const version = searchParams.get("version");

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/exams/${examId}/questions/${version}`
      );
      setQuestions(data);
    };
    fetchQuestions();
  }, [examId, version]);

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

  const handleOptionSelect = (questionId, option) => {
    if (!selectedOptions[questionId] && !formSubmitted) {
      setSelectedOptions({
        ...selectedOptions,
        [questionId]: option,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Store selected options
      // await axios.post(`${import.meta.env.VITE_API_URL}/submit`, {
      //   examId,
      //   responses: selectedOptions,
      // });
      setFormSubmitted(true);
      console.log(selectedOptions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-6">
      <div className="py-4 bg-white rounded-lg mb-4 shadow">
        <ExamInfoTitle
          title="HSC Daily MCQ Live Exam C-19"
          info={questionMarkDuration}
          whiteBg={true}
        />
      </div>
      <div className="sticky top-16 z-10 bg-white rounded-lg">
        {exam && !formSubmitted && (
          <ExamTimer minutes={questionMarkDuration.durationInMinutes} />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {questions &&
            questions?.length > 0 &&
            questions.map((question) => (
              <SingleQuestion
                key={question?._id}
                question={question}
                version={version}
                selectedOption={selectedOptions[question._id]}
                onSelect={handleOptionSelect}
              />
            ))}
        </div>
        <div className="flex justify-center my-6">
          <button
            type="submit"
            className="rounded-full bg-[#2C2A75] hover:bg-[#3630d0] hover:text-white text-white text-base font-medium px-10 py-2 w-fit flex items-center justify-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Exam;
