import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const CustomerDetailsCard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [Customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/clients")
      .then((response) => setCustomers(response.data));
  }, []);

  const filteredCustomers = Customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredCustomers.length === 0 ? (
        <p className="text-center">No customers found.</p>
      ) : (
        filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="card mb-4 shadow"
            style={{ height: 258 }}
          >
            <div className="card-body d-flex">
              <div className="row d-flex">
                <div className="col-md-8">
                  <h4 className="card-title">{customer.name}</h4>
                  <p className="card-text">
                    {customer.address.street}, {customer.address.suite}
                  </p>
                  <p className="card-text">
                    {customer.address.city}, {customer.address.zipcode}
                  </p>
                  <p className="card-text">
                    <strong>Order Details:</strong> {customer.orderDetails}
                  </p>
                </div>
                <div className="mt-2">
                  <Link
                    to={`/customer/${customer.id}`}
                    className="btn btn-primary"
                  >
                    Know More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerDetailsCard;
