import { MathJax } from "better-react-mathjax";

const McqQuestionOptionSubmission = ({ option }) => {
  return (
    <div className="flex items-center space-x-2 py-3 border-t border-gray-300 h-[55px]">
      <label htmlFor={option._id} className="cursor-pointer flex items-center">
        <input type="radio" id={option._id} name="option" className="hidden" />

        <label htmlFor={option._id} className="ml-2 text-lg">
          <MathJax>{option?.text?.bangla}</MathJax>
        </label>
      </label>
    </div>
  );
};

export default McqQuestionOptionSubmission;
