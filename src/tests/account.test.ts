import supertest from "supertest";
import { describe, test, expect } from "@jest/globals";
import { statusCodes } from "../api/utils/statusCodes";
import app from "..";

const setupTest = async () => {
  let response: any;
  return response;
};

describe("Album Endpoints Tests", () => {
  describe("POST accounts/", () => {
    beforeAll(async () => {
      const response = await setupTest();
    });

    afterAll(async () => {});

    test("Should succeed if all fields have the right format and are present", async () => {
      const body = {
        email: "validmail@gmail.com",
        fullName: "Test",
        age: 2,
        userName: "Test",
        country: "Argentina",
      };

      const response = await supertest(app).post("/accounts").send(body);
      expect(response.statusCode).toEqual(statusCodes.CREATED);
      expect(response.body).toEqual(body);
    });

    test("Should return error if an user wants to register with the same mail", async () => {
      const firstInput = {
        email: "validmail@gmail.com",
        fullName: "Test",
        age: "2",
        userName: "Test",
        country: "Argentina",
      };

      const secondInput = {
        email: "validmail@gmail.com",
        fullName: "Test",
        age: "2",
        userName: "Test",
        country: "Argentina",
      };

      await supertest(app).post("/accounts").send(firstInput);
      const response = await supertest(app).post("/accounts").send(secondInput);

      expect(response.statusCode).toEqual(statusCodes.CONFLICT);
    });

    test("Should return error if no email is set", async () => {
      const body = {
        fullName: "asdsa",
        age: "2",
        userName: "asdsad",
        country: "Argentina",
      };

      const response = await supertest(app).post("/accounts").send(body);
      expect(response.statusCode).toEqual(statusCodes.BAD_REQUEST);
    });

    test("Should return error if the mail has an invalid format", async () => {
      const body = {
        email: "test",
        fullName: "asdsa",
        age: "2",
        userName: "asdsad",
        country: "Argentina",
      };

      const response = await supertest(app).post("/accounts").send(body);
      expect(response.statusCode).toEqual(statusCodes.BAD_REQUEST);
    });

    test("Should return error if no fullName is set", async () => {
      const body = {
        email: "test@gmail.com",
        age: "2",
        userName: "asdsad",
        country: "Argentina",
      };

      const response = await supertest(app).post("/accounts").send(body);
      expect(response.statusCode).toEqual(statusCodes.BAD_REQUEST);
    });

    test("Should return error if no age is set", async () => {
      const body = {
        email: "test@gmail.com",
        fullName: "asdsa",
        userName: "asdsad",
        country: "Argentina",
      };

      const response = await supertest(app).post("/accounts").send(body);
      expect(response.statusCode).toEqual(statusCodes.BAD_REQUEST);
    });

    test("Should return error if an invalid age is set", async () => {
      const body = {
        email: "test@gmail.com",
        age: "-1",
        fullName: "asdsa",
        userName: "asdsad",
        country: "Argentina",
      };

      const response = await supertest(app).post("/accounts").send(body);
      expect(response.statusCode).toEqual(statusCodes.BAD_REQUEST);
    });

    test("Should return error if no userName is set", async () => {
      const body = {
        email: "test@gmail.com",
        fullName: "asdsa",
        age: "2",
        country: "Argentina",
      };

      const response = await supertest(app).post("/accounts").send(body);
      expect(response.statusCode).toEqual(statusCodes.BAD_REQUEST);
    });

    test("Should return error if no country is set", async () => {
      const body = {
        email: "test@gmail.com",
        fullName: "asdsa",
        age: "2",
        userName: "asdsad",
      };

      const response = await supertest(app).post("/accounts").send(body);
      expect(response.statusCode).toEqual(statusCodes.BAD_REQUEST);
    });
  });
});
