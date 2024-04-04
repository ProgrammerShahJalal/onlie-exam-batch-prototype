import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/Misc/MainHeader";
import Footer from "../components/Misc/Footer";
import axios from "axios";
import { useState } from "react";
import { Spin } from "antd";

function Login() {
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/users/registration-no/${registrationNumber}`
      );
      if (data?._id || data?.error) {
        setLoading(false);
      }
      if (data?._id) {
        setError(null);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/authenticate");
      }
      if (data?.error) setError(data.error);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="min-h-screen">
      <MainHeader />
      <div className="bg-[#FFDA47] flex justify-between items-center px-[120px]">
        <div className="w-5/12">
          <iframe
            width="440"
            height="245"
            className="h-[245px] w-[440px]"
            src="https://www.youtube.com/embed/ujcun5ibKMQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-7/12 ml-8">
          <div className="bg-[#FFE57D] h-[490px] mt-6 mb-10 rounded-3xl flex flex-col justify-center items-center px-12">
            <h2 className="text-3xl uppercase font-bold tracking-wider mb-10">
              Student Login
            </h2>
            {error && (
              <p className="text-red-600 mb-1 text-base">
                Invalid registration number.
              </p>
            )}
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full px-3 py-2 outline-0 focus:border-blue-200 border placeholder:text-yellow-500 rounded mb-1"
                name=""
                placeholder="Enter Your Registration Number"
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
              <Link
                to="/forgot-password"
                className="px-4 text-[#211547] text-[17px]"
              >
                Forgot Registration Number?
              </Link>
              {loading && (
                <div className="mt-4 h-20 flex justify-center items-center">
                  <Spin size="large" />
                </div>
              )}
              <div className="flex items-center justify-center mt-6">
                <button className="rounded-full bg-[#E21847] hover:bg-[#f03737] hover:text-white text-white text-base px-16 py-2 w-fit flex items-center justify-center">
                  Next
                </button>
              </div>
            </form>
            <p className="mt-8">
              Don&apos;t have a Registration Number?{" "}
              <Link to="/register" className="font-semibold">
                Register Now.
              </Link>{" "}
              It&apos;s Free.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
