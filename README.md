# EasyDoc

**Course:** CSE470 - Software Engineering  
**Institution:** BRAC University  
**Semester:** Spring 2025

EasyDoc is a web-based appointment management system designed for healthcare providers and patients. This project was developed as part of the CSE470 coursework at BRAC University. It allows users to register, book appointments, manage schedules, and provides admin functionalities for managing doctors and users.

---

## 📸 Screenshots

| Home Page                          | Appointment Booking                | Admin Dashboard                     |
| ---------------------------------- | ---------------------------------- | ----------------------------------- |
| ![Home](client/public/logo192.png) | ![Book](client/public/logo192.png) | ![Admin](client/public/logo192.png) |

_Replace the above images with actual screenshots from your app (e.g., `client/public/screenshots/home.png`)._

---

## Features

- User registration and authentication
- Book, view, and manage appointments
- Doctor application and profile management
- Admin dashboard for managing doctors and users
- Notifications for appointment status
- Protected and public routes for different user roles
- Responsive and modern UI
- Secure password hashing and JWT authentication

## Technologies Used

- **Frontend:** React.js (located in `client/`)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Redux (in `client/src/redux/`)
- **Testing:** Jest

## Project Structure

- `server.js` - Main server entry point
- `client/` - React frontend application
- `models/` - Mongoose models for users, doctors, and appointments
- `routes/` - Express routes for user, doctor, and admin operations
- `middlewares/` - Authentication and other middleware
- `config/` - Database configuration
- `tests/` - Backend API tests

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd EasyDoc
   ```
2. Install backend dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables as needed (e.g., MongoDB URI).
4. Start the backend server:
   ```sh
   npm start
   ```
5. Set up the frontend:
   ```sh
   cd client
   npm install
   npm start
   ```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000` by default.

## Running Tests

- To run backend tests:
  ```sh
  npm test
  ```
- To run frontend tests:
  ```sh
  cd client
  npm test
  ```

## Authors

- [Your Name]
- [Your Team Members]

## License

This project is for educational purposes as part of the CSE470 course.
