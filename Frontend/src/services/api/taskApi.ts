import toast from "react-hot-toast";
import type { Task } from "../../types/task.types";
import axiosInstance from "./axiosInstance";

export const taskApi = {
  sendTasks: async (tasks: Task[]): Promise<Task[]> => {
    console.log("data is ", tasks);
    const response = await axiosInstance.post("/todo/createTodo", tasks[0]);

    return [response.data.data];
  },

  getAllTasks: async (): Promise<Task[]> => {
    const response = await axiosInstance.get("/todo/getAllTodos");
    return response.data.data;
  },

  deleteTask: async (id: string): Promise<any> => {
    const response = await axiosInstance.delete(`/todo/deleteTodo/${id}`);
    toast.success(response.data.message);
    return response.data;
  },

  shareTask: async (taskId: string, emails: string[]) => {
    const response = await axiosInstance.post(`/todo/shareTodo/${taskId}`, {
      emails,
    });

    return response.data;
  },


  getSharedTasks : async (): Promise<Task[]>=>{
    const response = await axiosInstance.get("/todo/getTodobyUser");
    
    return response.data.data;
  }
};
