import React, { useState, useEffect } from 'react';

const ViewAvailableStocks = () => {
  const [stockValues, setStockValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/stocks');
        const data = await response.json();
        setStockValues(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>View Available Stocks</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {stockValues.map((stock, index) => (
            <tr key={index}>
              <td>{stock.addstocks}</td>
              <td>{stock.available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAvailableStocks;
