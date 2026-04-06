import { useState } from "react";
import { api } from "../Services/axiosConfig";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    description: "",
    skills: "",
    logo: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setForm({
      ...form,
      logo: file
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    try {
      await api.post("/job/create", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Job Created Successfully ✅");
      navigate("/dashboard/jobs");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Add Job
        </h1>

        <input name="title" placeholder="Title" onChange={handleChange} className="input" />
        <input name="company" placeholder="Company" onChange={handleChange} className="input" />
        <input name="location" placeholder="Location" onChange={handleChange} className="input" />
        <input name="salary" placeholder="Salary" onChange={handleChange} className="input" />

        <select name="jobType" onChange={handleChange} className="input">
          <option value="">Job Type</option>
          <option>Full-Time</option>
          <option>Internship</option>
        </select>

        <input name="experience" placeholder="Experience" onChange={handleChange} className="input" />
        <input name="skills" placeholder="Skills" onChange={handleChange} className="input" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="input" />

        <input type="file" onChange={handleFileChange} />

        {preview && (
          <img src={preview} alt="preview" className="w-16 h-16 rounded-full object-cover" />
        )}

        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded">
          Submit
        </button>

        <style>{`
          .input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
          }
        `}</style>
      </form>
    </div>
  );
}

export default AddJob;