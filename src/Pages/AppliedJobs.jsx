import { useEffect, useState } from "react";

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem("appliedJobs")) || []);
  }, []);

  const removeJob = (id) => {
    const updated = jobs.filter((job) => job._id !== id);
    localStorage.setItem("appliedJobs", JSON.stringify(updated));
    setJobs(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Applied Jobs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
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
            <button
              onClick={() => removeJob(job._id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppliedJobs;