const request = require("supertest");
const server = require("../server");

const Classrooms = require("../../data/models/classroomsModel");
const ClassroomAdmins = require("../../data/models/classroomAdminsModel");

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

describe("classroom-router.js", () => {
  beforeEach(async () => {
    await Classrooms.reset();
  });
  // make a user
  describe("POST /api/classrooms/", () => {
    it(" returns 201 on success", () => {
      // return request(server).post();
      expect(true).toBe(true);
    });
  });
});
