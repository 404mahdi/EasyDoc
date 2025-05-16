const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const adminRoutes = require("../routes/adminRoute");

// Mock the auth middleware to always allow requests
jest.mock("../middlewares/authMiddleware", () => {
  return (req, res, next) => {
    next();
  };
});

// Mock models
jest.mock("../models/doctorModel", () => {
  return {
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };
});

jest.mock("../models/userModel", () => {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
  };
});

const app = express();
app.use(express.json());
app.use("/api/admin", adminRoutes);

describe("Admin Routes Tests", () => {
  describe("GET /api/admin/get-all-doctors", () => {
    it("should fetch all doctors successfully", async () => {
      // Mock data
      const mockDoctors = [
        {
          _id: "60d0fe4f5311236168a109ca",
          firstName: "John",
          lastName: "Doe",
          specialization: "Cardiology",
        },
        {
          _id: "60d0fe4f5311236168a109cb",
          firstName: "Jane",
          lastName: "Smith",
          specialization: "Neurology",
        },
      ];

      // Setup the mock
      Doctor.find.mockResolvedValueOnce(mockDoctors);

      // Make the request
      const response = await request(app)
        .get("/api/admin/get-all-doctors")
        .expect("Content-Type", /json/)
        .expect(200);

      // Assertions
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Doctors fetched successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].firstName).toBe("John");
      expect(response.body.data[1].specialization).toBe("Neurology");

      // Verify Doctor.find was called correctly
      expect(Doctor.find).toHaveBeenCalledWith({});
      expect(Doctor.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /api/admin/change-doctor-account-status", () => {
    it("should successfully change doctor account status to approved", async () => {
      // Mock data
      const mockDoctor = {
        _id: "60d0fe4f5311236168a109ca",
        userId: "60d0fe4f5311236168a109cb",
        firstName: "John",
        lastName: "Doe",
        status: "pending",
      };

      const mockUser = {
        _id: "60d0fe4f5311236168a109cb",
        name: "John Doe",
        email: "john@example.com",
        unseenNotifications: [],
        isDoctor: false,
        save: jest.fn().mockResolvedValue(true),
      };

      // Setup mocks
      Doctor.findByIdAndUpdate.mockResolvedValue(mockDoctor);
      User.findOne.mockResolvedValue(mockUser);

      // Make the request
      const response = await request(app)
        .post("/api/admin/change-doctor-account-status")
        .send({
          doctorId: mockDoctor._id,
          status: "approved",
        })
        .expect("Content-Type", /json/)
        .expect(200);

      // Assertions
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Doctor status updated successfully");
      expect(response.body.data).toEqual(mockDoctor);

      // Verify that user was updated correctly
      expect(mockUser.isDoctor).toBe(true);
      expect(mockUser.unseenNotifications.length).toBe(1);
      expect(mockUser.unseenNotifications[0].type).toBe(
        "new-doctor-request-changed"
      );
      expect(mockUser.unseenNotifications[0].message).toBe(
        "Your doctor account has been approved"
      );
      expect(mockUser.save).toHaveBeenCalled();

      // Verify doctor update was called correctly
      expect(Doctor.findByIdAndUpdate).toHaveBeenCalledWith(mockDoctor._id, {
        status: "approved",
      });
    });
  });
});
