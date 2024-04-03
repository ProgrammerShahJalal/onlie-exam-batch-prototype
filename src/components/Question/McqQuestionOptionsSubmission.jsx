import McqQuestionOptionSubmission from "./McqQuestionOptionSubmission";

function McqQuestionOptionsSubmission({
  options,
  version,
  submittedAnswer,
  correctOption,
}) {
  return (
    <div>
      {options?.map((option) => (
        <McqQuestionOptionSubmission
          key={option?._id}
          option={option}
          version={version}
          submittedAnswer={submittedAnswer}
          correctOption={correctOption}
        />
      ))}
    </div>
  );
}

export default McqQuestionOptionsSubmission;
