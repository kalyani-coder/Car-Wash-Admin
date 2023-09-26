import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

const ViewCancledBookings = () => {
    const [canceledBookings, setCanceledBookings] = useState([]);

    useEffect(() => {
        // Fetch declined bookings from the API
        fetch('https://car-wash-backend-api.onrender.com/api/bookings/status/Declined')
            .then(response => response.json())
            .then(data => setCanceledBookings(data))
            .catch(error => console.error('Error fetching declined bookings', error));
    }, []);

    return (
        <div className='container mt-5'>

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

            <h2>Canceled Bookings</h2>
            <div className='row'>
                {canceledBookings.map(booking => (
                    <div className='col-12 mb-4' key={booking._id}>
                        <div className='card custom-card'>
                            <div className='card-body'>
                                <div className='show-cancled'>
                                    <p className='text-center'>Cancled</p>
                                </div>
                                <h4>Client Details</h4>
                                <p className='card-text'>Booking id - {booking.clientId}</p>
                                <p className='card-text'>
                                    
                                    Client Name: {booking.clientName}
                                </p>
                                <p className='card-text'>Services Name - {booking.servicesName}</p>
                                <p className='card-text'>Pickup Address - {booking.pickupAddress}</p>
                                <p className='card-text'>Date - {booking.date}, Time - {booking.time}</p>
                                <p className='card-text'>Total price - {booking.totalPrice}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewCancledBookings;
