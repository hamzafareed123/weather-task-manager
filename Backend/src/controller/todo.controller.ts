import { Request, Response, NextFunction } from "express";
import { ICreateTodoBody, ITodo } from "../types/todo.types";
import {
  createTodoService,
  deleteTodoService,
  shareTodoService,
  fetchTodoService,
  fetchAllTodosServices,
} from "../services/todo.sercices";
import { customError } from "../utils/customError";
import { ERROR_MESSAGE } from "../constants/errorMessages";
import { SUCCESS_MESSAGE } from "../constants/successMessages";
import { OutputHandler } from "../middleware/outputHandler";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: ICreateTodoBody = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return next(new customError(ERROR_MESSAGE.USERID_NOT_FOUND, 401));
    }

    const todo: ITodo = await createTodoService(userId, body);

    (res as any).result = { data: todo, message: SUCCESS_MESSAGE.TODO_CREATED };

    OutputHandler(201, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;

    OutputHandler(status, req, res, next);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todoId = req.params.id as string;
    const userId = req.user?.id as string;

    const deleteTodo = await deleteTodoService(userId, todoId);

    (res as any).result = deleteTodo;
    OutputHandler(200, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;

    OutputHandler(status, req, res, next);
  }
};

export const shareTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const senderId = req.user?.id as string;
    const todoId = req.params.id as string;
    const { emails } = req.body;

    const shareTodo = await shareTodoService(senderId, todoId, emails);

    console.log("sendId", senderId);
    console.log("todoId", todoId);
    console.log("emails are", emails);

    (res as any).result = shareTodo;

    OutputHandler(200, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;

    OutputHandler(status, req, res, next);
  }
};

export const getTodobyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;

    const todos = await fetchTodoService(userId);
    (res as any).result = {
      data: todos,
      message: SUCCESS_MESSAGE.TODO_FETCHED,
    };
    OutputHandler(200, req, res, next);
  } catch (error) {
    (res as any).erorr = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;

    OutputHandler(status, req, res, next);
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;
    const allTodos = await fetchAllTodosServices(userId);

    (res as any).result = {
      data: allTodos,
      message: SUCCESS_MESSAGE.TODO_FETCHED,
    };
    OutputHandler(200, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;
    OutputHandler(status, req, res, next);
  }
};
