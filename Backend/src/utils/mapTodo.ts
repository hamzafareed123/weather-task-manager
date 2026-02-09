import { ITodoDocument } from "../models/Todo";
import { ITodo } from "../types/todo.types";

export const mapTodo = (todo: any): ITodo => ({
  id: todo._id.toString(),
  userId: todo.userId.toString(),
  senderName:todo.userId?.fullName || "UNknown",
  todoName: todo.todoName,
  description: todo.description,
  status: todo.status,
  createdAt: todo.createdAt,
  updatedAt: todo.updatedAt,
});
