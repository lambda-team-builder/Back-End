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

  describe("GET /api/classrooms/", () => {
    it("should return 200 on success", async () => {
      await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "Build Week 20" });

      return request(server)
        .get("/api/classrooms")
        .set("Authorization", token)
        .expect(200);
    });

    it("should return classroom list if classrooms exist", async () => {
      await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "Build Week 20" });

      return request(server)
        .get("/api/classrooms")
        .set("Authorization", token)
        .expect([{
          id: 1,
          name: "Build Week 20",
        }]);
    });

    it("should return an empty classroom list if no classrooms exist", () => {
      return request(server)
        .get("/api/classrooms")
        .set("Authorization", token)
        .expect([]);
    });
  });

  describe("GET /api/classrooms/:id", () => {
    it("should return 200 on success", async () => {
      await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "Build Week 20" });

      return request(server)
        .get("/api/classrooms/1")
        .set("Authorization", token)
        .expect(200);
    });

    it("should return the classroom on success", async () => {
      await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "Build Week 20" });

      return request(server)
        .get("/api/classrooms/1")
        .set("Authorization", token)
        .expect({
          id: 1,
          name: "Build Week 20",
        });
    });

    it("should return 404 if no classroom with given ID exists", () => {
      return request(server)
        .get("/api/classrooms/1")
        .set("Authorization", token)
        .expect(404);
    });

    it('should return an error message if no classroom with given ID exists', () => {
      return request(server)
        .get("/api/classrooms/1")
        .set("Authorization", token)
        .expect({
          message: "Classroom not found"
        });
    });
  });

  describe("PUT /api/classrooms/:id", () => {
    it("should return 200 on success", async () => {
      await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "Build Week 20" });

      return request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "Build Week 19" })
        .expect(200);
    });

    it("should return the updated classroom on success", async () => {
      await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "Build Week 20" });

      return request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "Build Week 19" })
        .expect({ id: 1, name: "Build Week 19" });
    });

    it("should return 400 if name is not provided", () => {
      return request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "" })
        .expect(400);
    });

    it('should return an error message if name is not provided', () => {
      return request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "" })
        .expect({
          message: "Classroom name required"
        });
    });

    it("should return 404 if no classroom with given ID exists", () => {
      return request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "Build Week 19" })
        .expect(404);
    });

    it('should return an error message if no classroom with given ID exists', () => {
      return request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "Build Week 19" })
        .expect({
          message: "Classroom not found"
        });
    });
  });
});