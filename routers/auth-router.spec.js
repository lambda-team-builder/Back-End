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

  describe("POST /api/auth/register", () => {
    it("should return 201 status code on success", () => {
      return request(server)
        .post("/api/auth/register")
        .send(admin)
        .expect(201);
    });
  });
});
