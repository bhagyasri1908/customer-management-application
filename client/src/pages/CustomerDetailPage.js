import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCustomerById, getAddresses, deleteAddress } from "../api";
import AddressList from "../components/AddressList";
import AddressForm from "../components/AddressForm";

function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const fetchData = async () => {
    try {
      const resCustomer = await getCustomerById(id);
      setCustomer(resCustomer.data?.data || null);

      const resAddresses = await getAddresses(id);
      setAddresses(resAddresses.data?.data || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(addressId);
        fetchData();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Failed to delete address");
      }
    }
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>
          {customer.first_name} {customer.last_name}
        </h2>
        <p>📞 {customer.phone_number}</p>
        <Link to={`/customers/${customer.id}/edit`}>
          <button className="secondary">Edit Customer</button>
        </Link>
      </div>

      <h3>Addresses</h3>
      <AddressList addresses={addresses} onDelete={handleDeleteAddress} />
      <AddressForm customerId={id} onAdded={fetchData} />
    </div>
  );
}

export default CustomerDetailPage;
