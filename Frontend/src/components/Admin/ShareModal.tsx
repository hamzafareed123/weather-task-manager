import {  useState } from "react";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { X, Check, Mail,  } from "lucide-react";
import Button from "../Common/Button";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { shareTask } from "../../store/thunks/taskThunks";

type ShareModalProps = {
  id: string;
  onClose: () => void;
};

const ShareModal = ({ id, onClose }: ShareModalProps) => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const { allUsers } = useAppSelector((state) => state.auth);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [shareType, setShareType] = useState<"users" | "link">("users");

  const [isSharing, setIsSharing] = useState(false);

  //   const {error,isLoading} = useAppSelector((state)=>state.tasks)

  const filterTask = tasks.find((task) => task.id === id);
  const dispatch = useAppDispatch();

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
        dispatch(shareTask({ taskId: id, emails: selectedUsers }));
      console.log("Sharing task with users:", selectedUsers);
      onClose();
    } finally {
      setIsSharing(false);
    }
  };

  if (!filterTask) {
    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-gray-500 text-center">Task not found</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-96 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-linear-to-r  from-[#458a9f] to-[#1f4f5c] px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">Share Task</h2>
            <p className="text-blue-100 text-sm mt-1 truncate">
              {filterTask.todoName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-lg transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-gray-200 flex">
            <button
              onClick={() => setShareType("users")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition text-black `}
            >
              <Mail size={16} className="inline mr-2" />
              Share with Users
            </button>
          </div>

          {shareType === "users" && (
            <div className="p-4">
              {allUsers && allUsers.length > 0 ? (
                <div className="space-y-2">
                  {allUsers.map((user) => (
                    <label
                      key={user.email}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.email)}
                        onChange={() => handleUserToggle(user.email)}
                        className="w-4 h-4 text-[#1f4f5c] rounded cursor-pointer"
                      />
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      {selectedUsers.includes(user.email) && (
                        <Check size={16} className="text-blue-600" />
                      )}
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">
                  No users available
                </p>
              )}
            </div>
          )}
        </div>

        {shareType === "users" && (
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex gap-3 flex-row  items-center justify-between">
            <Button onClick={onClose} className="btn secondary">
              Cancel
            </Button>
            <Button
              onClick={handleShare}
              className="btn primary "
              disabled={selectedUsers.length === 0 || isSharing}
            >
              {isSharing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sharing...
                </>
              ) : (
                <>
                  <Check size={16} />
                  Share ({selectedUsers.length})
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
