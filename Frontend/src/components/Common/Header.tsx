import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { logoutUser } from "../../store/thunks/authThunks";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { Menu } from "lucide-react";

type HeaderProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setSidebarOpen }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMenu]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-sm p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <button onClick={() => setSidebarOpen((prev) => !prev)}>
          <Menu />
        </button>
        <div className="text-2xl font-bold text-[#296374]">Task Manager</div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-medium">{user?.fullName}</span>
          </button>

          {showMenu && (
            <div className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                onClick={() => {
                  navigate("/profile");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  navigate("/settings");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
