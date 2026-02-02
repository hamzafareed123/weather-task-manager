import { ICreateTodoBody, ITodo } from "../types/todo.types";
import {
  createTodoInDB,
  deleteTodoInDB,
  findTodoById,
  findTodoByUserId,
  findAllTodos,
} from "../repositories/todo.repositories";
import { mapTodo } from "../utils/mapTodo";
import { customError } from "../utils/customError";
import { ERROR_MESSAGE } from "../constants/errorMessages";
import { findUserByEmails } from "../repositories/user.repositories";

export const createTodoService = async (
  userId: string,
  body: ICreateTodoBody,
): Promise<ITodo> => {
  const { todoName, description } = body;

  const newTodo = await createTodoInDB({
    userId,
    todoName,
    description,
  });

  return mapTodo(newTodo);
};

export const deleteTodoService = async (userId: string, todoId: string) => {
  if (!userId) {
    throw new customError(ERROR_MESSAGE.USERID_NOT_FOUND);
  }
  const todo = await findTodoById(todoId);

  if (!todo) {
    throw new customError(ERROR_MESSAGE.TODO_NOT_FOUND, 404);
  }

  if (todo.userId.toString() !== userId) {
    throw new customError(ERROR_MESSAGE.FORBIDDEN, 403);
  }

  await deleteTodoInDB(todoId);
  return { message: "Todo deleted successfully" };
};

export const shareTodoService = async (
  senderId: string,
  todoId: string,
  emails: string[],
) => {
  const todo = await findTodoById(todoId);
  if (!todo) {
    throw new customError(ERROR_MESSAGE.TODO_NOT_FOUND, 404);
  }

  if (todo.userId.toString() !== senderId.toString()) {
    throw new customError(ERROR_MESSAGE.FORBIDDEN, 403);
  }

  const receivers = await findUserByEmails(emails);

  if (!receivers || receivers.length === 0) {
    throw new customError(ERROR_MESSAGE.USER_NOT_FOUND, 404);
  }

  let addedCount = 0;
  for (const receiver of receivers) {
    if (receiver.id.toString() == senderId.toString()) {
      throw new customError(ERROR_MESSAGE.CANNOT_MESSAGE_YOURSELF, 400);
    }

    const alreadyShared = todo.sharedWith?.some(
      (share) => share.userId.toString() === receiver._id.toString(),
    );

    if (alreadyShared) {
      throw new customError(ERROR_MESSAGE.TODO_ALREADY_SHARED, 400);
    }

    todo.sharedWith?.push({
      userId: receiver._id,
      email: receiver.email,
      sharedAt: new Date(),
    });

    addedCount++;
  }

  if (addedCount > 0) {
    await todo.save();
  }

  return { message: "Todo shared successfully" };
};

export const fetchTodoService = async (userId: string): Promise<ITodo[]> => {
  const todos = await findTodoByUserId(userId);
  return todos.map(mapTodo);
};

export const fetchAllTodosServices = async (
  userId: string,
): Promise<ITodo[]> => {
  const allTodos = await findAllTodos(userId);
  return allTodos.map(mapTodo);
};
