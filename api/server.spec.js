const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  afterAll(async () => {
    db.destroy();
  });

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

    it("should return a welcome message", done => {
      return request(server)
        .get("/")
        .expect({
          message: "Welcome to our Team Builder API"
        })
        .end(done); // seeing if this closes open handles
    });
  });
});
