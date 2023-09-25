import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import Alert from '../Promotion/Alert';

const ViewAvailableStocks = () => {
  const [stockValues, setStockValues] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://car-wash-backend-api.onrender.com/api/stocks');
        const data = await response.json();
        setStockValues(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // for delete stocks 
  const handleDelete = async (_id) => {
    console.log("Deleting stock with ID:", _id);
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/stocks/${_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Remove the deleted stock from the state
        setStockValues(prevStockValues => prevStockValues.filter(stock => stock._id !== _id));
      } else {
        console.error('Error deleting stock:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <h1>View Available Stocks</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Available</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {stockValues.map((stock, index) => (
            <tr key={index}>
              <td>{stock.addstocks}</td>
              <td>{stock.available}</td>
              <td>
                {/* <FontAwesomeIcon
                  icon={faEdit}
                  style={{ cursor: 'pointer' , color:'green' , fontSize:"20px"}}
                /> */}

                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: 'pointer',marginLeft:"18px" , color:"red",fontSize:"20px"}}
                  onClick={() => handleDelete(stock._id)}
                 />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAvailableStocks;
