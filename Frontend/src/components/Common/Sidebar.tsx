import { Cloud, CheckSquare } from "lucide-react";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import type { User } from "../../types";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Sidebar = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
}: SidebarProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      <div className="hidden md:block w-64 bg-[#296374] text-white p-4 min-h-screen">
        <SidebarContent
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          user={user}
        />
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 z-50 w-64 bg-gray-900 text-white min-h-screen p-4 transition-transform duration-300 md:hidden">
          <SidebarContent
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            user={user}
          />
        </div>
      )}
    </>
  );
};

const SidebarContent = ({
  activeTab,
  handleTabClick,
  user,
}: {
  activeTab: string;
  handleTabClick: (tab: string) => void;
  user: User | null;
}) => (
  <>
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white">Menu</h1>
    </div>

    <div className="mb-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleTabClick("weather");
        }}
        className={`w-full flex items-center gap-3 p-3 rounded-lg font-semibold transition cursor-pointer
        ${activeTab === "weather" ? "bg-[#296374] text-gray-100" : "hover:text-gray-50 text-gray-400"}`}
      >
        <Cloud size={20} />
        <span className="text-lg font-medium">Weather</span>
      </button>
    </div>

    <div className="mb-4">
      <button
        onClick={() => handleTabClick("tasks")}
        className={`w-full flex items-center gap-3 p-3 rounded-lg transition cursor-pointer
        ${activeTab === "tasks" ? "bg-[#296374] text-gray-100" : "hover:text-gray-50 text-gray-400"}`}
      >
        <CheckSquare size={20} />
        <span className="text-lg font-medium">Tasks</span>
      </button>
    </div>

    {user?.role === "admin" && (
      <div>
        <button
          onClick={() => handleTabClick("assign-tasks")}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition cursor-pointer
        ${activeTab === "assign-tasks" ? "bg-[#296374] text-gray-100" : "hover:text-gray-50 text-gray-400"}`}
        >
          <CheckSquare size={20} />
          <span className="text-lg font-medium">Assign Tasks</span>
        </button>
      </div>
    )}
  </>
);

export default Sidebar;
