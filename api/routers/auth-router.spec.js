const request = require("supertest");
const server = require("../server.js");

const db = require("../../data/dbConfig");

describe("auth-router.js", () => {
  afterEach(async (done) => {
    // await db("users").truncate();
    await db("users").where("email", "ryan.hamblin@lambdaschool.com").del();
    done();
  });

  afterAll(async () => {
    db.destroy();
  });

  const testUser = {
    name: "Ryan Hamblin",
    email: "ryan.hamblin@lambdaschool.com",
    password: "123",
    user_type_id: 1
  };

  const userType = {
    id: 1,
    name: "admin"
  };

  describe("POST /api/auth/register", () => {
    it("should return 201 status code on success", () => {
      return request(server)
        .post("/api/auth/register")
        .send(testUser)
        .expect(201);
    });

    it("should return tailored new user on success", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send(testUser);
      const user = JSON.parse(res.text);
      expect(user.id).toBeTruthy();
      expect(user.name).toBe(testUser.name);
      expect(user.email).toBe(testUser.email);
      expect(user.user_type).toEqual(userType);
      expect(user.token).toBeTruthy();
    });

    it("should return 400 status code if name is missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ ...testUser, name: "" })
        .expect(400);
    });

    it("should return 400 status code if email is missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ ...testUser, email: "" })
        .expect(400);
    });

    it("should return 400 status code if password is missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ ...testUser, password: "" })
        .expect(400);
    });

    it("should return 201 status code even if user_type_id is missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ ...testUser, user_type_id: "" })
        .expect(201);
    });

    it("should return tailored new user even if name is missing", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send(testUser);
      const user = JSON.parse(res.text);
      expect(user.id).toBeTruthy();
      expect(user.name).toBe(testUser.name);
      expect(user.email).toBe(testUser.email);
      expect(user.user_type).toEqual(userType);
      expect(user.token).toBeTruthy();
    });

    it("should return JSON format response if name is missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ ...testUser, name: "" })
        .expect("Content-Type", /json/);
    });

    it("should return an error message if name is missing", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ ...testUser, name: "" })
        .then(response => {
          expect(response.body).toEqual({
            message: "All fields are required"
          });
        });
    });

    it("should return 403 status code if email is already in use", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return request(server)
        .post("/api/auth/register")
        .send(testUser)
        .expect(403);
    });

    it("should return JSON format response if email is already in use", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return request(server)
        .post("/api/auth/register")
        .send({ ...testUser, name: "" })
        .expect("Content-Type", /json/);
    });

    it("should return an error message if email is already in use", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return request(server)
        .post("/api/auth/register")
        .send(testUser)
        .then(response => {
          expect(response.body.message).toEqual("Email is already in use");
        });
    });
  });

  describe("PUT /api/auth/login", () => {
    it("should return 200 status code on success", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return await request(server)
        .put("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password })
        .expect(200);
    });

    it("should return JSON format response on success", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return await request(server)
        .put("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password })
        .expect("Content-Type", /json/);
    });

    it("should return a token on success", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return await request(server)
        .put("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password })
        .then(response => {
          expect(response.body.token).toBeTruthy();
        });
    });

    it("should return 400 status code if email is missing", () => {
      return request(server)
        .put("/api/auth/login")
        .send({ email: "", password: testUser.password })
        .expect(400);
    });

    it("should return JSON format response if email is missing", () => {
      return request(server)
        .put("/api/auth/login")
        .send({ email: "", password: testUser.password })
        .expect("Content-Type", /json/);
    });

    it("should return an error message if email is missing", () => {
      return request(server)
        .put("/api/auth/login")
        .send({ email: "", password: testUser.password })
        .then(response => {
          expect(response.body).toEqual({
            message: "Email and password are required"
          });
        });
    });

    it("should return 400 status code if password is missing", () => {
      return request(server)
        .put("/api/auth/login")
        .send({ email: testUser.email, password: "" })
        .expect(400);
    });

    it("should return JSON format response if password is missing", () => {
      return request(server)
        .put("/api/auth/login")
        .send({ email: testUser.email, password: "" })
        .expect("Content-Type", /json/);
    });

    it("should return an error message if password is missing", () => {
      return request(server)
        .put("/api/auth/login")
        .send({ email: testUser.email, password: "" })
        .then(response => {
          expect(response.body).toEqual({
            message: "Email and password are required"
          });
        });
    });

    it("should return 401 status code if password is incorrect", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return await request(server)
        .put("/api/auth/login")
        .send({ email: testUser.email, password: "321" })
        .expect(401);
    });

    it("should return JSON format response if password is incorrect", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return await request(server)
        .put("/api/auth/login")
        .send({ email: testUser.email, password: "321" })
        .expect("Content-Type", /json/);
    });

    it("should return an error message if password is incorrect", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return await request(server)
        .put("/api/auth/login")
        .send({ email: testUser.email, password: "321" })
        .then(response => {
          expect(response.body).toEqual({
            message: "Bad credentials"
          });
        });
    });
  });
});
