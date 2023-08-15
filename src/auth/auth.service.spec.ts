import {AuthService} from "./auth.service";
import {Request, Response} from "express";
import {postgresDB} from "../db/pg.connection";

jest.mock("../db/pg.connection");

const mPostgresDB = jest.mocked(postgresDB);

mPostgresDB.where.getMockImplementation();

describe("AuthService", () => {
  const mockRequest = {
    body: {},
  } as Request;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const authService = new AuthService();

  describe("register", () => {
    it("should return 401 if invalid email", async () => {
      mockRequest.body.email = "invalid-email";

      await authService.register(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid email",
      });
    });

    it("should return 401 if invalid password", async () => {
      mockRequest.body.email = "valid@example.com";
      mockRequest.body.password = "short";

      await authService.register(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid password",
      });
    });
  });
});
