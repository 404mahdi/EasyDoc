import express from "express";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching users",
      success: false,
      error,
    });
  }
});

// Route to check if admin users exist
router.get("/check-admin-users", async (req, res) => {
  try {
    const adminUsers = await User.find({ isAdmin: true });
    res.status(200).send({
      message: "Admin users check completed",
      success: true,
      count: adminUsers.length,
      data: adminUsers.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }))
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error checking admin users",
      success: false,
      error,
    });
  }
});

// Route to create an admin user
router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).send({
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with admin privileges
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: true
    });

    await newUser.save();

    res.status(200).send({
      message: "Admin user created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error creating admin user",
      success: false,
      error,
    });
  }
});

router.post(
  "/change-doctor-account-status",
  authMiddleware,
  async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId, {
        status,
      });

      const user = await User.findOne({ _id: doctor.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-doctor-request-changed",
        message: `Your doctor account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Doctor status updated successfully",
        success: true,
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);

export default router;
