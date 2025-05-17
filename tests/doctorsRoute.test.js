const request = require("supertest");
const express = require("express");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const doctorsRoutes = require("../routes/doctorsRoute");

// Mock the auth middleware to always allow requests
jest.mock("../middlewares/authMiddleware", () => {
  return (req, res, next) => {
    req.body.userId = "mockUserId"; // Add userId to mimic authenticated request
    next();
  };
});

// Mock models
jest.mock("../models/doctorModel", () => {
  return {
    findOne: jest.fn(),
  };
});

jest.mock("../models/appointmentModel", () => {
  return {
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };
});

jest.mock("../models/userModel", () => {
  return {
    findOne: jest.fn(),
  };
});

const app = express();
app.use(express.json());
app.use("/api/doctor", doctorsRoutes);

describe("Doctors Routes Tests", () => {
  // Test case 1
  describe("GET /api/doctor/get-appointments-by-doctor-id", () => {
    it("should fetch all appointments for a doctor", async () => {
      // Mock data
      const mockDoctor = {
        _id: "mockDoctorId",
        userId: "mockUserId",
        firstName: "Jane",
        lastName: "Smith",
        specialization: "Cardiology",
      };

      const mockAppointments = [
        {
          _id: "appt1",
          userId: "user1",
          doctorId: "mockDoctorId",
          date: "2025-05-18",
          time: "10:00",
          status: "pending",
        },
        {
          _id: "appt2",
          userId: "user2",
          doctorId: "mockDoctorId",
          date: "2025-05-19",
          time: "14:30",
          status: "approved",
        },
      ];

      // Setup mocks
      Doctor.findOne.mockResolvedValue(mockDoctor);
      Appointment.find.mockResolvedValue(mockAppointments);

      // Make the request
      const response = await request(app)
        .get("/api/doctor/get-appointments-by-doctor-id")
        .expect("Content-Type", /json/)
        .expect(200);

      // Assertions
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Appointments fetched successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].doctorId).toBe("mockDoctorId");
      expect(response.body.data[1].status).toBe("approved");

      // Verify function calls
      expect(Doctor.findOne).toHaveBeenCalledWith({ userId: "mockUserId" });
      expect(Appointment.find).toHaveBeenCalledWith({
        doctorId: "mockDoctorId",
      });
    });
  });

  // Test case 2
  describe("POST /api/doctor/change-appointment-status", () => {
    it("should update appointment status and add notification", async () => {
      // Mock data
      const appointmentId = "appt1";
      const mockAppointment = {
        _id: appointmentId,
        userId: "user1",
        doctorId: "mockDoctorId",
        status: "pending",
      };

      const mockUser = {
        _id: "user1",
        name: "John Doe",
        unseenNotifications: [],
        save: jest.fn().mockResolvedValue(true),
      };

      // Setup mocks
      Appointment.findByIdAndUpdate.mockResolvedValue(mockAppointment);
      User.findOne.mockResolvedValue(mockUser);

      // Make the request
      const response = await request(app)
        .post("/api/doctor/change-appointment-status")
        .send({
          appointmentId: appointmentId,
          status: "approved",
        })
        .expect("Content-Type", /json/)
        .expect(200);

      // Assertions
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Appointment status updated successfully"
      );

      // Verify user notification was added
      expect(mockUser.unseenNotifications.length).toBe(1);
      expect(mockUser.unseenNotifications[0].type).toBe(
        "appointment-status-changed"
      );
      expect(mockUser.unseenNotifications[0].message).toBe(
        "Your appointment status has been approved"
      );
      expect(mockUser.unseenNotifications[0].onClickPath).toBe("/appointments");
      expect(mockUser.save).toHaveBeenCalled();

      // Verify appointment update was called correctly
      expect(Appointment.findByIdAndUpdate).toHaveBeenCalledWith(
        appointmentId,
        {
          status: "approved",
        }
      );
    });
  });
});
