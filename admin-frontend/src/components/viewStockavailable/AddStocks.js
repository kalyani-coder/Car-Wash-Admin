import React, { useState } from 'react';


const AddStocks = () => {
  const [stockValues, setStockValues] = useState({
    cleanoli: '',
    cleanoliAvailable: 'no',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStockValues({
      ...stockValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addstocks: stockValues.cleanoli, // Assuming "cleanoli" is the name of the input field for adding stocks
          available: stockValues.cleanoliAvailable === 'yes' ? 'available' : 'not available',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('Stock data sent successfully');
    } catch (error) {
      console.error('Error sending stock data:', error);
    }
  };
  
  return (
    <div className="container mt-5">
      <h1>Add Stock</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cleanoli">Add Stocks:</label>
          <input
            type="text"
            className="form-control"
            id="cleanoli"
            name="cleanoli"
            value={stockValues.cleanoli}
            onChange={handleInputChange}
          />
          <label htmlFor="cleanoliAvailable">Available:</label>
          <select
            id="cleanoliAvailable"
            name="cleanoliAvailable"
            className="form-control"
            value={stockValues.cleanoliAvailable}
            onChange={handleInputChange}
          >
            <option value="yes">Available</option>
            <option value="no">Not Available</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStocks;
