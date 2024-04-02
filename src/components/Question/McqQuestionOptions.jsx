import McqQuestionOption from "./McqQuestionOption";

function McqQuestionOptions({ options, selectedOption, onSelect }) {
  const handleOptionSelect = (optionName) => {
    onSelect(optionName);
  };

  return (
    <div>
      {options?.map((option) => (
        <McqQuestionOption
          key={option?._id}
          option={option}
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionSelect}
        />
      ))}
    </div>
  );
}

export default McqQuestionOptions;
