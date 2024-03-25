const McqQuestionOption = ({
  id,
  label,
  optionText,
  isChecked,
  handleChange,
}) => {
  return (
    <div className="flex items-center space-x-2 py-2 border-t">
      <label htmlFor={id} className="cursor-pointer">
        <input
          type="radio"
          id={id}
          name="options"
          checked={isChecked}
          onChange={handleChange}
          className="hidden"
        />
        <div
          className={`w-6 h-6 border rounded-full flex items-center justify-center border-gray-500 hover:bg-gray-200 ${
            isChecked ? "bg-gray-500" : ""
          }`}
        >
          {isChecked ? null : label}
        </div>
      </label>
      <span className="text-lg">{optionText}</span>
    </div>
  );
};

export default McqQuestionOption;
