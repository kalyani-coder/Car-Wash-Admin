import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./AddService.css";
import axios from "axios";
import Alert from "./Alert";

const AddServices = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceCategory: "",
    servicePrice: "",
    serviceDescription: "",
    serviceOffer: "",
    serviceImage: "",
  });

  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/services",
        formData
      );
      console.log("Response Successfully data post:", response.data);
      showAlert("Service Added Successfully", "success");
      // You can handle the response from the API here
    } catch (error) {
      console.error("Error data not post:", error);
      showAlert("Error adding service", "error");
      // Handle any errors that occur during the POST request
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Service</h1>
   
      {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
      <form  onSubmit={handleSubmit}>

        <Form.Group controlId="serviceName">
          <Form.Label>Name of Service:</Form.Label>
          <Form.Control
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
          />
        </Form.Group>


        <Form.Group controlId="serviceCategory">
          <Form.Label>Category of Service:</Form.Label>
          <Form.Control
            type="text"
            name="serviceCategory"
            value={formData.serviceCategory}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="servicePrice">
          <Form.Label>Price of Service:</Form.Label>
          <Form.Control
            type="number"
            name="servicePrice"
            value={formData.servicePrice}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="serviceDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
            rows="4"
          />
        </Form.Group>

        {/* <Form.Group controlId="serviceOffer">
          <Form.Label>Offer on Product:</Form.Label>
          <Form.Control
            as="select"
            name="serviceOffer"
            value={formData.serviceOffer}
            onChange={handleChange}
          >
          </Form.Control>
        </Form.Group> */}

        <Form.Group controlId="serviceOffer">
          <Form.Label>Offer on Product:</Form.Label>
          <Form.Control
            type="text"
            name="serviceOffer"
            value={formData.serviceOffer}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="serviceImage">
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control
            type="file"
            name="serviceImage"
            value={formData.serviceImage}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="justify-content-between mt-4">
          <Col xs="auto">
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Col>

          <Col xs="auto">
            <Button variant="primary">
              Discard
            </Button>
          </Col>
        </Row>

      </form>
    </div>
  );
}

export default AddServices;