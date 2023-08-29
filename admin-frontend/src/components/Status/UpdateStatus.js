import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../Service/Alert";
import './UpdateStatus.css'

export default function Page() {
  const [bookingData, setBookingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  // for alert message 
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

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

  const handleUpdateClick = (booking) => {
    if (selectedValue === "") {
      // alert("Please select an action.");
      showAlert("Status updated failed select status", "danger");

      return;
    }

    // Create an updatedBooking object with the new status
    const updatedBooking = {
      ...booking,
      status: selectedValue === "accept" ? "Accepted" : "Declined", // Modify as needed
    };

    // Send a PATCH request to update the status
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
        // Handle successful update, e.g., update the state if needed
        console.log("Status updated successfully", data);
        showAlert("Status updated successfully", "success");

        // You can also update the state to reflect the updated status if needed
        // For example, if bookingData is an array of bookings, you can map over it
        // and update the status of the corresponding booking
        // const updatedData = bookingData.map((item) => {
        //   if (item._id === data._id) {
        //     return data; // Updated booking
        //   }
        //   return item;
        // });
        // setBookingData(updatedData);
      })
      .catch((error) => {
        console.error("Error updating status", error);
        showAlert("Status updated failed", "danger");
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
