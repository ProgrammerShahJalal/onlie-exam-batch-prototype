import { useEffect, useState } from "react";
import ExamCard from "../components/Exam/ExamCard";
import axios from "axios";

function Home() {
  const [exams, setExams] = useState(null);
  useEffect(() => {
    const fetchExams = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/exams`);
      if (data) setExams(data);
    };
    fetchExams();
  }, []);
  return (
    <div className="container mx-auto py-8 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* First column - Left alignment */}
        <div className="justify-self-start">
          {exams &&
            exams.length > 0 &&
            exams.map(
              (exam, index) =>
                index % 3 === 0 && <ExamCard exam={exam} key={exam._id} />
            )}
        </div>
        {/* Second column - Center alignment */}
        <div className="justify-self-center">
          {exams &&
            exams.length > 0 &&
            exams.map(
              (exam, index) =>
                index % 3 === 1 && <ExamCard exam={exam} key={exam._id} />
            )}
        </div>
        {/* Third column - Right alignment */}
        <div className="justify-self-end">
          {exams &&
            exams.length > 0 &&
            exams.map(
              (exam, index) =>
                index % 3 === 2 && <ExamCard exam={exam} key={exam._id} />
            )}
        </div>
      </div>
    </div>
  );
}

export default Home;
