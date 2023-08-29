import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Alert from "../Service/Alert"
import axios from "axios";

const AddAgentPage = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    dateOfBirth: '',
    address: '',
    profilePic: '',
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


    try {
      const response = await axios.post('http://localhost:9000/api/agents', formData);
      console.log('Response Sucessfully data post:', response.data);
      showAlert("Agent Add Successfully", "success")
      // You can handle the response from the API here
    } catch (error) {
      console.error('Error data not post:', error);
      showAlert("Agent Add Failed", "danger")
      // Handle any errors that occur during the POST request
    }
  };




  return (
    <>

      <div className="container mt-5">
        <h1>Add Agents</h1>
        <Alert alert={alertval} />
        <form onSubmit={handleSubmit}>

          <Form.Group controlId="fullName">
            <Form.Label>Full Name of Agent:</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </Form.Group>


          <Form.Group controlId="email">
            <Form.Label>Agent Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="contactNumber">
            <Form.Label>Contact No:</Form.Label>
            <Form.Control
              type="number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </Form.Group>


          <Form.Group controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="profilePic">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control
              type="file"
              name="profilePic"
              value={formData.profilePic}
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

    </>

  );
};

export default AddAgentPage;
