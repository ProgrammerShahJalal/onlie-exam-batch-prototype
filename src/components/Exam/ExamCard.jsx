import LiveBanner from "../Misc/LiveBanner";
import CTALinkButton from "../Misc/CTALinkButton";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUserInfo } from "../../utility/user";

export default function ExamCard({ exam }) {
  const userRegistrationNo = getUserInfo().registration_no;
  const formattedStartDate = dayjs(exam?.start?.date).format("DD MMM, YYYY");
  const formattedEndDate = dayjs(exam?.end?.date).format("DD MMM, YYYY");
  const formattedStartTime = dayjs(exam?.start?.time, "HH:mm").format("h:mm A");
  const formattedEndTime = dayjs(exam?.end?.time, "HH:mm").format("h:mm A");

  const [examGaveAlready, setExamGaveAlready] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/exam-submissions/is-submitted/registration_no/${userRegistrationNo}/exam/${
          exam?._id
        }`
      );
      setExamGaveAlready(data);
    };
    fetchData();
  }, [exam?._id, userRegistrationNo]);

  return (
    <div
      style={{ width: 350, height: 460 }}
      className="bg-white rounded-md border flex flex-col justify-between pb-4 mb-6"
    >
      <div>
        <div className="bg-[#efefef] px-4">
          {exam?.is_live ? (
            <div className="pt-2">
              <LiveBanner />
            </div>
          ) : (
            <div className="flex justify-end items-center pt-2">
              <p className="bg-[#11A589] text-white text-sm font-medium rounded-xl px-4 w-fit">
                Practice
              </p>
            </div>
          )}
          <h3 className="mt-1 pb-3 text-[#772397] font-bold text-xl">
            {exam?.title}
          </h3>
        </div>
        <div className="flex flex-col gap-3 pt-5 px-4">
          <div>
            <p className="text-lg">Date &amp; Time</p>
            <p className="font-semibold text-black">
              {formattedStartDate === formattedEndDate
                ? `${formattedStartDate} ${formattedStartTime} to ${formattedEndTime}`
                : `${formattedStartDate} ${formattedStartTime} to ${formattedEndDate} ${formattedEndTime}`}
            </p>
          </div>
          <div>
            <p className="text-lg">Duration</p>
            <p className="font-semibold text-black">
              {exam?.duration_in_minutes} min
            </p>
          </div>
          <div>
            <p className="text-lg">Course</p>
            <p className="font-semibold text-black">
              HSC Final Revision (Physics, Chemistry, Higher Math, Biology)
            </p>
            <p>HSC Final Revision & Pre-Admission Program 2024</p>
          </div>
        </div>
      </div>
      <div className=" text-center">
        <p className="text-blue-600 mb-4">
          {!examGaveAlready?.status
            ? "You haven't taken the exam yet"
            : "You have already taken this exam"}
        </p>
        {!examGaveAlready?.status ? (
          <CTALinkButton link={`/exam/instructions/${exam?._id}`}>
            Take Exam
          </CTALinkButton>
        ) : (
          <CTALinkButton
            link={`/exam/result?examId=${exam?._id}&regNo=${userRegistrationNo}&version=${examGaveAlready?.version}`}
            classes="bg-zinc-700"
          >
            View Result
          </CTALinkButton>
        )}
      </div>
    </div>
  );
}
