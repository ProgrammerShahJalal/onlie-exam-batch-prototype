import { useState } from "react";
import { MathJax } from "better-react-mathjax";

const McqQuestionOption = ({
  option,
  selectedOption,
  handleOptionSelect,
  version,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    if (!selectedOption) {
      setIsChecked(true);
      handleOptionSelect(option?.name);
    }
  };
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
          checked={isChecked}
          onChange={handleChange}
          disabled={selectedOption}
          className="hidden"
        />
        <div
          className={`w-8 h-8 text-base text-gray-500 font-medium uppercase border rounded-full flex items-center justify-center border-gray-500 ${
            !isChecked ? "hover:bg-gray-200" : "hover:bg-gray-500"
          } ${isChecked ? "bg-gray-700 text-white" : ""}`}
        >
          {option.name}
        </div>
        <label htmlFor={option._id} className="ml-2 text-lg">
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
        </label>
      </label>
    </div>
  );
};

export default McqQuestionOption;
