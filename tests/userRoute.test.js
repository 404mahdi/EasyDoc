const request = require("supertest");
const express = require("express");
const moment = require("moment");
const userRoutes = require("../routes/userRoute");

// Mock the auth middleware
jest.mock("../middlewares/authMiddleware", () => {
  return (req, res, next) => {
    req.body.userId = "mockUserId";
    next();
  };
});

// Mock models
const Appointment = require("../models/appointmentModel");
jest.mock("../models/appointmentModel", () => ({
  find: jest.fn(),
}));

const User = require("../models/userModel");
jest.mock("../models/userModel", () => ({
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

const Doctor = require("../models/doctorModel");
jest.mock("../models/doctorModel", () => ({
  findOne: jest.fn(),
}));

// Setup app
const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);


//checkBookingAvailabilityController
describe("User Routes - Check Booking Availability & Get Appointments", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/user/check-booking-avilability", () => {
    it("should confirm availability when no conflicting appointments exist", async () => {
      const mockDoctor = {
        _id: "mockDoctorId",
        timings: ["09:00", "17:00"]
      };
      Doctor.findOne.mockResolvedValue(mockDoctor);
      Appointment.find.mockResolvedValue([]);

      const requestData = {
        doctorId: "mockDoctorId",
        date: "19-05-2025",
        time: "14:00"
      };

      const response = await request(app)
        .post("/api/user/check-booking-avilability")
        .send(requestData)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Appointments available");
    });

    it("should report unavailability when conflicting appointments exist", async () => {
      const mockDoctor = {
        _id: "mockDoctorId",
        timings: ["09:00", "17:00"]
      };
      Doctor.findOne.mockResolvedValue(mockDoctor);
      Appointment.find.mockResolvedValue([
        { _id: "appt1", doctorId: "mockDoctorId", date: "2025-05-19", time: "14:00" }
      ]);

      const requestData = {
        doctorId: "mockDoctorId",
        date: "19-05-2025",
        time: "14:00"
      };

      const response = await request(app)
        .post("/api/user/check-booking-avilability")
        .send(requestData)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Appointments not available");
    });

    it("should reject invalid time slots (not on hour/half-hour)", async () => {
      const mockDoctor = {
        _id: "mockDoctorId",
        timings: ["09:00", "17:00"]
      };
      Doctor.findOne.mockResolvedValue(mockDoctor);

      const requestData = {
        doctorId: "mockDoctorId",
        date: "19-05-2025",
        time: "14:15" // Not on the hour or half-hour
      };

      const response = await request(app)
        .post("/api/user/check-booking-avilability")
        .send(requestData)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Appointments must be booked on the hour or half-hour");
    });
  });


  //getAppointmentsByUserIdController
  describe("GET /api/user/get-appointments-by-user-id", () => {
    it("should fetch all appointments for a user", async () => {
      const mockAppointments = [
        { _id: "appt1", userId: "mockUserId", doctorId: "doctor1", date: "2025-05-19", time: "10:00", status: "pending" },
        { _id: "appt2", userId: "mockUserId", doctorId: "doctor2", date: "2025-05-20", time: "14:30", status: "approved" }
      ];
      Appointment.find.mockResolvedValue(mockAppointments);

      const response = await request(app)
        .get("/api/user/get-appointments-by-user-id")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Appointments fetched successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toHaveLength(2);
    });

    it("should return 500 on DB error", async () => {
      Appointment.find.mockRejectedValue(new Error("DB error"));

      const response = await request(app)
        .get("/api/user/get-appointments-by-user-id")
        .expect("Content-Type", /json/)
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Error fetching appointments");
      expect(response.body.error).toBeDefined();
    });

    it("should return empty array when no appointments exist", async () => {
      Appointment.find.mockResolvedValue([]);

      const response = await request(app)
        .get("/api/user/get-appointments-by-user-id")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toHaveLength(0);
    });
  });
});

//npx jest tests/userRoute.test.js