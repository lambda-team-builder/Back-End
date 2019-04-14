const request = require("supertest");
const server = require("../server");

const Projects = require("../../data/models/projectsModel.js");
const db = require("../../data/dbConfig");
const admin = {
  name: "Ryan Tim",
  email: "ryan3.hamblin@lambdaschool.com",
  password: "123",
  user_type_id: 1
};

describe("project-router.js", () => {
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
    await Projects.reset();
  });
  afterAll(async () => {
    // resets classrooms and classroom admins
    await Projects.reset();
    await db("users").truncate();
  });

  describe("POST /api/projects/", () => {
    it("returns 201 on success", () => {
      return request(server)
        .post("/api/projects/")
        .set("Authorization", token)
        .send({ name: "project test", description: "test" })
        .expect(201);
    });
    it("returns 401 if name missing", () => {
      return request(server)
        .post("/api/projects/")
        .set("Authorization", token)
        .send({ description: "test" })
        .expect(401);
    });
    it("returns 403 if name taken", async () => {
      await request(server)
        .post("/api/projects/")
        .set("Authorization", token)
        .send({ name: "project test", description: "test" });
      return request(server)
        .post("/api/projects/")
        .set("Authorization", token)
        .send({ name: "project test", description: "test" })
        .expect(403);
    });
    it("returns created project on success", () => {
      return request(server)
        .post("/api/projects/")
        .set("Authorization", token)
        .send({ name: "project test", description: "test" })
        .expect({
          id: 1,
          name: "project test",
          description: "test"
        });
    });
  });
});
