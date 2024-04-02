import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/Misc/MainHeader";
import Footer from "../components/Misc/Footer";
import { useState } from "react";
import axios from "axios";

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
                <div role="status" className="flex justify-center mt-4">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
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
