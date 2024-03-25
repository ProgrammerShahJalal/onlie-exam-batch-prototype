import ExamInfoTitle from "../components/Exam/ExamInfoTitle";
import ExamTimer from "../components/Exam/ExamTimer";
import SingleQuestion from "../components/Question/SingleQuestion";

function Exam() {
  return (
    <div className="bg-[#f7f7f7]">
      <div className="py-4 bg-white rounded-lg mb-4 shadow">
        <ExamInfoTitle title="HSC Daily MCQ Live Exam C-19" whiteBg={true} />
      </div>
      <ExamTimer />
      <div className="bg-[#f7f7f7] flex flex-col gap-4">
        <SingleQuestion />
        <SingleQuestion />
        <SingleQuestion />
      </div>
    </div>
  );
}

export default Exam;
