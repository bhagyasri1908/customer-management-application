# Customer Management App

A full-stack **Customer Management System** built with:

- **Backend:** Node.js, Express, SQLite
- **Frontend:** React (with pagination, search, sorting, and CRUD operations)

---

## 🚀 Features

- Add, view, update, and delete **customers**
- Add, view, update, and delete **addresses** for customers
- Search and filter customers by name or phone
- Sort customers (A–Z, Z–A, newest, oldest)
- Pagination with total pages
- Clean React UI with reusable components

---

## 🛠️ Tech Stack

**Frontend**
- React
- React Router
- Axios

**Backend**
- Node.js
- Express
- SQLite

---

## 📂 Project Structure

customer-management-app/
│
├── backend/ # Express + SQLite server
│ ├── db.js
│ ├── server.js
│
├── frontend/ # React app
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api.js
│ │ └── styles/
│ └── package.json
│
├── README.md
└── package.json

yaml
Copy code

---

## ⚡ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/customer-management-app.git
cd customer-management-app
2. Backend Setup
bash
Copy code
cd backend
npm install
node server.js
Runs backend at: http://localhost:5000

3. Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
Runs frontend at: http://localhost:3000

📖 API Endpoints
Customers
POST /api/customers → Add new customer

GET /api/customers → Get customers with search, sort, and pagination

GET /api/customers/:id → Get single customer

PUT /api/customers/:id → Update customer

DELETE /api/customers/:id → Delete customer

Addresses
POST /api/customers/:id/addresses → Add address for customer

GET /api/customers/:id/addresses → Get customer addresses

PUT /api/addresses/:id → Update address

DELETE /api/addresses/:id → Delete address

✅ How to Use
Open http://localhost:3000 in your browser.

Add customers using the Add Customer button.

Manage customers (search, sort, delete, update).

Add and manage addresses for each customer.
👨‍💻 Author

Developed by Bhagya Sri ✨
