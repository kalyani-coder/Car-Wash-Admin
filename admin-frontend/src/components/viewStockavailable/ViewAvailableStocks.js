import React, { useState } from 'react';

const ViewAvailableStocks = () => {
  const [stockValues, setStockValues] = useState({
    cleanoli: "Available",
    cleaning: "Available",
    deteling: "Not Available",
    shampoo: "Available",
  });

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
          {Object.keys(stockValues).map(product => (
            <tr key={product}>
              <td>{product}</td>
              <td>{stockValues[product]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAvailableStocks;
