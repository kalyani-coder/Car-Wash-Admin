import React, { useState, useEffect } from 'react';

const ViewOffers = () => {
  const [offers, setOffers] = useState([]);

  // Function to fetch offers from API
  const fetchOffers = async () => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/homeoffers');
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []); // Fetch offers on component mount

  const handleDelete = async (offerId) => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/homeoffers/${offerId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove the deleted offer from the state
        setOffers(offers.filter(offer => offer._id !== offerId));
        console.log(`Offer with ID ${offerId} deleted successfully.`);
      } else {
        console.error(`Error deleting offer with ID ${offerId}`);
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  return (
    <div className='container mt-5'>
      <h1 className="mb-4">View Offers</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Offer Name</th>
              <th>Offer</th>
              <th>Services Name</th>
              <th>Description</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map(offer => (
              <tr key={offer._id}>
                <td>{offer.offerName}</td>
                <td>{offer.offer}</td>
                <td>{offer.servicesName}</td>
                <td>{offer.description}</td>
                <td>{offer.totalPrice}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(offer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewOffers;