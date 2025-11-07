# SmartStart 

SmartStart is a comprehensive HR onboarding platform designed to provide a seamless, structured, and interactive experience for both HR managers and new employees.
Developed collaboratively across Backend, Frontend, Mobile, Product Design, Product Management, and Technical Writing tracks, SmartStart ensures that every onboarding journey is efficient, engaging, and data-driven.




🎯 ## Product Overview

New employees often face challenges such as information overload, poor communication, and unclear expectations during onboarding.
SmartStart solves these by simplifying the entire process with tools that empower both HR and employees to stay aligned:

🧭 Progress Tracker – monitors employee onboarding completion.

📋 Checklist – lists and tracks onboarding tasks and milestones.

📂 Document Upload – securely uploads and stores HR files

📑 Event management - Employees can view upcoming events. Hr managers can create and delete events.



🚀 ## Features Implemented

 ### 👥 User & Authentication

- Secure login and registration for HR/Admin and Employees.

- Passwords encrypted using bcrypt.

- JWT-based authentication for secure session management.

- Role-based protection — only HR/Admin can perform certain actions (e.g., managing events or employees).


### 📋 Task Management

- HR can create, update, and delete tasks.

- Employees can view assigned tasks and update completion status.


### 📈 Progress Tracking

Employees can report and track progress.

HR can monitor employee performance via progress endpoints.


 ### 📂 File Uploads

- Secure upload of documents by HR and Employees.

- Uses Multer for file handling.


### 📅 Event Management

- HR/Admin can create, update, and delete events.

- Employees can view upcoming events and registration links.




## 🏗️ Project Structure

📁 Capstone Project HR/
├── 📁 Controllers/       # Business logic

│   ├── eventController.js

│   ├── taskController.js

│   ├── userController.js

│   └── progressController.js

│

├── 📁 Models/            # MongoDB Schemas

│   ├── eventModel.js

│   ├── userModel.js

│   ├── taskModel.js

│   └── progressModel.js

│

├── 📁 Routes/            # API Routes

│   ├── eventRoutes.js

│   ├── taskRoutes.js

│   ├── userRoutes.js

│   └── progressRoutes.js

│

├── 📁 uploads/           # File storage

│

├── .env                  # Environment variables

├── package.json

├── server.js             # Main entry point

└── README.md

| Tech stack   |  Tech purpose |
|--------------|---------------|
| Node.js	| Backend runtime |
| Express.js	| Web framework | 
| MongoDB + Mongoose	| Database & ORM
| JWT (jsonwebtoken) | 	Authentication| 
| bcryptjs	| Password hashing | 
| Multer	| File upload handling | 
| dotenv| 	Environment variables |
| cors | 	Cross-origin resource sharing | 
| Postman | testing API |
| Render | Deployment |

 
 ### Setup and installation 

1. Clone Repository

git clone https://github.com/yourusername/hr-capstone-backend.git

cd hr-capstone-backend

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the root directory and add:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/capstone_hr

JWT_SECRET=your_secret_key

4. Run the Server

npm run dev

or

nodemon server.js

5. Confirm Server is Running

Server running on http://localhost:3000


### API endpoints 
- User Management
‎
‎Features: Create, read, update, delete users (CRUD)
‎
‎Authentication: JWT-based login
‎
‎Passwords are hashed with bcrypt
‎
‎Role-based enum: employee, manager, admin, hr, intern
‎
‎•Endpoints:
‎
‎| Method	| Route |	Description|
|--------|-------|------------|
| ‎POST	| /api/users | 	Create new user
| ‎POST	| /api/users/login | 	Login and get JWT
| ‎GET	| /api/users | 	Get all users
| ‎GET	| /api/users/:id	 | Get single user by ID
| ‎PUT	| /api/users/:id	 | Update user info
| ‎DELETE	| /api/users/:id | 	Delete user
‎
‎-  Task Management
‎
‎Features: Create tasks, assign to employees, update status, retrieve tasks for a user
‎
‎Linked tasks to real user IDs using populate()
‎
‎• Endpoints:
‎
|  Method	| Route | 	Description |
|---------|-------|--------------|
|‎POST	 | /api/tasks | 	Create a new task
| ‎GET	| /api/tasks/:employeeId| 	Get tasks for a specific employee (populates assignedTo info)
| ‎PUT	| /api/tasks/:id | 	Update task status
‎
- Progress Tracker
‎
‎Features: Add progress updates to a task, view all progress for a task
‎
‎Progress linked to tasks and updatedBy users
‎
‎Protected by JWT middleware
‎
‎• Endpoints:
‎
‎| Method	|Route| 	Description |
|--------|-----|--------------|
| ‎POST	 | /api/progress | 	Add progress for a task (requires auth)
| ‎GET	| /api/progress/:taskId | 	Get all progress entries for a task (requires auth)
‎
‎-File Upload
‎
‎Features: Upload files (documents/images)
‎
‎File types allowed: .jpg, .png, .pdf, .txt
‎
‎Stored in /uploads folder
‎
‎Linked to user who uploaded (uploadedBy)
‎
‎Protected by JWT middleware
‎
‎• Endpoints:
‎
‎°
| Method | 	Route | 	Description | 
|--------|-------|--------------|
| ‎POST	 | /api/upload | 	Upload a file (requires auth, file field in form-data)
‎
- Event management 


