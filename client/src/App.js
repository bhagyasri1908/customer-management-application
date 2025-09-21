import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerFormPage from "./pages/CustomerFormPage";
import "./styles/global.css"; // ✅ Global styles

function App() {
  return (
    <Router>
      <nav className="navbar">
        <h2>Customer Management</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/customers/new">Add Customer</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<CustomerFormPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
          <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
