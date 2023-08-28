import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ClientEnquiry.css";

const ClientEnquiry = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);

  const enquiries = [
    {
      id: 1,
      clientName: "Jane Smith",
      enquiryTitle: "Service Inquiry",
      enquiryDescription: "I'm interested in your professional services...",
    },
    {
      id: 2,
      clientName: "amardip",
      enquiryTitle: "about services ",
      enquiryDescription:
        "i want to know about the service you provide for me.",
    },
    {
      id: 458790,
      clientName: "vedant",
      enquiryTitle: "About Services",
      enquiryDescription: " i am looking forward to work with you.",
    },

    // ... (other enquiries)
  ];

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = enquiries.filter((enquiry) =>
      enquiry.clientName.toLowerCase().includes(query)
    );
    setFilteredEnquiries(filtered);
  };

  const displayedEnquiries = searchQuery ? filteredEnquiries : enquiries;

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
        {displayedEnquiries.map((enquiry) => (
          <div key={enquiry.id} className="col-md-6 mb-4 mt-3">
            <div className="custom-card-cl-en">
              <div className="custom-card-body">
                <h5 className="custom-card-title">Enquiry ID: {enquiry.id}</h5>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Client: {enquiry.clientName}
                </h6>
                <h6 className="custom-card-subtitle mb-2 text-muted">
                  Title: {enquiry.enquiryTitle}
                </h6>
                <p className="custom-card-text">{enquiry.enquiryDescription}</p>
                <button className="btn btn-custom">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientEnquiry;
