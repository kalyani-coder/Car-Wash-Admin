import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DetailedCustomerInfoPage = () => {
  // const { id } = useParams();

  const [clients, setClients] = useState([]);
  console.log(clients);

  useEffect(() => {
    fetch("https://car-wash-backend-api.onrender.com/api/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) =>
        console.log("Error fetching customer details", error)
      );
  }, []);

  return (
    <div className="container mt-4">
      {clients.map((client) => (
        <div className="card mb-3" key={client._id}>
          <div className="card-body">
            <h4 className="card-title">Name : {client.clientName}</h4>
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>{client.clientEmail}</td>
                </tr>
                <tr>
                  <td>Contact Number</td>
                  <td>{client.clientPhone}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{client.clientAddress}</td>
                </tr>
                {/* <tr>
                  <td>Vehicle No</td>
                  <td>{client.clientvehicleno}</td>
                </tr>
                <tr>
                  <td>Car Make / Model</td>
                  <td>{client.clientcarmodelno}</td>
                </tr> */}
                {/* Add more client details here */}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailedCustomerInfoPage;
