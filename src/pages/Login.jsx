import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/Misc/MainHeader";
import Footer from "../components/Misc/Footer";
import axios from "axios";
import { useState } from "react";

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
