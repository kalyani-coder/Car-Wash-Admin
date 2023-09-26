import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import './ViewOnGoingBookings.css'
const OngoingPage = () => {
    const [ongoingBookings, setOngoingBookings] = useState([]);

    useEffect(() => {
        fetch('https://car-wash-backend-api.onrender.com/api/bookings')
            .then(response => response.json())
            .then(data => {
                const filteredBookings = data.filter(booking => booking.status === "Accepted" && booking.agentId);
                setOngoingBookings(filteredBookings);
            })
            .catch(error => console.error('Error fetching ongoing bookings', error));
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


            <h2>Ongoing Bookings</h2>
            <div className='row'>
                {ongoingBookings.map(booking => (
                    <div className='col-12 mb-4' key={booking._id}>
                        <div className='card custom-card'>
                            <div className='card-body'>
                                  <div className='show-status'>
                                    <p className='text-center'>On going</p>
                                   </div> 
                                   <h4>Client Details</h4>
                                   <p>Agent id {booking.agentId}</p>
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

export default OngoingPage;
