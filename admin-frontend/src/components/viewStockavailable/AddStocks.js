import React, { useState } from 'react'

const AddStocks = () => {
  // Define state variables for the stock quantities
  const [stockValues, setStockValues] = useState({
    cleanoli: '',
    cleaning: '',
    deteling: '',
    shampoo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStockValues({
      ...stockValues,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the entire object
    console.log('Stock Values:', stockValues);

    // Here, you can use the stockValues object to send the data to your backend
    // or perform any necessary actions. For example, you can make an API call
    // to save the stock quantities.
  }

  return (
    <div className='container mt-5'>
      <h1>Add Stock</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cleanoli">Cleanoli:</label>
          <input
            type="text"
            className="form-control"
            id="cleanoli"
            name="cleanoli"
            value={stockValues.cleanoli}
            onChange={handleInputChange}
          />
        </div>
     
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddStocks;
