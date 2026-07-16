import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, loginAsGuest } = useAuth();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/signup", {
        name,
        email,
        password,
      });

      login(response.data.user);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.detail || "Signup Failed");
    }
  };

  const handleSkip = () => {
    loginAsGuest();
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex">
      {/* LEFT SIDE */}
      <div
        className="w-1/2 hidden lg:flex flex-col justify-end p-16 text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop')",
        }}
      >
        <div className="bg-black/40 p-8 rounded-2xl">
          <h1 className="text-6xl font-bold leading-tight">
            Explore The World <br /> With Confidence.
          </h1>

          <p className="mt-6 text-xl text-gray-200">
            Join real travelers. <br />
            Discover safe journeys. <br />
            Build unforgettable memories.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-[85%] max-w-[520px]">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-10">
            Join YatraSphere and start exploring.
          </p>

          {/* INPUTS */}

          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-xl px-5 py-4 text-lg outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              onClick={handleSignup}
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Create Account
            </button>
            <p className="text-center mt-6 text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Login
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

export default Signup;