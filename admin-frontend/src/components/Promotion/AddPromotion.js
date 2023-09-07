import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./AddPromotion.css";
import Alert from "./Alert";

export default function AddPromotion() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    service: "",
    offerType: "",
    fixedAmount: "",
    percentageAmount: "",
    couponCode: "",
    image: "",
  });

  const [services, setServices] = useState([]); 

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get("https://car-wash-backend-api.onrender.com/api/services");
        const servicesData = response.data; 
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [alertval, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://car-wash-backend-api.onrender.com/api/promotions",
        formData
      );
      console.log("Response Data:", response.data);
      showAlert("Promotion Added Successfully", "success");

      // Reset the form after successful submission
      setFormData({
        title: "",
        description: "",
        service: "",
        offerType: "",
        fixedAmount: "",
        percentageAmount: "",
        couponCode: "",
        image: "",
      });
    } catch (error) {
      console.error("Error:", error);
      showAlert("Failed to Add Promotion ", "danger");
    }
  };
  return (
    <div className="container mt-5">
      <h1>Add Promotion</h1>
      <Alert alert={alertval} />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            required

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
              {services.map((service) => (
                <option key={service.id} value={service.serviceName }>
                  {service.serviceName}
                </option>
              ))}
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
                checked={formData.offerType === "fixed"}
                onChange={handleChange}
                className="offer-type-checkbox"
              />
              {formData.offerType === "fixed" && (
                <Form.Control
                  type="text"
                  placeholder="Enter fixed amount"
                  name="fixedAmount"
                  value={formData.fixedAmount}
                  onChange={handleChange}
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
                checked={formData.offerType === "percentage"}
                onChange={handleChange}
                className="offer-type-checkbox"
              />
              {formData.offerType === "percentage" && (
                <Form.Control
                  type="text"
                  placeholder="Enter percentage amount"
                  name="percentageAmount"
                  value={formData.percentageAmount}
                  onChange={handleChange}
                  className="offer-type-input"
            required

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

          <Form.Group controlId="image">
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control
            type="file"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
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
