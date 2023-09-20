import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Availabledate = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/bookings')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); 

  const handleDateChange = date => {
    setSelectedDate(date);
    setAvailabilityMessage('');
  };

  const handleCheckAvailability = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB');
      const isDateAlreadyBooked = bookings.some(booking => booking.date === formattedDate);

      if (isDateAlreadyBooked) {
        setAvailabilityMessage(`Date ${formattedDate} is not available`);
      } else {
        setAvailabilityMessage(`Date ${formattedDate} is available`);
      }
    } else {
      setAvailabilityMessage('Please select a date');
    }
  };

  return (
    <div className='container mt-5'>
      <h3>Bookings date</h3>
      <div className="mb-3">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          isClearable
        />
      </div>
      <button className="btn btn-primary" onClick={handleCheckAvailability}>
        Check Availability
      </button>
      {availabilityMessage && <p>{availabilityMessage}</p>}
      <h3>All Bookings</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Availabledate;
