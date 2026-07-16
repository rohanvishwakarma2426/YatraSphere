import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {

  const navigate = useNavigate();
  const { login, loginAsGuest } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      );

      if(response.data.message === "Login Success"){

        login(response.data.user);

        alert("Login Success");

        navigate("/");
      }
      else{
        alert(response.data.message);
      }

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.detail || "Login Failed");
    }
  };

  const handleSkip = () => {
    loginAsGuest();
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex">

      {/* LEFT */}
      <div
        className="w-1/2 hidden lg:flex flex-col justify-end p-16 text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop')",
        }}
      >
        <div className="bg-black/40 p-8 rounded-2xl">
          <h1 className="text-6xl font-bold">
            Welcome Back Traveler.
          </h1>

          <p className="mt-6 text-xl text-gray-200">
            Continue your journeys with YatraSphere.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">

        <div className="w-[85%] max-w-[520px]">

          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Login
          </h2>

          <p className="text-gray-500 mb-10">
            Continue exploring safely.
          </p>

          <div className="flex flex-col gap-5">

            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-xl px-5 py-4 text-lg outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-xl px-5 py-4 text-lg outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
            >
              Login
            </button>

            <p className="text-center text-gray-500 mt-4">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Signup
              </span>
            </p>

            <p
              onClick={handleSkip}
              className="text-center text-gray-400 mt-1 cursor-pointer hover:text-gray-600 transition text-sm"
            >
              Skip for now →
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;