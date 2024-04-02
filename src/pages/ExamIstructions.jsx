import CTALinkButton from "../components/Misc/CTALinkButton";
import ExamInfoTitle from "../components/Exam/ExamInfoTitle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ExamIstructions() {
  let { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState("");

  const handleLanguageChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/exams/${examId}`
        );
        setExam(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExam();
  }, [examId]);

  const questionMarkDuration = {
    noOfQuestions: exam?.total_question,
    totalMark: exam?.total_mark,
    durationInMinutes: exam?.duration_in_minutes,
  };
  return (
    <div className="bg-white">
      <div className="border-b py-4 bg-[#f7f7f7]">
        <ExamInfoTitle
          title="HSC Daily MCQ Live Exam C-19"
          info={questionMarkDuration}
        />
      </div>
      <div className="pt-4 px-4">
        <h3 className="text-2xl  pb-6 font-semibold text-center border-b">
          পরীক্ষার্থীদের জন্য নির্দেশাবলি
        </h3>
        <div className="mt-4">
          <div className="flex gap-x-1">
            <p className="text-base">০১।</p>
            <p className="text-base">
              প্রতিটি MCQ প্রশ্নের জন্য চারটি করে option আছে। সর্বোৎকৃষ্ট
              উত্তরটি বাছাই করতে হবে। সঠিক উত্তরটি সতর্কতার সহিত Select করতে
              হবে। কারণ, সঠিক উত্তর একবার Select করলে আর Deselect করা যাবে না।
              একই প্রশ্নের একাধিক উত্তর গ্রহণযোগ্য হবে না। কোনো প্রশ্নের সঠিক
              উত্তর না থাকলে সবচেয়ে কাছাকাছি উত্তরটি বাছাই করতে হবে।
            </p>
          </div>
          <div className="flex gap-x-1 mt-1">
            <p className="text-base">০২।</p>
            <p className="text-base">
              প্রতিটি সঠিক উত্তরের জন্য এক (১) নম্বর পাওয়া যাবে।
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 px-4">
        <h3 className="text-2xl  pb-6 font-semibold text-center border-b">
          Instructions for the examinees
        </h3>

        <div className="mt-4">
          <div className="flex gap-x-1">
            <p className="text-base">01.</p>
            <p className="text-base">
              There are four options for each MCQ question. Select the best
              option. The correct answer must be selected with caution. Because
              once select an option, it can&apos;t be deselected. Multiple
              answers to the same question will not be acceptable. If there is
              no correct answer to a question, the nearest answer should be
              chosen.
            </p>
          </div>
          <div className="flex gap-x-1 mt-1">
            <p className="text-base">02.</p>
            <p className="text-base">
              One (1) mark will be given for each correct answer
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-6 justify-center items-center">
        <form>
          <select
            value={selectedVersion}
            onChange={handleLanguageChange}
            className="w-96 pl-4 py-2 border text-base"
          >
            <option value="" disabled>
              Select Version
            </option>
            <option value="bangla">Bangla</option>
            <option value="english">English</option>
          </select>
        </form>
        <div className="mb-8">
          <CTALinkButton
            link={`/exam/start?examId=${exam?._id}&version=${
              selectedVersion || "bangla"
            }`}
          >
            Start Exam
          </CTALinkButton>
        </div>
      </div>
    </div>
  );
}

export default ExamIstructions;
