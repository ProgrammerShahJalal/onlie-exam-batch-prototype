import { MathJax } from "better-react-mathjax";
import { getImageType } from "../../utility/image";
import McqQuestionOptionsSubmission from "./McqQuestionOptionsSubmission";

function SingleQuestion({ question, version }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h5 className="text-sm border-b border-gray-400 w-fit text-gray-500">
        Question {question?.serial_no}
      </h5>
      <div className="">
        {question?.title?.image && (
          <img
            src={`data:image/${getImageType(question?.title?.image)};base64,${
              question?.title?.image
            }`}
            alt="Question Image"
          />
        )}
      </div>
      <h4 className="my-3 text-lg">
        <MathJax>{question?.title[version]}</MathJax>
      </h4>
      <McqQuestionOptionsSubmission
        options={question?.options}
        questionId={question?._id}
      />
    </div>
  );
}

export default SingleQuestion;
