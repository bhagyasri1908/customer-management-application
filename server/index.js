const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ------------------ Customers ------------------

// Create new customer
app.post("/api/customers", (req, res) => {
  const { first_name, last_name, phone_number } = req.body;
  if (!first_name || !last_name || !phone_number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)";
  db.run(sql, [first_name, last_name, phone_number], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Customer created", id: this.lastID });
  });
});

// Get customers with search, sort, pagination
app.get("/api/customers", (req, res) => {
  let { search = "", sort = "asc", page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const offset = (page - 1) * limit;

  const searchParam = `%${search}%`;

  // Count total matching customers
  db.get(
    `SELECT COUNT(*) as count FROM customers 
     WHERE first_name LIKE ? OR last_name LIKE ? OR phone_number LIKE ?`,
    [searchParam, searchParam, searchParam],
    (err, countRow) => {
      if (err) return res.status(500).json({ error: err.message });

      const total = countRow.count;
      const totalPages = Math.ceil(total / limit);

      // Sorting
      let orderBy = "ORDER BY first_name ASC";
      if (sort === "desc") orderBy = "ORDER BY first_name DESC";
      if (sort === "newest") orderBy = "ORDER BY id DESC";
      if (sort === "oldest") orderBy = "ORDER BY id ASC";

      // Fetch paginated rows
      db.all(
        `SELECT * FROM customers 
         WHERE first_name LIKE ? OR last_name LIKE ? OR phone_number LIKE ? 
         ${orderBy} LIMIT ? OFFSET ?`,
        [searchParam, searchParam, searchParam, limit, offset],
        (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });

          res.json({
            data: rows,
            total,
            page,
            totalPages,
          });
        }
      );
    }
  );
});

// Get single customer by ID
app.get("/api/customers/:id", (req, res) => {
  const customerId = req.params.id;
  const sql = "SELECT * FROM customers WHERE id = ?";
  db.get(sql, [customerId], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Customer not found" });
    res.json({ data: row });
  });
});

// Update customer
app.put("/api/customers/:id", (req, res) => {
  const customerId = req.params.id;
  const { first_name, last_name, phone_number } = req.body;
  if (!first_name || !last_name || !phone_number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "UPDATE customers SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?";
  db.run(sql, [first_name, last_name, phone_number, customerId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Customer updated" });
  });
});

// Delete customer
app.delete("/api/customers/:id", (req, res) => {
  const customerId = req.params.id;
  db.run("DELETE FROM customers WHERE id = ?", [customerId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Customer deleted" });
  });
});

// ------------------ Addresses ------------------

// Add address for a customer
app.post("/api/customers/:id/addresses", (req, res) => {
  const customerId = req.params.id;
  const { address_details, city, state, pin_code } = req.body;
  if (!address_details || !city || !state || !pin_code) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO addresses (customer_id, address_details, city, state, pin_code) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, [customerId, address_details, city, state, pin_code], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Address added", id: this.lastID });
  });
});

// Get all addresses for a customer
app.get("/api/customers/:id/addresses", (req, res) => {
  const customerId = req.params.id;
  const sql = "SELECT * FROM addresses WHERE customer_id = ?";
  db.all(sql, [customerId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ data: rows });
  });
});

// Update address
app.put("/api/addresses/:id", (req, res) => {
  const addressId = req.params.id;
  const { address_details, city, state, pin_code } = req.body;
  if (!address_details || !city || !state || !pin_code) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "UPDATE addresses SET address_details = ?, city = ?, state = ?, pin_code = ? WHERE id = ?";
  db.run(sql, [address_details, city, state, pin_code, addressId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Address updated" });
  });
});

// Delete address
app.delete("/api/addresses/:id", (req, res) => {
  const addressId = req.params.id;
  db.run("DELETE FROM addresses WHERE id = ?", [addressId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Address deleted" });
  });
});

// ------------------ Start server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
