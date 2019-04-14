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

    it("should return the new user on success", () => {
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
  });
});
