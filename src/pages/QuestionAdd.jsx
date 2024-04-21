import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MathjaxEquationPreview from "../components/Math/MathJaxEquation";

function QuestionAdd() {
  const [exams, setExams] = useState(null);

  const formDataDefaultValues = {
    examId: "",
    serialNo: 1,
    titleBangla: "",
    titleEnglish: "",
    titleImage: "",
    options: [
      { name: "a", textBangla: "", textEnglish: "", image: "" },
      { name: "b", textBangla: "", textEnglish: "", image: "" },
      { name: "c", textBangla: "", textEnglish: "", image: "" },
      { name: "d", textBangla: "", textEnglish: "", image: "" },
    ],
    correctOption: "",
    rightAnswerBangla: "",
    rightAnswerEnglish: "",
  };
  const [formData, setFormData] = useState(formDataDefaultValues);

  useEffect(() => {
    const fetchExams = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/exams`);

      setExams(data);
    };
    fetchExams();
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/exams/${
          formData.examId
        }/last-question-serial`
      );

      const totalQuestionsAdded = exams?.find(
        (exam) => exam?._id === formData.examId
      )?.total_question;

      if (totalQuestionsAdded === data?.serial_no)
        toast.error(
          "All questions added already for this exam. You can't add more!"
        );

      setFormData((prevData) => ({
        ...prevData,
        serialNo: data?.serial_no + 1,
      }));
    };
    fetchExams();
  }, [formData.examId, exams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionChange = (e, index) => {
    const { name, value } = e.target;
    const textVarName = name.split(".")[1];
    const updatedOptions = [...formData.options].map(
      (option, i) =>
        i === index
          ? { ...option, [textVarName]: value } // Update only at the target index
          : option // Keep other options unchanged
    );
    setFormData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      if (index === null) {
        // Update title image
        setFormData((prevData) => ({
          ...prevData,
          titleImage: imageDataUrl,
        }));
      } else {
        // Update option image
        const updatedOptions = [...formData.options];
        updatedOptions[index].image = imageDataUrl;
        setFormData((prevData) => ({
          ...prevData,
          options: updatedOptions,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();

    const payload = {
      exam_id: formData.examId,
      serial_no: formData.serialNo,
      title: {
        bangla: formData.titleBangla,
        english: formData.titleEnglish,
        image: formData.titleImage,
      },
      options: formData.options.map((option) => {
        return {
          name: option.name,
          text: {
            bangla: option.textBangla,
            english: option.textEnglish,
            image: option.image,
          },
        };
      }),
      correct_option: formData.correctOption,
      right_answer: {
        bangla: formData.rightAnswerBangla,
        english: formData.rightAnswerEnglish,
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/questions`,
        payload
      );
      if (data && !data?.error) {
        toast.success("Question added successfully!");
        setFormData({ ...formDataDefaultValues });
      } else
        toast.error(`Error adding question! ${data?.error ? data?.error : ""}`);
    } catch (error) {
      toast.error("Error adding question!");
    }
  };
  return (
    <div className="px-4 py-8 m-6 bg-white rounded-lg">
      <h2 className="text-2xl text-center font-semibold uppercase mb-8">
        Add Question
      </h2>
      <form onSubmit={handleAddQuestion} className="space-y-4">
        <div className="flex gap-x-4 w-full">
          <div className="w-8/12">
            <label htmlFor="examId" className="block font-medium">
              Exam:
            </label>
            <select
              id="examId"
              name="examId"
              value={formData.examId}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded w-full"
              required
            >
              <option value="" disabled>
                Select Exam
              </option>
              {exams?.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="w-4/12">
            <label htmlFor="serialNo" className="block font-medium">
              Question Serial No:
            </label>
            <input
              type="number"
              min={1}
              id="serialNo"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="titleImage" className="block font-medium">
            Image for title:
          </label>
          <input
            type="file"
            id="titleImage"
            name="titleImage"
            accept="image/*"
            onChange={(e) => handleImageChange(e, null, "title")}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          {/* Display uploaded title image */}
          {formData.titleImage && (
            <img
              src={formData.titleImage[0]}
              alt="Title Image"
              className="mt-2 rounded"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <label htmlFor="titleBangla" className="block font-medium">
              Title (Bangla):
            </label>

            <textarea
              type="text"
              id="titleBangla"
              name="titleBangla"
              value={formData.titleBangla}
              onChange={handleChange}
              rows={5}
              className="border border-gray-300 px-4 py-2 rounded w-full"
            />
            {formData.titleBangla && (
              <MathjaxEquationPreview>
                {formData.titleBangla}
              </MathjaxEquationPreview>
            )}
          </div>
          <div>
            <label htmlFor="titleEnglish" className="block font-medium">
              Title (English):
            </label>
            <textarea
              type="text"
              id="titleEnglish"
              name="titleEnglish"
              value={formData.titleEnglish}
              onChange={handleChange}
              rows={5}
              className="border border-gray-300 px-4 py-2 rounded w-full"
            />
            {formData.titleEnglish && (
              <MathjaxEquationPreview>
                {formData.titleEnglish}
              </MathjaxEquationPreview>
            )}
          </div>
        </div>
        <div>
          <label className="block font-medium">Options:</label>
          {formData.options.map((option, index) => (
            <div key={index} className="flex space-x-4">
              <div className="w-6/12">
                <label className="uppercase font-medium">{option.name}.</label>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />
                {option.image.length > 0 && (
                  <img
                    src={option.image[0]} // Display first uploaded image
                    alt={`Option ${option.name.toUpperCase()} (Bangla)`}
                    className="mt-2 rounded"
                    style={{ maxWidth: "100%" }}
                  />
                )}
                <textarea
                  rows={5}
                  name={`options[${index}].textBangla`}
                  value={option.textBangla}
                  onChange={(e) => handleOptionChange(e, index)}
                  placeholder={`Option ${option.name.toUpperCase()} (Bangla)`}
                  className="border border-gray-300 px-4 py-2 mb-4 rounded w-full"
                />
                {option.textBangla && (
                  <div className="-mt-4 mb-4">
                    <MathjaxEquationPreview>
                      {option.textBangla}
                    </MathjaxEquationPreview>
                  </div>
                )}
              </div>
              <div className="w-6/12">
                <label className="uppercase font-medium">{option.name}.</label>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />
                {option.image && (
                  <img
                    src={option.image[0]} // If image is an array, access its first element
                    alt={`Option ${option.name.toUpperCase()} Image`}
                    className="mt-2 rounded"
                    style={{ maxWidth: "100%" }}
                  />
                )}
                <textarea
                  rows={5}
                  name={`options[${index}].textEnglish`}
                  value={option.textEnglish}
                  onChange={(e) => handleOptionChange(e, index)}
                  placeholder={`Option ${option.name.toUpperCase()} (English)`}
                  className="border border-gray-300 px-4 py-2 mb-4 rounded w-full"
                />
                {option.textEnglish && (
                  <div className="-mt-4 mb-4">
                    <MathjaxEquationPreview>
                      {option.textEnglish}
                    </MathjaxEquationPreview>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="correctOption" className="block font-medium">
            Correct Option:
          </label>
          <select
            id="correctOption"
            name="correctOption"
            value={formData.correctOption}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Select Correct Option
            </option>
            {formData.options.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rightAnswerBangla" className="block font-medium">
            Right Answer (Bangla):
          </label>
          <textarea
            rows={5}
            id="rightAnswerBangla"
            name="rightAnswerBangla"
            value={formData.rightAnswerBangla}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          {formData.rightAnswerBangla && (
            <MathjaxEquationPreview>
              {formData.rightAnswerBangla}
            </MathjaxEquationPreview>
          )}
        </div>
        <div>
          <label htmlFor="rightAnswerEnglish" className="block font-medium">
            Right Answer (English)
          </label>
          <textarea
            rows={5}
            id="rightAnswerEnglish"
            name="rightAnswerEnglish"
            value={formData.rightAnswerEnglish}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          {formData.rightAnswerEnglish && (
            <MathjaxEquationPreview>
              {formData.rightAnswerEnglish}
            </MathjaxEquationPreview>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Question
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default QuestionAdd;
