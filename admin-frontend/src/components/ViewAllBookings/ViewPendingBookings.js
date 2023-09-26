import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const ViewPendingBookings = () => {
    const [pendingBookings, setPendingBookings] = useState([]);

    useEffect(() => {
        // Fetch pending bookings from the API
        fetch('https://car-wash-backend-api.onrender.com/api/bookings/status/Pending')
            .then(response => response.json())
            .then(data => setPendingBookings(data))
            .catch(error => console.error('Error fetching pending bookings', error));
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

            <h2>Pending Bookings</h2>
            <div className='row'>
                {pendingBookings.map(booking => (
                    <div className='col-12 mb-4' key={booking._id}>
                        <div className='card custom-card'>
                            <div className='card-body'>
                            <div className='show-pending'>
                                    <p className='text-center pending-status text-bg-danger'>Pending</p>
                                   </div> 
                                {/* <p className='card-text'>Booking id - {booking.clientId}</p> */}
                                <h4>Client Details</h4><hr />
                                <p className='card-text'>

                                    Client Name: {booking.clientName}
                                </p><hr />
                                <p className="card-text">
                                    Client Contact: {booking.clientContact}
                                </p><hr />
                                <p className='card-text'>Services Name - {booking.servicesName}</p><hr />
                                <p className='card-text'>Pickup Address - {booking.pickupAddress}</p><hr />
                                <p className='card-text'>Date - {booking.date}, Time - {booking.time}</p><hr />
                                <p className='card-text'>Total price - {booking.totalPrice}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewPendingBookings;
