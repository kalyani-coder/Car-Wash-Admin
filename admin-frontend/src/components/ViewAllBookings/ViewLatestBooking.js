import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../Promotion/Alert";
import './ViewLatestBookings.css'
import axios from "axios"
import { Link } from 'react-router-dom'

export default function ViewLatestBooking() {
    const [bookingData, setBookingData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [agents, setAgents] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);

    // console.log("Agents:", agents);
    const [selectedAgent, setSelectedAgent] = useState("");

    const [successAlert, setSuccessAlert] = useState(null);
    const [errorAlert, setErrorAlert] = useState(null);

    useEffect(() => {
        fetch("https://car-wash-backend-api.onrender.com/api/bookings")
            .then((response) => response.json())
            .then((data) => setBookingData(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    useEffect(() => {
        fetch("https://car-wash-backend-api.onrender.com/api/agents")
            .then((response) => response.json())
            .then((data) => setAgents(data))
            .catch((error) => console.error("Error fetching agents", error));
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

        const handleUpdateClick = async (booking) => {
            if (selectedValue === "" || selectedAgent === "") {
                showAlert("Status update failed: Select status and agent", "danger");
                return;
            }
        
            let updatedStatus;
            if (selectedValue === "accept") {
                updatedStatus = "Accepted";
            } else if (selectedValue === "decline") {
                updatedStatus = "Declined";
            } else if (selectedValue === "pending") {
                updatedStatus = "Pending";
            }
            var locationID ; 

            const locationData = {
                AgentID: "",
                location: {
                  latitude :"37.421998333333335",
                  longitude :"122.084",
                },
                bookingID :[ booking._id],
                lastSeen: new Date().toISOString(),
              };
            
               await axios
              .post('https://car-wash-backend-api.onrender.com/api/agentlocation', locationData)
              .then(response => {
                console.log('Location posted successfully:', response.data);
                 locationID = (response.data._id);
                console.log(locationID)
              })
              .catch(error => {
                console.error('Error posting location:', error);
              });

              

        
            const updatedBooking = {
                ...booking,
                status: updatedStatus,
                agentId: selectedAgent,
                locationId : locationID,
            };

        // using this get by agent email 

        //     const selectedAgentObj = agents.find(agent => agent._id === selectedAgent);

        // const updatedBooking = {
        //   ...booking,
        //   status: selectedValue === "accept" ? "Accepted" : "Declined",
        //   agentId: selectedAgent,
        //   agentEmail: selectedAgentObj.email
        // };

        fetch(`https://car-wash-backend-api.onrender.com/api/bookings/${booking._id}`, {
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

        setSelectedBooking(updatedBooking);
    };

    useEffect(() => {
        setFilteredBookings(bookingData.filter(booking => booking.status === ""));
    }, [bookingData]);

    return (
        <div className="container">

            <div className="bookings-table mt-5" style={{ justifyContent: "space-evenly", display: "flex" }}>
                <Link to="/viewlatestbookings">
                    <button button className="btn btn-warning">View Latest Bookings</button>
                </Link>

                <Link to="/viewpendingbookings">
                    <button className="btn btn-info">View Pending Bookings</button>
                </Link>

                <Link to="/viewcancledbookings  ">
                    <button className="btn btn-danger">View Cancled Bookings</button>
                </Link>

                <Link to="/viewongoingbookings  ">
         <button className="btn btn-primary">View Ongoing Bookings</button>
        </Link>

            </div>

            <div className="container-fluid my-4">
                <div className="success-message-bar">
                    {successAlert && <Alert alert={successAlert} />}
                    {errorAlert && <Alert alert={errorAlert} />}
                </div>
                <div className="row justify-content-center mt-3">
                    {filteredBookings.map((booking, index) => (
                        <div className="col-12 mb-4" key={index}>
                            <div className="card custom-card">
                                <div className="card-body">
                                <div className='show-newbookings'>
                                    <p className='text-center newbookings-status text-bg-success'>New Bookings</p>
                                   </div> 
                                    {/* <p className="card-text">Booking id - {booking.clientId}</p> */}
                                    <h4>Client Details</h4>
                                    <p className="card-text">
                                        
                                        Client Name: {booking.clientName}
                                       
                                    </p>
                                    <p className="card-text">
                                    Client Contact: {booking.clientContact}
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
                                        aria-label="Select Status"
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="accept">Accept</option>
                                        <option value="decline">Decline</option>
                                        <option value="pending">Pending</option>
                                    </Form.Select>

                                    <Form.Select
                                        aria-label="Select Agent"
                                        onChange={(event) => setSelectedAgent(event.target.value)}
                                    >
                                        <option value="">Select Agent</option>
                                        {agents.map((agent) => (
                                            <option key={agent._id} value={agent._id}>
                                                {agent.fullName}

                                            </option>
                                        ))}
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
