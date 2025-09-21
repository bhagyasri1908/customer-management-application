import React from "react";
import { deleteAddress } from "../api";

function AddressList({ addresses = [], onDeleted }) {
  if (!addresses.length) return <p>No addresses found.</p>;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(id);
        onDeleted(); // refresh parent
      } catch (err) {
        alert(err.response?.data?.error || "Failed to delete address");
      }
    }
  };

  return (
    <ul>
      {addresses.map((address) => (
        <li key={address.id} className="card">
          <p>
            {address.address_details}, {address.city}, {address.state} – {address.pin_code}
          </p>
          <button className="danger" onClick={() => handleDelete(address.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default AddressList;
