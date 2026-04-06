import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignIn";
import OTP from "./Pages/OTP";
import DashboardHome from "./Pages/DashboardHome";
import Jobs from "./Pages/Jobs";
import SavedJobs from "./Pages/SavedJobs";
import AppliedJobs from "./Pages/AppliedJobs";
import Settings from "./Pages/Settings";
import protectedRoutes from "./Utils/protectedRoutes";
import Addjob from "./Pages/Addjob";
import JobDetails from "./Pages/Jobdetails";
function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/otp" element={<OTP />} />

    <Route path="/dashboard" element={<DashboardLayout />}>
      
      <Route index element={<DashboardHome />} />
      
      <Route path="jobs" element={<Jobs />} />
      
      <Route path="job/:id" element={<JobDetails />} />
      
      <Route path="saved-jobs" element={<SavedJobs />} />
      
      <Route path="applied-jobs" element={<AppliedJobs />} />
      
      <Route path="settings" element={<Settings />} />
      
      <Route path="Add-job" element={<Addjob />} />
      
    </Route>

      <Route path="/admin" element={<protectedRoute allowed={"admin"}><admin/></protectedRoute>} />
</Routes>
  );
}

export default App;