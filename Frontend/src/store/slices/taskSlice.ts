import { createSlice } from "@reduxjs/toolkit";
import type { taskState } from "../../types/task.types";
import {
  deleteTask,
  getAllTasks,
  getSharedTaskts,
  sendTasks,
  shareTask,
} from "../thunks/taskThunks";

const initialState: taskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // get all tasks
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // add Task

    builder
      .addCase(sendTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendTasks.fulfilled, (state, action) => {
        state.tasks.push(...action.payload);
        state.isLoading = false;
        state.error = null;
      })

      .addCase(sendTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // delete Task

    builder
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = state.tasks.filter(
          (t) => (t as any).id !== action.meta.arg,
        );
      })

      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // share Task

    builder
      .addCase(shareTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(shareTask.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(shareTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    //get shared tasks

    builder
      .addCase(getSharedTaskts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getSharedTaskts.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getSharedTaskts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
