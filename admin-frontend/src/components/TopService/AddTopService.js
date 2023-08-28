import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Alert from "../Promotion/Alert";

function AddTopService() {


  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    offer: '',
    image: '',
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
      const response = await axios.post('http://localhost:9000/api/topservices', formData);
      console.log('Response Sucessfully data post:', response.data);
      showAlert("Services Add Successfully", "success")
      // You can handle the response from the API here
    } catch (error) {
      console.error('Error data not post:', error);
      showAlert("Services Add Failed", "danger")
      // Handle any errors that occur during the POST request
    }
  };

  return (
  <>
      <div className="container mt-5">
        <h1>Add Top Services</h1>
        <Alert alert={alertval} />
        <form onSubmit={handleSubmit}>

          <Form.Group controlId="title">
            <Form.Label>Title :</Form.Label>
            <Form.Control
              placeholder="Title of Top services"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>


          <Form.Group controlId="category">
            <Form.Label>Category:</Form.Label>
            <Form.Control
              placeholder="Category of top services"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              placeholder="Price of services"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

        

          <Form.Group className="mb-4 display-flex">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description of Service input type"
              className="fw-normal"
              style={{ height: "5rem" }}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              as="select"
              type="text"
              name="offer"
              value={formData.offer}
              onChange={handleChange}
            >
              <option value="">Select Offer</option>
              <option value="No Offer">No Offer</option>
              <option value="10% Discount">10% Discount</option>
              <option value="20% Discount">20% Discount</option>
              <option value="Special Deal">Special Deal</option>
              <option value="Gift with Purchase">
                Gift with Purchase
              </option>
            </Form.Control>
          </Form.Group>



          <Form.Group controlId="image">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="justify-content-between mt-4">
            <Col xs="auto">
              <Button type="submit" variant="warning">
                Save
              </Button>
            </Col>

            <Col xs="auto">
              <Button variant="warning">
                Discard
              </Button>
            </Col>
          </Row>

        </form>
      </div>

    </>
  );
}

export default AddTopService;
