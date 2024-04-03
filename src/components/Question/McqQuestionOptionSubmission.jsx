import { MathJax } from "better-react-mathjax";
import { TiTick } from "react-icons/ti";

const McqQuestionOptionSubmission = ({
  option,
  version,
  correctOption,
  submittedAnswer,
}) => {
  const thisOptionSubmitted = submittedAnswer === option.name;
  const isThisCorrectOption = correctOption === option.name;
  return (
    <div
      className={`flex items-center space-x-2 py-3 border-t border-gray-300 ${
        option?.text?.image ? "h-24" : "h-[55px]"
      }`}
    >
      <label htmlFor={option._id} className="cursor-pointer flex items-center">
        <input
          type="radio"
          id={option._id}
          name="option"
          checked={thisOptionSubmitted}
          disabled
          className="hidden"
        />
        <div
          className={`w-8 h-8 text-base text-gray-500 font-medium uppercase border rounded-full flex items-center justify-center border-gray-500  ${
            thisOptionSubmitted ? "bg-gray-700 text-white" : ""
          }`}
        >
          {option.name}
        </div>

        <label htmlFor={option._id} className="ml-2 text-lg flex items-center">
          {option?.text?.image && (
            <img
              src={`${option?.text?.image}`}
              className="h-20 w-20"
              alt="Question Image"
            />
          )}
          <MathJax>
            {version === "bangla"
              ? option?.text?.bangla
              : option?.text?.english}
          </MathJax>
          {isThisCorrectOption && (
            <p className="text-green-400 ml-2 text-2xl">
              <TiTick />
            </p>
          )}
        </label>
      </label>
    </div>
  );
};

export default McqQuestionOptionSubmission;
