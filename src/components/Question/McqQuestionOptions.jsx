import { useState } from "react";
import McqQuestionOption from "./McqQuestionOption";

function McqQuestionOptions() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    if (!selectedOption) {
      // Allow selection only if no option is selected
      setSelectedOption(option);
    }
  };

  return (
    <div>
      <McqQuestionOption
        id="option1"
        label="A"
        optionText="3x+12y+1=0"
        isChecked={selectedOption === "A"}
        handleChange={() => handleOptionChange("A")}
      />
      <McqQuestionOption
        id="option2"
        label="B"
        optionText="3x-12y+5=0 "
        isChecked={selectedOption === "B"}
        handleChange={() => handleOptionChange("B")}
      />
      <McqQuestionOption
        id="option3"
        label="C"
        optionText="12-3y+7=0"
        isChecked={selectedOption === "C"}
        handleChange={() => handleOptionChange("C")}
      />
      <McqQuestionOption
        id="option4"
        label="D"
        optionText="2x-2y-1=0"
        isChecked={selectedOption === "D"}
        handleChange={() => handleOptionChange("D")}
      />
    </div>
  );
}

export default McqQuestionOptions;
