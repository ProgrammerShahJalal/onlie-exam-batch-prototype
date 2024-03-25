import McqQuestionOptions from "./McqQuestionOptions";

function SingleQuestion() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h5 className="text-sm border-b border-gray-400 w-fit text-gray-500">
        Question 1
      </h5>
      <h4 className="my-2 text-lg">
        যে সরলরেখা (3,4) এবং (1,1) বিন্দুগামী তার সমীকরণ কত?
      </h4>
      <McqQuestionOptions />
    </div>
  );
}

export default SingleQuestion;
