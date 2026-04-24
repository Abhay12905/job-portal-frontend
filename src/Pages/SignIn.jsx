import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/user/createUser", formData);

    localStorage.setItem("email", formData.email);

    alert(res.data.message);

    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "employee",
    });

    navigate("/otp");

  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Server not reachable");
    }
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-600 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-500 text-white p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Join Our Job Portal
          </h1>
          <p className="text-lg opacity-90">
            Find your dream job or hire the best talent
          </p>
        </div>

        {/* Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-400 focus:outline-none focus:border-purple-600 py-2"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-400 focus:outline-none focus:border-purple-600 py-2"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-400 focus:outline-none focus:border-purple-600 py-2"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-400 focus:outline-none focus:border-purple-600 py-2"
            />

            <div>
              <p className="mb-3 text-gray-700 font-medium">
                Select Role:
              </p>

              <div className="flex gap-6">

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="employee"
                    checked={formData.role === "employee"}
                    onChange={handleChange}
                    className="accent-purple-600"
                  />
                  Employee
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="employer"
                    checked={formData.role === "employer"}
                    onChange={handleChange}
                    className="accent-purple-600"
                  />
                  Employer
                </label>

              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition"
            >
              Register
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;