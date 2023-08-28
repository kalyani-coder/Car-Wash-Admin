import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Page.css";

const mockApiResponse = [
  {
    bookingId: "#123",
    customerDetails: "John Doe",
    pickupAddress: "123 Main St, City",
    date: "2023-08-15",
    time: "14:00",
  },
  {
    bookingId: "#456",
    customerDetails: "Jane Smith",
    pickupAddress: "456 Elm St, Town",
    date: "2023-08-16",
    time: "15:30",
  },
  // ... Other data
];

export default function Page() {
  const [bookingData, setBookingData] = useState(mockApiResponse);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [removedBookings, setRemovedBookings] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleUpdateClick = (booking) => {
    if (selectedValue === "") {
      alert("Please select an action.");
      return;
    }

    const updatedBooking = {
      ...booking,
      selectedValue,
    };

    const storedBookings =
      JSON.parse(localStorage.getItem("storedBookings")) || [];
    storedBookings.push(updatedBooking);
    localStorage.setItem("storedBookings", JSON.stringify(storedBookings));

    setRemovedBookings((prevRemovedBookings) => [
      ...prevRemovedBookings,
      booking.bookingId,
    ]);
  };

  useEffect(() => {
    // Simulating fetching data from the backend
    setTimeout(() => {
      setBookingData(mockApiResponse);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBookings = bookingData.filter(
    (booking) =>
      booking.customerDetails
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      !removedBookings.includes(booking.bookingId)
  );

  return (
    <div className="container">
      <div className="container-fluid my-4">
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
          {filteredBookings.map((booking, index) => (
            <div className="col-12 mb-4" key={index}>
              <div className="card custom-card">
                <div className="card-body">
                  <p className="card-text">Booking id - {booking.bookingId}</p>
                  <p className="card-text">
                    Customer Details -<br />
                    {booking.customerDetails}
                  </p>
                  <p className="card-text">
                    Pickup Address - {booking.pickupAddress}
                  </p>
                  <p className="card-text">
                    Date - {booking.date}, Time - {booking.time}
                  </p>
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
