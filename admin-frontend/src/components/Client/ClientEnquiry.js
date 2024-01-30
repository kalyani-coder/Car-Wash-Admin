import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ClientEnquiry.css";

const ClientEnquiry = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch client data from the API
    fetch("https://car-wash-backend-api.onrender.com/api/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching client data", error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filtered = clients.filter((client) => {
      // Adding null/undefined check before calling toLowerCase
      const clientName = client.clientName ? client.clientName.toLowerCase() : '';
      return clientName.includes(query);
    });
  
    setFilteredClients(filtered);
  };
  
  const displayedClients = searchQuery ? filteredClients : clients;

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control mt-5"
            placeholder="Search by client name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="row">
        {displayedClients.map((client) => (
          <div key={client._id} className="col-md-6 mb-4 mt-3">
            <div className="custom-card-cl-en">
              <div className="custom-card-body">
                <h5 className="custom-card-title">Customers ID: {client._id}</h5>
                <h6 className="custom-card-subtitle mb-2 text-muted mt-3">
                Customers Name: {client.clientName}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                Customers Email: {client.clientEmail}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                Customers Phone: {client.clientPhone}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Address: {client.clientAddress}
                </h6>
                <p className="custom-card-text">{client.enquiryDescription}</p>
                {/* <button className="btn btn-custom">View</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientEnquiry;
