const request = require("supertest");
const server = require("../server.js");

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
  let user_id;

  beforeAll(async (done) => {
    // Register
    const registerRes = await request(server)
      .post("/api/auth/register")
      .send(admin);

    // Login
    const loginRes = await request(server)
      .put("/api/auth/login")
      .send({
        email: admin.email,
        password: admin.password
      });

    token = JSON.parse(loginRes.text).token;
    user_id = JSON.parse(registerRes.text).id;

    done();
  });

  beforeEach(async () => {
    // resets classrooms
    await Classrooms.reset();
  });

  afterAll(async () => {
    db.destroy();
  });

  describe("POST /api/classrooms/", () => {
    it("should return 201 on success", async () => {
      return await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "group", user_id })
        .expect(201);
    });

    it("Should return 401 if name is not provided", async () => {
      return await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "", user_id })
        .expect(401);
    });

    it("should return 403 if classroom name is taken", async () => {
      await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "group", user_id })

      return await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "group", user_id })
        .expect(403);
    });

    it("should return tailored response on success", async () => {
      return await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "group", user_id })
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

      return await request(server)
        .get("/api/classrooms")
        .set("Authorization", token)
        .expect(200);
    });

    it("should return classroom list if classrooms exist", async () => {
      await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "Build Week 20" });

      return await request(server)
        .get("/api/classrooms")
        .set("Authorization", token)
        .expect([
          {
            id: 1,
            name: "Build Week 20"
          }
        ]);
    });

    it("should return an empty classroom list if no classrooms exist", async () => {
      return await request(server)
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

      return await request(server)
        .get("/api/classrooms/1")
        .set("Authorization", token)
        .expect(200);
    });

    it("should return the classroom on success", async () => {
      await request(server)
        .post("/api/classrooms/")
        .set("Authorization", token)
        .send({ name: "Build Week 20" });

      return await request(server)
        .get("/api/classrooms/1")
        .set("Authorization", token)
        .expect({
          id: 1,
          name: "Build Week 20",
          projects: []
        });
    });

    it("should return 404 if no classroom with given ID exists", async () => {
      return await request(server)
        .get("/api/classrooms/10")
        .set("Authorization", token)
        .expect(404);
    });

    it("should return an error message if no classroom with given ID exists", async () => {
      return await request(server)
        .get("/api/classrooms/10")
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

      return await request(server)
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

      return await request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "Build Week 19" })
        .expect({ id: 1, name: "Build Week 19", projects: [] });
    });

    it("should return 400 if name is not provided", async () => {
      return await request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "" })
        .expect(400);
    });

    it("should return an error message if name is not provided", async () => {
      return await request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "" })
        .expect({
          message: "Classroom name required"
        });
    });

    it("should return 404 if no classroom with given ID exists", async () => {
      return await request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "Build Week 19" })
        .expect(404);
    });

    it("should return an error message if no classroom with given ID exists", async () => {
      return await request(server)
        .put("/api/classrooms/1")
        .set("Authorization", token)
        .send({ name: "Build Week 19" })
        .expect({
          message: "Classroom not found"
        });
    });
  });
});
