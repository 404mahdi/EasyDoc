# EasyDoc

<p align="center">
  <b>Course:</b> CSE470 - Software Engineering &nbsp;|&nbsp;
  <b>Institution:</b> BRAC University &nbsp;|&nbsp;
  <b>Semester:</b> Spring 2025
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-Educational-blue" alt="License" />
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" alt="Status" />
  <img src="https://img.shields.io/badge/Frontend-React.js-blue" alt="Frontend" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express.js-green" alt="Backend" />
  <img src="https://img.shields.io/badge/Database-MongoDB-yellowgreen" alt="Database" />
</p>

---

> EasyDoc is a modern, web-based appointment management system for healthcare providers and patients. Developed for the CSE470 coursework at BRAC University, it enables users to register, book appointments, manage schedules, and provides admin tools for managing doctors and users.

---

## 📸 Screenshots

<details>
<summary>Show Screenshots</summary>

- **Home**

  ![Home](https://github.com/user-attachments/assets/0d93367e-e098-457a-a7b9-406df5dfeac5)

- **Appointment Booking**

  ![Book](https://github.com/user-attachments/assets/56dfcf01-ccd5-401e-9efe-103c15b87c58)

- **Appointments**

  ![Appointments](https://github.com/user-attachments/assets/240c1f8c-187e-4a0c-8206-7dd0701ac9b0)

- **Notifications**

  ![image](https://github.com/user-attachments/assets/ed9e63aa-e466-4749-9f13-27a1ab71034b)

- **Doctor Panel**

  ![image](https://github.com/user-attachments/assets/049c2d97-8ec2-4de6-b38b-4976b92a211b)

- **Admin Panel**

  ![image](https://github.com/user-attachments/assets/9cdaf87e-1f54-4ba4-b4c4-e22e5efdeee9)

- **Login**

  ![image](https://github.com/user-attachments/assets/e331fb04-f029-4429-8fb9-a0d3951666d5)

- **Registration**

  ![image](https://github.com/user-attachments/assets/d746ccf6-c3cb-4ff2-aee6-bc03247d3065)

</details>

---

## ✨ Features

|                                       |                                      |
| ------------------------------------- | ------------------------------------ |
| 📝 User registration & authentication | 🗓️ Book, view, manage appointments   |
| 👨‍⚕️ Doctor application & profile       | 🛡️ Admin dashboard for doctors/users |
| 🔔 Appointment notifications          | 🔒 Protected/public routes           |
| 💻 Responsive, modern UI              | 🔑 Secure password & JWT auth        |

---

## 🛠️ Technologies Used

| Frontend             | Backend             | Database | State Management            | Testing |
| -------------------- | ------------------- | -------- | --------------------------- | ------- |
| React.js (`client/`) | Node.js, Express.js | MongoDB  | Redux (`client/src/redux/`) | Jest    |

---

## 📁 Project Structure

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

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

```sh
# Clone the repository
$ git clone <repository-url>
$ cd EasyDoc

# Install backend dependencies
$ npm install

# Set up environment variables (e.g., MongoDB URI)

# Start backend server
$ npm start

# Set up frontend
$ cd client
$ npm install
$ npm start
```

Frontend: [http://localhost:3000](http://localhost:3000)  
Backend: [http://localhost:5000](http://localhost:5000)

---

## 🧪 Running Tests

- **Backend:**
  ```sh
  npm test
  ```
- **Frontend:**
  ```sh
  cd client
  npm test
  ```

---

## 👥 Authors

- Mahdi Hasan
- Sathi Marzan
- Fabliha Sarwar
- Faisal Islam

---

## 📄 License

This project is for educational purposes as part of the CSE470 course.
