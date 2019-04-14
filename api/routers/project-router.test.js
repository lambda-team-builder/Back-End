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
    await Projects.reset();
  });
  afterAll(async () => {
    // resets classrooms and classroom admins
    await Projects.reset();
    await db("users").truncate();
  });
});
