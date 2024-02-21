import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./JobCard.css";
import axios from "axios";

const JobCard = () => {
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientData, setClientData] = useState(null);
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Fetch data from the clients API
    fetch("http://localhost:8000/api/clients")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.error("Error fetching clients data:", error);
      });

    // Fetch data from the bookings API
    fetch("http://localhost:8000/api/bookings")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error fetching bookings data:", error);
      });
  }, []);

  const handleClientChange = (event) => {
    const selectedClientId = event.target.value;
    setSelectedClient(selectedClientId);

    // Find the selected client data
    const selectedClientData = clients.find(
      (client) => client._id === selectedClientId
    );

    // Find the booking data for the selected client
    const selectedBookingData = bookings.find(
      (booking) => booking.clientId === selectedClientId
    );

    // Merge client data with booking data
    const mergedData = { ...selectedClientData, ...selectedBookingData };

    setClientData(mergedData);
  };

  const handleSubmit = async (e) => {
    try {
      // Prepare data for the POST request
      const data = {
        clientId: selectedClient,
        name: clientData ? clientData.clientName : "",
        email: clientData ? clientData.clientEmail : "",
        phone: clientData ? clientData.clientPhone : "",
        address: clientData ? clientData.clientAddress : "",
        vehicle_Make: clientData ? clientData.clientcarmodelno : "",
        vehicle_Number: clientData ? clientData.clientvehicleno : "",
      };

      // Send POST request to the API
      const response = await axios.post(
        "http://localhost:8000/api/jobcard",
        data
      );

      // Set the response message
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("Error posting data:", error);
      setResponseMessage("An error occurred while posting data.");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Create Job Card</h1>
        <Form.Group controlId="SelectClient">
          <Form.Label>Select Client:</Form.Label>
          <div className="relative">
            <Form.Select
              className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              aria-label="Select Client"
              value={selectedClient}
              onChange={handleClientChange}
            >
              <option>Select Client</option>

              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.clientName}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Customer Name:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            className=""
            placeholder="Enter Full Name"
            value={clientData ? clientData.clientName : ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>E-mail:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            className=""
            placeholder="Enter E-mail Address"
            value={clientData ? clientData.clientEmail : ""}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            className=""
            placeholder="Enter Phone Number"
            value={clientData ? clientData.clientPhone : ""}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="Address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            className=""
            placeholder="Enter  Address"
            value={clientData ? clientData.clientAddress : ""}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="modelYear">
          <Form.Label>Vehicle Make/Model:</Form.Label>
          <Form.Control
            type="text"
            name="modelYear"
            className=""
            placeholder="Enter Vehicle Model and Year"
            value={clientData ? clientData.clientcarmodelno : ""}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="vehicleNumber">
          <Form.Label>Vehicle Number:</Form.Label>
          <Form.Control
            type="text"
            name="vehicleNumber"
            className=""
            placeholder="Enter Vehicle Number"
            value={clientData ? clientData.clientvehicleno : ""}
            readOnly
          />
        </Form.Group>
        {/* <Form.Group controlId="Category">
          <Form.Label>Vehicle Category:</Form.Label>
          <div className="relative">
            <Form.Select
              className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              aria-label="Select Client"
              value={category}
              onChange={(event) => setClientId(event.target.value)}
            >
              <option>Select Vehicle Category</option>
              <option>Hatchback</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Luxuary</option>
              <option>Body Wash</option>
              <option>Interior Deep Cleaning</option>
              <option>Hard Water Removal</option>
            </Form.Select>
          </div>
        </Form.Group>
        <Form.Group controlId="Treatment">
          <Form.Label>Vehicle Treatment:</Form.Label>
          <div className="relative">
            <Form.Select
              className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              aria-label="Select Client"
            >
              <option>Choose Vehicle Treatment</option>
              <option>Treatment:1</option>
              <option>Treatment:2</option>
              <option>Treatment:3</option>
              <option>Treatment:4</option>
              <option>Treatment:5</option>
            </Form.Select>
          </div>
        </Form.Group> */}

        <div className="flex items-center justify-center">
          <div>
            <button
              type="button"
              class="btn btn-primary mt-3"
              onClick={handleSubmit}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
