import React from "react";
import { Link } from "react-router-dom";

function CustomerList({ customers = [], onDelete = () => {} }) {
  if (!customers || customers.length === 0) {
    return <p>No customers found.</p>;
  }

  return (
    <ul className="customer-list">
      {customers.map((customer) => (
        <li key={customer.id} className="card">
          <h3>
            {customer.first_name} {customer.last_name}
          </h3>
          <p>📞 {customer.phone_number}</p>
          <div style={{ marginTop: "10px" }}>
            <Link to={`/customers/${customer.id}`}>
              <button className="primary">View Details</button>
            </Link>
            <Link to={`/customers/${customer.id}/edit`}>
              <button className="secondary" style={{ marginLeft: "10px" }}>
                Edit
              </button>
            </Link>
            {onDelete && (
              <button
                className="danger"
                style={{ marginLeft: "10px" }}
                onClick={() => onDelete(customer.id)}
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CustomerList;
