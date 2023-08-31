import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../Service/Alert";
import './UpdateStatus.css'

export default function Page() {
  const [bookingData, setBookingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null); // New state to store the selected booking

  // for alert message 
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  // agents 
  const [agents, setAgents] = useState([])

  useEffect(() => {
    fetch("http://localhost:9000/api/booking")
      .then((response) => response.json())
      .then((data) => setBookingData(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const showAlert = (message, type) => {
    if (type === "success") {
      setSuccessAlert({ msg: message, type: type });
      setTimeout(() => {
        setSuccessAlert(null);
      }, 5000);
    } else if (type === "danger") {
      setErrorAlert({ msg: message, type: type });
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAgentSelectChange = (event) => {
    setSelectedAgentId(event.target.value);
  };

  const handleUpdateClick = (booking) => {
    if (selectedValue === "") {
      showAlert("Status update failed: Select status", "danger");
      return;
    }

    const updatedBooking = {
      ...booking,
      status: selectedValue === "accept" ? "Accepted" : "Declined",
    };

    fetch(`http://localhost:9000/api/booking/${booking._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBooking),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Status updated successfully", data);
        showAlert("Status updated successfully", "success");
      })
      .catch((error) => {
        console.error("Error updating status", error);
        showAlert("Status update failed", "danger");
      });

    setSelectedBooking(updatedBooking); // Store the selected booking
  };

  const handleAssignClick = () => {
    if (selectedAgentId === "" || selectedBooking === null) {
      showAlert("Agent assignment failed: Select agent and update status first", "danger");
      return;
    }

    // Add the selected agent ID to the booking
    const bookingWithAgent = {
      ...selectedBooking,
      agentId: selectedAgentId,
    };

    // Send a POST request to assign the agent
    fetch('http://localhost:9000/api/orderassign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingWithAgent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to assign agent.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Agent assigned successfully", data);
        showAlert("Agent assigned successfully", "success");
      })
      .catch((error) => {
        console.error("Error assigning agent", error);
        showAlert("Agent assignment failed", "danger");
      });

    setSelectedAgentId(""); // Clear the selected agent ID
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:9000/api/agents')
    .then((response) => response.json())
    .then((data) => setAgents(data))
    .catch((error) => console.log("error", error))
  }, []);

  return (
    <div className="container">
      <div className="container-fluid my-4">
        <div className="success-message-bar">
          {successAlert && <Alert alert={successAlert} />}
          {errorAlert && <Alert alert={errorAlert} />}
        </div>
        <div className="search-container">
          <input
            type="text"
            className="form-control search-field"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="row justify-content-center mt-3">
          {bookingData.map((booking, index) => (
            <div className="col-12 mb-4" key={index}>
              <div className="card custom-card">
                <div className="card-body">
                  <p className="card-text">Booking id - {booking.clientId}</p>
                  <p className="card-text">
                    Client Details -<br />
                    Client Name: {booking.clientName}
                  </p>
                  <p className="card-text">
                    Services Name - {booking.servicesName}
                  </p>
                  <p className="card-text">
                    Pickup Address - {booking.pickupAddress}
                  </p>
                  <p className="card-text">
                    Date - {booking.date}, Time - {booking.time}
                  </p>
                  <p className="card-text">Total price - {booking.totalPrice}</p>
                </div>
                
                <div className="card-body d-flex justify-content-end mt-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option value="">Select Status</option>
                    <option value="accept">Accept</option>
                    <option value="decline">Decline</option>
                  </Form.Select>
                  <button
                    type="button"
                    className="btn btn-warning ms-2"
                    onClick={() => handleUpdateClick(booking)}
                  >
                    Update
                  </button>
                </div>

                <div className="card-body d-flex justify-content-end mt-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleAgentSelectChange}
                  >
                    <option value="">Select Agents</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.fullName}
                      </option>
                    ))}
                  </Form.Select>
                  <button
                    type="button"
                    className="btn btn-success ms-2"
                    onClick={handleAssignClick} // Use the new handler for the Assign button
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
