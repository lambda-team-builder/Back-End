const request = require("supertest");
const server = require("./server.js");

describe("auth-router.js", () => {
  const admin = {
    name: "Ryan Hamblin",
    email: "ryan.hamblin@lambdaschool.com",
    password: 123,
    user_type: 1,
  }
  
  describe("POST /register", () => {
    it("should return 200 OK status code on success", () => {
      return request(server)
        .post("/register")
        .send(admin)
        .expect(201);
    });
  });
})