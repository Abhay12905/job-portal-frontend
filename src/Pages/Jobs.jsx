import { useEffect, useState } from "react";
import { api } from "../Services/axiosConfig";
import { useNavigate } from "react-router-dom";
function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);
  
  const fetchJobs = async () => {
    const res = await api.get("/job/getAll");
    console.log(res.data)
    const allJobs = res.data.jobs || [];

    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];

    const filteredJobs = allJobs.filter(
      (job) =>
        !applied.find((j) => j._id === job._id) &&
        !saved.find((j) => j._id === job._id)
    );

    setJobs(filteredJobs);
  };

  const handleApply = (job) => {
    let applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    if (!applied.find((j) => j._id === job._id)) {
      applied.push(job);
      localStorage.setItem("appliedJobs", JSON.stringify(applied));
    }
    fetchJobs();
  };

  const handleSave = (job) => {
    let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (!saved.find((j) => j._id === job._id)) {
      saved.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(saved));
    }
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Jobs Found
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={job.logo || "https://via.placeholder.com/50"}
                className="w-12 h-12 rounded-full"
              />

              <div>
                <h2 className="font-semibold text-gray-800">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {job.description}
            </p>

            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>{job.location}</span>
              <span>{job.jobType}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleApply(job)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded"
              >
                Apply
              </button>

              <button
                onClick={() => handleSave(job)}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-1 rounded"
              >
                Save
              </button>

              <button
                onClick={() =>
                  navigate(`/dashboard/job/${job._id}`, { state: job })
                }
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-1 rounded"
              >
                Details
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Jobs;