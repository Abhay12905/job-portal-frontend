import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../Services/axiosConfig.js";
function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

     const res = await api.post("/user/login", form, {
     withCredentials: true
});
    // console.log(res.headers.authorization)
      const token = res.headers.authorization.split(" ")[1];

      localStorage.setItem("accessToken", token);

      alert("Login Successful ");

      navigate("/dashboard");

    } catch(error){
  console.log(error);
  alert(error.response?.data?.message || "Login Failed ");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900 p-4">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-center text-2xl font-bold mb-6">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required/>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-center text-sm mt-6">

          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium">
            Sign Up
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;