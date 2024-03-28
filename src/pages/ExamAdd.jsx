import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ExamAdd() {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    totalQuestion: "",
    totalMark: "",
    perWrongAnsCutMark: 0,
    durationInMinutes: "",
    isLive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      start: {
        date: formData.startDate,
        time: formData.startTime,
      },
      end: {
        date: formData.startDate,
        time: formData.startTime,
      },
      is_live: formData.isLive,
      total_question: formData.totalQuestion,
      total_mark: formData.totalMark,
      duration_in_minutes: formData.durationInMinutes,
      per_wrong_ans_cut_mark: formData.perWrongAnsCutMark,
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/exams`,
      payload
    );

    if (data) toast.success("Exam added successfully!");
    else toast.error("Failed to add exam!");

    // Clear the form inputs after successful submission
    setFormData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      totalQuestion: "",
      totalMark: "",
      perWrongAnsCutMark: "",
      durationInMinutes: "",
      isLive: false, // Optionally reset the checkbox state
    });
  };
  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl text-center font-semibold uppercase">Add Exam</h2>
      <form onSubmit={handleAddExam}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="mb-4">
            <label htmlFor="startDate" className="block mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="w-full px-4 py-2 border rounded"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startTime" className="block mb-1">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              className="w-full px-4 py-2 border rounded"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="mb-4">
            <label htmlFor="endDate" className="block mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="w-full px-4 py-2 border rounded"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endTime" className="block mb-1">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              className="w-full px-4 py-2 border rounded"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="mb-4">
            <label htmlFor="totalQuestion" className="block mb-1">
              Total Questions
            </label>
            <input
              type="number"
              min={1}
              id="totalQuestion"
              name="totalQuestion"
              className="w-full px-4 py-2 border rounded"
              value={formData.totalQuestion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalMark" className="block mb-1">
              Total Mark
            </label>
            <input
              type="number"
              min={1}
              id="totalMark"
              name="totalMark"
              className="w-full px-4 py-2 border rounded"
              value={formData.totalMark}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="durationInMinutes" className="block mb-1">
            Duration (in Minutes)
          </label>
          <input
            type="number"
            min={1}
            id="durationInMinutes"
            name="durationInMinutes"
            className="w-full px-4 py-2 border rounded"
            value={formData.durationInMinutes}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <div className="mb-4 w-full">
            <label htmlFor="perWrongAnsCutMark" className="block mb-1">
              Per Wrong Answer Cut Mark
            </label>
            <input
              type="number"
              min={0}
              step={0.01}
              id="perWrongAnsCutMark"
              name="perWrongAnsCutMark"
              className="w-full px-4 py-2 border rounded"
              value={formData.perWrongAnsCutMark}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-end mt-4 w-32">
            <input
              type="checkbox"
              id="isLive"
              name="isLive"
              className="h-5 w-5 mr-2"
              checked={formData.isLive}
              onChange={handleChange}
            />
            <label htmlFor="isLive" className="text-sm">
              Exam is Live
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Exam
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ExamAdd;
