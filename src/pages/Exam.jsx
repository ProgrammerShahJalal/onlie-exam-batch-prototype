import ExamInfoTitle from "../components/Exam/ExamInfoTitle";
import ExamTimer from "../components/Exam/ExamTimer";
import SingleQuestion from "../components/Question/SingleQuestion";

function Exam() {
  const questionMarkDuration = {
    noOfQuestions: 15,
    totalMark: 15,
    durationInMinutes: 1.5,
  };
  return (
    <div className="bg-[#f7f7f7]">
      <div className="py-4 bg-white rounded-lg mb-4 shadow">
        <ExamInfoTitle
          title="HSC Daily MCQ Live Exam C-19"
          info={questionMarkDuration}
          whiteBg={true}
        />
      </div>
      <ExamTimer minutes={questionMarkDuration.durationInMinutes} />
      <div className="bg-[#f7f7f7] flex flex-col gap-4">
        <SingleQuestion />
        <SingleQuestion />
        <SingleQuestion />
      </div>
    </div>
  );
}

export default Exam;
