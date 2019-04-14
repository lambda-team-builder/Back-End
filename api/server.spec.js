const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  describe("GET /", () => {
    it("should return 200 OK status code on success", () => {
      return request(server)
        .get("/")
        .expect(200);
    });

    it("should return JSON format response on success", () => {
      return request(server)
        .get("/")
        .expect("Content-Type", /json/);
    });

    it("should return a welcome message", () => {
      return request(server)
        .get("/")
        .then(response => {
          expect(response.body).toEqual({ message: "Welcome to our Team Builder API" });
        });
    });
  });
})