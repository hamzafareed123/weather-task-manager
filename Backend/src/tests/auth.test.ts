import request from "supertest";
import app from "../app";

describe("Auth", () => {

  // ─── SIGNUP ───────────────────────────────
  describe("POST /auth/signup", () => {

    test("should register a new user successfully", async () => {
      const res = await request(app)
        .post("/auth/signup")
        .send({
          fullName: "Hamza Fareed",
          email: "hamza@test.com",
          password: "123456"
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
    });

    test("should not register with duplicate email", async () => {
      // register once
      await request(app)
        .post("/auth/signup")
        .send({
          fullName: "Hamza Fareed",
          email: "hamza@test.com",
          password: "123456"
        });

      // try again with same email
      const res = await request(app)
        .post("/auth/signup")
        .send({
          fullName: "Hamza Fareed",
          email: "hamza@test.com",
          password: "123456"
        });

      expect(res.status).toBe(409); // 409 conflict not 400
      expect(res.body.success).toBe(false);
    });

    test("should not register with missing fullName", async () => {
      const res = await request(app)
        .post("/auth/signup")
        .send({
          email: "hamza@test.com",
          password: "123456"
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test("should not register with missing email", async () => {
      const res = await request(app)
        .post("/auth/signup")
        .send({
          fullName: "Hamza Fareed",
          password: "123456"
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test("should not register with missing password", async () => {
      const res = await request(app)
        .post("/auth/signup")
        .send({
          fullName: "Hamza Fareed",
          email: "hamza@test.com"
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

  });

  // ─── SIGNIN ───────────────────────────────
  describe("POST /auth/signin", () => {

    beforeEach(async () => {
      await request(app)
        .post("/auth/signup")
        .send({
          fullName: "Hamza Fareed",
          email: "hamza@test.com",
          password: "123456"
        });
    });

    test("should login with correct credentials", async () => {
      const res = await request(app)
        .post("/auth/signin")
        .send({
          email: "hamza@test.com",
          password: "123456"
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("message");
    });

    test("should not login with wrong password", async () => {
      const res = await request(app)
        .post("/auth/signin")
        .send({
          email: "hamza@test.com",
          password: "wrongpassword"
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test("should not login with unregistered email", async () => {
      const res = await request(app)
        .post("/auth/signin")
        .send({
          email: "nobody@test.com",
          password: "123456"
        });

      expect(res.status).toBe(401); // 401 because service throws INVALID_CREDENTIALS for missing user too
      expect(res.body.success).toBe(false);
    });

  });

  // ─── LOGOUT ───────────────────────────────
  describe("POST /auth/logout", () => {

    test("should logout successfully", async () => {
      const res = await request(app)
        .post("/auth/logout");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

  });

});