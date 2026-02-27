import { NextFunction, Request, Response } from "express";
import { ISignInBody, ISignUpBody } from "../types/user.types";
import {
  signUpUser,
  signInUser,
  fetchAllUser,
} from "../services/user.services";
import { SUCCESS_MESSAGE } from "../constants/successMessages";
import { OutputHandler } from "../middleware/outputHandler";
import { customError } from "../utils/customError";
import { ERROR_MESSAGE } from "../constants/errorMessages";
import { STATUS_CODE } from "../constants/statusCode";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: ISignUpBody = req.body;

    const user = await signUpUser(body, res);
    (res as any).result = { data: user, message: SUCCESS_MESSAGE.USER_CREATED };

    OutputHandler(STATUS_CODE.CREATED, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: ISignInBody = req.body;

    const user = await signInUser(body, res);

    (res as any).result = {
      data: user,
      message: SUCCESS_MESSAGE.LOGIN_SUCCESSFUL,
    };

    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};

export const getAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    (res as any).result = { data: user };
    OutputHandler(200, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status = error instanceof Error && "statusCode" in error
    ? (res as any).statusCode :  500;
    OutputHandler(status, req, res, next);
  }
};

export const Logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",
    });

    (res as any).result = {
      data: null,
      message: SUCCESS_MESSAGE.LOGOUT_SUCCESSFUL,
    };
    OutputHandler(200, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status = 500;
    OutputHandler(status, req, res, next);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new customError(ERROR_MESSAGE.USERID_NOT_FOUND, 401));
    }

    const user = await fetchAllUser(userId);

    (res as any).result = { data: user, message: "Request Successfull" };
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
