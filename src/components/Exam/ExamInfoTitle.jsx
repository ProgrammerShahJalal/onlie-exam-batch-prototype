import formatTimeFromMinutes from "../../utility/formatTimeFromMinutes";

function ExamInfoTitle({ title, info, whiteBg }) {
  return (
    <div
      className={`${
        whiteBg ? "bg-white" : "bg-[#f7f7f7]"
      } flex flex-col justify-center items-center gap-y-2`}
    >
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="flex items-center">
        <p className="text-xl font-semibold text-gray-500">
          Total Question:{" "}
          <span className="text-gray-700">{info?.noOfQuestions}</span>
        </p>
        <p className="text-base font-semibold px-6 ">|</p>
        <p className="text-xl font-semibold text-gray-500">
          Full Marks: <span className="text-gray-700">{info?.totalMark}</span>
        </p>
        <p className="text-base font-semibold px-6">|</p>
        <p className="text-xl font-semibold text-gray-500">
          Duration:{" "}
          <span className="text-gray-700">
            {formatTimeFromMinutes(info?.durationInMinutes)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ExamInfoTitle;
