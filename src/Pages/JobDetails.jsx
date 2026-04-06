import { useLocation } from "react-router-dom";

function JobDetails() {
  const { state: job } = useLocation();

  const handleApply = () => {
    let applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    if (!applied.find((j) => j._id === job._id)) {
      applied.push(job);
      localStorage.setItem("appliedJobs", JSON.stringify(applied));
    }

    alert("Applied ✅");
  };

  const handleSave = () => {
    let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (!saved.find((j) => j._id === job._id)) {
      saved.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(saved));
    }

    alert("Saved ✅");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl text-purple-400">{job.title}</h1>

      <p>{job.company}</p>
      <p>{job.location}</p>

      <p className="mt-4">{job.description}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleApply}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Apply
        </button>

        <button
          onClick={handleSave}
          className="bg-yellow-600 px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default JobDetails;