import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { getSharedTaskts } from "../../store/thunks/taskThunks";
import Task from "../Common/Task";

const UserTaskList = () => {
  const { tasks } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSharedTaskts());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="grid md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            todoName={task.todoName}
            description={task.description}
            status={task.status}
            senderName={task.senderName}
          />
        ))}
      </div>
    </div>
  );
};

export default UserTaskList;
