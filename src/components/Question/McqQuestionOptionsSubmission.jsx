import McqQuestionOptionSubmission from "./McqQuestionOptionSubmission";

function McqQuestionOptionsSubmission({ options }) {
  return (
    <div>
      {options?.map((option) => (
        <McqQuestionOptionSubmission key={option?._id} option={option} />
      ))}
    </div>
  );
}

export default McqQuestionOptionsSubmission;
