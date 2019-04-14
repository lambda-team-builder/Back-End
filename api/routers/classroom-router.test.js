const request = require("supertest");
const server = require("../server");

const Classrooms = require("../../data/models/classroomsModel");
const db = require("../../data/dbConfig");
const admin = {
  name: "Ryan Tim",
  email: "ryan2.hamblin@lambdaschool.com",
  password: "123",
  user_type_id: 1
};

describe("classroom-router.js", () => {
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
    await Classrooms.reset();
  });
  afterAll(async () => {
    // resets classrooms and classroom admins
    await Classrooms.reset();
    await db("users").truncate();
  });

  describe("classroom routes", () => {
    describe("POST /api/classrooms/", () => {
      it("returns 201 on success", () => {
        return request(server)
          .post("/api/classrooms/")
          .set("Authorization", token)
          .send({ name: "group" })
          .expect(201);
      });
      it("No name in req return status 401", () => {
        return request(server)
          .post("/api/classrooms/")
          .set("Authorization", token)
          .expect(401);
      });
      it("if name taken return status 403", async () => {
        await request(server)
          .post("/api/classrooms/")
          .set("Authorization", token)
          .send({ name: "group" });
        return request(server)
          .post("/api/classrooms/")
          .set("Authorization", token)
          .send({ name: "group" })
          .expect(403);
      });
      it("has right res body", () => {
        return request(server)
          .post("/api/classrooms/")
          .set("Authorization", token)
          .send({ name: "group" })
          .expect({
            id: 1,
            name: "group",
            classroom_admin_user_ids: [1]
          });
      });
    });
  });
});
