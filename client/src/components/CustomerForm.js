import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCustomer, updateCustomer, getCustomerById } from "../api";

function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getCustomerById(id).then((res) =>
        setFormData(
          res.data?.data || { first_name: "", last_name: "", phone_number: "" }
        )
      );
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateCustomer(id, formData);
      } else {
        await createCustomer(formData);
      }
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Customer" : "Add Customer"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;
