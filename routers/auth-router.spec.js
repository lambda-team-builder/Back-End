const request = require("supertest");
const server = require("../api/server.js");

const db = require("../data/dbConfig.js");

describe("auth-router.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  const admin = {
    name: "Ryan Hamblin",
    email: "ryan.hamblin@lambdaschool.com",
    password: "123",
    user_type_id: 1
  };

  const adminType = {
    id: 1,
    name: "admin"
  };

  describe("POST /api/auth/register", () => {
    it("should return 201 status code on success", () => {
      return request(server)
        .post("/api/auth/register")
        .send(admin)
        .expect(201);
    });

    it("should return JSON format response on success", () => {
      return request(server)
        .post("/api/auth/register")
        .send(admin)
        .expect("Content-Type", /json/);
    });

    it("should return tailored new user on success", () => {
      return request(server)
        .post("/api/auth/register")
        .send(admin)
        .then(response => {
          expect(response.body.user).toEqual({
            id: 1,
            name: admin.name,
            email: admin.email,
            user_type: adminType
          });
        });
    });

    it("should return 400 status code if name missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({...admin, name: ""})
        .expect(400);
    });

    it("should return 400 status code if email missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({...admin, email: ""})
        .expect(400);
    });

    it("should return 400 status code if password missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({...admin, password: ""})
        .expect(400);
    });

    it("should return 400 status code if user_type_id missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({...admin, user_type_id: ""})
        .expect(400);
    });

    
    it("should return JSON format response if any field is missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({...admin, name: ""})
        .expect("Content-Type", /json/);
    });
  });
});
