import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected for admin creation'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Admin user details
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  isAdmin: true
};

// Create admin user
async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminUser.password, salt);
    
    // Create new admin user
    const newAdmin = new User({
      name: adminUser.name,
      email: adminUser.email,
      password: hashedPassword,
      isAdmin: true
    });
    
    await newAdmin.save();
    console.log('Admin user created successfully');
    console.log('Email:', adminUser.email);
    console.log('Password:', adminUser.password);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Run the function
createAdminUser();
