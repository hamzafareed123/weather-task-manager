import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import {
  deleteTask,
  getAllTasks,
  sendTasks,
} from "../../store/thunks/taskThunks";
import Task from "../Common/Task";
import LoadingBar from "../Common/LoadingBar";
import Button from "../Common/Button";
import { Plus, Share2Icon, Trash2Icon } from "lucide-react";
import TaskForm from "./TaskForm";
import ShareModal from "./ShareModal";

const TaskList = () => {
  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = React.useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showId, setShowId] = useState("");

  useEffect(() => {
    dispatch(getAllTasks());
   
  }, [dispatch]);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (data: Record<string, string>) => {
    console.log("Submitted data:", data);
    dispatch(sendTasks([data] as any));
    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleShare = (id: string) => {
    setShowId(id);
    setShowShareModal(true);
  };

  // useEffect(()=>{
  //   dispatch(getAllUsers());
  // },[])



  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Tasks</h1>
        <Button className="btn primary" onClick={handleClick}>
          <Plus />
        </Button>
      </div>

      {showForm && (
        <TaskForm
          title="Add Task"
          fields={[
            { name: "todoName", label: "Task Name", type: "text" },
            { name: "description", label: "Description", type: "text" },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: ["pending", "completed", "canceled"],
            },
          ]}
          submitText="Save Task"
          onSubmit={handleSubmit}
          error={error}
          isLoading={isLoading}
          onClose={handleClose}
        />
      )}
      {isLoading && <LoadingBar />}


      {!isLoading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {tasks?.map((t: any) => (
          <Task
            key={t.id}
            id={t.id}
            todoName={t.todoName}
            description={t.description}
            status={t.status}
            deleteIcon={
              <Trash2Icon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            }
            shareIcon={
              <Share2Icon
                onClick={(e) => {
                   e.stopPropagation();
                     e.preventDefault();
                   handleShare(t.id)
                }}
                className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
              />
            }
            onDelete={handleDelete}
          />
        ))}
      </div>
      {showShareModal && (
        <ShareModal id={showId} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

export default TaskList;
