import { MathJax } from "better-react-mathjax";
import McqQuestionOptionsSubmission from "./McqQuestionOptionsSubmission";

function SingleQuestionSubmission({ question, version }) {
  const statusText = question?.is_correct
    ? "Correct"
    : !question?.is_submitted
    ? "Skipped"
    : "Wrong";
  const statusColor = question?.is_correct
    ? "bg-green-500"
    : !question?.is_submitted
    ? "bg-gray-600"
    : "bg-red-600";
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h5 className="text-sm border-b border-gray-400 w-fit text-gray-500">
          Question {question?.serial_no}
        </h5>
        <p
          className={`${statusColor} text-white px-2 py-0.5 rounded-lg font-medium`}
        >
          {statusText}
        </p>
      </div>
      <div className="">
        {question?.title?.image && (
          <img src={question?.title?.image} alt="Question Image" />
        )}
      </div>
      <h4 className="my-3 text-lg">
        <MathJax>{question?.title[version]}</MathJax>
      </h4>
      <McqQuestionOptionsSubmission
        options={question?.options}
        questionId={question?._id}
        version={version}
        submittedAnswer={question?.submitted_answer}
        correctOption={question?.correct_option}
      />
    </div>
  );
}

export default SingleQuestionSubmission;
