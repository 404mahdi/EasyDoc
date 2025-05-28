# EasyDoc

**Course:** CSE470 - Software Engineering  
**Institution:** BRAC University  
**Semester:** Spring 2025

EasyDoc is a web-based appointment management system designed for healthcare providers and patients. This project was developed as part of the CSE470 coursework at BRAC University. It allows users to register, book appointments, manage schedules, and provides admin functionalities for managing doctors and users.

---

## 📸 Screenshots
- Home
![Home](https://github.com/user-attachments/assets/0d93367e-e098-457a-a7b9-406df5dfeac5)

- Appointment Booking
![Book](https://github.com/user-attachments/assets/56dfcf01-ccd5-401e-9efe-103c15b87c58)

- Appointments
![Appointments](https://github.com/user-attachments/assets/240c1f8c-187e-4a0c-8206-7dd0701ac9b0)

- Notifications
![image](https://github.com/user-attachments/assets/ed9e63aa-e466-4749-9f13-27a1ab71034b)

- Doctor Panel
![image](https://github.com/user-attachments/assets/049c2d97-8ec2-4de6-b38b-4976b92a211b)

- Admin Panel
![image](https://github.com/user-attachments/assets/9cdaf87e-1f54-4ba4-b4c4-e22e5efdeee9)

- Login
![image](https://github.com/user-attachments/assets/e331fb04-f029-4429-8fb9-a0d3951666d5)

- Registration
![image](https://github.com/user-attachments/assets/d746ccf6-c3cb-4ff2-aee6-bc03247d3065)




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

- Mahdi Hasan   
- Sathi Marzan
- Fabliha Sarwar
- Faisal Islam
  

## License

This project is for educational purposes as part of the CSE470 course.
