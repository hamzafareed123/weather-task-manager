import request from "supertest";
import app from "../app";
import { User } from "../models/User";
import mongoose from "mongoose";

describe("Todos", () => {

  let userCookie: string;
  let adminCookie: string;

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();

    // ─── REGULAR USER ─────────────────────
    await request(app)
      .post("/auth/signup")
      .send({
        fullName: "Regular User",
        email: "user@test.com",
        password: "123456"
      });

    const userLogin = await request(app)
      .post("/auth/signin")
      .send({
        email: "user@test.com",
        password: "123456"
      });

    userCookie = userLogin.headers["set-cookie"]?.[0];

    // ─── ADMIN USER ───────────────────────
    await request(app)
      .post("/auth/signup")
      .send({
        fullName: "Admin User",
        email: "admin@test.com",
        password: "123456"
      });

    await User.findOneAndUpdate(
      { email: "admin@test.com" },
      { role: "admin" }
    );

    const adminLogin = await request(app)
      .post("/auth/signin")
      .send({
        email: "admin@test.com",
        password: "123456"
      });

    adminCookie = adminLogin.headers["set-cookie"]?.[0];

    if (!adminCookie) throw new Error("Admin login failed - adminCookie is undefined");
    if (!userCookie) throw new Error("User login failed - userCookie is undefined");
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // ─── CREATE TODO ─────────────────────────
  describe("POST /todo/createTodo", () => {

    test("admin should create a todo with all fields", async () => {
      const res = await request(app)
        .post("/todo/createTodo")
        .set("Cookie", adminCookie)
        .send({
          todoName: "Buy groceries",
          description: "Milk, eggs, bread",
          status: "pending"
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("todoName", "Buy groceries");
    });

    test("admin should create a todo without optional description", async () => {
      const res = await request(app)
        .post("/todo/createTodo")
        .set("Cookie", adminCookie)
        .send({
          todoName: "Buy groceries"
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });

    test("should not create todo with missing todoName", async () => {
      const res = await request(app)
        .post("/todo/createTodo")
        .set("Cookie", adminCookie)
        .send({
          description: "Milk, eggs, bread"
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test("should not create todo without login", async () => {
      const res = await request(app)
        .post("/todo/createTodo")
        .send({
          todoName: "Buy groceries",
          description: "Milk, eggs, bread"
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test("regular user should not create todo", async () => {
      const res = await request(app)
        .post("/todo/createTodo")
        .set("Cookie", userCookie)
        .send({
          todoName: "Buy groceries",
          description: "Milk, eggs, bread"
        });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

  });

  // ─── GET TODO BY USER ─────────────────────
  describe("GET /todo/getTodobyUser", () => {

    test("should get todos for logged in user", async () => {
      const res = await request(app)
        .get("/todo/getTodobyUser")
        .set("Cookie", userCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test("should not get todos without login", async () => {
      const res = await request(app)
        .get("/todo/getTodobyUser");

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

  });

  // ─── GET ALL TODOS ────────────────────────
  describe("GET /todo/getAllTodos", () => {

    test("admin should get all todos", async () => {
      const res = await request(app)
        .get("/todo/getAllTodos")
        .set("Cookie", adminCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test("regular user should not get all todos", async () => {
      const res = await request(app)
        .get("/todo/getAllTodos")
        .set("Cookie", userCookie);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    test("should not get all todos without login", async () => {
      const res = await request(app)
        .get("/todo/getAllTodos");

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

  });

  // ─── DELETE TODO ──────────────────────────
  describe("DELETE /todo/deleteTodo/:id", () => {

    test("admin should delete their own todo", async () => {
      const created = await request(app)
        .post("/todo/createTodo")
        .set("Cookie", adminCookie)
        .send({
          todoName: "Todo to delete",
          description: "Will be deleted"
        });

      const id = created.body.data.id;

      const res = await request(app)
        .delete(`/todo/deleteTodo/${id}`)
        .set("Cookie", adminCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test("should not delete todo with invalid id", async () => {
      const res = await request(app)
        .delete("/todo/deleteTodo/invalidid123")
        .set("Cookie", adminCookie);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    test("should not delete todo without login", async () => {
      const res = await request(app)
        .delete("/todo/deleteTodo/someid123");

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test("admin should not delete another admin's todo", async () => {
      await request(app)
        .post("/auth/signup")
        .send({
          fullName: "Admin Two",
          email: "admin2@test.com",
          password: "123456"
        });

      await User.findOneAndUpdate(
        { email: "admin2@test.com" },
        { role: "admin" }
      );

      const admin2Login = await request(app)
        .post("/auth/signin")
        .send({
          email: "admin2@test.com",
          password: "123456"
        });

      const admin2Cookie = admin2Login.headers["set-cookie"]?.[0];

      const created = await request(app)
        .post("/todo/createTodo")
        .set("Cookie", adminCookie)
        .send({
          todoName: "Admin1 Todo",
          description: "Belongs to admin1"
        });

      const id = created.body.data.id;

      const res = await request(app)
        .delete(`/todo/deleteTodo/${id}`)
        .set("Cookie", admin2Cookie);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

  });

  // ─── SHARE TODO ───────────────────────────
  describe("POST /todo/shareTodo/:id", () => {

    test("admin should share todo with another user", async () => {
      const created = await request(app)
        .post("/todo/createTodo")
        .set("Cookie", adminCookie)
        .send({
          todoName: "Shared Todo",
          description: "This will be shared"
        });

      const id = created.body.data.id;

      const res = await request(app)
        .post(`/todo/shareTodo/${id}`)
        .set("Cookie", adminCookie)
        .send({
          emails: ["user@test.com"]
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test("should not share same todo twice with same user", async () => {
      const created = await request(app)
        .post("/todo/createTodo")
        .set("Cookie", adminCookie)
        .send({
          todoName: "Shared Todo",
          description: "This will be shared"
        });

      const id = created.body.data.id;

      await request(app)
        .post(`/todo/shareTodo/${id}`)
        .set("Cookie", adminCookie)
        .send({ emails: ["user@test.com"] });

      const res = await request(app)
        .post(`/todo/shareTodo/${id}`)
        .set("Cookie", adminCookie)
        .send({ emails: ["user@test.com"] });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test("should not share todo with invalid todo id", async () => {
      const res = await request(app)
        .post("/todo/shareTodo/invalidid123")
        .set("Cookie", adminCookie)
        .send({ emails: ["user@test.com"] });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    test("should not share todo without login", async () => {
      const res = await request(app)
        .post("/todo/shareTodo/someid123")
        .send({ emails: ["user@test.com"] });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

  });

});