import React, { useState } from "react";
import { createAddress } from "../api";

function AddressForm({ customerId, onAdded }) {
  const [formData, setFormData] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    const { address_details, city, state, pin_code } = formData;
    if (!address_details || !city || !state || !pin_code) {
      alert("All fields are required");
      return;
    }

    try {
      await createAddress(customerId, formData);
      // Clear form
      setFormData({ address_details: "", city: "", state: "", pin_code: "" });
      onAdded(); // Refresh parent
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add address");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="address_details"
        placeholder="Street / Address"
        value={formData.address_details}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="pin_code"
        placeholder="PIN Code"
        value={formData.pin_code}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Address</button>
    </form>
  );
}

export default AddressForm;
