import { useAuth } from "../context/AuthContext";
import Dashboard from "../components/Dashboard";
import Dashboard_Admin from "../components/Dashboard_Admin"


const DashboardWrapper = () => {
  const { user } = useAuth();
  if (user?.role === "admin") return <Dashboard_Admin />;
  return <Dashboard />;
};

export default DashboardWrapper;
