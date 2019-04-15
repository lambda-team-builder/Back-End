const request = require("supertest");
const server = require("../server");

const Roles = require("../../data/models/rolesModel");
const db = require("../../data/dbConfig");
const admin = {
  name: "Ryan Tim",
  email: "ryan4.hamblin@lambdaschool.com",
  password: "123",
  user_type_id: 1
};

describe("role-router.js", () => {
  let token;
  beforeAll(async () => {
    // register
    await request(server)
      .post("/api/auth/register")
      .send(admin);
    // login
    const res = await request(server)
      .put("/api/auth/login")
      .send({
        email: admin.email,
        password: admin.password
      });
    token = JSON.parse(res.text).token;
  });

  beforeEach(async () => {
    // resets classrooms and classroom admins
    await Roles.reset();
  });
  afterAll(async () => {
    // resets classrooms and classroom admins
    await Roles.reset();
    await db("users").truncate();
  });

  describe("POST /api/classrooms/", () => {
    it("returns 201 on success", () => {
      return request(server)
        .post("/api/roles/")
        .set("Authorization", token)
        .send({ name: "frontend" })
        .expect(201);
    });
    it("No name in req return status 401", () => {
      return request(server)
        .post("/api/roles/")
        .set("Authorization", token)
        .expect(401);
    });
    it("if name taken return status 403", async () => {
      await request(server)
        .post("/api/roles/")
        .set("Authorization", token)
        .send({ name: "frontend" });
      return request(server)
        .post("/api/roles/")
        .set("Authorization", token)
        .send({ name: "frontend" })
        .expect(403);
    });
    it("has right res body", () => {
      return request(server)
        .post("/api/roles/")
        .set("Authorization", token)
        .send({ name: "frontend" })
        .expect({
          id: 1,
          name: "frontend"
        });
    });
  });
});
