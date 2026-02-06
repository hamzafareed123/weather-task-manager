import { useState } from "react";
import Header from "../components/Common/Header";
import Sidebar from "../components/Common/Sidebar";
import TasksPage from "./TasksPage";
import WeatherPage from "./WeatherPage";
import TaskManagementPage from "./TaskManagementPage";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<string>("weather");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveTabe = () => {
    switch (activeTab) {
      case "weather":
        return <WeatherPage />;

      case "tasks":
        return <TasksPage />;

      case "assign-tasks":
        return <TaskManagementPage />;

      default:
        return <WeatherPage />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-auto">
          {renderActiveTabe()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
