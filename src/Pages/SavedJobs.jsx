import { useEffect, useState } from "react";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem("savedJobs")) || []);
  }, []);

  const toggleSave = (job) => {
    let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];

    const exists = saved.find((j) => j._id === job._id);

    if (exists) {
      saved = saved.filter((j) => j._id !== job._id);
    }

    localStorage.setItem("savedJobs", JSON.stringify(saved));
    setJobs(saved);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Saved Jobs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded-xl shadow-md"
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
              onClick={() => toggleSave(job)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Unsave
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default SavedJobs;