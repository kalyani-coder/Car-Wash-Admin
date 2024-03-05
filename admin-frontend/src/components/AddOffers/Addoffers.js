import React, { useState } from 'react';
import Alert from '../Service/Alert';

const Addoffers = () => {
  const [offerData, setOfferData] = useState({
    offerName: '',
    offer: '',
    homeservicesName: '',
    description: '',
    totalPrice: '',
    image: '',
    startDate: '', // New start date field
    endDate: '' // New end date field
  });

  const percentageOptions = ['10%', '20%', '30%', '40%', '50%'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData({
      ...offerData,
      [name]: value,
    });
  };

  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  const showAlert = (message, type) => {
    if (type === "success") {
      setSuccessAlert({ msg: message, type: type });
      setTimeout(() => {
        setSuccessAlert(null);
      }, 5000);
    } else if (type === "error") {
      setErrorAlert({ msg: message, type: type });
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://car-wash-backend-api.onrender.com/api/homeoffers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offerData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Offer added successfully', data);
        showAlert("Offer Added Successfully", "success");
        
        setOfferData({
          offerName: '',
          offer: '',
          homeservicesName: '',
          description: '',
          totalPrice: '',
          image: '',
          startDate: '',
          endDate: ''
        });
      })
      .catch(error => console.error('Error adding offer:', error));
  };

  return (
    <div className='container mt-5'>
      <h1>Add Offer</h1>

      {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="offerName" className="form-label">Offer Name</label>
          <input type="text" className="form-control" id="offerName" name="offerName" value={offerData.offerName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="offer" className="form-label">Offer</label>
          <select className="form-select" id="offer" name="offer" value={offerData.offer} onChange={handleChange} required>
            <option value="">Select Discount</option>
            {percentageOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="homeservicesName" className="form-label">Services Name</label>
          <input type="text" className="form-control" id="homeservicesName" name="homeservicesName" value={offerData.homeservicesName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={offerData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="totalPrice" className="form-label">Total Price</label>
          <input type='number' className="form-control" id="totalPrice" name="totalPrice" value={offerData.totalPrice} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input type="date" className="form-control" id="startDate" name="startDate" value={offerData.startDate} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input type="date" className="form-control" id="endDate" name="endDate" value={offerData.endDate} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input type="text" className="form-control" id="image" name="image" value={offerData.image} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Addoffers;
