import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

const DetailedCustomerInfoPage = () => {
  const { id } = useParams();

  const [Customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/clients")
      .then((response) => setCustomers(response.data));
  }, []);

  const selectedCustomer = Customers.find(
    (customer) => customer.id === parseInt(id, 10)
  );

  if (!selectedCustomer) {
    return <p className="mt-4">Customer not found.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{selectedCustomer.name}</h4>
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <td>Email</td>
                <td>{selectedCustomer.email}</td>
              </tr>
              <tr>
                <td>Contact Number</td>
                <td>{selectedCustomer.phone}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  {`${selectedCustomer.address.street}, ${selectedCustomer.address.suite}, ${selectedCustomer.address.city}, ${selectedCustomer.address.zipcode}`}
                </td>
              </tr>
              <tr>
                <td>Order Details</td>
                <td>{selectedCustomer.orderDetails}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailedCustomerInfoPage;
