import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./AddPromotion.css";
import Alert from './Alert'

export default function AddPromotion() {
 

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Check if any required field is empty
  //   if (!title || !description || !service || !offerType) {
  //     window.alert("Please fill all the required fields.");
  //     return;
  //   }
  // }
  const [offerType, setOfferType] = useState("");
    const [fixedAmount, setFixedAmount] = useState("");
  const [percentageAmount, setPercentageAmount] = useState("");

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: '',
    offerType: '',
    fixedAmount: '',
    percentageAmount: '',
    couponCode : '',

  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [alertval, setAlert] = useState(null)

  const showAlert = (message, type) => {
      setAlert({
          msg: message,
          type: type
      })
      setTimeout(() => {
          setAlert(null)
      }, 5000);
  }

  const handleSubmit = async (e) => {
   
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:9000/api/promotions', formData);
      console.log('Response Sucessfully data post:', response.data);
      showAlert("Promotion Add Successfully", "success")
      // You can handle the response from the API here
    } catch (error) {
      console.error('Error data not post:', error);
      // Handle any errors that occur during the POST request
    }
    
  };


  return (
    <div className="container mt-5">
      <h1>Add Promotion</h1>
      <Alert alert={alertval} />
      <div className="form-container">
      <form  onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
             
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              // rows={3}
              placeholder="Enter description"
              name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
             
            />
          </Form.Group>

          <Form.Group controlId="service">
            <Form.Label>Select Service:</Form.Label>
            <Form.Control
              as="select"
              name="service"
              value={formData.service}
              onChange={handleChange}
            
            >
              <option value="">Select a service</option>
              <option value="service1">Service 1</option>
              <option value="service2">Service 2</option>
              <option value="service3">Service 3</option>
              {/* Add more services as needed */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="offerType">
            <Form.Label className="offer-type-label">
              Types of Offer:
            </Form.Label>
            <div className="offer-type-container">
              <Form.Check
                inline
                type="checkbox"
                label="Fixed Amount"
                name="offerType"
                value="fixed"
                checked={offerType === "fixed"}
                onChange={(e) => setOfferType(e.target.value)}
                className="offer-type-checkbox"
              />
              {offerType === "fixed" && (
                <Form.Control
                  type="text"
                  placeholder="Enter fixed amount"
                  value={fixedAmount}
                  onChange={(e) => setFixedAmount(e.target.value)}
                  className="offer-type-input my-2"
                />
              )}
            </div>
            <div className="offer-type-container">
              <Form.Check
                inline
                type="checkbox"
                label="Percentage Amount"
                name="offerType"
                value="percentage"
                checked={offerType === "percentage"}
                onChange={(e) => setOfferType(e.target.value)}
                className="offer-type-checkbox"
              />
              {offerType === "percentage" && (
                <Form.Control
                  type="text"
                  placeholder="Enter percentage amount"
                  value={percentageAmount}
                  onChange={(e) => setPercentageAmount(e.target.value)}
                  className="offer-type-input"
                />
              )}
            </div>
          </Form.Group>

          <Form.Group controlId="couponCode">
            <Form.Label>Coupon Code:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter coupon code"
            
              name="couponCode"
              value={formData.couponCode}
              onChange={handleChange}
              
              style={{ marginBottom: "10px" }} // Add margin to the text box
            />
          </Form.Group>

          <Button type="submit" style={{ marginTop: "10px" }}>
            Create Offer
          </Button>
        </form>
      </div>
    </div>
  );
}
