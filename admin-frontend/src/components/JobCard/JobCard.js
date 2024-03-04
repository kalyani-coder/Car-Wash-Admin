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
  const [selectedCategory, setSelectedCategory] = useState('');

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');

  const [washTypes, setWashTypes] = useState([]);
  const [selectedWashType, setSelectedWashType] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/master/washtype')
      .then(response => response.json())
      .then(data => {
        setWashTypes(data);
      })
      .catch(error => {
        console.error('Error fetching wash types:', error);
      });
  }, []);

  const handleWashTypeChange = (event) => {
    setSelectedWashType(event.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/master/vehicletype')
      .then(response => response.json())
      .then(data => {
        setVehicleTypes(data);
      })
      .catch(error => {
        console.error('Error fetching vehicle types:', error);
      });
  }, []);

  const handleVehicleTypeChange = (event) => {
    setSelectedVehicleType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

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
    e.preventDefault(); // Prevent the default form submission behavior

    if (!selectedVehicleType || !selectedCategory) {
        console.error('Please select both a vehicle category and type.');
        alert('Please select both a vehicle category and type.');
        return; // Exit early if either the category or type is not selected
    }

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
            vehicle_Category: selectedCategory, // Include selected category
            vehicle_Type: selectedVehicleType, // Include selected type
            wash_type: clientData ? clientData.clientwashType : "",
            coating: clientData ? clientData.clientcoating : ""
        };

        // Send POST request to the API
        const response = await axios.post(
            "http://localhost:8000/api/jobcard",
            data
        );

        // Set the response message
        setResponseMessage(response.data.message);
        alert('Data posted successfully');
    } catch (error) {
        console.error("Error posting data:", error);
        setResponseMessage("An error occurred while posting data.");
    }
};


  return (
    <>
      <div className="container">
        {/* fetching customers for craeting jobcard  */}
        <div className="abc">
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

        </div>

        {/* cars details for creating job card  */}
        <div>
          <Form.Group controlId="SelectClient">
            <Form.Label>Vehicle Category:</Form.Label>
            <div className="relative">
              <Form.Select
                className="custom-select"
                aria-label="Select Client"
                style={{ width: '50%' }}
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option  >Select Vehicle Category</option>
                <option value="cars">Cars</option>
                <option value="bikes">Bikes</option>
              </Form.Select>
            </div>
          </Form.Group>

          {/* Conditional rendering based on selected category */}
          {selectedCategory === 'cars' && (
            <>
              <Form.Group controlId="CarVehicleType">
                <Form.Label>Vehicle Type:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Vehicle Type"
                    style={{ width: '50%' }}
                    value={selectedVehicleType}
                    onChange={handleVehicleTypeChange}
                  >
                    <option>Select Car Type</option>
                    {vehicleTypes.map(vehicleType => (
                      <option key={vehicleType._id} value={vehicleType.vehicle_Type}>
                        {vehicleType.vehicle_Type}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Wash Type:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                    value={selectedWashType}
                    onChange={handleWashTypeChange}
                  >
                    <option>Select Wash Type</option>
                    {washTypes.map(washType => (
                      <option key={washType._id} value={washType.wash_type}>
                        {washType.wash_type}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>


              <Form.Group controlId="CarWashType">
                <Form.Label>Coating:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Coating Type</option>
                    <option>Ceramic (9H)</option>
                    <option>Regular 1 & 2 year warranty (1 maintenance in 2 years)</option>
                    <option>Premium 3 years warranty (2 maintenance in 3 years)</option>
                    <option>Luxury 5 years and lifetime warranty (4 or 14 maintenance in 5 or 15 years)</option>
                    <option>Engine Coating</option>
                    <option>Silencer Coating</option>
                    <option>Underbody Coating</option>
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Paint Protection Films:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Paint Protection Films</option>
                    <option>Glossy
                      Regular 3 years warranty (Glossgenic & Garware )</option>
                    <option>Premium 5 years warranty
                      (Glossgenic, Garware & Llumar)</option>
                    <option>Exclusive 7 years warranty
                      (Glossgenic)</option>
                    <option>Luxe 10 years warranty (Glossgenic & Llumar)</option>
                    <option>Elegance 12 years warranty (Llumar)</option>
                  </Form.Select>
                </div>
              </Form.Group>


              <Form.Group controlId="CarWashType">
                <Form.Label>Window Films:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Window Films</option>
                    <option>Garware</option>
                    <option>Llumar </option>

                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Vinyl Wraps:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Vinyl Wraps</option>
                    <option>Regular</option>
                    <option>Ceramic Coating</option>

                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Premium Leather Seat Covers:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Premium Leather Seat Covers</option>
                    <option>Bentley Leather</option>
                    <option>German Leather</option>
                    <option>NAPA Leather</option>
                    <option>Lavish Leather</option>

                  </Form.Select>
                </div>
              </Form.Group>


              <Form.Group controlId="CarWashType">
                <Form.Label>Lamination:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Lamination</option>
                    <option>Exotic Floor Lamination</option>
                    <option>7D Mats</option>
                    <option>3D Mats</option>

                  </Form.Select>
                </div>
              </Form.Group>


              <Form.Group controlId="CarWashType">
                <Form.Label>Interior Décor:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%', marginBottom: "20px" }}
                  >
                    <option>Interior Décor</option>
                    <option>Ambient lighting</option>
                    <option>Full Interior Modification</option>

                  </Form.Select>
                </div>
              </Form.Group>

            </>
          )}
        </div>

        <div>
          {selectedCategory === 'bikes' && (
            <>
              <Form.Group controlId="BikeServices">
                <Form.Label>Bike Types:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Bike Service"
                    style={{ width: '50%' }}
                  >
                    <option>Bike Types</option>
                    <option>Mopeds</option>
                    <option>Motorcycles</option>
                    <option>Sports</option>
                    <option>Sports</option>
                    <option>Off-road Bikes</option>

                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="BikeWashType">
                <Form.Label>Wash Type:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Wash Type</option>
                    <option>Body Wash</option>
                    <option>Interior Deep Cleaning</option>
                    <option>Hard Water Removal</option>
                    <option>Premium Wash</option>
                    <option>Premium Wash (detail info marker - Wash+Vacuum+Interior&Exterior Polish)</option>
                    <option>Clay Wash, Iron Wash, Tar Wash, Diesel Wash</option>
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="BikeWashType">
                <Form.Label>Exterior Detailing:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Exterior Detailing</option>
                    <option>Hard Water Removal</option>
                    <option>Rubbing/ Compunding/ Polishing</option>
                    <option>Windshield Polish</option>
                    <option>Glass Coating</option>
                    <option>Alloy Wheel Cleaning & Polish</option>
                    <option>Wheels Off Detailing</option>
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="BikeWashType">
                <Form.Label>Coating:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>coating</option>
                    <option>Graphene (10H)
                      Regular 1 & 2 year warranty (1 maintenance in 2 years)</option>
                    <option>Premium 3 years warranty (2 maintenance in 3 years)</option>
                    <option>Luxury 5 years and lifetime warranty (4 or 14 maintenance in 5 or 15 years)</option>
                    <option>Engine Coating</option>
                    <option>Silencer Coating</option>
                    <option>Underbody Coating</option>
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Window Films:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Window Films</option>
                    <option>Garware</option>
                    <option>Llumar </option>

                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Vinyl Wraps:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Vinyl Wraps</option>
                    <option>Regular</option>
                    <option>Ceramic Coating</option>

                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Premium Leather Seat Covers:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Premium Leather Seat Covers</option>
                    <option>Bentley Leather</option>
                    <option>German Leather</option>
                    <option>NAPA Leather</option>
                    <option>Lavish Leather</option>

                  </Form.Select>
                </div>
              </Form.Group>


              <Form.Group controlId="CarWashType">
                <Form.Label>Lamination:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%' }}
                  >
                    <option>Lamination</option>
                    <option>Exotic Floor Lamination</option>
                    <option>7D Mats</option>
                    <option>3D Mats</option>

                  </Form.Select>
                </div>
              </Form.Group>


              <Form.Group controlId="CarWashType">
                <Form.Label>Interior Décor:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Wash Type"
                    style={{ width: '50%', marginBottom: "20px" }}
                  >
                    <option>Interior Décor</option>
                    <option>Ambient lighting</option>
                    <option>Full Interior Modification</option>

                  </Form.Select>
                </div>
              </Form.Group>
            </>
          )}
        </div>

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
