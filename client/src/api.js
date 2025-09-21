import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// ---------- Customer APIs ----------
export const getCustomers = ({ search = "", sort = "asc", page = 1, limit = 5 }) =>
  axios.get(`${BASE_URL}/customers`, {
    params: { search, sort, page, limit },
  });

export const getCustomerById = (id) =>
  axios.get(`${BASE_URL}/customers/${id}`);

export const createCustomer = (data) =>
  axios.post(`${BASE_URL}/customers`, data);

export const updateCustomer = (id, data) =>
  axios.put(`${BASE_URL}/customers/${id}`, data);

export const deleteCustomer = (id) =>
  axios.delete(`${BASE_URL}/customers/${id}`);

// ---------- Address APIs ----------
export const getAddresses = (customerId) =>
  axios.get(`${BASE_URL}/customers/${customerId}/addresses`);

export const createAddress = (customerId, data) =>
  axios.post(`${BASE_URL}/customers/${customerId}/addresses`, data);

export const updateAddress = (addressId, data) =>
  axios.put(`${BASE_URL}/addresses/${addressId}`, data);

export const deleteAddress = (addressId) =>
  axios.delete(`${BASE_URL}/addresses/${addressId}`);
