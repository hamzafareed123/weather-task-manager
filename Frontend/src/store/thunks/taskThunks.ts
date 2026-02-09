import { createAsyncThunk } from "@reduxjs/toolkit";
import { taskApi } from "../../services/api/taskApi";
import type { Task } from "../../types/task.types";
import toast from "react-hot-toast";

export const sendTasks = createAsyncThunk<
  Task[],
  Task[],
  { rejectValue: string }
>("task/sendTasks", async (tasks: Task[], { rejectWithValue }) => {
  try {
    const data = await taskApi.sendTasks(tasks);
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong",
    );
  }
});

export const getAllTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>("task/getAllTodos", async (_, { rejectWithValue }) => {
  try {
    const data = await taskApi.getAllTasks();
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong",
    );
  }
});

export const deleteTask = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("task/deleteTask", async (id: string, { rejectWithValue }) => {
  try {
    const data = await taskApi.deleteTask(id);
    return data.message;
  } catch (error) {
    return rejectWithValue("Failed to delete task");
  }
});

export const shareTask = createAsyncThunk<
  any,
  { taskId: string; emails: string[] }
>("task/shareTask", async ({ taskId, emails }, { rejectWithValue }) => {
  try {
    const data = await taskApi.shareTask(taskId, emails);
    toast.success(data.message);
    return data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to share task");
    return rejectWithValue(
      error?.response.data.message || "Failed to share task",
    );
  }
});

export const getSharedTaskts = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>("task/getSharedTasks", async (_, { rejectWithValue }) => {
  try {
    const data = await taskApi.getSharedTasks();
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to get shared tasks",
    );
  }
});
