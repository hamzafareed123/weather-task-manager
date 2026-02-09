import { Todo } from "../models/Todo";

export const findTodoById = async (userId: string) => {
  return await Todo.findById(userId);
};

export const createTodoInDB = async (todoData: {
  userId: string;
  todoName: string;
  description?: string;
}) => {
  return await Todo.create(todoData);
};

export const deleteTodoInDB = async (todoId: string) => {
  return await Todo.findByIdAndDelete(todoId);
};

export const findTodoByUserId = async (userId: string) => {
  return await Todo.find({ "sharedWith.userId": userId }).populate(
    "userId",
    "fullName email",
  );
};

export const findAllTodos = async (userId: string) => {
  return await Todo.find({ userId });
};
