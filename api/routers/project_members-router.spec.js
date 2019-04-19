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
  beforeAll(async done => {
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

    let token = JSON.parse(loginRes.text).token;
    let user_id = JSON.parse(registerRes.text).id;

    // Create classroom; assigns classroom admin
    const createClassroom = await request(server)
      .post("/api/classrooms/")
      .set("Authorization", token)
      .send({ name: "Build  Week 99", user_id });

    const createProject = await request(server)
      .post("/api/classrooms/")
      .set("Authorization", token)
      .send({ name: "Build  Week 99", user_id });

    let classroom_id = JSON.parse(createClassroom.text).id;
    let project_id = JSON.parse(createProject.text).id;

    beforeEach(async done => {
      // resets classrooms
      await db("classroom_admins").truncate();
      await db("classrooms").truncate();
      done();
    });

    afterAll(async () => {
      db.destroy();
    });

    describe("POST /api/classrooms/", () => {
      describe("Name of the group", () => {});
    });
    done();
  });
});
