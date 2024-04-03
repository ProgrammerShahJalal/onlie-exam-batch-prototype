import McqQuestionOption from "./McqQuestionOption";

function McqQuestionOptions({ options, selectedOption, onSelect, version }) {
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
          version={version}
        />
      ))}
    </div>
  );
}

export default McqQuestionOptions;
