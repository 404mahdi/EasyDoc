# EasyDoc: Appointment Management System

---

**Course:** CSE470 - Software Engineering  
**Institution:** BRAC University  
**Semester:** Spring 2025  
**Group Members:**

- Mahdi Hasan
- Sathi Marzan
- Fabliha Sarwar
- Faisal Islam

---

EasyDoc is a web-based appointment management system developed as part of the CSE470 Software Engineering course at BRAC University. The system streamlines appointment scheduling for healthcare providers and patients, offering user registration, appointment booking, schedule management, and administrative tools for managing doctors and users.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Testing](#testing)
- [Authors](#authors)
- [License](#license)

---

## Introduction

The goal of EasyDoc is to provide a user-friendly platform for managing healthcare appointments. The system supports multiple user roles (patients, doctors, admins) and ensures secure, efficient, and accessible appointment management.

---

## Features

- User registration and authentication
- Book, view, and manage appointments
- Doctor application and profile management
- Admin dashboard for managing doctors and users
- Notifications for appointment status
- Role-based access control (patients, doctors, admins)
- Responsive and modern user interface
- Secure password hashing and JWT authentication

---

## System Architecture

- **Frontend:** React.js (client/)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Redux
- **Testing:** Jest

---

## Technologies Used

| Component        | Technology          |
| ---------------- | ------------------- |
| Frontend         | React.js            |
| Backend          | Node.js, Express.js |
| Database         | MongoDB             |
| State Management | Redux               |
| Testing          | Jest                |

---

## Project Structure

```
server.js           # Main server entry point
client/             # React frontend application
models/             # Mongoose models (users, doctors, appointments)
routes/             # Express routes (user, doctor, admin)
middlewares/        # Authentication & other middleware
config/             # Database configuration
tests/              # Backend API tests
```

---

## Installation & Setup

### Prerequisites

- Node.js & npm
- MongoDB

### Steps

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd EasyDoc
   ```
2. Install backend dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (e.g., MongoDB URI).
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

The frontend runs on `http://localhost:3000` and the backend on `http://localhost:5000` by default.

---

## Usage

- Register as a new user or log in with existing credentials.
- Book appointments with available doctors.
- Doctors can manage their schedules and view appointments.
- Admins can manage users and doctors.

---

## Screenshots

| Home Page                                                                                | Appointment Booking                                                                      | Appointments                                                                                     |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| ![Home](https://github.com/user-attachments/assets/0d93367e-e098-457a-a7b9-406df5dfeac5) | ![Book](https://github.com/user-attachments/assets/56dfcf01-ccd5-401e-9efe-103c15b87c58) | ![Appointments](https://github.com/user-attachments/assets/240c1f8c-187e-4a0c-8206-7dd0701ac9b0) |

| Notifications                                                                                     | Doctor Panel                                                                                     | Admin Panel                                                                                     |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| ![Notifications](https://github.com/user-attachments/assets/ed9e63aa-e466-4749-9f13-27a1ab71034b) | ![Doctor Panel](https://github.com/user-attachments/assets/049c2d97-8ec2-4de6-b38b-4976b92a211b) | ![Admin Panel](https://github.com/user-attachments/assets/9cdaf87e-1f54-4ba4-b4c4-e22e5efdeee9) |

| Login                                                                                     | Registration                                                                                     |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| ![Login](https://github.com/user-attachments/assets/e331fb04-f029-4429-8fb9-a0d3951666d5) | ![Registration](https://github.com/user-attachments/assets/d746ccf6-c3cb-4ff2-aee6-bc03247d3065) |

---

## Testing

- To run backend tests:
  ```sh
  npm test
  ```
- To run frontend tests:
  ```sh
  cd client
  npm test
  ```

---

## License

This project is for educational purposes as part of the CSE470 course.
