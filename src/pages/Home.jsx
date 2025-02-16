import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Fixed Navbar (it will appear behind the sidebar) */}
      <Navbar />

      {/* Sidebar is fixed at 0,0 so it doesn't affect layout */}
      <div className="flex">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
