import React, { useState, useEffect, useCallback } from "react";
import { getCustomers, deleteCustomer } from "../api";
import { Link } from "react-router-dom";
import CustomerList from "../components/CustomerList";
import "../styles/global.css";

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5; // items per page

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await getCustomers({ search, sort, page, limit });
      setCustomers(Array.isArray(res.data.data) ? res.data.data : []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to fetch customers");
      setCustomers([]);
      setTotalPages(1);
    }
  }, [search, sort, page]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Failed to delete customer");
      }
    }
  };

  return (
    <div className="container">
      <h1>Customer List</h1>

      <div className="search-sort-container">
        <input
          className="search-bar"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select
          className="sort-dropdown"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="asc">A–Z</option>
          <option value="desc">Z–A</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <Link to="/customers/new">
          <button className="primary">Add Customer</button>
        </Link>
      </div>

      <CustomerList customers={customers || []} onDelete={handleDelete} />

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomerListPage;
