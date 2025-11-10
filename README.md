# SmartStart 

SmartStart is a comprehensive HR onboarding platform designed to provide a seamless, structured, and interactive experience for both HR managers and new employees.
Developed collaboratively across Backend, Frontend, Mobile, Product Design, Product Management, and Technical Writing tracks, SmartStart ensures that every onboarding journey is efficient, engaging, and data-driven.




 ## 🎯Product Overview

New employees often face challenges such as information overload, poor communication, and unclear expectations during onboarding.
SmartStart solves these by simplifying the entire process with tools that empower both HR and employees to stay aligned:

🧭 Progress Tracker – monitors employee onboarding completion.

📋 Checklist – lists and tracks onboarding tasks and milestones.

📂 Document Upload – securely uploads and stores HR files

📑 Event management - Employees can view upcoming events. Hr managers can create and delete events.




## 🚀Features Implemented

 
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

│   ├── eventcontroller.js

│   ├── taskcontroller.js

│   ├── usercontroller.js

│   └── progresscontroller.js

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

### Tech stack 
| Tools   |  Tech purpose |
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


🌐Live URL:https://smartstart-backend-8afq.onrender.com

Postman link:https://talk2dechendu-7660959.postman.co/workspace/Personal-Workspace~e694064e-5d27-43df-bd5d-d65e8565b2cb/collection/47424540-d5cccaff-e19b-4e99-a4b9-39eb02c9b2fe?action=share&source=copy-link&creator=47424540


### API Endpoints

---

#### 🧑‍💼 User Management  
**Features:** Create, read, update, delete users (CRUD)  
**Authentication:** JWT-based login  
**Password Hashing:** bcrypt  
**Role-based enum:** employee, manager, admin, hr, intern  

**Endpoints:**

| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/users | Create new user |
| POST | /api/users/login | Login and get JWT |
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get single user by ID |
| PUT | /api/users/:id | Update user info |
| DELETE | /api/users/:id | Delete user |

---

#### 📋 Task Management  
**Features:** Create tasks, assign to employees, update status, retrieve tasks for a user  
Linked tasks to real user IDs using `populate()`  

**Endpoints:**

| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/tasks | Create a new task |
| GET | /api/tasks/:employeeId | Get tasks for a specific employee (populates assignedTo info) |
| PUT | /api/tasks/:id | Update task status |

---

#### 📈 Progress Tracker  
**Features:** Add progress updates to a task, view all progress for a task  
Progress linked to tasks and updatedBy users  
Protected by JWT middleware  

**Endpoints:**

| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/progress | Add progress for a task (requires auth) |
| GET | /api/progress/:taskId | Get all progress entries for a task (requires auth) |

---

#### 📁 File Upload  
**Features:** Upload files (documents/images)  
**Allowed File Types:** `.jpg`, `.png`, `.pdf`, `.txt`  
**Storage Location:** `/uploads` folder  
**Linked to:** user who uploaded (`uploadedBy`)  
**Security:** Protected by JWT middleware  

**Endpoints:**

| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/upload | Upload a file (requires auth, file field in form-data) |  


#### 📅 Event Management  
**Features:** Create, view, update, and delete company events.  
**Access Control:**  
- HR/Admin: Create, update, delete events  
- HR/Employees: View events  
**Security:** Protected by JWT authentication middleware  

**Endpoints:**

| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/events | Create a new event (HR/Admin only) |
| GET | /api/events | Get all events (HR & Employees) |
| PUT | /api/events/:id | Update an event by ID (HR/Admin only) |
| DELETE | /api/events/:id | Delete an event by ID (HR/Admin only) |





## 🤝 Collaboration Overview

| **Role** | **Tools / Platforms** |
|-----------|------------------------|
| Backend Developers | Node.js, Express.js, MongoDB, Postman |
| Frontend Developers | JavaScript, HTML, CSS |
| Mobile Developers | React Native / Flutter |
| Product Designers | Figma, Unsplash, Freepik |
| Product Managers | Jira |
| Technical Writers | Markdown, Postman, GitHub Wiki |

---


## 💬 Contributors

| **Team** | **Responsibilities** |
|-----------|----------------------|
| Backend Team | API design, database modeling, server logic |
| Frontend Team | Dashboard UI, API integration |
| Mobile Team | Mobile experience and accessibility |
| Design Team | UI/UX flow and layout |
| Product Managers | Task coordination, sprint tracking |
| Technical Writers | Documentation and API reference |


