import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/Misc/MainHeader";
import Footer from "../components/Misc/Footer";
import { useState } from "react";
import axios from "axios";
import { Spin } from "antd";

function Authentication() {
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          registration_no: user?.registration_no,
          password,
        }
      );
      console.log(data);
      if (data?.error) setInvalidPassword(true);
      if (data?.isPasswordMatched) {
        setLoading(false);
        setInvalidPassword(false);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      <MainHeader />
      <div className="bg-[#99569B] flex justify-between gap-x-16 items-center px-[200px]">
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
          <div className="bg-[#BA8CBB] h-[440px] mt-6 mb-10 rounded-3xl flex flex-col justify-center items-center px-12">
            <h2 className="text-xl uppercase font-semibold tracking-wider mb-2">
              Welcome <span className="capitalize">{user?.name}</span>
            </h2>
            <h4 className="text-2xl font-bold mb-6">Enter Your Password</h4>
            {invalidPassword && (
              <p className="text-red-600 mb-1 text-base">
                Invalid credentials.
              </p>
            )}
            <form className="w-full" onSubmit={handleLogin}>
              <input
                type="password"
                className="w-full px-3 py-2 outline-0 focus:border-blue-200 border placeholder:text-yellow-500 rounded mb-1"
                name=""
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                to="/forgot-password"
                className="px-4 text-[#211547] text-[17px]"
              >
                Forgot Password?
              </Link>
              {loading && (
                <div className="mt-4 h-20 flex justify-center items-center">
                  <Spin size="large" />
                </div>
              )}
              <div className="flex items-center justify-center mt-6">
                <button className="rounded-full bg-gradient-to-r from-[#f22da6]  to-[#e21844]   hover:from-[#e21844] hover:to-[#f22da6] hover:text-white text-white text-base px-16 py-2 w-fit flex items-center justify-center">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Authentication;
