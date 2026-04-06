import { useState, useRef } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, i) => {
    const value = e.target.value.replace(/\D/, ""); // allow only numbers
    const newOtp = [...otp];
    newOtp[i] = value;
    setOtp(newOtp);

    if (value && i < 5) inputs.current[i + 1].focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1].focus();
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("email");
  const finalOtp = otp.join("");

  if (!email) {
    alert("Email not found. Please signup again.");
    return;
  }

  if (finalOtp.length !== 6) {
    alert("Please enter complete 6-digit OTP");
    return;
  }

  try {
    await axios.post("http://localhost:3000/api/user/OtpVerify", {
      email,
      OTP: finalOtp,
    });

    alert("OTP Verified Successfully ✅");
    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Invalid OTP ❌");
  }
};

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-96"
      >
        <h2 className="text-2xl font-bold text-grey-600">Verify OTP</h2>

        <p className="text-gray-500 text-center">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-xl font-bold focus:border-blue-500 focus:outline-none"
            />
          ))}
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Verify OTP
        </button>

        <button
          type="button"
          className="text-blue-600 hover:underline text-sm"
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
}

export default OTP;
