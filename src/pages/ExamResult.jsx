import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SingleQuestionSubmission from "../components/Question/SingleQuestionSubmission";

function ExamResult() {
  const [searchParams] = useSearchParams();
  const examId = searchParams.get("examId");
  const version = searchParams.get("version");
  const registrationNo = searchParams.get("regNo");

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [updatedQuestions, setUpdatedQuestions] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [totalSubmitted, setTotalSubmitted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [markObtained, setMarkObtained] = useState(0);

  useEffect(() => {
    const fetchExam = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/exams/${examId}`
      );
      setExam(data);
    };

    const fetchQuestions = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/exams/${examId}/questions/${version}`
      );
      setQuestions(data);
    };

    const fetchSubmission = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/exam-submissions/registration_no/${registrationNo}/exam/${examId}`
      );
      setSubmission(data);
    };

    fetchExam();
    fetchQuestions();
    fetchSubmission();
  }, [examId, version, registrationNo]);

  useEffect(() => {
    const markPerQuestion = exam?.total_mark / exam?.total_question;

    let total_submitted = 0;
    let marks_obtained = 0;
    let total_correct = 0;
    let total_wrong = 0;
    if (questions && questions?.length > 0 && submission) {
      const updatedQuestions = questions.map((question) => {
        const submitted_answer = submission.submission[question?._id];

        const is_submitted = Boolean(submitted_answer);

        let is_correct;

        if (is_submitted) {
          total_submitted++;

          // is correct work
          is_correct = question.correct_option === (submitted_answer || null);
        }

        if (is_correct) {
          total_correct += 1;
          marks_obtained += markPerQuestion;
        } else {
          total_wrong += 1;
          marks_obtained -= exam?.per_wrong_ans_cut_mark;
        }

        return {
          ...question,
          is_submitted,
          submitted_answer: submitted_answer || null,
          is_correct,
        };
      });
      setUpdatedQuestions(updatedQuestions);
      setTotalSubmitted(total_submitted);
      setTotalCorrect(total_correct);
      setTotalWrong(total_wrong);
      setMarkObtained(marks_obtained);
    }
  }, [exam, questions, submission]);

  return (
    <div className="mb-8">
      <p className="bg-green-200 py-2 text-center text-base mt-4 mb-10">
        <span className="font-bold">Success!</span> Exam answer(s) are
        successfully submitted.
      </p>
      <div className="mx-4 mb-8">
        <div className="bg-white rounded-lg">
          <h2 className="font-semibold text-center text-4xl text-green-500 py-4 border-b border-gray-300">
            Analysis Report
          </h2>
          <h3 className="my-2 text-2xl text-center font-medium">
            HSC Final Revision (Physics, Chemistry, Higher Math, Biology)
          </h3>
          <h4 className="my-1 text-xl text-center font-medium">
            {exam?.title}
          </h4>
          <p className="text-center text-base font-medium pb-4">
            Obtained Marks: {markObtained}/{exam?.total_mark} &#x28;Correct:
            {totalCorrect}, Incorrect: {totalWrong}, Skipped:
            {exam?.total_question - totalSubmitted}&#x29;
          </p>
        </div>
      </div>
      <div className="mx-4 flex flex-col gap-4">
        {updatedQuestions &&
          updatedQuestions?.length > 0 &&
          updatedQuestions?.map((updatedQuestion) => (
            <SingleQuestionSubmission
              key={updatedQuestion._id}
              question={updatedQuestion}
              version={version}
            />
          ))}
      </div>
    </div>
  );
}

export default ExamResult;
