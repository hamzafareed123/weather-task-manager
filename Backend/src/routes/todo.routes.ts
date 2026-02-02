import express from "express";
import { roleMiddleware } from "../middleware/role.middleware";
import { protectedRoute } from "../middleware/auth.middleware";
import {
  createTodo,
  deleteTodo,
  shareTodo,
  getTodobyUser,
  getAllTodos,
} from "../controller/todo.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { todoSchema } from "../validators/todoValidator";

const router = express.Router();

router.post(
  "/createTodo",
  protectedRoute,
  roleMiddleware,
  validateRequest(todoSchema),
  createTodo,
);
router.delete("/deleteTodo/:id", protectedRoute, roleMiddleware, deleteTodo);
router.post("/shareTodo/:id", protectedRoute, roleMiddleware, shareTodo);
router.get("/getAllTodos", protectedRoute, roleMiddleware, getAllTodos);
router.get("/getTodobyUser", protectedRoute, getTodobyUser);
export default router;
