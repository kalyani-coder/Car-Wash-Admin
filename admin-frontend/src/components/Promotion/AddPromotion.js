import React, { useState, useEffect } from "react";
import { Form, Button,Col } from "react-bootstrap";
import "./AddPromotion.css";
import Alert from "./Alert";
import axios from 'axios'

export default function AddPromotion() {

  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [services, setServices] = useState([])

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

  const [title, setServiceName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setServiceDescription] = useState('');
  const [promotionPrice, setServicesPrice] = useState('');
  const [service, setService] = useState('')      // Add this line
  const [couponCode, setCouponcode] = useState('')




  const handleServiceNameChange = (event) => {
    setServiceName(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleServiceDescriptionChange = (event) => {
    setServiceDescription(event.target.value);
  };
  const handleServicesPriceChange = (event) => {
    setServicesPrice(event.target.value);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
  }

  const handleCouponCodeChange = (event) => {
    setCouponcode(event.target.value);
  }




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

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', selectedFile);
      formData.append('description', description);
      formData.append('promotionPrice', promotionPrice);
      formData.append('service', service)
      formData.append('couponCode', couponCode)


      fetch('https://car-wash-backend-api.onrender.com/api/promotions', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Image uploaded Successfully:', data.image);
          showAlert("Promotion Added Successfully", "success");
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          showAlert("Error adding service", "error");
        });
    }
  };



  return (
    <div className="container mt-5">
      <h1>Add Promotion</h1>
      {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}

      <div className="form-container">
        <form>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={title}
              required
              onChange={handleServiceNameChange}

            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              // rows={3}
              placeholder="Enter description"
              name="description"
              value={description}
              onChange={handleServiceDescriptionChange}
              rows="4"
            />
          </Form.Group>

          <Form.Group controlId="service">
            <Form.Label>Select Service:</Form.Label>
            <Form.Control
              as="select"
              name="service"
              value={service}
              onChange={handleServiceChange}
            >
              <option value="">Select a service</option>
              {/* <option value=""> a service</option>
              <option value=""> b service</option> */}
              {services.map((service) => (
                <option key={service.id} value={service.serviceName}>
                  {service.serviceName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="servicePrice">
            <Form.Label>Price of promotions:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Service Price"
              value={promotionPrice}
              onChange={handleServicesPriceChange}
            />
          </Form.Group>



          <Form.Group controlId="couponCode">
            <Form.Label>Coupon Code:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter coupon code"
              name="couponCode"
              value={couponCode}
              onChange={handleCouponCodeChange}
              style={{ marginBottom: "10px" }} // Add margin to the text box


            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={handleFileChange}

            />
          </Form.Group>
          {/* 
          <Button type="submit" style={{ marginTop: "10px" }} onClick={handleUpload}>
            Create Offer
          </Button> */}

          <Col xs="auto">
            <Button variant="primary" onClick={handleUpload}>
              Save
            </Button>
          </Col>

          {/* <Button
            type="submit"
            style={{ marginTop: "10px" }}
            onClick={handleUpload}
          >
            Create Offer
          </Button> */}
        </form>
      </div>
    </div>
  );
}
