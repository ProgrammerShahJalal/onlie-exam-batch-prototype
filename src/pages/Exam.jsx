import { Navigate, useSearchParams } from "react-router-dom";
import ExamInfoTitle from "../components/Exam/ExamInfoTitle";
import ExamTimer from "../components/Exam/ExamTimer";
import SingleQuestion from "../components/Question/SingleQuestion";
import { getUserInfo } from "../utility/user";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Spin } from "antd";

function Exam() {
  const userResistrationNo = getUserInfo()?.registration_no;
  const [searchParams] = useSearchParams();
  const examId = searchParams.get("examId");
  const version = searchParams.get("version");

  const [loading, setLoading] = useState(false);
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef(null);
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchExam = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/exams/${examId}`
        );
        setExam(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  useEffect(() => {
    setLoading(true);
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/exams/${examId}/questions/${version}`
        );
        setQuestions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
    setIsModalOpen(true);
  };

  const handleConfirm = useCallback(async () => {
    try {
      // Store selected options
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/exam-submissions`,
        {
          registration_no: userResistrationNo,
          exam_id: examId,
          version,
          submission: selectedOptions,
        }
      );
      if (data) {
        toast.success("Submitted!");

        window.location.replace(
          `/exam/result?examId=${examId}&regNo=${userResistrationNo}&version=${version}`
        );
        return <Navigate to="/" replace={true} />;
      } else {
        toast.error("Not submitted. Something went wrong!");
      }
      setFormSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  }, [userResistrationNo, examId, version, selectedOptions]);

  useEffect(() => {
    if (isTimerFinished) {
      handleConfirm();
    }
  }, [isTimerFinished, handleConfirm]);

  return (
    <div className="m-6">
      {loading && (
        <div className="w-full h-48 flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}
      <div className="py-4 bg-white rounded-lg mb-4 shadow">
        <ExamInfoTitle
          title="HSC Daily MCQ Live Exam C-19"
          info={questionMarkDuration}
          whiteBg={true}
        />
      </div>
      <div className="sticky top-16 z-10 bg-white rounded-lg">
        {exam && !formSubmitted && (
          <ExamTimer
            minutes={questionMarkDuration.durationInMinutes}
            setIsTimerFinished={setIsTimerFinished}
          />
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
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleConfirm}
      >
        {/* Customize the alert message here */}
        <p className="font-medium">
          The exam can be given only once. Are you sure you want to submit?
        </p>
      </Modal>
    </div>
  );
}

export default Exam;
