import LiveBanner from "../Misc/LiveBanner";
import CTALinkButton from "../Misc/CTALinkButton";

export default function ExamCard() {
  return (
    <div
      style={{ width: 340, height: 460 }}
      className="rounded-md border flex flex-col justify-between pb-4"
    >
      <div>
        <div className="bg-[#efefef] px-4">
          <div className="pt-2">
            <LiveBanner />
          </div>
          <h3 className="mt-1 pb-3 text-[#772397] font-bold text-xl">
            EAP Daily MCQ Live Exam P-17
          </h3>
        </div>
        <div className="flex flex-col gap-3 pt-5 px-4">
          <div>
            <p className="text-lg">Date &amp; Time</p>
            <p className="font-semibold text-black">
              24 Mar, 2024 08:00 AM to 10:00 PM
            </p>
          </div>
          <div>
            <p className="text-lg">Duration</p>
            <p className="font-semibold text-black">9 min</p>
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
      <div className="text-center">
        <p className="text-blue-600 mb-4">
          You haven&apos;t taken the exam yet
        </p>
        <CTALinkButton link="/exam/instructions">Take Exam</CTALinkButton>
      </div>
    </div>
  );
}
