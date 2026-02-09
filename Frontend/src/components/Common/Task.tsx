import type React from "react";

type TaskProps = {
  id: string;
  senderName?: string;
  todoName: string;
  description?: string;
  status: "pending" | "completed" | "canceled";
  deleteIcon?: React.ReactNode;
  shareIcon?: React.ReactNode;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
};

const Task = ({
  id,
  senderName,
  todoName,
  description,
  status,
  deleteIcon,
  shareIcon,
  onDelete,
}: TaskProps) => {
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{todoName}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[status]}`}
        >
          {status.toUpperCase()}
        </span>
      </div>
     
      {description && <p className="text-gray-600 text-sm">{description}</p>}
      <div className="flex justify-end mt-6 space-x-6">
         {senderName && <p className="text-gray-600 text-sm">From: {senderName}</p>}
        {shareIcon && shareIcon}
        {deleteIcon && <div onClick={() => onDelete?.(id)}>{deleteIcon}</div>}
      </div>
    </div>
  );
};

export default Task;
